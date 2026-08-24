/**
 * Euka Events — Node.js Backend Server
 * - Reads .env configuration
 * - Cloudflare D1 HTTP API Integration
 * - Cloudflare R2 S3 SDK Direct Upload
 * - JWT Authentication (No passwords exposed on client)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'euka_jwt_fallback_secret_key_2026';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'eukaevents@2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer memory storage for uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

/* ------------------------------------------------------------
   1. Cloudflare D1 Helper (via REST API)
   ------------------------------------------------------------ */
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
      console.warn('Cloudflare D1 HTTP API query failed, falling back to local store:', err.message);
    }
  }
  return null;
}

/* ------------------------------------------------------------
   2. Cloudflare R2 Helper (via S3 SDK)
   ------------------------------------------------------------ */
let s3Client = null;
function getS3Client() {
  if (s3Client) return s3Client;
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (accountId && accessKeyId && secretAccessKey && !accountId.includes('your_')) {
    try {
      const { S3Client } = require('@aws-sdk/client-s3');
      s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      return s3Client;
    } catch (e) {
      console.warn('AWS S3 SDK not initialized:', e.message);
    }
  }
  return null;
}

/* ------------------------------------------------------------
   3. Auth Middleware
   ------------------------------------------------------------ */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

/* ------------------------------------------------------------
   4. Auth Endpoints
   ------------------------------------------------------------ */
app.post('/api/auth', (req, res) => {
  const { secret } = req.body;
  if (!secret) {
    return res.status(400).json({ success: false, error: 'Secret is required' });
  }

  if (secret === ADMIN_SECRET_KEY) {
    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({ success: true, message: 'Authenticated successfully', token });
  }

  return res.status(401).json({ success: false, error: 'Invalid admin secret key' });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ success: true, valid: true });
});

/* ------------------------------------------------------------
   5. Public Content Endpoint (D1)
   ------------------------------------------------------------ */
app.get('/api/content', async (req, res) => {
  try {
    const setRes = await queryD1('SELECT key, value FROM settings');
    const portRes = await queryD1('SELECT * FROM portfolio ORDER BY sort_order ASC, created_at DESC');
    const destRes = await queryD1('SELECT * FROM destinations ORDER BY sort_order ASC, created_at DESC');

    const settings = {};
    if (setRes) {
      setRes.forEach(r => { settings[r.key] = r.value; });
    }

    let portfolio = [];
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
        credits: JSON.parse(p.credits_json || '{}'),
        gallery: JSON.parse(p.gallery_json || '[]'),
      }));
    }

    let destinations = [];
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
        topVenues: JSON.parse(d.top_venues_json || '[]'),
        guide: JSON.parse(d.guide_json || '{}'),
      }));
    }

    return res.json({ success: true, settings, portfolio, destinations });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* ------------------------------------------------------------
   6. Settings API (Protected)
   ------------------------------------------------------------ */
app.put('/api/settings', authenticateToken, async (req, res) => {
  const updates = req.body || {};
  for (const [k, v] of Object.entries(updates)) {
    await queryD1('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [k, String(v)]);
  }
  res.json({ success: true, message: 'Settings saved' });
});

/* ------------------------------------------------------------
   7. Portfolio CRUD API (Protected)
   ------------------------------------------------------------ */
app.post('/api/portfolio', authenticateToken, async (req, res) => {
  const p = req.body;
  const id = p.id || 'case-' + Date.now();
  const slug = p.slug || id;

  await queryD1(`
    INSERT OR REPLACE INTO portfolio 
    (id, slug, category, couple, title_zh, title_en, location_zh, location_en, venue_zh, venue_en, date, season_zh, season_en, cover_image, hero_image, story_zh, story_en, credits_json, gallery_json, sort_order, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `, [
    id,
    slug,
    p.category || 'italy',
    p.couple || '',
    p.title?.zh || p.title_zh || '',
    p.title?.en || p.title_en || '',
    p.location?.zh || p.location_zh || '',
    p.location?.en || p.location_en || '',
    p.venue?.zh || p.venue_zh || '',
    p.venue?.en || p.venue_en || '',
    p.date || '',
    p.season?.zh || p.season_zh || '',
    p.season?.en || p.season_en || '',
    p.coverImage || p.cover_image || '',
    p.heroImage || p.hero_image || '',
    p.story?.zh || p.story_zh || '',
    p.story?.en || p.story_en || '',
    typeof p.credits === 'object' ? JSON.stringify(p.credits) : (p.credits_json || '{}'),
    Array.isArray(p.gallery) ? JSON.stringify(p.gallery) : (p.gallery_json || '[]'),
    p.sort_order || 0
  ]);

  res.json({ success: true, id, message: 'Case saved successfully' });
});

app.delete('/api/portfolio/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await queryD1('DELETE FROM portfolio WHERE id = ?', [id]);
  res.json({ success: true, message: 'Case deleted' });
});

