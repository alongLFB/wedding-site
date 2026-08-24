-- ================================================================
-- Cloudflare D1 Database Schema & Seed Data for Rosé & Bloom Events
-- ================================================================

-- 1. Site Settings Table (Key-Value & JSON Configuration)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Portfolio Cases Table
CREATE TABLE IF NOT EXISTS portfolio (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    couple TEXT NOT NULL,
    title_zh TEXT NOT NULL,
    title_en TEXT NOT NULL,
    location_zh TEXT NOT NULL,
    location_en TEXT NOT NULL,
    venue_zh TEXT NOT NULL,
    venue_en TEXT NOT NULL,
    date TEXT NOT NULL,
    season_zh TEXT NOT NULL,
    season_en TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    story_zh TEXT NOT NULL,
    story_en TEXT NOT NULL,
    credits_json TEXT NOT NULL, -- JSON string of planner, photo, floral, venue, video, gown, stationery
    gallery_json TEXT NOT NULL, -- JSON array of [{src, caption}]
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id TEXT PRIMARY KEY,
    region TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    country_zh TEXT NOT NULL,
    country_en TEXT NOT NULL,
    venue_count INTEGER DEFAULT 10,
    badge_zh TEXT NOT NULL,
    badge_en TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    tagline_zh TEXT NOT NULL,
    tagline_en TEXT NOT NULL,
    capacity_zh TEXT NOT NULL,
    capacity_en TEXT NOT NULL,
    best_season_zh TEXT NOT NULL,
    best_season_en TEXT NOT NULL,
    setting_zh TEXT NOT NULL,
    setting_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    map_x REAL DEFAULT 50.0,
    map_y REAL DEFAULT 50.0,
    pin_size TEXT DEFAULT 'md',
    top_venues_json TEXT NOT NULL, -- JSON array of [{name, type, highlight}]
    guide_json TEXT NOT NULL,      -- JSON object of {weather, logistics, legal}
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Media Files Table (Stored in Cloudflare R2)
CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,       -- R2 Object Key
    url TEXT NOT NULL,              -- Public CDN URL
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- Initial Seed Settings Data
-- ================================================================
INSERT OR REPLACE INTO settings (key, value) VALUES
('site_name_zh', 'Rosé & Bloom Events'),
('site_name_en', 'Rosé & Bloom Events'),
('brand_subtitle', 'Luxury Wedding Planning & Design'),
('contact_email', 'concierge@eukaevents.com'),
('contact_phone', '+1 (415) 888-6688'),
('contact_address_zh', '旧金山 · 巴黎 · 东京 · 阿马尔菲海岸'),
('contact_address_en', 'Amalfi Coast · Paris · San Francisco · Kyoto'),
('hero_title_zh', 'Rosé & Bloom'),
('hero_title_en', 'Rosé & Bloom'),
('hero_subtitle_zh', '将每一段爱情故事，编织成永恒的璀璨记忆'),
('hero_subtitle_en', 'Weaving every love story into an eternal, radiant memory'),
('social_instagram', 'https://instagram.com/'),
('social_xiaohongshu', 'https://xiaohongshu.com/'),
('social_wechat', 'RoséBloomEvents'),
('social_pinterest', 'https://pinterest.com/'),
('r2_public_domain', 'https://pub-r2.eukaevents.com');
