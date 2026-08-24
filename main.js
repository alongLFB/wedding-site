/* ================================================================
   ROSÉ & BLOOM EVENTS — Main Application & Interactive Modules
   - Portfolio (3x2 Square Grid & Pixieset Smart Auto-Layout Case Gallery)
   - Destinations (Interactive Sized Pin SVG Map & One&Only Style Venue Cards)
   - Lightbox & Multilingual Sync Engine
   ================================================================ */

/* ----------------------------------------------------------------
   1. Rich Curated Data: Portfolio Cases & Destinations
   ---------------------------------------------------------------- */

const PORTFOLIO_DATA = [
  {
    id: "monochrome-elegance-amalfi",
    slug: "monochrome-elegance-amalfi",
    category: "italy",
    couple: "Emily & James",
    title: {
      zh: "阿马尔菲修道院黑白极简奢华婚礼",
      en: "Monochrome Elegance at an Amalfi Convento"
    },
    location: {
      zh: "阿马尔菲海岸 · 意大利",
      en: "Amalfi Coast, Italy"
    },
    venue: {
      zh: "Anantara Convento di Amalfi Grand Hotel",
      en: "Anantara Convento di Amalfi Grand Hotel"
    },
    date: "2024.06.18",
    season: {
      zh: "初夏 / 2024",
      en: "Early Summer / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "坐落于阿马尔菲悬崖峭壁之上的13世纪修道院，见证了 Emily 与 James 的深情誓言。设计灵感源自地中海经典的黑白光影美学——纯白玫瑰花瀑、黑色极简丝缎桌艺与古老修道院的回廊石拱交织，既有历史厚重感，又不失现代高定的优雅从容。黄昏时分，海风轻抚，宾客在悬崖露台一边眺望第勒尼安海的夕阳，一边享受米其林私厨定制的晚宴。",
      en: "Perched high above the azure Tyrrhenian Sea within a historic 13th-century cliffside monastery, Emily and James celebrated their vows in breathtaking monochrome sophistication. An intentional palette of crisp ivory floral cascades and tailored black satin accents harmonized effortlessly against historic stone arches. As golden hour settled over Amalfi, guests savored candlelit champagne toasts overlooking the endless ocean horizon."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Matteo Coltro Photography",
      floral: "La Rosa Canina Firenze",
      venue: "Anantara Convento di Amalfi",
      video: "Moon & Sea Cinematography",
      gown: "Monique Lhuillier Couture",
      stationery: "Letter & Ink Calligraphy"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85", caption: "Clifftop Ceremony Overlooking Amalfi Coast" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85", caption: "Bridal Portrait in Monastic Cloister" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85", caption: "Bespoke White Peony & Rose Bouquet" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Stationery Flatlay & Wax Seals" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Custom Black Tie Groom Details" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85", caption: "Artisanal Table Setting with Olive Branch" },
      { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85", caption: "Sunset Kiss on the Panoramic Terrace" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=85", caption: "First Dance Under Mediterranean Twilight" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85", caption: "Candlelit Reception in Ancient Refectory" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85", caption: "Midnight Champagne Sparklers Toast" }
    ]
  },
  {
    id: "villa-balbianello-lake-como",
    slug: "villa-balbianello-lake-como",
    category: "italy",
    couple: "Charlotte & Alexander",
    title: {
      zh: "科莫湖巴尔比亚诺庄园静奢水上盛宴",
      en: "Timeless Grandeur at Villa Balbiano, Lake Como"
    },
    location: {
      zh: "科莫湖 · 意大利",
      en: "Lake Como, Italy"
    },
    venue: {
      zh: "Villa Balbiano & Villa del Balbianello",
      en: "Villa Balbiano & Villa del Balbianello"
    },
    date: "2024.05.22",
    season: {
      zh: "春末 / 2024",
      en: "Late Spring / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "科莫湖被誉为欧洲最梦幻的浪漫避世地。Charlotte 与 Alexander 的婚礼以古典木质 Riva 快艇水上入场拉开序幕。我们在巴尔比亚诺庄园的湖畔草坪打造了由成千上万朵英国古典玫瑰与绣球花搭建的无边花拱，与阿尔卑斯山脉雪顶倒影交相辉映。晚宴长桌点缀着复古水晶吊灯与意大利手工刺绣亚麻布，完美诠释了老钱风静奢美学。",
      en: "Framed by snow-dusted Alpine peaks and mirror-like glacial waters, Charlotte and Alexander's Lake Como wedding unfolded like a cinematic Italian classic. Arriving via vintage Riva wooden boat, the couple exchanged vows beneath an ethereal floral arch of heritage English roses. The lakeside dinner celebrated old-world refinement with crystal chandeliers and hand-embroidered Italian linens."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Gianluca Adovasio",
      floral: "Tulipinadesign Como",
      venue: "Villa Balbiano",
      video: "Alberto D'Aria Films",
      gown: "Oscar de la Renta",
      stationery: "Signora e Mare"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1400&q=85", caption: "Lake Como Ceremony Overlooking the Alps" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85", caption: "Classic Riva Boat Arrival on the Water" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Intricate Diamond Rings and Velvet Box" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85", caption: "Romantic Stroll Through Cypress Gardens" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Handwritten Calligraphy Place Cards" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85", caption: "Lush Table Centerpieces in Soft Blush" },
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85", caption: "Grand Dinner Reception Under Starlight" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=85", caption: "Couple Silhouette with Lake Breeze" },
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85", caption: "Three-Tiered Textured Botanical Cake" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=85", caption: "Fireworks Display Over Lake Como" }
    ]
  },
  {
    id: "renaissance-chateau-paris",
    slug: "renaissance-chateau-paris",
    category: "france",
    couple: "Sophie & Arthur",
    title: {
      zh: "巴黎维莱特古堡法式宫廷梦幻婚礼",
      en: "Gilded Romance at Château de Villette, Paris"
    },
    location: {
      zh: "巴黎 · 法国",
      en: "Paris / Île-de-France, France"
    },
    venue: {
      zh: "Château de Villette (Little Versailles)",
      en: "Château de Villette (Little Versailles)"
    },
    date: "2024.07.12",
    season: {
      zh: "盛夏 / 2024",
      en: "Mid Summer / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "有‘小凡尔赛’之称的维莱特古堡，是法式洛可可与古典主义建筑的巅峰之作。Sophie 与 Arthur 的三天目的地婚礼融合了巴黎高级定制时装秀与皇家宫廷晚宴的极致体验。我们运用了香槟金、淡法式蓝与象牙白为基调，在古典喷泉与对称法式花园中打造出宛如电影场景般的浪漫仪式，随后在镀金穹顶宴会厅中开启狂欢舞会。",
      en: "Known affectionately as 'Le Petit Versailles', Château de Villette provided the ultimate stage for Sophie and Arthur's regal 3-day Paris celebration. Blending Parisian haute couture aesthetics with opulent baroque gardens, the weekend featured a sun-drenched ceremony by the historic fountains followed by a black-tie gala dinner illuminated by candlelight beneath grand gilded ceilings."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Greg Finck Photography",
      floral: "Maison Vertumne Paris",
      venue: "Château de Villette",
      video: "Zen Film Works",
      gown: "Elie Saab Haute Couture",
      stationery: "Studio French Blue"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85", caption: "Ceremony in the Symmetrical French Formal Gardens" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85", caption: "Bridal Gown with Cathedral Veil in Château Salon" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Vintage Emerald Cut Diamond & French Lace" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Hand-Painted Château Monogram Suite" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85", caption: "Pastel French Garden Roses & Urn Arrangements" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85", caption: "Gold-Rimmed Limoges Porcelain Tableware" },
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85", caption: "Evening Champagne Tower by the Fountain" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85", caption: "Candlelit Banquet in the Gilded Grand Salon" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=85", caption: "Romantic Walk in the Historic Orangery" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85", caption: "Late Night Vintage Rolls Royce Send-Off" }
    ]
  },
  {
    id: "tuscany-olive-grove-romance",
    slug: "tuscany-olive-grove-romance",
    category: "italy",
    couple: "Elena & Matteo",
    title: {
      zh: "托斯卡纳奥尔恰谷橄榄庄园落日婚礼",
      en: "Golden Sunset in the Val d'Orcia, Tuscany"
    },
    location: {
      zh: "托斯卡纳 · 意大利",
      en: "Tuscany / Val d'Orcia, Italy"
    },
    venue: {
      zh: "Borgo Santo Pietro & Villa Medicea",
      en: "Borgo Santo Pietro & Villa Medicea"
    },
    date: "2024.09.08",
    season: {
      zh: "初秋 / 2024",
      en: "Early Autumn / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "奥尔恰山谷金黄色的麦浪与连绵的丝柏树林，是托斯卡纳最迷人的诗篇。Elena 与 Matteo 选择在拥有数百年历史的石头农庄庄园举行婚礼。我们以当地新鲜采摘的橄榄枝叶、无花果、香槟色大丽花与陶土器皿布置，将纯正的意式乡村风情升华为优雅的奢华艺术。夕阳洒在长达30米的一体式长桌上，弦乐四重奏悠扬响起，如同置身文艺复兴油画。",
      en: "Amidst the rolling golden hills and iconic cypress pathways of the UNESCO-listed Val d'Orcia, Elena and Matteo brought their dream Tuscan celebration to life. Infusing organic elements of fresh olive foliage, ripe figs, and terracotta ceramics, we curated an effortlessly elevated celebration of Italian warmth. A single 100-foot banquet table hosted a multi-course harvest feast bathed in golden sunset glow."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Cinzia Bruschini",
      floral: "Fluida Design Tuscany",
      venue: "Borgo Santo Pietro",
      video: "Marco Caputo Films",
      gown: "Zimmermann Bridal",
      stationery: "Shhh My Darling"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85", caption: "Cypress Avenue Golden Hour Walk" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85", caption: "Olive Branch & Autumn Rose Table Garland" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Heirloom Gold Rings with Olive Leaves" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85", caption: "Rustic Stone Courtyard Reception Setup" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Pressed Botanical Menus & Wine Pairings" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Tuscan Linen Suit & Pocket Boutonnière" },
      { src: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1400&q=85", caption: "Vows Overlooking Rolling Tuscan Hills" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85", caption: "Fairy Light Canopy Dinner Under the Stars" },
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85", caption: "Traditional Italian Millefoglie Cake Live Assembly" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=85", caption: "Acoustic Folk Band Dancing into the Night" }
    ]
  },
  {
    id: "cliffside-sunset-santorini",
    slug: "cliffside-sunset-santorini",
    category: "greece",
    couple: "Chloe & David",
    title: {
      zh: "圣托里尼爱琴海悬崖落日纯白婚礼",
      en: "Aegean White & Blue Dreams in Santorini"
    },
    location: {
      zh: "圣托里尼 · 希腊",
      en: "Santorini, Greece"
    },
    venue: {
      zh: "Canaves Oia Suites & Cavo Ventus",
      en: "Canaves Oia Suites & Cavo Ventus"
    },
    date: "2024.08.15",
    season: {
      zh: "盛夏 / 2024",
      en: "Mid Summer / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "在悬崖白屋与深蓝爱琴海之间，Chloe 与 David 举办了一场极致纯粹的私密悬崖婚礼。我们摈弃了繁复的色彩堆叠，选用纯白蝴蝶兰、白玫瑰与磨砂亚克力透明立柱，打造出仿佛悬浮于海平面之上的纯净圣殿。当日落将天空晕染成粉紫色晚霞，无边泳池倒映着烛光，整个伊亚小镇都为这份爱情送上祝福。",
      en: "Suspended between blinding white caldera architecture and deep cobalt seas, Chloe and David celebrated an intimate clifftop union in Oia. Embracing an ethereal all-white design of cascading phalaenopsis orchids and clear acrylic pedestals, the altar appeared to float effortlessly above the Aegean. As dusk turned the sky into a tapestry of lavender and rose gold, candles reflected across the infinity pool."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Elias Kordelakos",
      floral: "Red Floral Santorini",
      venue: "Canaves Oia Epitome",
      video: "Kostas Kastanakis",
      gown: "Berta Bridal",
      stationery: "Paper Ocelot"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85", caption: "Caldera Edge Ceremony with Floating Florals" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85", caption: "Cascading White Orchid Bridal Bouquet" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Rings Set Against Aegean Blue Backdrop" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Minimalist Vellum Paper & Gold Foil Details" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85", caption: "Glass Dinner Table Setup Overlooking Sunset" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Groom in Classic Linen Cream Tuxedo" },
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85", caption: "Sunset Silhouette Against the Famous Windmills" },
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85", caption: "Candlelit Infinity Pool Dinner Party" },
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85", caption: "Modern Geometric Wedding Cake" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85", caption: "Greek Island Starlit Celebration with Saxophonist" }
    ]
  },
  {
    id: "zen-minimalism-kyoto-shrine",
    slug: "zen-minimalism-kyoto-shrine",
    category: "asia",
    couple: "Yuki & Haruto",
    title: {
      zh: "京都上贺茂神社东方禅意极简婚礼",
      en: "Zen Minimalism & Heritage in Kyoto"
    },
    location: {
      zh: "京都 · 日本",
      en: "Kyoto, Japan"
    },
    venue: {
      zh: "Kamigamo Shrine & The Sodoh Higashiyama",
      en: "Kamigamo Shrine & The Sodoh Higashiyama"
    },
    date: "2023.11.10",
    season: {
      zh: "深秋枫红 / 2023",
      en: "Late Autumn / 2023"
    },
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "千年古都京都的深秋，红枫如火，竹林青翠。Yuki 与 Haruto 融合了传统神前式仪式与现代东方侘寂风设计。我们在东山百年历史的传统数寄屋造庭院中，以和纸灯笼、枯山水砂纹、枫叶与本地竹艺为媒介，打造出静谧安宁、诗意流淌的私属婚礼晚宴，让每位宾客在四季流转中体会东方情感的深邃与温润。",
      en: "Amidst Kyoto's fiery autumn foliage and serene bamboo groves, Yuki and Haruto harmonized traditional Shinto ceremony solemnity with modern wabi-sabi aesthetics. Hosted in a heritage Higashiyama garden estate, the evening reception utilized washi lanterns, minimalist floral installations, and seasonal kaiseki cuisine, creating an unforgettable experience steeped in tranquility."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Days Photography Japan",
      floral: "Ikenobo Kyoto Master Studio",
      venue: "The Sodoh Higashiyama Kyoto",
      video: "Tsukasa Film Works",
      gown: "Shiromuku & Vera Wang Bride",
      stationery: "Washi Studio Echizen"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=85", caption: "Kyoto Autumn Garden Ceremony" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85", caption: "Traditional Silk Shiromuku Kimono Detail" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Custom Wooden Box with Sakura Engravings" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Calligraphy Scrolls and Handmade Washi Menus" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85", caption: "Zen Table Arrangement with Japanese Maple" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Groom in Formal Montsuki Hakama" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85", caption: "Twilight Stroll in Historic Gion Alleys" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85", caption: "Lantern-lit Reception in Tatami Hall" },
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85", caption: "Matcha-infused Artisanal Wedding Cake" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=85", caption: "Sake Barrel Breaking Ceremony (Kagami-Biraki)" }
    ]
  },
  {
    id: "napa-valley-vineyard-chic",
    slug: "napa-valley-vineyard-chic",
    category: "americas",
    couple: "Sophie & Liam",
    title: {
      zh: "纳帕溪谷私属酒庄浪漫庄园婚礼",
      en: "Sun-Kissed Vineyard Symphony in Napa Valley"
    },
    location: {
      zh: "加州纳帕溪谷 · 美国",
      en: "Napa Valley, California, USA"
    },
    venue: {
      zh: "Meadowood Napa Valley & Beaulieu Garden",
      en: "Meadowood Napa Valley & Beaulieu Garden"
    },
    date: "2024.06.01",
    season: {
      zh: "初夏 / 2024",
      en: "Early Summer / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "加州纳帕溪谷以其纯净丰沛的阳光与世界顶级酒庄而闻名。Sophie 与 Liam 的婚礼在满园橡木与葡萄藤环绕的法式私家庄园举行。设计采用香槟奶油色、浅桃粉与鼠尾草绿，呼应加州初夏的自然生机。晚宴由米其林三星主厨亲自设计农场到餐桌定制佳肴，搭配酒庄珍藏年份赤霞珠葡萄酒，洋溢着自然惬意与高级摩登的完美平衡。",
      en: "Set against sun-drenched rolling vineyards and ancient heritage oaks, Sophie and Liam celebrated their love in quintessential California wine country elegance. An airy color palette of champagne cream, apricot blush, and sage harmonized with the verdant valley. A farm-to-table culinary journey paired with estate reserve vintages created an unforgettable celebration under the stars."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Jose Villa Photography",
      floral: "Mindy Rice Floral & Event Design",
      venue: "Beaulieu Garden Napa Valley",
      video: "Elysium Productions",
      gown: "Carolina Herrera",
      stationery: "Yonder Design"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85", caption: "Vineyard Arbor Ceremony Beneath Grand Oaks" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85", caption: "Bridal Suite Portrait in Morning Light" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Heirloom Gold Rings with Pressed Vines" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Embossed Leather Wine Menus and Placecards" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85", caption: "Peach & Garden Rose Floral Centerpieces" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Groom Portrait Among Grapevine Rows" },
      { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85", caption: "Golden Hour Stroll in the Vineyards" },
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85", caption: "Vine-Covered Trellis Reception with Chandeliers" },
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85", caption: "Fresh Fig & Caramel Buttercream Wedding Cake" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85", caption: "Live Jazz Trio Dancing Under Olive Trees" }
    ]
  },
  {
    id: "uluwatu-oceanfront-vows",
    slug: "uluwatu-oceanfront-vows",
    category: "asia",
    couple: "Maya & Noah",
    title: {
      zh: "巴厘岛乌鲁瓦图悬崖海景谧境婚礼",
      en: "Dramatic Clifftop Ocean Vows in Uluwatu, Bali"
    },
    location: {
      zh: "巴厘岛 · 印度尼西亚",
      en: "Bali, Indonesia"
    },
    venue: {
      zh: "Bulgari Resort Bali & Alila Villas Uluwatu",
      en: "Bulgari Resort Bali & Alila Villas Uluwatu"
    },
    date: "2024.04.18",
    season: {
      zh: "春季 / 2024",
      en: "Spring / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "坐落于印度洋百米悬崖之巅，Maya 与 Noah 迎来了一场热带奢华与前卫建筑美学交融的梦幻婚礼。仪式台搭建于悬挑在印度洋波涛之上的水上浮台，伴随海浪拍岸的交响与热带鸡蛋花香气，两人许下一生的承诺。夜幕降临，悬崖无边泳池点亮数百只漂浮水灯，烟花在夜空中盛开，震撼人心。",
      en: "Perched 150 meters above the roaring Indian Ocean on the dramatic limestone cliffs of Uluwatu, Maya and Noah celebrated their love in tropical architectural splendor. A transparent water aisle extended seamlessly into the horizon, surrounded by tropical frangipanis and ivory orchids. The celebration culminated in a cliffside floating lantern dinner and a custom midnight firework spectacle."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Terralogical Photography",
      floral: "Flora Botanica Bali",
      venue: "Alila Villas Uluwatu",
      video: "Paper Cranes Bali",
      gown: "Galia Lahav",
      stationery: "Paperlust Australia"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85", caption: "Floating Water Stage Over Indian Ocean" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85", caption: "Tropical Bridal Elegance in Sunset Breeze" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Custom Gold Bands in Shell Ring Dish" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Linen Welcome Booklets with Bamboo Accents" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85", caption: "Tropical White Orchid & Palm Installations" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Groom Portrait on Sunset Cliffside Walkway" },
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85", caption: "Dramatic Sunset Vows as Ocean Waves Crash" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85", caption: "Floating Lantern Poolside Gala Dinner" },
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85", caption: "Modern Coconut & Passionfruit Wedding Cake" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=85", caption: "Grand Fireworks Finale Over the Indian Ocean" }
    ]
  },
  {
    id: "maui-clifftop-elopement",
    slug: "maui-clifftop-elopement",
    category: "americas",
    couple: "Harper & Liam",
    title: {
      zh: "夏威夷茂宜岛悬崖落日私密誓言",
      en: "Barefoot Luxury & Sunset Horizon in Maui"
    },
    location: {
      zh: "夏威夷茂宜岛 · 美国",
      en: "Maui, Hawaii, USA"
    },
    venue: {
      zh: "Montage Kapalua Bay & Haiku Mill",
      en: "Montage Kapalua Bay & Haiku Mill"
    },
    date: "2024.03.20",
    season: {
      zh: "春季 / 2024",
      en: "Spring / 2024"
    },
    coverImage: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=85",
    story: {
      zh: "茂宜岛的卡帕鲁亚海湾，拥有太平洋最澄澈的海水与壮丽的海崖火山岩石。Harper 与 Liam 在太平洋的金色余晖中，举行了仅属于两人的私密 Elopement 婚礼。我们在悬崖岬角布置了天然海岛棕榈与热带白兰花拱门，伴随着尤克里里的悠扬琴声，两人在海风与浪花中完成了神圣誓约。",
      en: "On the dramatic cliffs of Kapalua Bay, Harper and Liam celebrated an intimate barefoot luxury elopement bathed in golden Pacific sunlight. Against panoramic volcanic shores and swaying palms, a minimalist tropical floral circle framed their private vow exchange. An intimate sunset dinner on the sands concluded an unforgettable day of pure romance."
    },
    credits: {
      planner: "Rosé & Bloom Events",
      photo: "Dmitri and Sandra Photography",
      floral: "Bella Bloom Maui",
      venue: "Montage Kapalua Bay",
      video: "Sunlit Films Hawaii",
      gown: "Rue De Seine",
      stationery: "Aloha Calligraphy"
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1400&q=85", caption: "Clifftop Arch Overlooking Kapalua Bay" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85", caption: "Bridal Portrait with Tropical Orchid Lei" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85", caption: "Handmade Rings in Koa Wood Box" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85", caption: "Hand-Torn Cotton Paper Vow Books" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85", caption: "Tropical Foliage & Native White Blooms" },
      { src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85", caption: "Casual Linen Groom Suit by the Ocean" },
      { src: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1400&q=85", caption: "Barefoot Sunset Vows on Ocean Shore" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85", caption: "Private Beachside Candlelit Dinner for Two" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85", caption: "Artisanal Single Tier Passionfruit Cake" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85", caption: "Champagne Toast Under Pacific Stars" }
    ]
  }
];

