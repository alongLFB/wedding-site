/**
 * Cloudflare Worker API for Euka Events CMS (D1 Database & R2 Storage)
 * Binds:
 * - env.DB (Cloudflare D1 Database)
 * - env.BUCKET (Cloudflare R2 Bucket)
 * - env.ADMIN_SECRET (Default: "eukaevents@2026")
 */

const R2_PUBLIC_URL_FALLBACK = "https://pub-r2.eukaevents.com";

// CORS Headers helper
function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Key",
    "Access-Control-Allow-Credentials": "true",
  };
}

function jsonResponse(data, status = 200, request = null) {
  const headers = request ? corsHeaders(request) : { "Access-Control-Allow-Origin": "*" };
  headers["Content-Type"] = "application/json; charset=utf-8";
  return new Response(JSON.stringify(data), { status, headers });
}

// Authentication Check
function checkAuth(request, env) {
  const secret = env?.ADMIN_SECRET || ADMIN_SECRET;
  const authHeader = request.headers.get("Authorization") || "";
  const customKey = request.headers.get("X-Admin-Key") || "";

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();
    return token === secret;
  }
  return customKey === secret;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle OPTIONS Preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    try {
      // --------------------------------------------------------
      // 1. Auth Endpoint
      // --------------------------------------------------------
      if (path === "/api/auth" && method === "POST") {
        const body = await request.json().catch(() => ({}));
        const secret = env?.ADMIN_SECRET || ADMIN_SECRET;
        if (body.secret === secret) {
          return jsonResponse({ success: true, message: "Authorized", token: secret }, 200, request);
        }
        return jsonResponse({ success: false, error: "Invalid admin secret" }, 401, request);
      }

      // --------------------------------------------------------
      // 2. Public Full Content API (D1)
      // --------------------------------------------------------
      if (path === "/api/content" && method === "GET") {
        let settings = {};
        let portfolio = [];
        let destinations = [];

        if (env?.DB) {
          // Fetch settings
          const { results: setRes } = await env.DB.prepare("SELECT key, value FROM settings").all();
          if (setRes) {
            setRes.forEach(r => { settings[r.key] = r.value; });
          }

          // Fetch portfolio
          const { results: portRes } = await env.DB.prepare("SELECT * FROM portfolio ORDER BY sort_order ASC, created_at DESC").all();
          if (portRes) {
            portfolio = portRes.map(p => ({
              id: p.id,
              slug: p.slug,
              category: p.category,
              couple: p.couple,
              title: { zh: p.title_zh, en: p.title_en },
              location: { zh: p.location_zh, en: p.location_en },
              venue: { zh: p.venue_zh, en: p.venue_en },
              date: p.date,
              season: { zh: p.season_zh, en: p.season_en },
              coverImage: p.cover_image,
              heroImage: p.hero_image,
              story: { zh: p.story_zh, en: p.story_en },
              credits: JSON.parse(p.credits_json || "{}"),
              gallery: JSON.parse(p.gallery_json || "[]"),
            }));
          }

          // Fetch destinations
          const { results: destRes } = await env.DB.prepare("SELECT * FROM destinations ORDER BY sort_order ASC, created_at DESC").all();
          if (destRes) {
            destinations = destRes.map(d => ({
              id: d.id,
              region: d.region,
              name: { zh: d.name_zh, en: d.name_en },
              country: { zh: d.country_zh, en: d.country_en },
              venueCount: d.venue_count,
              badge: { zh: d.badge_zh, en: d.badge_en },
              coverImage: d.cover_image,
              heroImage: d.hero_image,
              tagline: { zh: d.tagline_zh, en: d.tagline_en },
              capacity: { zh: d.capacity_zh, en: d.capacity_en },
              bestSeason: { zh: d.best_season_zh, en: d.best_season_en },
              setting: { zh: d.setting_zh, en: d.setting_en },
              description: { zh: d.description_zh, en: d.description_en },
              mapCoord: { x: d.map_x, y: d.map_y, pinSize: d.pin_size },
              topVenues: JSON.parse(d.top_venues_json || "[]"),
              guide: JSON.parse(d.guide_json || "{}"),
            }));
          }
        }

        return jsonResponse({
          success: true,
          settings,
          portfolio,
          destinations,
        }, 200, request);
      }

      // --------------------------------------------------------
      // 3. Settings API (GET / PUT)
      // --------------------------------------------------------
      if (path === "/api/settings") {
        if (method === "GET") {
          let settings = {};
          if (env?.DB) {
            const { results } = await env.DB.prepare("SELECT key, value FROM settings").all();
            if (results) {
              results.forEach(r => { settings[r.key] = r.value; });
            }
          }
          return jsonResponse({ success: true, settings }, 200, request);
        }

        if (method === "PUT") {
          if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);
          const body = await request.json().catch(() => ({}));

          if (env?.DB) {
            const stmts = Object.entries(body).map(([k, v]) => {
              return env.DB.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)").bind(k, String(v));
            });
            if (stmts.length > 0) {
              await env.DB.batch(stmts);
            }
          }

          return jsonResponse({ success: true, message: "Settings saved successfully" }, 200, request);
        }
      }

      // --------------------------------------------------------
      // 4. Portfolio CRUD API
      // --------------------------------------------------------
      if (path === "/api/portfolio") {
        if (method === "GET") {
          if (!env?.DB) return jsonResponse({ success: true, list: [] }, 200, request);
          const { results } = await env.DB.prepare("SELECT * FROM portfolio ORDER BY sort_order ASC, created_at DESC").all();
          return jsonResponse({ success: true, list: results || [] }, 200, request);
        }

        if (method === "POST") {
          if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);
          const p = await request.json();
          const id = p.id || "case-" + Date.now();
          const slug = p.slug || id;

          if (env?.DB) {
            await env.DB.prepare(`
              INSERT OR REPLACE INTO portfolio 
              (id, slug, category, couple, title_zh, title_en, location_zh, location_en, venue_zh, venue_en, date, season_zh, season_en, cover_image, hero_image, story_zh, story_en, credits_json, gallery_json, sort_order, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `).bind(
              id,
              slug,
              p.category || "italy",
              p.couple || "",
              p.title?.zh || p.title_zh || "",
              p.title?.en || p.title_en || "",
              p.location?.zh || p.location_zh || "",
              p.location?.en || p.location_en || "",
              p.venue?.zh || p.venue_zh || "",
              p.venue?.en || p.venue_en || "",
              p.date || "",
              p.season?.zh || p.season_zh || "",
              p.season?.en || p.season_en || "",
              p.coverImage || p.cover_image || "",
              p.heroImage || p.hero_image || "",
              p.story?.zh || p.story_zh || "",
              p.story?.en || p.story_en || "",
              typeof p.credits === "object" ? JSON.stringify(p.credits) : (p.credits_json || "{}"),
              Array.isArray(p.gallery) ? JSON.stringify(p.gallery) : (p.gallery_json || "[]"),
              p.sort_order || 0
            ).run();
          }

          return jsonResponse({ success: true, id, message: "Case saved" }, 200, request);
        }
      }

      if (path.startsWith("/api/portfolio/")) {
        const id = path.replace("/api/portfolio/", "");
        if (method === "DELETE") {
          if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);
          if (env?.DB) {
            await env.DB.prepare("DELETE FROM portfolio WHERE id = ?").bind(id).run();
          }
          return jsonResponse({ success: true, message: "Case deleted" }, 200, request);
        }
      }

      // --------------------------------------------------------
      // 5. Destinations CRUD API
      // --------------------------------------------------------
      if (path === "/api/destinations") {
        if (method === "GET") {
          if (!env?.DB) return jsonResponse({ success: true, list: [] }, 200, request);
          const { results } = await env.DB.prepare("SELECT * FROM destinations ORDER BY sort_order ASC, created_at DESC").all();
          return jsonResponse({ success: true, list: results || [] }, 200, request);
        }

        if (method === "POST") {
          if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);
          const d = await request.json();
          const id = d.id || "dest-" + Date.now();

          if (env?.DB) {
            await env.DB.prepare(`
              INSERT OR REPLACE INTO destinations
              (id, region, name_zh, name_en, country_zh, country_en, venue_count, badge_zh, badge_en, cover_image, hero_image, tagline_zh, tagline_en, capacity_zh, capacity_en, best_season_zh, best_season_en, setting_zh, setting_en, description_zh, description_en, map_x, map_y, pin_size, top_venues_json, guide_json, sort_order, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `).bind(
              id,
              d.region || "italy",
              d.name?.zh || d.name_zh || "",
              d.name?.en || d.name_en || "",
              d.country?.zh || d.country_zh || "",
              d.country?.en || d.country_en || "",
              d.venueCount || d.venue_count || 10,
              d.badge?.zh || d.badge_zh || "",
              d.badge?.en || d.badge_en || "",
              d.coverImage || d.cover_image || "",
              d.heroImage || d.hero_image || "",
              d.tagline?.zh || d.tagline_zh || "",
              d.tagline?.en || d.tagline_en || "",
              d.capacity?.zh || d.capacity_zh || "",
              d.capacity?.en || d.capacity_en || "",
              d.bestSeason?.zh || d.best_season_zh || "",
              d.bestSeason?.en || d.best_season_en || "",
              d.setting?.zh || d.setting_zh || "",
              d.setting?.en || d.setting_en || "",
              d.description?.zh || d.description_zh || "",
              d.description?.en || d.description_en || "",
              d.mapCoord?.x || d.map_x || 50,
              d.mapCoord?.y || d.map_y || 50,
              d.mapCoord?.pinSize || d.pin_size || "md",
              Array.isArray(d.topVenues) ? JSON.stringify(d.topVenues) : (d.top_venues_json || "[]"),
              typeof d.guide === "object" ? JSON.stringify(d.guide) : (d.guide_json || "{}"),
              d.sort_order || 0
            ).run();
          }

          return jsonResponse({ success: true, id, message: "Destination saved" }, 200, request);
        }
      }

      if (path.startsWith("/api/destinations/")) {
        const id = path.replace("/api/destinations/", "");
        if (method === "DELETE") {
          if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);
          if (env?.DB) {
            await env.DB.prepare("DELETE FROM destinations WHERE id = ?").bind(id).run();
          }
          return jsonResponse({ success: true, message: "Destination deleted" }, 200, request);
        }
      }

      // --------------------------------------------------------
      // 6. R2 Image Direct Upload & Media API
      // --------------------------------------------------------
      if (path === "/api/upload" && method === "POST") {
        if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);

        const contentType = request.headers.get("Content-Type") || "";
        let fileBuffer, fileName, mimeType;

        if (contentType.includes("multipart/form-data")) {
          const formData = await request.formData();
          const file = formData.get("file");
          if (!file) return jsonResponse({ error: "No file uploaded" }, 400, request);

          fileBuffer = await file.arrayBuffer();
          fileName = file.name || `photo-${Date.now()}.jpg`;
          mimeType = file.type || "image/jpeg";
        } else {
          // Binary stream upload
          fileBuffer = await request.arrayBuffer();
          const rawName = request.headers.get("X-File-Name") || `photo-${Date.now()}`;
          fileName = decodeURIComponent(rawName);
          mimeType = contentType || "image/jpeg";
        }

        const ext = fileName.split(".").pop() || "jpg";
        const datePrefix = new Date().toISOString().slice(0, 10);
        const uniqueKey = `uploads/${datePrefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        let publicUrl = "";

        // Put into Cloudflare R2 Bucket
        if (env?.BUCKET) {
          await env.BUCKET.put(uniqueKey, fileBuffer, {
            httpMetadata: {
              contentType: mimeType,
              cacheControl: "public, max-age=31536000",
            },
          });
          const publicBase = env.R2_PUBLIC_DOMAIN || R2_PUBLIC_URL_FALLBACK;
          publicUrl = `${publicBase}/${uniqueKey}`;
        } else {
          // Fallback / mock when testing locally without R2 binding
          publicUrl = `https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85#${uniqueKey}`;
        }

        // Record in D1 media table
        if (env?.DB) {
          await env.DB.prepare(`
            INSERT OR REPLACE INTO media (id, key, url, filename, mime_type, size_bytes)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
            "media-" + Date.now(),
            uniqueKey,
            publicUrl,
            fileName,
            mimeType,
            fileBuffer.byteLength
          ).run();
        }

        return jsonResponse({
          success: true,
          url: publicUrl,
          key: uniqueKey,
          filename: fileName,
          size: fileBuffer.byteLength,
        }, 200, request);
      }

      if (path === "/api/media") {
        if (method === "GET") {
          if (!checkAuth(request, env)) return jsonResponse({ error: "Unauthorized" }, 401, request);
          let mediaList = [];
          if (env?.DB) {
            const { results } = await env.DB.prepare("SELECT * FROM media ORDER BY created_at DESC LIMIT 100").all();
            mediaList = results || [];
          }
          return jsonResponse({ success: true, list: mediaList }, 200, request);
        }
      }

      // Default 404 for unknown API
      return jsonResponse({ error: "API endpoint not found", path }, 404, request);
    } catch (err) {
      return jsonResponse({ error: err.message, stack: err.stack }, 500, request);
    }
  },
};
