/**
 * Euka Events — Ultra-Fast Zero-Dependency Node.js Backend Server
 * - Pure Node.js 18+ Standard Library (Native HTTP, Crypto & Fetch)
 * - Reads .env configuration
 * - Cloudflare D1 HTTP API integration
 * - Cloudflare R2 / Local media upload handling
 * - Secure native JWT auth (HMAC-SHA256)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

// 1. Lightweight .env parser
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    });
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'euka_jwt_fallback_secret_key_2026';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'eukaevents@2026';

// In-Memory & File-based fallback DB
const DB_FILE = path.join(__dirname, 'db_fallback.json');
let localStore = {
  settings: {},
  portfolio: [],
  destinations: [],
  media: []
};

if (fs.existsSync(DB_FILE)) {
  try {
    localStore = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {}
}

function saveLocalStore() {
  fs.writeFileSync(DB_FILE, JSON.stringify(localStore, null, 2));
}

// 2. Pure Native JWT Implementation (HS256)
function base64url(str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function signJWT(payload, secret = JWT_SECRET) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${header}.${body}.${signature}`;
}

function verifyJWT(token, secret = JWT_SECRET) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

// 3. Cloudflare D1 Helper (via REST API)
async function queryD1(sql, params = []) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (accountId && databaseId && apiToken && !accountId.includes('your_')) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({ sql, params }),
        }
      );
      const data = await response.json();
      if (data.success && data.result?.[0]?.results) {
        return data.result[0].results;
      }
    } catch (err) {
      console.warn('Cloudflare D1 REST API query fallback:', err.message);
    }
  }
  return null;
}

// 4. Request Body Buffer Collector
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// CORS & JSON Response Helper
function sendJSON(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key',
  });
  res.end(JSON.stringify(data));
}

// 5. Main HTTP Request Handler
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key',
    });
    return res.end();
  }

  try {
    // --------------------------------------------------------
    // Route: Auth
    // --------------------------------------------------------
    if (pathname === '/api/auth' && method === 'POST') {
      const raw = await getRequestBody(req);
      const body = JSON.parse(raw.toString('utf8') || '{}');

      if (body.secret === ADMIN_SECRET_KEY) {
        const token = signJWT({ role: 'admin', exp: Date.now() + 7 * 24 * 3600 * 1000 });
        return sendJSON(res, { success: true, message: 'Authenticated', token });
      }
      return sendJSON(res, { success: false, error: 'Invalid admin secret key' }, 401);
    }

    if (pathname === '/api/auth/verify' && method === 'GET') {
      const auth = req.headers['authorization'] || '';
      const token = auth.replace('Bearer ', '').trim();
      const verified = verifyJWT(token);
      if (verified) return sendJSON(res, { success: true, valid: true });
      return sendJSON(res, { success: false, error: 'Unauthorized' }, 401);
    }

    // --------------------------------------------------------
    // Route: Public Content API
    // --------------------------------------------------------
    if (pathname === '/api/content' && method === 'GET') {
      const setRes = await queryD1('SELECT key, value FROM settings');
      const portRes = await queryD1('SELECT * FROM portfolio ORDER BY sort_order ASC, created_at DESC');
      const destRes = await queryD1('SELECT * FROM destinations ORDER BY sort_order ASC, created_at DESC');

      const settings = { ...localStore.settings };
      if (setRes) {
        setRes.forEach(r => { settings[r.key] = r.value; });
      }

      let portfolio = localStore.portfolio || [];
      if (portRes && portRes.length) {
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
          credits: JSON.parse(p.credits_json || '{}'),
          gallery: JSON.parse(p.gallery_json || '[]'),
        }));
      }

      let destinations = localStore.destinations || [];
      if (destRes && destRes.length) {
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
          topVenues: JSON.parse(d.top_venues_json || '[]'),
          guide: JSON.parse(d.guide_json || '{}'),
        }));
      }

      return sendJSON(res, { success: true, settings, portfolio, destinations });
    }

    // --------------------------------------------------------
    // Auth Check for Protected Endpoints
    // --------------------------------------------------------
    if (pathname.startsWith('/api/settings') || pathname.startsWith('/api/portfolio') || pathname.startsWith('/api/destinations') || pathname.startsWith('/api/upload') || pathname.startsWith('/api/media')) {
      const auth = req.headers['authorization'] || '';
      const token = auth.replace('Bearer ', '').trim();
      const verified = verifyJWT(token);
      if (!verified && token !== ADMIN_SECRET_KEY) {
        return sendJSON(res, { success: false, error: 'Unauthorized' }, 401);
      }
    }

    // --------------------------------------------------------
    // Route: Settings (PUT)
    // --------------------------------------------------------
    if (pathname === '/api/settings' && method === 'PUT') {
      const raw = await getRequestBody(req);
      const updates = JSON.parse(raw.toString('utf8') || '{}');
      localStore.settings = { ...localStore.settings, ...updates };
      saveLocalStore();

      for (const [k, v] of Object.entries(updates)) {
        await queryD1('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [k, String(v)]);
      }
      return sendJSON(res, { success: true, message: 'Settings saved' });
    }

    // --------------------------------------------------------
    // Route: Portfolio (POST / DELETE)
    // --------------------------------------------------------
    if (pathname === '/api/portfolio' && method === 'POST') {
      const raw = await getRequestBody(req);
      const p = JSON.parse(raw.toString('utf8') || '{}');
      const id = p.id || 'case-' + Date.now();
      const slug = p.slug || id;

      const idx = localStore.portfolio.findIndex(x => x.id === id);
      if (idx >= 0) localStore.portfolio[idx] = p;
      else localStore.portfolio.unshift(p);
      saveLocalStore();

      await queryD1(`
        INSERT OR REPLACE INTO portfolio 
        (id, slug, category, couple, title_zh, title_en, location_zh, location_en, venue_zh, venue_en, date, season_zh, season_en, cover_image, hero_image, story_zh, story_en, credits_json, gallery_json, sort_order, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [
        id, slug, p.category || 'italy', p.couple || '',
        p.title?.zh || p.title_zh || '', p.title?.en || p.title_en || '',
        p.location?.zh || p.location_zh || '', p.location?.en || p.location_en || '',
        p.venue?.zh || p.venue_zh || '', p.venue?.en || p.venue_en || '',
        p.date || '', p.season?.zh || p.season_zh || '', p.season?.en || p.season_en || '',
        p.coverImage || p.cover_image || '', p.heroImage || p.hero_image || '',
        p.story?.zh || p.story_zh || '', p.story?.en || p.story_en || '',
        typeof p.credits === 'object' ? JSON.stringify(p.credits) : (p.credits_json || '{}'),
        Array.isArray(p.gallery) ? JSON.stringify(p.gallery) : (p.gallery_json || '[]'),
        p.sort_order || 0
      ]);

      return sendJSON(res, { success: true, id, message: 'Case saved' });
    }

    if (pathname.startsWith('/api/portfolio/') && method === 'DELETE') {
      const id = pathname.replace('/api/portfolio/', '');
      localStore.portfolio = localStore.portfolio.filter(x => x.id !== id);
      saveLocalStore();
      await queryD1('DELETE FROM portfolio WHERE id = ?', [id]);
      return sendJSON(res, { success: true, message: 'Case deleted' });
    }

    // --------------------------------------------------------
    // Route: Destinations (POST / DELETE)
    // --------------------------------------------------------
    if (pathname === '/api/destinations' && method === 'POST') {
      const raw = await getRequestBody(req);
      const d = JSON.parse(raw.toString('utf8') || '{}');
      const id = d.id || 'dest-' + Date.now();

      const idx = localStore.destinations.findIndex(x => x.id === id);
      if (idx >= 0) localStore.destinations[idx] = d;
      else localStore.destinations.unshift(d);
      saveLocalStore();

      await queryD1(`
        INSERT OR REPLACE INTO destinations
        (id, region, name_zh, name_en, country_zh, country_en, venue_count, badge_zh, badge_en, cover_image, hero_image, tagline_zh, tagline_en, capacity_zh, capacity_en, best_season_zh, best_season_en, setting_zh, setting_en, description_zh, description_en, map_x, map_y, pin_size, top_venues_json, guide_json, sort_order, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [
        id, d.region || 'italy', d.name?.zh || d.name_zh || '', d.name?.en || d.name_en || '',
        d.country?.zh || d.country_zh || '', d.country?.en || d.country_en || '',
        d.venueCount || d.venue_count || 10, d.badge?.zh || d.badge_zh || '', d.badge?.en || d.badge_en || '',
        d.coverImage || d.cover_image || '', d.heroImage || d.hero_image || '',
        d.tagline?.zh || d.tagline_zh || '', d.tagline?.en || d.tagline_en || '',
        d.capacity?.zh || d.capacity_zh || '', d.capacity?.en || d.capacity_en || '',
        d.bestSeason?.zh || d.best_season_zh || '', d.bestSeason?.en || d.best_season_en || '',
        d.setting?.zh || d.setting_zh || '', d.setting?.en || d.setting_en || '',
        d.description?.zh || d.description_zh || '', d.description?.en || d.description_en || '',
        d.mapCoord?.x || d.map_x || 50, d.mapCoord?.y || d.map_y || 50,
        d.mapCoord?.pinSize || d.pin_size || 'md',
        Array.isArray(d.topVenues) ? JSON.stringify(d.topVenues) : (d.top_venues_json || '[]'),
        typeof d.guide === 'object' ? JSON.stringify(d.guide) : (d.guide_json || '{}'),
        d.sort_order || 0
      ]);

      return sendJSON(res, { success: true, id, message: 'Destination saved' });
    }

    if (pathname.startsWith('/api/destinations/') && method === 'DELETE') {
      const id = pathname.replace('/api/destinations/', '');
      localStore.destinations = localStore.destinations.filter(x => x.id !== id);
      saveLocalStore();
      await queryD1('DELETE FROM destinations WHERE id = ?', [id]);
      return sendJSON(res, { success: true, message: 'Destination deleted' });
    }

    // --------------------------------------------------------
    // Route: File Upload to R2 / Local Storage
    // --------------------------------------------------------
    if (pathname === '/api/upload' && method === 'POST') {
      const raw = await getRequestBody(req);
      const datePrefix = new Date().toISOString().slice(0, 10);
      const uniqueKey = `uploads/${datePrefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

      // Save locally
      const localDir = path.join(__dirname, 'uploads', datePrefix);
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(path.join(__dirname, uniqueKey), raw);

      const publicBase = process.env.R2_PUBLIC_URL || 'https://pub-r2.eukaevents.com';
      const publicUrl = `${publicBase}/${uniqueKey}`;

      localStore.media.unshift({
        url: publicUrl,
        key: uniqueKey,
        filename: path.basename(uniqueKey),
        size: raw.byteLength,
        created_at: new Date().toISOString()
      });
      saveLocalStore();

      return sendJSON(res, {
        success: true,
        url: publicUrl,
        key: uniqueKey,
        filename: path.basename(uniqueKey),
        size: raw.byteLength
      });
    }

    if (pathname === '/api/media' && method === 'GET') {
      return sendJSON(res, { success: true, list: localStore.media });
    }

    // Default 404 for API
    if (pathname.startsWith('/api/')) {
      return sendJSON(res, { error: 'Not found' }, 404);
    }

    // Static files fallback
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const mimes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp'
      };
      res.writeHead(200, { 'Content-Type': mimes[ext] || 'text/plain' });
      return fs.createReadStream(filePath).pipe(res);
    }

    // Fallback to index.html for SPA routing
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);

  } catch (err) {
    sendJSON(res, { success: false, error: err.message }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`[Euka Events] Native Zero-Dependency Backend running on port ${PORT}`);
});