const DESTINATIONS_DATA = [
  {
    id: "amalfi-coast",
    region: "italy",
    name: {
      zh: "阿马尔菲海岸 & 卡普里岛",
      en: "Amalfi Coast & Capri"
    },
    country: {
      zh: "意大利",
      en: "Italy"
    },
    venueCount: 14,
    badge: {
      zh: "悬崖古堡 & 柠檬庄园",
      en: "Clifftop Monasteries & Lemon Estates"
    },
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "悬崖峭壁上的柠檬香气与地中海蔚蓝",
      en: "Lemon-Scented Cliffs & Azure Mediterranean Luxury"
    },
    capacity: {
      zh: "20 — 180 位宾客",
      en: "20 — 180 Guests"
    },
    bestSeason: {
      zh: "5月 — 10月 (早秋与初夏最佳)",
      en: "May — October (Early Autumn & Late Spring Ideal)"
    },
    setting: {
      zh: "悬崖海景 · 历史修道院 · 私属游艇",
      en: "Clifftop Panorama · Heritage Convent · Private Yachts"
    },
    description: {
      zh: "阿马尔菲海岸被誉为世界上最浪漫的海岸线。悬崖上的古老修道院酒店、悬浮于海面的全景露台以及卡普里岛的隐秘庄园，为追求纯正意大利甜蜜生活（La Dolce Vita）的新人提供了无与伦比的婚礼圣地。",
      en: "The Amalfi Coast stands as the epitome of timeless Italian romance. Clifftop former monasteries, panoramic terraces hovering over turquoise waters, and secluded Capri villas offer the quintessential luxury celebration steeped in Mediterranean glamour."
    },
    mapCoord: { x: 52.8, y: 39.5, pinSize: "lg" },
    topVenues: [
      { name: "Anantara Convento di Amalfi", type: "13th Century Convent", highlight: "Panoramic clifftop cloister & terrace" },
      { name: "Villa Cimbrone (Ravello)", type: "Historic Botanical Villa", highlight: "World-famous 'Infinity Terrace' vows" },
      { name: "Belmond Hotel Caruso", type: "Palatial Heritage Hotel", highlight: "Infinity pool suspended 1,000 ft high" }
    ],
    guide: {
      weather: "地中海气候，夏季阳光明媚海风宜人，9-10月气温最为温和舒适。",
      logistics: "最近机场为那不勒斯国际机场 (NAP)，距离约 1.5 小时车程；亦可安排专属直升机或快艇接送。",
      legal: "支持天主教正式婚礼及全球合法民事仪式（需提前 3-6 个月完成领事认证流程）。"
    }
  },
  {
    id: "lake-como",
    region: "italy",
    name: {
      zh: "科莫湖 & 贝拉焦",
      en: "Lake Como & Bellagio"
    },
    country: {
      zh: "意大利",
      en: "Italy"
    },
    venueCount: 12,
    badge: {
      zh: "贵族临湖庄园 & 古典快艇",
      en: "Historic Aristocratic Lakeside Villas"
    },
    coverImage: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "阿尔卑斯山倒影下的老钱风静奢典范",
      en: "Old-World Grandeur Reflected in Alpine Waters"
    },
    capacity: {
      zh: "30 — 250 位宾客",
      en: "30 — 250 Guests"
    },
    bestSeason: {
      zh: "4月 — 10月 (5月盛花期与9月金秋最佳)",
      en: "April — October (Peak Bloom May & Golden September)"
    },
    setting: {
      zh: "湖畔草坪 · 文艺复兴雕塑 · Riva快艇入场",
      en: "Lakeside Lawns · Renaissance Statues · Riva Boat Entry"
    },
    description: {
      zh: "几个世纪以来，科莫湖一直是欧洲贵族与世界名流钟爱的避世乐园。私属湖畔庄园被群山环抱，乘坐古典 Riva 游艇穿梭于各个奢华别墅之间，享受由私人管家打造的顶级全流程盛会。",
      en: "For centuries, Lake Como has captured the hearts of European royalty and discerning tastemakers. Majestic neoclassical villas, lakeside gardens, and private Riva water shuttles create an unmatched atmosphere of regal elegance."
    },
    mapCoord: { x: 50.5, y: 35.8, pinSize: "lg" },
    topVenues: [
      { name: "Villa Balbiano", type: "16th-Century Palazzo", highlight: "Iconic lakeside facade and palatial interiors" },
      { name: "Villa del Balbianello", type: "National Trust Heritage", highlight: "Famous arched loggia & cinematic gardens" },
      { name: "Villa d'Este (Cernobbio)", type: "Legendary 5-Star Resort", highlight: "Mosaic garden & floating pool on the lake" }
    ],
    guide: {
      weather: "湖区微气候温和湿润，春季杜鹃花开，夏夜凉爽舒适，秋季色彩丰富。",
      logistics: "距离米兰马尔彭萨机场 (MXP) 仅 45 分钟车程，交通极为便捷。",
      legal: "意大利具备完善的涉外婚姻法律体系，我们团队全程协助文件公证与市政厅申报。"
    }
  },
  {
    id: "tuscany",
    region: "italy",
    name: {
      zh: "托斯卡纳 & 佛罗伦萨",
      en: "Tuscany & Florence"
    },
    country: {
      zh: "意大利",
      en: "Italy"
    },
    venueCount: 18,
    badge: {
      zh: "文艺复兴庄园 & 麦浪丝柏",
      en: "Renaissance Castles & Cypress Groves"
    },
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "托斯卡纳艳阳下的丰收盛宴与艺术之魂",
      en: "Sun-Drenched Hills, Olive Groves & Harvest Feasts"
    },
    capacity: {
      zh: "40 — 300 位宾客",
      en: "40 — 300 Guests"
    },
    bestSeason: {
      zh: "5月 — 10月 (9-10月葡萄采摘季极佳)",
      en: "May — October (Harvest Season September is Magical)"
    },
    setting: {
      zh: "奥尔恰谷麦浪 · 古典中世纪城堡 · 私人酒庄",
      en: "Val d'Orcia Rolling Hills · Medieval Castles · Private Vineyards"
    },
    description: {
      zh: "托斯卡纳是浪漫主义的故乡。从佛罗伦萨的文艺复兴宫殿，到锡耶纳乡村被丝柏树守护的私家古堡，长达三天的婚礼周末可融合意式披萨欢迎派对、庄园婚礼主仪式与葡萄园早午餐。",
      en: "Tuscany is a sensory masterpiece of rolling hills, ancient vineyards, and olive groves. Perfect for a multi-day wedding celebration featuring rustic wood-fired pizza welcome dinners, black-tie courtyard galas, and poolside vineyard brunches."
    },
    mapCoord: { x: 51.5, y: 37.8, pinSize: "lg" },
    topVenues: [
      { name: "Borgo Santo Pietro", type: "5-Star Luxury Relais", highlight: "Michelin-starred estate in 300 acres of nature" },
      { name: "Castello di Vicarello", type: "12th-Century Castle", highlight: "Total exclusivity overlooking Tuscan valleys" },
      { name: "Villa Medicea di Lilliano", type: "Medici Heritage Villa", highlight: "15 minutes from Florence with panoramic terrace" }
    ],
    guide: {
      weather: "夏季阳光充沛，傍晚微风徐徐；初秋气候宜人，日落光线为摄影黄金时刻。",
      logistics: "可直飞佛罗伦萨 (FLR) 或比萨 (PSA)，各主要庄园均配备大型私人贵宾车队接送服务。",
      legal: "支持天主教教堂婚礼、象征性仪式与合法民事结婚登记。"
    }
  },
  {
    id: "paris-chateaux",
    region: "france",
    name: {
      zh: "巴黎与卢瓦尔河谷古堡",
      en: "Paris & Loire Valley Châteaux"
    },
    country: {
      zh: "法国",
      en: "France"
    },
    venueCount: 16,
    badge: {
      zh: "皇家巴洛克宫殿 & 高定时装之都",
      en: "Royal Baroque Châteaux & Haute Couture"
    },
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "法式宫廷奢华与现代高定的永恒浪漫",
      en: "Gilded French Splendor & Timeless Couture Glamour"
    },
    capacity: {
      zh: "50 — 400 位宾客",
      en: "50 — 400 Guests"
    },
    bestSeason: {
      zh: "5月 — 10月 (6月与9月气候最佳)",
      en: "May — October (June & September Ideal)"
    },
    setting: {
      zh: "对称法式皇家花园 · 镀金宴会厅 · 私人橘园",
      en: "Formal French Gardens · Gilded Ballrooms · Private Orangeries"
    },
    description: {
      zh: "在世界时尚与艺术之都巴黎，或者卢瓦尔河谷的皇家古堡中举办婚礼，是无数新人一生的梦想。我们携手巴黎顶级花艺大师与高级时装工坊，为您复刻凡尔赛宫殿般的奢华宴会。",
      en: "A wedding in Paris or the regal Loire Valley represents the pinnacle of global sophistication. We partner with elite Parisian florists and Michelin chefs to orchestrate celebrations worthy of modern royalty."
    },
    mapCoord: { x: 48.5, y: 34.0, pinSize: "lg" },
    topVenues: [
      { name: "Château de Villette", type: "Baroque Masterpiece", highlight: "Fountains designed by Le Nôtre & gilded interiors" },
      { name: "Château de Chantilly", type: "Historic Royal Estate", highlight: "Grand horse stables & historic gallery halls" },
      { name: "Ritz Paris (Place Vendôme)", type: "Palatial Landmark Hotel", highlight: "Secret garden salon & legendary Parisian service" }
    ],
    guide: {
      weather: "温带海洋性气候，春夏季日照时间长（晚上10点才日落），非常适合举办漫长的露天晚宴。",
      logistics: "直飞巴黎戴高乐国际机场 (CDG)，古堡距巴黎市区通常在 40-90 分钟车程以内。",
      legal: "涉外新人通常在法国举行奢华象征性仪式及庆祝晚宴，国内完成注册。"
    }
  },
  {
    id: "santorini",
    region: "mediterranean",
    name: {
      zh: "圣托里尼 & 米克诺斯",
      en: "Santorini & Mykonos"
    },
    country: {
      zh: "希腊",
      en: "Greece"
    },
    venueCount: 10,
    badge: {
      zh: "爱琴海悬崖露台 & 白屋蓝顶",
      en: "Aegean Clifftops & Whitewashed Sancturaries"
    },
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "悬浮于爱琴海之上的神话日落与纯白誓约",
      en: "Mythological Sunsets Above the Aegean Blue Horizon"
    },
    capacity: {
      zh: "15 — 120 位宾客",
      en: "15 — 120 Guests"
    },
    bestSeason: {
      zh: "5月 — 10月 (6月与9月风力较小温度最佳)",
      en: "May — October (June & September Optimal)"
    },
    setting: {
      zh: "火山口绝壁 · 无边泳池浮台 · 私人奢华游艇",
      en: "Caldera Edge · Floating Pool Platforms · Luxury Catamarans"
    },
    description: {
      zh: "圣托里尼被公认为世界上拥有最美日落的岛屿。在直面火山口的白色露台上，爱琴海的湛蓝与纯白的建筑构成天然而震撼的婚礼背景，特别适合精致小型婚礼与浪漫蜜月连办。",
      en: "Santorini offers an intoxicating combination of sheer volcanic cliffs, sparkling azure waters, and breathtaking sunset panoramas. Ideal for intimate celebrations, luxury elopements, and multi-day island hopping."
    },
    mapCoord: { x: 55.5, y: 41.5, pinSize: "md" },
    topVenues: [
      { name: "Canaves Oia Epitome", type: "5-Star Luxury Resort", highlight: "Sunset views from private clifftop terrace" },
      { name: "Cavo Ventus Villa", type: "Historic Clifftop Windmill", highlight: "Exclusive cliffside pool terrace for events" },
      { name: "Kivotos Santorini", type: "Modern Luxury Sanctuary", highlight: "Dramatic black-and-white volcanic architecture" }
    ],
    guide: {
      weather: "典型地中海岛屿气候，夏日阳光充足，微风清凉；建议避开 7-8 月最热旅游高峰。",
      logistics: "从雅典转机 40 分钟或乘坐高速渡轮直达圣托里尼国家机场 (JTR)。",
      legal: "希腊支持外国公民办理合法民事结婚手续（需提供单身证明及出生公证）。"
    }
  },
  {
    id: "kyoto-tokyo",
    region: "asia",
    name: {
      zh: "京都与东京",
      en: "Kyoto & Tokyo"
    },
    country: {
      zh: "日本",
      en: "Japan"
    },
    venueCount: 11,
    badge: {
      zh: "千年古都庭院 & 东方极简禅境",
      en: "Centuries-Old Gardens & Oriental Zen"
    },
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "千年四季流转间的东方诗意与现代美学",
      en: "Timeless Oriental Poetry in Four Distinct Seasons"
    },
    capacity: {
      zh: "20 — 150 位宾客",
      en: "20 — 150 Guests"
    },
    bestSeason: {
      zh: "3月 — 5月 (春樱季) & 10月 — 12月 (秋枫季)",
      en: "Spring Sakura (Mar-May) & Autumn Foliage (Oct-Dec)"
    },
    setting: {
      zh: "传统数寄屋庭院 · 世界遗产神社 · 现代高空宴会厅",
      en: "Historic Tea Gardens · World Heritage Shrines · Luxury High-Rise"
    },
    description: {
      zh: "京都的古朴静谧与东京的摩登奢华相得益彰。无论是身着传统白无垢在世界遗产神社举行庄严的神前式，还是在百年名园中举办融合现代花艺的怀石盛宴，都能带来独一无二的文化体验。",
      en: "Kyoto offers poetic tranquility in ancient temple gardens, while Tokyo presents cutting-edge urban luxury. We craft immersive celebrations marrying authentic Japanese craftsmanship with modern editorial flair."
    },
    mapCoord: { x: 82.5, y: 38.0, pinSize: "md" },
    topVenues: [
      { name: "The Sodoh Higashiyama Kyoto", type: "Historic Painter Estate", highlight: "1,700-tsubo Japanese garden overlooking Pagoda" },
      { name: "Aman Kyoto", type: "Hidden Forest Sanctuary", highlight: "Secret moss garden pavilions in northern Kyoto" },
      { name: "Palace Hotel Tokyo", type: "Imperial Palace View", highlight: "Iconic Wadakura moat view banquet salons" }
    ],
    guide: {
      weather: "春秋两季气候最为舒适宜人，春季樱花盛放，秋季红枫如火，需提前 1 年预订热门档期。",
      logistics: "直飞大阪关西机场 (KIX) 或东京羽田/成田机场 (HND/NRT)，新干线交通极其顺畅。",
      legal: "多采用神前式神道仪式或西方基督教式仪式结合，法律手续可由我们全程指导。"
    }
  },
  {
    id: "bali-uluwatu",
    region: "asia",
    name: {
      zh: "巴厘岛 · 乌鲁瓦图",
      en: "Bali & Uluwatu"
    },
    country: {
      zh: "印度尼西亚",
      en: "Indonesia"
    },
    venueCount: 15,
    badge: {
      zh: "印度洋悬崖水台 & 热带雨林度假",
      en: "Clifftop Ocean Water Stages & Tropical Rainforest"
    },
    coverImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "神之海岛上的悬崖波涛与热带奢华",
      en: "Island of the Gods: Ocean Waves & Tropical Opulence"
    },
    capacity: {
      zh: "30 — 350 位宾客",
      en: "30 — 350 Guests"
    },
    bestSeason: {
      zh: "4月 — 10月 (旱季，晴空万里湿度适中)",
      en: "April — October (Dry Season, Sunny & Low Humidity)"
    },
    setting: {
      zh: "百米悬崖水上舞台 · 私人奢华别墅 · 椰林沙滩",
      en: "150m Ocean Clifftop Stages · Ultra-Luxury Private Villas"
    },
    description: {
      zh: "巴厘岛乌鲁瓦图的悬崖被誉为世界上最壮丽的海景仪式胜地。世界顶级度假村与私人悬崖别墅提供全包式包场服务，无边泳池与印度洋融为一体，是举办派对与度假型婚礼的首选。",
      en: "Uluwatu’s dramatic soaring limestone cliffs offer the ultimate oceanfront backdrop. With private estate buyouts, transparent floating water aisles, and world-class resort hospitality, Bali delivers unmatched tropical luxury."
    },
    mapCoord: { x: 78.5, y: 55.0, pinSize: "lg" },
    topVenues: [
      { name: "Alila Villas Uluwatu", type: "Iconic Architectural Resort", highlight: "Cantilevered sunset cliffside cabana" },
      { name: "Bulgari Resort Bali", type: "Ultra-Luxury Oceanfront", highlight: "Water chapel on a private cliff plateau" },
      { name: "The Edge Bali", type: "Exclusive Clifftop Estate", highlight: "Glass-bottom pool suspended over the sea" }
    ],
    guide: {
      weather: "4月至10月为旱季，降雨稀少，海风清爽，是举办户外晚宴的最佳时段。",
      logistics: "直飞巴厘岛登巴萨国际机场 (DPS)，车程至乌鲁瓦图约 45 分钟。",
      legal: "巴厘岛拥有非常成熟的国际婚礼服务生态，支持象征性仪式、基督教仪式及民事公证。"
    }
  },
  {
    id: "napa-california",
    region: "americas",
    name: {
      zh: "纳帕溪谷与加州海岸",
      en: "Napa Valley & California Coast"
    },
    country: {
      zh: "美国",
      en: "USA"
    },
    venueCount: 14,
    badge: {
      zh: "名庄葡萄园 & 太平洋悬崖庄园",
      en: "World-Class Vineyards & Pacific Coastline"
    },
    coverImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    tagline: {
      zh: "加州金色日光下的名酒庄园与海湾奢华",
      en: "Golden State Sun, Reserve Vintages & Coastal Chic"
    },
    capacity: {
      zh: "40 — 280 位宾客",
      en: "40 — 280 Guests"
    },
    bestSeason: {
      zh: "5月 — 10月 (9-10月葡萄采摘季光线绝美)",
      en: "May — October (Harvest Season is Spectacular)"
    },
    setting: {
      zh: "葡萄园藤廊 · 百年古橡树 · 太平洋海景岬角",
      en: "Vineyard Trellises · Heritage Oaks · Pacific Bluffs"
    },
    description: {
      zh: "从纳帕溪谷的顶级葡萄酒庄园，到大苏尔（Big Sur）与卡梅尔的太平洋悬崖，加州将自然辽阔与摩登奢华完美交融。米其林农场餐厅、顶级年份酒藏与加州明媚的金色余晖相得益彰。",
      en: "From world-renowned Napa vineyards to dramatic Pacific cliffs along Big Sur and Carmel, California blends natural grandeur with effortless contemporary luxury and world-class wine country hospitality."
    },
    mapCoord: { x: 20.0, y: 36.5, pinSize: "md" },
    topVenues: [
      { name: "Beaulieu Garden", type: "Historic French Estate", highlight: "Sunken gardens & vine-covered dinner arbor" },
      { name: "Meadowood Napa Valley", type: "Private Luxury Resort", highlight: "Nestled in 250 secluded forested wine country acres" },
      { name: "Stanly Ranch (Auberge)", type: "Modern Luxury Ranch", highlight: "Infinity vineyards with chic contemporary design" }
    ],
    guide: {
      weather: "地中海式干燥少雨气候，昼夜温差适中，盛夏傍晚极为惬意舒适。",
      logistics: "直飞旧金山国际机场 (SFO) 或奥克兰 (OAK)，驾车 1 小时即达纳帕溪谷。",
      legal: "美国加州结婚证书（Marriage License）申请手续简便，全球多国广泛认可。"
    }
  }
];