/* ------------------------------------------------------------
   8. Destinations CRUD API (Protected)
   ------------------------------------------------------------ */
app.post('/api/destinations', authenticateToken, async (req, res) => {
  const d = req.body;
  const id = d.id || 'dest-' + Date.now();

  await queryD1(`
    INSERT OR REPLACE INTO destinations
    (id, region, name_zh, name_en, country_zh, country_en, venue_count, badge_zh, badge_en, cover_image, hero_image, tagline_zh, tagline_en, capacity_zh, capacity_en, best_season_zh, best_season_en, setting_zh, setting_en, description_zh, description_en, map_x, map_y, pin_size, top_venues_json, guide_json, sort_order, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `, [
    id,
    d.region || 'italy',
    d.name?.zh || d.name_zh || '',
    d.name?.en || d.name_en || '',
    d.country?.zh || d.country_zh || '',
    d.country?.en || d.country_en || '',
    d.venueCount || d.venue_count || 10,
    d.badge?.zh || d.badge_zh || '',
    d.badge?.en || d.badge_en || '',
    d.coverImage || d.cover_image || '',
    d.heroImage || d.hero_image || '',
    d.tagline?.zh || d.tagline_zh || '',
    d.tagline?.en || d.tagline_en || '',
    d.capacity?.zh || d.capacity_zh || '',
    d.capacity?.en || d.capacity_en || '',
    d.bestSeason?.zh || d.best_season_zh || '',
    d.bestSeason?.en || d.best_season_en || '',
    d.setting?.zh || d.setting_zh || '',
    d.setting?.en || d.setting_en || '',
    d.description?.zh || d.description_zh || '',
    d.description?.en || d.description_en || '',
    d.mapCoord?.x || d.map_x || 50,
    d.mapCoord?.y || d.map_y || 50,
    d.mapCoord?.pinSize || d.pin_size || 'md',
    Array.isArray(d.topVenues) ? JSON.stringify(d.topVenues) : (d.top_venues_json || '[]'),
    typeof d.guide === 'object' ? JSON.stringify(d.guide) : (d.guide_json || '{}'),
    d.sort_order || 0
  ]);

  res.json({ success: true, id, message: 'Destination saved successfully' });
});

app.delete('/api/destinations/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await queryD1('DELETE FROM destinations WHERE id = ?', [id]);
  res.json({ success: true, message: 'Destination deleted' });
});

/* ------------------------------------------------------------
   9. Cloudflare R2 Upload API (Protected)
   ------------------------------------------------------------ */
app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const file = req.file;
    const ext = file.originalname.split('.').pop() || 'jpg';
    const datePrefix = new Date().toISOString().slice(0, 10);
    const uniqueKey = `uploads/${datePrefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const client = getS3Client();
    const bucketName = process.env.R2_BUCKET_NAME || 'eukaevents-media';
    const publicBase = process.env.R2_PUBLIC_URL || 'https://pub-r2.eukaevents.com';
    let publicUrl = `${publicBase}/${uniqueKey}`;

    if (client) {
      const { PutObjectCommand } = require('@aws-sdk/client-s3');
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: uniqueKey,
          Body: file.buffer,
          ContentType: file.mimetype,
          CacheControl: 'public, max-age=31536000',
        })
      );
    } else {
      // Local fallback
      const localUploadDir = path.join(__dirname, 'uploads', datePrefix);
      if (!fs.existsSync(localUploadDir)) {
        fs.mkdirSync(localUploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(__dirname, uniqueKey), file.buffer);
      publicUrl = `/${uniqueKey}`;
    }

    // Save record to D1 media table
    await queryD1(
      'INSERT OR REPLACE INTO media (id, key, url, filename, mime_type, size_bytes) VALUES (?, ?, ?, ?, ?, ?)',
      ['media-' + Date.now(), uniqueKey, publicUrl, file.originalname, file.mimetype, file.size]
    );

    return res.json({
      success: true,
      url: publicUrl,
      key: uniqueKey,
      filename: file.originalname,
      size: file.size,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`[Euka Events] CMS API Server running on port ${PORT}`);
});