/* ----------------------------------------------------------------
   2. Portfolio Manager (3x2 Square Grid & Pix Auto-Layout Modal)
   ---------------------------------------------------------------- */

const PortfolioManager = {
  currentCategory: "all",
  currentPage: 1,
  pageSize: 6, // 3 columns x 2 rows = 6 items per page
  filteredData: [],

  init() {
    this.filteredData = [...PORTFOLIO_DATA];
    this.bindEvents();
    this.render();
    this.handleInitialRoute();
  },

  bindEvents() {
    // Category tabs
    document.querySelectorAll(".portfolio-filter__btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const cat = e.currentTarget.getAttribute("data-filter");
        this.setCategory(cat);
      });
    });

    // Handle browser hash navigation (e.g. #gallery/monochrome-elegance-amalfi)
    window.addEventListener("hashchange", () => {
      this.handleRouteHash(window.location.hash);
    });

    // Re-render text on language change
    document.addEventListener("languageChanged", () => {
      this.render();
      const currentModalId = document.getElementById("case-modal")?.getAttribute("data-active-id");
      if (currentModalId) {
        this.renderCaseModal(currentModalId);
      }
    });

    // Close modal triggers
    const modal = document.getElementById("case-modal");
    if (modal) {
      modal.querySelector(".case-modal__close")?.addEventListener("click", () => this.closeCase());
      modal.querySelector(".case-modal__backdrop")?.addEventListener("click", () => this.closeCase());
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          this.closeCase();
        }
      });
    }
  },

  setCategory(cat) {
    this.currentCategory = cat;
    this.currentPage = 1;

    document.querySelectorAll(".portfolio-filter__btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === cat);
    });

    if (cat === "all") {
      this.filteredData = [...PORTFOLIO_DATA];
    } else {
      this.filteredData = PORTFOLIO_DATA.filter(item => item.category === cat);
    }

    this.render();
  },

  setPage(page) {
    const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
    if (page < 1 || page > totalPages) return;
    this.currentPage = page;
    this.render();

    // Smooth scroll to top of portfolio
    const section = document.getElementById("portfolio");
    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  },

  render() {
    this.renderGrid();
    this.renderPagination();
  },

  renderGrid() {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;

    const lang = I18n.currentLang || "zh";
    const start = (this.currentPage - 1) * this.pageSize;
    const items = this.filteredData.slice(start, start + this.pageSize);

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="portfolio__empty">
          <p>${lang === 'zh' ? '暂无匹配案例' : 'No matching stories found'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((item, index) => {
      const title = item.title[lang] || item.title.zh;
      const location = item.location[lang] || item.location.zh;
      const season = item.season[lang] || item.season.zh;
      const viewText = I18n.t("portfolio.card.view", "View Story");

      return `
        <article class="portfolio-card reveal reveal--visible" data-id="${item.id}" style="animation-delay: ${index * 0.08}s">
          <div class="portfolio-card__media">
            <img 
              src="${item.coverImage}" 
              alt="${title}" 
              class="portfolio-card__img" 
              loading="lazy" 
            />
            <div class="portfolio-card__overlay">
              <span class="portfolio-card__tag">${season}</span>
              <div class="portfolio-card__content">
                <span class="portfolio-card__couple">${item.couple}</span>
                <h3 class="portfolio-card__title">${title}</h3>
                <span class="portfolio-card__location">📍 ${location}</span>
                <button class="portfolio-card__btn" type="button">
                  <span>${viewText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Bind click handlers to cards
    grid.querySelectorAll(".portfolio-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        if (id) this.openCase(id);
      });
    });
  },

  renderPagination() {
    const container = document.getElementById("portfolio-pagination");
    if (!container) return;

    const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
    if (totalPages <= 1) {
      container.innerHTML = "";
      return;
    }

    const lang = I18n.currentLang || "zh";
    const prevText = I18n.t("portfolio.pagination.prev", "Prev");
    const nextText = I18n.t("portfolio.pagination.next", "Next");

    let pagesHtml = "";
    for (let i = 1; i <= totalPages; i++) {
      pagesHtml += `
        <button class="pagination__page ${i === this.currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}">
          ${i}
        </button>
      `;
    }

    container.innerHTML = `
      <div class="pagination">
        <button class="pagination__nav pagination__nav--prev" ${this.currentPage === 1 ? 'disabled' : ''}>
          ‹ ${prevText}
        </button>
        <div class="pagination__pages">
          ${pagesHtml}
        </div>
        <button class="pagination__nav pagination__nav--next" ${this.currentPage === totalPages ? 'disabled' : ''}>
          ${nextText} ›
        </button>
      </div>
    `;

    container.querySelector(".pagination__nav--prev")?.addEventListener("click", () => {
      this.setPage(this.currentPage - 1);
    });

    container.querySelector(".pagination__nav--next")?.addEventListener("click", () => {
      this.setPage(this.currentPage + 1);
    });

    container.querySelectorAll(".pagination__page").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const p = parseInt(e.currentTarget.getAttribute("data-page"), 10);
        this.setPage(p);
      });
    });
  },

  openCase(id) {
    const item = PORTFOLIO_DATA.find(x => x.id === id);
    if (!item) return;

    const modal = document.getElementById("case-modal");
    if (!modal) return;

    modal.setAttribute("data-active-id", id);
    this.renderCaseModal(id);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Update history hash without scrolling
    if (window.location.hash !== `#gallery/${item.slug}`) {
      history.pushState(null, "", `#gallery/${item.slug}`);
    }
  },

  closeCase() {
    const modal = document.getElementById("case-modal");
    if (!modal) return;

    modal.classList.remove("active");
    modal.removeAttribute("data-active-id");
    document.body.style.overflow = "";

    // Clear hash if it's gallery
    if (window.location.hash.startsWith("#gallery/")) {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }
  },

  handleInitialRoute() {
    this.handleRouteHash(window.location.hash);
  },

  handleRouteHash(hash) {
    if (hash.startsWith("#gallery/")) {
      const slug = hash.replace("#gallery/", "");
      const item = PORTFOLIO_DATA.find(x => x.slug === slug || x.id === slug);
      if (item) {
        this.openCase(item.id);
      }
    }
  },

  renderCaseModal(id) {
    const modal = document.getElementById("case-modal");
    if (!modal) return;

    const item = PORTFOLIO_DATA.find(x => x.id === id);
    if (!item) return;

    const currentIndex = PORTFOLIO_DATA.findIndex(x => x.id === id);
    const prevItem = PORTFOLIO_DATA[(currentIndex - 1 + PORTFOLIO_DATA.length) % PORTFOLIO_DATA.length];
    const nextItem = PORTFOLIO_DATA[(currentIndex + 1) % PORTFOLIO_DATA.length];

    const lang = I18n.currentLang || "zh";
    const title = item.title[lang] || item.title.zh;
    const location = item.location[lang] || item.location.zh;
    const venue = item.venue[lang] || item.venue.zh;
    const season = item.season[lang] || item.season.zh;
    const story = item.story[lang] || item.story.zh;

    const backText = I18n.t("gallery.back", "← Back to Portfolio");
    const prevText = I18n.t("gallery.prev", "← Previous Story");
    const nextText = I18n.t("gallery.next", "Next Story →");
    const storyTitle = I18n.t("gallery.storyTitle", "The Story & Design Vision");
    const creditsTitle = I18n.t("gallery.creditsTitle", "Creative Partners & Credits");
    const autoNotice = I18n.t("gallery.autoLayoutNotice", "✦ Editorial Smart Gallery · Click any photograph for full-screen viewer");

    // Generate Pix Smart Auto-Layout HTML
    const pixGalleryHtml = this.generatePixSmartLayout(item.gallery);

    const body = modal.querySelector(".case-modal__body");
    if (!body) return;

    body.innerHTML = `
      <!-- Fixed Editorial Hero Template -->
      <div class="case-hero">
        <div class="case-hero__header">
          <div class="case-hero__meta">
            <span class="case-hero__tag">${season}</span>
            <span class="case-hero__dot">·</span>
            <span class="case-hero__location">📍 ${location}</span>
          </div>
          <h1 class="case-hero__title">${title}</h1>
          <p class="case-hero__couple">${item.couple}</p>
        </div>

        <div class="case-hero__image-wrapper">
          <img src="${item.heroImage}" alt="${title}" class="case-hero__image" />
        </div>

        <!-- Editorial Story & Credits Split Grid -->
        <div class="case-overview">
          <div class="case-story">
            <h3 class="case-story__heading">${storyTitle}</h3>
            <p class="case-story__text">${story}</p>
            <div class="case-story__quote">
              <p>“Every detail was curated to mirror the couple's quiet elegance and heartfelt warmth.”</p>
              <span>— Rosé & Bloom Design Team</span>
            </div>
          </div>

          <div class="case-credits">
            <h3 class="case-credits__heading">${creditsTitle}</h3>
            <dl class="case-credits__list">
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.planner", "Planning & Design")}</dt>
                <dd>${item.credits.planner}</dd>
              </div>
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.photo", "Photography")}</dt>
                <dd>${item.credits.photo}</dd>
              </div>
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.floral", "Floral Design")}</dt>
                <dd>${item.credits.floral}</dd>
              </div>
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.venue", "Venue")}</dt>
                <dd>${venue}</dd>
              </div>
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.video", "Cinematography")}</dt>
                <dd>${item.credits.video || "Rosé & Bloom Cinema"}</dd>
              </div>
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.gown", "Bridal Gown")}</dt>
                <dd>${item.credits.gown || "Haute Couture"}</dd>
              </div>
              <div class="case-credits__item">
                <dt>${I18n.t("gallery.credits.stationery", "Stationery")}</dt>
                <dd>${item.credits.stationery || "Bespoke Calligraphy"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Auto Layout Smart Editorial Gallery (Pix Album Mode) -->
      <div class="case-gallery-section">
        <div class="case-gallery-section__divider">
          <span>❖ ❖ ❖</span>
          <p class="case-gallery-section__hint">${autoNotice}</p>
        </div>

        <div class="pix-album-grid">
          ${pixGalleryHtml}
        </div>
      </div>

      <!-- Case Footer Navigation -->
      <div class="case-nav">
        <button class="case-nav__btn case-nav__btn--prev" data-target-id="${prevItem.id}">
          <span class="case-nav__label">${prevText}</span>
          <span class="case-nav__title">${prevItem.couple}</span>
        </button>

        <button class="case-nav__back" type="button">
          ${backText}
        </button>

        <button class="case-nav__btn case-nav__btn--next" data-target-id="${nextItem.id}">
          <span class="case-nav__label">${nextText}</span>
          <span class="case-nav__title">${nextItem.couple}</span>
        </button>
      </div>
    `;

    // Bind navigation buttons in modal
    body.querySelector(".case-nav__back")?.addEventListener("click", () => this.closeCase());

    body.querySelector(".case-nav__btn--prev")?.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("data-target-id");
      if (targetId) this.openCase(targetId);
    });

    body.querySelector(".case-nav__btn--next")?.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("data-target-id");
      if (targetId) this.openCase(targetId);
    });

    // Bind Lightbox clicks on all case images
    const allGalleryImages = item.gallery.map(g => g.src);
    body.querySelectorAll(".pix-photo").forEach((photoEl, idx) => {
      photoEl.addEventListener("click", () => {
        LightboxManager.open(allGalleryImages, idx, item.gallery[idx]?.caption || title);
      });
    });
  },

  /**
   * Pix Smart Editorial Auto-Layout Engine:
   * Automatically groups photos into high-end editorial rhythms without manual labor.
   * Pattern: Single Panoramic -> Diptych -> Triptych -> Asymmetrical Trio -> Diptych -> Full Bleed.
   */
  generatePixSmartLayout(images) {
    if (!images || !images.length) return "";

    let html = "";
    let i = 0;
    const total = images.length;

    while (i < total) {
      const remaining = total - i;

      // Rhythm step 1: Full-width cinematic highlight (1 image)
      if (i === 0 || remaining === 1) {
        html += `
          <div class="pix-row pix-row--full reveal">
            <div class="pix-photo pix-photo--full" data-index="${i}">
              <img src="${images[i].src}" alt="${images[i].caption || ''}" loading="lazy" />
              ${images[i].caption ? `<span class="pix-photo__caption">${images[i].caption}</span>` : ''}
            </div>
          </div>
        `;
        i += 1;
        continue;
      }

      // Rhythm step 2: Diptych (2 images side by side)
      if (remaining === 2 || (i % 5 === 1)) {
        html += `
          <div class="pix-row pix-row--diptych reveal">
            <div class="pix-photo pix-photo--half" data-index="${i}">
              <img src="${images[i].src}" alt="${images[i].caption || ''}" loading="lazy" />
              ${images[i].caption ? `<span class="pix-photo__caption">${images[i].caption}</span>` : ''}
            </div>
            <div class="pix-photo pix-photo--half" data-index="${i + 1}">
              <img src="${images[i + 1].src}" alt="${images[i + 1].caption || ''}" loading="lazy" />
              ${images[i + 1].caption ? `<span class="pix-photo__caption">${images[i + 1].caption}</span>` : ''}
            </div>
          </div>
        `;
        i += 2;
        continue;
      }

      // Rhythm step 3: Triptych (3 images in a row)
      if (remaining >= 3 && (i % 5 === 3)) {
        html += `
          <div class="pix-row pix-row--triptych reveal">
            <div class="pix-photo pix-photo--third" data-index="${i}">
              <img src="${images[i].src}" alt="${images[i].caption || ''}" loading="lazy" />
              ${images[i].caption ? `<span class="pix-photo__caption">${images[i].caption}</span>` : ''}
            </div>
            <div class="pix-photo pix-photo--third" data-index="${i + 1}">
              <img src="${images[i + 1].src}" alt="${images[i + 1].caption || ''}" loading="lazy" />
              ${images[i + 1].caption ? `<span class="pix-photo__caption">${images[i + 1].caption}</span>` : ''}
            </div>
            <div class="pix-photo pix-photo--third" data-index="${i + 2}">
              <img src="${images[i + 2].src}" alt="${images[i + 2].caption || ''}" loading="lazy" />
              ${images[i + 2].caption ? `<span class="pix-photo__caption">${images[i + 2].caption}</span>` : ''}
            </div>
          </div>
        `;
        i += 3;
        continue;
      }

      // Rhythm step 4: Default Diptych / Pair
      html += `
        <div class="pix-row pix-row--diptych reveal">
          <div class="pix-photo pix-photo--half" data-index="${i}">
            <img src="${images[i].src}" alt="${images[i].caption || ''}" loading="lazy" />
            ${images[i].caption ? `<span class="pix-photo__caption">${images[i].caption}</span>` : ''}
          </div>
          ${i + 1 < total ? `
            <div class="pix-photo pix-photo--half" data-index="${i + 1}">
              <img src="${images[i + 1].src}" alt="${images[i + 1].caption || ''}" loading="lazy" />
              ${images[i + 1].caption ? `<span class="pix-photo__caption">${images[i + 1].caption}</span>` : ''}
            </div>
          ` : ''}
        </div>
      `;
      i += 2;
    }

    return html;
  }
};

/* ----------------------------------------------------------------
   3. Destinations Manager (Interactive Sized Pin SVG Map & Venue List)
   ---------------------------------------------------------------- */

const DestinationsManager = {
  currentRegion: "all",
  activeDestinationId: null,

  init() {
    this.bindEvents();
    this.renderMap();
    this.renderList();
  },

  bindEvents() {
    // Region Filter Tabs
    document.querySelectorAll(".dest-filter__btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const region = e.currentTarget.getAttribute("data-region");
        this.setRegion(region);
      });
    });

    // Language Change Sync
    document.addEventListener("languageChanged", () => {
      this.renderMap();
      this.renderList();
      const currentModalId = document.getElementById("destination-modal")?.getAttribute("data-active-id");
      if (currentModalId) {
        this.renderDestinationModal(currentModalId);
      }
    });

    // Destination Modal Close Triggers
    const modal = document.getElementById("destination-modal");
    if (modal) {
      modal.querySelector(".dest-modal__close")?.addEventListener("click", () => this.closeDestinationModal());
      modal.querySelector(".dest-modal__backdrop")?.addEventListener("click", () => this.closeDestinationModal());
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          this.closeDestinationModal();
        }
      });
    }
  },

  setRegion(region) {
    this.currentRegion = region;

    document.querySelectorAll(".dest-filter__btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-region") === region);
    });

    this.renderList();

    // Highlight corresponding map pins
    document.querySelectorAll(".map-pin-group").forEach(pinGroup => {
      const pinRegion = pinGroup.getAttribute("data-region");
      const isMatch = region === "all" || pinRegion === region;
      pinGroup.style.opacity = isMatch ? "1" : "0.35";
    });
  },

  renderMap() {
    const mapContainer = document.getElementById("interactive-map-container");
    if (!mapContainer) return;

    const lang = I18n.currentLang || "zh";

    // Generate Pin elements with Sized Bullets & Pulse Waves
    const pinsHtml = DESTINATIONS_DATA.map(dest => {
      const { x, y, pinSize } = dest.mapCoord;
      const radius = pinSize === "lg" ? 9 : (pinSize === "md" ? 7 : 5.5);
      const name = dest.name[lang] || dest.name.zh;

      return `
        <g class="map-pin-group" data-id="${dest.id}" data-region="${dest.region}" transform="translate(${x * 10}, ${y * 6.5})">
          <!-- Outer Pulsing Glow Rings -->
          <circle class="pin-pulse pin-pulse--slow" r="${radius * 2.8}"></circle>
          <circle class="pin-pulse pin-pulse--fast" r="${radius * 1.8}"></circle>
          <!-- Core Sized Pin Bullet -->
          <circle class="pin-core pin-core--${pinSize}" r="${radius}"></circle>
          <circle class="pin-inner" r="${radius * 0.45}"></circle>
          <!-- Label -->
          <text class="pin-text" x="${radius + 6}" y="4">${name}</text>
        </g>
      `;
    }).join("");

    mapContainer.innerHTML = `
      <div class="interactive-map-wrapper">
        <svg class="world-svg-map" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#c5a880" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="#c5a880" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2a2826"/>
              <stop offset="100%" stop-color="#1e1d1c"/>
            </linearGradient>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="0.75"/>
            </pattern>
          </defs>

          <!-- Map Background Grids & Ambient Glow -->
          <rect width="1000" height="520" fill="#151413"/>
          <rect width="1000" height="520" fill="url(#mapGrid)"/>
          <circle cx="530" cy="240" r="320" fill="url(#mapGlow)"/>

          <!-- Stylized Luxury Vector World Outline -->
          <g class="map-landmass" fill="url(#landGradient)" stroke="#3d3935" stroke-width="0.8">
            <!-- North America -->
            <path d="M 120 70 Q 180 50 260 70 Q 320 90 310 140 Q 270 200 240 240 Q 180 260 140 220 Q 100 160 120 70 Z" />
            <!-- Central & South America -->
            <path d="M 230 250 Q 270 280 290 330 Q 300 410 260 470 Q 230 460 220 380 Q 210 300 230 250 Z" />
            <!-- Europe & Mediterranean -->
            <path d="M 460 80 Q 560 70 580 120 Q 590 170 540 210 Q 480 220 450 170 Q 440 120 460 80 Z" />
            <!-- Africa -->
            <path d="M 470 220 Q 560 210 580 270 Q 570 370 530 440 Q 470 410 450 310 Q 450 250 470 220 Z" />
            <!-- Asia & Japan -->
            <path d="M 590 80 Q 820 60 890 140 Q 880 240 790 280 Q 670 270 600 200 Q 580 140 590 80 Z" />
            <!-- Southeast Asia & Indonesia -->
            <path d="M 740 290 Q 830 290 840 350 Q 780 370 730 330 Z" />
            <!-- Australia & Oceania -->
            <path d="M 780 370 Q 880 360 890 420 Q 850 470 780 450 Q 750 410 780 370 Z" />
          </g>

          <!-- Latitude & Equator Luxury Lines -->
          <line x1="50" y1="260" x2="950" y2="260" stroke="rgba(197, 168, 128, 0.2)" stroke-dasharray="4 6" stroke-width="0.75" />
          <line x1="500" y1="30" x2="500" y2="490" stroke="rgba(197, 168, 128, 0.15)" stroke-dasharray="4 6" stroke-width="0.75" />

          <!-- Interactive Pins Container -->
          <g class="map-pins-layer">
            ${pinsHtml}
          </g>
        </svg>

        <!-- Floating Glassmorphism Tooltip Card -->
        <div class="map-tooltip-card" id="map-tooltip">
          <div class="map-tooltip__img-box">
            <img src="" alt="" class="map-tooltip__img" />
          </div>
          <div class="map-tooltip__body">
            <span class="map-tooltip__tag"></span>
            <h4 class="map-tooltip__title"></h4>
            <p class="map-tooltip__meta"></p>
            <span class="map-tooltip__action">${lang === 'zh' ? '点击定位并探索 →' : 'Click to explore →'}</span>
          </div>
        </div>
      </div>
    `;

    this.bindMapPinEvents();
  },

  bindMapPinEvents() {
    const tooltip = document.getElementById("map-tooltip");
    const pins = document.querySelectorAll(".map-pin-group");
    const lang = I18n.currentLang || "zh";

    pins.forEach(pin => {
      const id = pin.getAttribute("data-id");
      const dest = DESTINATIONS_DATA.find(x => x.id === id);
      if (!dest) return;

      // Mouse Enter -> Show Rich Tooltip
      pin.addEventListener("mouseenter", (e) => {
        if (!tooltip) return;

        const name = dest.name[lang] || dest.name.zh;
        const badge = dest.badge[lang] || dest.badge.zh;
        const season = dest.bestSeason[lang] || dest.bestSeason.zh;

        tooltip.querySelector(".map-tooltip__img").src = dest.coverImage;
        tooltip.querySelector(".map-tooltip__tag").textContent = badge;
        tooltip.querySelector(".map-tooltip__title").textContent = name;
        tooltip.querySelector(".map-tooltip__meta").textContent = `✨ ${dest.venueCount} ${I18n.t("destinations.card.venues", "Venues")} · ☀️ ${season}`;

        tooltip.classList.add("active");
        this.positionTooltip(e, tooltip);
      });

      pin.addEventListener("mousemove", (e) => {
        if (tooltip && tooltip.classList.contains("active")) {
          this.positionTooltip(e, tooltip);
        }
      });

      pin.addEventListener("mouseleave", () => {
        if (tooltip) tooltip.classList.remove("active");
      });

      // Click Pin -> Highlight & Scroll to Destination Card
      pin.addEventListener("click", () => {
        this.highlightDestination(dest.id);
      });
    });
  },

  positionTooltip(e, tooltip) {
    const wrapper = document.querySelector(".interactive-map-wrapper");
    if (!wrapper || !tooltip) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left + 15;
    const y = e.clientY - rect.top - 100;

    tooltip.style.left = `${Math.min(Math.max(x, 10), rect.width - 280)}px`;
    tooltip.style.top = `${Math.max(y, 10)}px`;
  },

  highlightDestination(id) {
    const dest = DESTINATIONS_DATA.find(x => x.id === id);
    if (!dest) return;

    // Filter list to that destination's region
    this.setRegion(dest.region);

    // Scroll to destinations list smoothly
    const listSection = document.getElementById("destinations-list");
    if (listSection) {
      const top = listSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }

    // Flash the target card
    setTimeout(() => {
      const card = document.querySelector(`.dest-card[data-id="${id}"]`);
      if (card) {
        card.classList.add("dest-card--highlighted");
        setTimeout(() => card.classList.remove("dest-card--highlighted"), 2000);
      }
    }, 400);
  },

  renderList() {
    const container = document.getElementById("destinations-grid");
    if (!container) return;

    const lang = I18n.currentLang || "zh";
    const filtered = this.currentRegion === "all"
      ? DESTINATIONS_DATA
      : DESTINATIONS_DATA.filter(x => x.region === this.currentRegion);

    const btnText = I18n.t("destinations.card.btn", "Explore Destination Guide");
    const capLabel = I18n.t("destinations.card.capacity", "Capacity");
    const seasonLabel = I18n.t("destinations.card.season", "Best Season");
    const venueWord = I18n.t("destinations.card.venues", "Curated Venues");

    container.innerHTML = filtered.map((dest, index) => {
      const name = dest.name[lang] || dest.name.zh;
      const country = dest.country[lang] || dest.country.zh;
      const badge = dest.badge[lang] || dest.badge.zh;
      const tagline = dest.tagline[lang] || dest.tagline.zh;
      const capacity = dest.capacity[lang] || dest.capacity.zh;
      const bestSeason = dest.bestSeason[lang] || dest.bestSeason.zh;
      const desc = dest.description[lang] || dest.description.zh;

      return `
        <div class="dest-card reveal reveal--visible" data-id="${dest.id}" style="animation-delay: ${index * 0.08}s">
          <div class="dest-card__media">
            <img src="${dest.coverImage}" alt="${name}" class="dest-card__img" loading="lazy" />
            <span class="dest-card__badge">${badge}</span>
            <span class="dest-card__count">✦ ${dest.venueCount} ${venueWord}</span>
          </div>

          <div class="dest-card__body">
            <div class="dest-card__header">
              <span class="dest-card__country">📍 ${country}</span>
              <h3 class="dest-card__name">${name}</h3>
              <p class="dest-card__tagline">“${tagline}”</p>
            </div>

            <p class="dest-card__desc">${desc}</p>

            <div class="dest-card__specs">
              <div class="dest-spec">
                <span class="dest-spec__label">${capLabel}</span>
                <span class="dest-spec__value">${capacity}</span>
              </div>
              <div class="dest-spec">
                <span class="dest-spec__label">${seasonLabel}</span>
                <span class="dest-spec__value">${bestSeason}</span>
              </div>
            </div>

            <button class="dest-card__action-btn" data-id="${dest.id}">
              <span>${btnText}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Bind explore modal triggers
    container.querySelectorAll(".dest-card__action-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) this.openDestinationModal(id);
      });
    });
  },

  openDestinationModal(id) {
    const dest = DESTINATIONS_DATA.find(x => x.id === id);
    if (!dest) return;

    const modal = document.getElementById("destination-modal");
    if (!modal) return;

    modal.setAttribute("data-active-id", id);
    this.renderDestinationModal(id);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeDestinationModal() {
    const modal = document.getElementById("destination-modal");
    if (!modal) return;

    modal.classList.remove("active");
    modal.removeAttribute("data-active-id");
    document.body.style.overflow = "";
  },

  renderDestinationModal(id) {
    const modal = document.getElementById("destination-modal");
    if (!modal) return;

    const dest = DESTINATIONS_DATA.find(x => x.id === id);
    if (!dest) return;

    const lang = I18n.currentLang || "zh";
    const name = dest.name[lang] || dest.name.zh;
    const country = dest.country[lang] || dest.country.zh;
    const tagline = dest.tagline[lang] || dest.tagline.zh;
    const desc = dest.description[lang] || dest.description.zh;

    const topVenuesTitle = I18n.t("destinations.modal.topVenues", "Featured Venues");
    const guideTitle = I18n.t("destinations.modal.guide", "Planning & Destination Guide");
    const weatherTitle = I18n.t("destinations.modal.weather", "Climate & Season");
    const logisticsTitle = I18n.t("destinations.modal.logistics", "Travel & Logistics");
    const legalTitle = I18n.t("destinations.modal.legal", "Ceremony & Legal");
    const inquireText = I18n.t("destinations.modal.inquire", "Inquire About This Destination");

    const venuesListHtml = dest.topVenues.map(v => `
      <div class="dest-venue-item">
        <div class="dest-venue-item__header">
          <h4 class="dest-venue-item__name">${v.name}</h4>
          <span class="dest-venue-item__type">${v.type}</span>
        </div>
        <p class="dest-venue-item__highlight">✨ ${v.highlight}</p>
      </div>
    `).join("");

    const body = modal.querySelector(".dest-modal__body");
    if (!body) return;

    body.innerHTML = `
      <div class="dest-modal-hero">
        <img src="${dest.heroImage}" alt="${name}" class="dest-modal-hero__img" />
        <div class="dest-modal-hero__overlay">
          <span class="dest-modal-hero__tag">📍 ${country}</span>
          <h2 class="dest-modal-hero__title">${name}</h2>
          <p class="dest-modal-hero__tagline">“${tagline}”</p>
        </div>
      </div>

      <div class="dest-modal-content">
        <div class="dest-modal-main">
          <section class="dest-modal-section">
            <h3 class="dest-modal-section__title">${topVenuesTitle}</h3>
            <div class="dest-venues-grid">
              ${venuesListHtml}
            </div>
          </section>

          <section class="dest-modal-section">
            <h3 class="dest-modal-section__title">${guideTitle}</h3>
            <div class="dest-guide-grid">
              <div class="dest-guide-card">
                <span class="dest-guide-card__icon">☀️</span>
                <h4>${weatherTitle}</h4>
                <p>${dest.guide.weather}</p>
              </div>
              <div class="dest-guide-card">
                <span class="dest-guide-card__icon">✈️</span>
                <h4>${logisticsTitle}</h4>
                <p>${dest.guide.logistics}</p>
              </div>
              <div class="dest-guide-card">
                <span class="dest-guide-card__icon">💍</span>
                <h4>${legalTitle}</h4>
                <p>${dest.guide.legal}</p>
              </div>
            </div>
          </section>
        </div>

        <div class="dest-modal-sidebar">
          <div class="dest-sidebar-card">
            <h4>${name}</h4>
            <p>${desc}</p>
            <div class="dest-sidebar-specs">
              <div>
                <span>${I18n.t("destinations.card.capacity", "Capacity")}:</span>
                <strong>${dest.capacity[lang] || dest.capacity.zh}</strong>
              </div>
              <div>
                <span>${I18n.t("destinations.card.season", "Best Season")}:</span>
                <strong>${dest.bestSeason[lang] || dest.bestSeason.zh}</strong>
              </div>
            </div>
            <a href="#contact" class="btn btn--primary btn--full dest-inquire-btn" onclick="DestinationsManager.closeDestinationModal()">
              ${inquireText}
            </a>
          </div>
        </div>
      </div>
    `;
  }
};

/* ----------------------------------------------------------------
   4. Lightbox Manager (Fullscreen Image Viewer)
   ---------------------------------------------------------------- */

const LightboxManager = {
  images: [],
  currentIndex: 0,
  lightboxEl: null,

  init() {
    this.lightboxEl = document.getElementById("lightbox");
    if (!this.lightboxEl) return;

    this.lightboxEl.querySelector(".lightbox__close")?.addEventListener("click", () => this.close());
    this.lightboxEl.querySelector(".lightbox__nav--prev")?.addEventListener("click", () => this.prev());
    this.lightboxEl.querySelector(".lightbox__nav--next")?.addEventListener("click", () => this.next());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.lightboxEl.classList.contains("active")) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
  },

  open(imagesList, startIndex = 0, caption = "") {
    if (!this.lightboxEl || !imagesList.length) return;
    this.images = imagesList;
    this.currentIndex = startIndex;
    this.update();
    this.lightboxEl.classList.add("active");
  },

  close() {
    if (!this.lightboxEl) return;
    this.lightboxEl.classList.remove("active");
  },

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.update();
  },

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.update();
  },

  update() {
    const imgEl = this.lightboxEl.querySelector(".lightbox__image");
    if (imgEl && this.images[this.currentIndex]) {
      imgEl.src = this.images[this.currentIndex];
    }
  }
};

/* ----------------------------------------------------------------
   5. General UI Components (Header, Mobile Menu, Form, etc.)
   ---------------------------------------------------------------- */

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  function handleScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      header.classList.add('header--transparent');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const body = document.body;

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('active');
      body.style.overflow = '';
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

function initTestimonialCarousel() {
  const track = document.querySelector('.testimonials__track');
  const dots = document.querySelectorAll('.testimonials__dot');
  if (!track || !dots.length) return;

  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoplayInterval;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('testimonials__dot--active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(i);
      startAutoplay();
    });
  });

  startAutoplay();
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${I18n.t("form.sending", "Sending...")}`;

    setTimeout(() => {
      btn.textContent = I18n.t("form.sent", "✓ Message Sent!");
      btn.style.backgroundColor = "var(--color-accent)";
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.style.backgroundColor = "";
      }, 4000);
    }, 1200);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.startsWith('#gallery/')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* ----------------------------------------------------------------
   6. DataManager (Cloudflare D1 & Local CMS Synchronization)
   ---------------------------------------------------------------- */

const DataManager = {
  async init() {
    this.applyLocalCache();
    await this.fetchD1Content();
    this.bindAdminShortcut();
  },

  applyLocalCache() {
    const cached = localStorage.getItem("euka_cms_data");
    if (!cached) return;

    try {
      const data = JSON.parse(cached);
      if (data.portfolio?.length) {
        PORTFOLIO_DATA.length = 0;
        PORTFOLIO_DATA.push(...data.portfolio);
      }
      if (data.destinations?.length) {
        DESTINATIONS_DATA.length = 0;
        DESTINATIONS_DATA.push(...data.destinations);
      }
      if (data.settings) {
        this.applySettingsToDOM(data.settings);
      }
    } catch (e) {
      console.warn("Failed applying cached CMS data", e);
    }
  },

  async fetchD1Content() {
    try {
      const res = await fetch(`${window.location.origin}/api/content`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.portfolio?.length) {
            PORTFOLIO_DATA.length = 0;
            PORTFOLIO_DATA.push(...data.portfolio);
            PortfolioManager.render();
          }
          if (data.destinations?.length) {
            DESTINATIONS_DATA.length = 0;
            DESTINATIONS_DATA.push(...data.destinations);
            DestinationsManager.renderMap();
            DestinationsManager.renderList();
          }
          if (data.settings) {
            this.applySettingsToDOM(data.settings);
          }
        }
      }
    } catch (err) {
      // Offline or direct static mode: fallback to default curated dataset
    }
  },

  applySettingsToDOM(settings) {
    const lang = I18n.currentLang || "zh";

    if (settings.contact_email) {
      document.querySelectorAll(".contact__detail span").forEach(el => {
        if (el.textContent.includes("@")) el.textContent = settings.contact_email;
      });
    }

    if (settings.contact_phone) {
      document.querySelectorAll(".contact__detail span").forEach(el => {
        if (el.textContent.includes("+")) el.textContent = settings.contact_phone;
      });
    }

    if (settings.hero_subtitle_zh && lang === "zh") {
      const sub = document.querySelector(".hero__subtitle");
      if (sub) sub.textContent = settings.hero_subtitle_zh;
    }
    if (settings.hero_subtitle_en && lang === "en") {
      const sub = document.querySelector(".hero__subtitle");
      if (sub) sub.textContent = settings.hero_subtitle_en;
    }
  },

  bindAdminShortcut() {
    document.addEventListener("keydown", (e) => {
      // Ctrl + Shift + A or Cmd + Shift + A -> Jump to CMS Admin
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        window.location.href = "admin.html";
      }
    });
  }
};

/* ----------------------------------------------------------------
   App Initialization
   ---------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.remove('page-loading');
  document.body.classList.add('page-loaded');

  initHeader();
  initMobileMenu();
  initScrollReveal();
  initTestimonialCarousel();
  initContactForm();
  initSmoothScroll();
  LightboxManager.init();

  I18n.init();
  await DataManager.init();
  PortfolioManager.init();
  DestinationsManager.init();
});

