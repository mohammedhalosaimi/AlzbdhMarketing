import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');

const batchSlug = '2026-07-06_to_2026-08-04';
const outDir = path.join(here, batchSlug);
const assetDir = path.join(outDir, 'assets/source-images');
const htmlRoot = path.join(outDir, 'html');
const imageRoot = path.join(outDir, 'images');
const registerPath = path.join(repo, 'content/social_post_register.json');

const githubBase = 'https://raw.githubusercontent.com/mohammedhalosaimi/AlzbdhMarketing/main';
const apiBase = 'https://api.alzbdh.com';
const site = 'https://app.alzbdh.com';
const placeSearchToken = process.env.ALZBDH_PLACE_SEARCH_TOKEN;

const formats = {
  x: { platform: 'X', dir: 'x_1600x900', width: 1600, height: 900, time: '12:35' },
  instagram: { platform: 'Instagram', dir: 'instagram_1080x1350', width: 1080, height: 1350, time: '20:45' },
  tiktok: { platform: 'TikTok', dir: 'tiktok_1080x1920', width: 1080, height: 1920, time: '21:30' },
};

const dayTypes = [
  'place', 'destination', 'perfume', 'place', 'destination', 'place',
  'perfume', 'destination', 'place', 'destination', 'perfume', 'place',
  'destination', 'place', 'perfume', 'destination', 'place', 'destination',
  'perfume', 'place', 'destination', 'place', 'perfume', 'destination',
  'place', 'destination', 'perfume', 'place', 'place', 'perfume',
];

const placeQueries = [
  'dubai',
  'tokyo',
  'paris',
  'london',
  'rome',
  'bangkok',
  'istanbul',
  'cairo',
  'bali',
  'miami',
  'atlanta',
  'hanoi',
];

const destinationPriority = [
  'bali',
  'atlanta',
  'hanoi',
  'houston',
  'miami',
  'jeddah',
  'cairo',
  'rome',
  'bangkok',
  'phuket',
];

const prompts = [
  'لو القرار محتاج بحث طويل، خذ الزبدة أول. بعدها قرر براحتك.',
  'المكان، الوجهة، أو العطر: لا تبدأ من الحيرة. ابدأ من الخلاصة.',
  'وش ودك تشوف في الزبدة أكثر: مطاعم خارج السعودية، وجهات جديدة، أو عطور؟',
  'كل خيار له مدح وله ملاحظات. الزبدة تحاول تجمع الاثنين بدون ضجيج.',
  'إذا عندك رحلة قريبة، لا تخلي أول يوم يضيع في البحث.',
  'السؤال الصح يوفر عليك وقت كثير: وش يستاهل؟ ووش لا؟',
  'العطور والوجهات والأماكن كلها قرارات ذوق. الزبدة تعطيك السياق.',
  'أحياناً أفضل توصية هي اللي تقول لك وش تنتبه منه قبل ما تتحمس.',
  'قبل ما تحفظ مكان أو تحجز رحلة أو تشتري عطر، خذ الزبدة.',
  'وش أكثر مدينة تبغون نكثر منها في المحتوى القادم؟',
];

function addDays(date, offset) {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + offset);
  return next.toISOString().slice(0, 10);
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function shorten(value, max = 150) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const punctuation = Math.max(cut.lastIndexOf('،'), cut.lastIndexOf('.'), cut.lastIndexOf('؟'));
  if (punctuation > max * 0.55) return cut.slice(0, punctuation + 1).trim();
  const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > max * 0.55 ? space : max).trim()}…`;
}

function relToRepo(absPath) {
  return path.relative(repo, absPath).replaceAll(path.sep, '/');
}

function relFrom(fromDir, targetPath) {
  return path.relative(fromDir, targetPath).replaceAll(path.sep, '/');
}

function publicUrl(relativePath) {
  return `${githubBase}/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

async function downloadImage(url, targetPath) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  try {
    await fs.access(targetPath);
    return targetPath;
  } catch {
    // continue
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image download failed ${response.status}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(targetPath, bytes);
  return targetPath;
}

function imageExtension(url) {
  const clean = String(url || '').split('?')[0].split('#')[0];
  const ext = path.extname(clean).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
}

function normalizePerfume(item) {
  return {
    type: 'perfume',
    id: item.slug || String(item.id),
    slug: slugify(item.slug || item.id),
    title: item.name_ar || item.arabic_name || item.name || item.name_en,
    brand: item.brand_ar || item.arabic_brand || item.brand || item.brand_en,
    imageUrl: item.image_url || item.image,
    rating: item.rating?.avg,
    reviews: item.rating?.count,
    body: item.gist_lead || 'زبدة العطور تختصر لك الإحساس العام، المناسبة، وهل يستاهل التجربة.',
    label: 'زبدة العطور',
    sourceUrl: 'https://app.alzbdh.com/perfumes/',
  };
}

function normalizeDestination(item) {
  const activities = (item.highlight_activities || item.activities || []).map((activity) => activity.title || activity).filter(Boolean);
  const bestMonths = item.best_months || item.timing_info?.best_months || item.bestMonths || [];
  const halal = item.halal_info?.details_ar || item.halal_info?.food_availability;
  return {
    type: 'destination',
    id: item.id,
    slug: item.id,
    title: item.name_ar || item.name,
    country: item.country_ar || item.country || item.country_code,
    imageUrl: item.image || item.hero_image,
    body: activities.length ? `أبرزها: ${activities.slice(0, 3).join('، ')}.` : 'وجهة تحتاج ترتيب واضح قبل الحجز.',
    detail: bestMonths.length ? `أفضل وقت: ${bestMonths.slice(0, 4).join('، ')}` : (halal ? shorten(halal, 90) : 'خططها بهدوء قبل الحجز.'),
    label: 'زبدة السفر',
    sourceUrl: `${site}/destination/${item.id}`,
  };
}

function normalizePlace(item, query) {
  const cityGuess = query.split(' ')[0];
  return {
    type: 'place',
    id: item.place_id || item.id,
    slug: item.place_id || slugify(item.place_name || item.en_business_name || item.ar_business_name),
    title: item.ar_business_name || item.place_name || item.en_business_name,
    category: item.place_type === 'restaurant' ? 'مطعم' : 'مكان',
    city: item.city_name_ar || item.city_name || cityGuess,
    imageUrl: item.main_image,
    score: item.z_score,
    reviews: item.review_count,
    rating: item.average_rating,
    body: item.ar_alzbdh_intro || item.ar_text_highlight || item.overall_sentiment?.ar_summary,
    detail: item.ar_alzbdh_recommendation || item.ar_location_description || item.city_area,
    label: 'زبدة الأماكن',
    sourceUrl: `${site}/place/${item.place_id || item.id}`,
  };
}

async function gatherPlaces() {
  if (!placeSearchToken) {
    throw new Error('Set ALZBDH_PLACE_SEARCH_TOKEN to fetch live place-search data.');
  }

  const places = [];
  const seen = new Set();
  for (const query of placeQueries) {
    const params = new URLSearchParams({ query, limit: '8', page: '1', llm_version: '3' });
    const results = await fetchJson(`${apiBase}/place/search?${params}`, {
      headers: { Accept: 'application/json', access_token: placeSearchToken },
    });
    const list = Array.isArray(results) ? results : (results.results || results.items || []);
    const picked = list.find((item) => item.main_image && !seen.has(item.place_id || item.id));
    if (!picked) continue;
    seen.add(picked.place_id || picked.id);
    places.push(normalizePlace(picked, query));
  }
  return places;
}

function assertPool(name, pool, needed) {
  if (pool.length < needed) {
    throw new Error(`Need ${needed} unique ${name} items, but live sources returned ${pool.length}.`);
  }
}

function composeCopy(item) {
  if (item.type === 'place') {
    return {
      x: `${item.title}\n\n${item.category} خارج دائرة الرياض المعتادة. تقييم الزبدة ${item.score}/10، والزبدة تقول: ${shorten(item.detail || item.body, 150)}\n\n${site}`,
      instagram: `${item.title}\n\nزبدة الأماكن تقول: ${shorten(item.body, 210)}\n\nالهدف مو بس تعرف التقييم؛ تعرف وش يمدحون ووش تنتبه له قبل الزيارة.\n\n${site}`,
      tiktok: `${item.title}\n\nتقييم الزبدة ${item.score}/10.\n${shorten(item.detail || item.body, 130)}\n\n${site}`,
      hashtags: `#الزبدة #زبدة_الأماكن #${slugify(item.city).replaceAll('-', '_')} #مطاعم`,
    };
  }

  if (item.type === 'destination') {
    return {
      x: `${item.title} في بالك؟\n\n${shorten(item.body, 130)} ${item.detail}\n\nخططها على ${site}`,
      instagram: `${item.title} مو مجرد صور.\n\n${shorten(item.body, 190)}\n\n${item.detail}\n\nزبدة السفر تساعدك تبدأ من السياق، مو من الحيرة.\n\n${site}`,
      tiktok: `${item.title}\n\n${shorten(item.body, 120)}\n${item.detail}\n\nخططها على ${site}`,
      hashtags: `#الزبدة #زبدة_السفر #سفر #${slugify(item.title).replaceAll('-', '_')}`,
    };
  }

  return {
    x: `${item.title} من ${item.brand}.\n\n${shorten(item.body, 155)}\n\nخذ زبدة العطر قبل التجربة.\n\n${site}/perfumes`,
    instagram: `${item.title} من ${item.brand}.\n\nزبدة العطور تقول: ${shorten(item.body, 220)}\n\nبدل وصف تسويقي طويل، خذ الانطباع المختصر وشوف إذا يناسبك.\n\n${site}/perfumes`,
    tiktok: `${item.title}\n\n${shorten(item.body, 150)}\n\nزبدة العطور تختصر لك القرار.\n\n${site}/perfumes`,
    hashtags: `#الزبدة #زبدة_العطور #عطور #${slugify(item.brand).replaceAll('-', '_')}`,
  };
}

function visualText(item, platform) {
  const title = item.title;
  if (item.type === 'place') {
    return {
      eyebrow: item.label,
      title,
      subtitle: `تقييم الزبدة ${item.score}/10`,
      body: shorten(item.detail || item.body, platform === 'x' ? 90 : 110),
      cta: 'اعرف المدح والتنبيه',
    };
  }
  if (item.type === 'destination') {
    return {
      eyebrow: item.label,
      title,
      subtitle: item.country ? `${item.country} · ${item.detail}` : item.detail,
      body: shorten(item.body, platform === 'x' ? 90 : 115),
      cta: 'خططها على الزبدة',
    };
  }
  return {
    eyebrow: item.label,
    title,
    subtitle: item.brand,
    body: shorten(item.body, platform === 'x' ? 90 : 120),
    cta: 'خذ زبدة العطر',
  };
}

function posterHtml(item, format, imagePath) {
  const htmlDir = path.join(htmlRoot, format.dir);
  const font400 = relFrom(htmlDir, path.join(repo, 'content/travel/assets/fonts/Changa-400.ttf'));
  const font700 = relFrom(htmlDir, path.join(repo, 'content/travel/assets/fonts/Changa-700.ttf'));
  const font800 = relFrom(htmlDir, path.join(repo, 'content/travel/assets/fonts/Changa-800.ttf'));
  const logo = relFrom(htmlDir, path.join(repo, 'brand/logos/logo-white.svg'));
  const image = relFrom(htmlDir, imagePath);
  const copy = visualText(item, format.key);
  const isWide = format.width > format.height;
  const isVertical = format.height > 1500;
  const isPerfume = item.type === 'perfume';
  const titleSize = isWide ? 76 : isVertical ? 76 : 66;
  const bodySize = isWide ? 28 : isVertical ? 30 : 27;

  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:Changa;font-weight:400;src:url("${font400}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:700;src:url("${font700}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:800;src:url("${font800}") format("truetype");font-display:block}
*{box-sizing:border-box}html,body{margin:0;width:${format.width}px;height:${format.height}px;overflow:hidden}body{font-family:Changa,system-ui,sans-serif;background:#102318;color:#FDFBF7}
.poster{position:relative;width:100%;height:100%;overflow:hidden;background:#102318}
.bg{position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(5,14,9,.18),rgba(5,14,9,.68) 55%,rgba(5,14,9,.92)),url("${image}");background-size:${isPerfume ? 'contain' : 'cover'};background-repeat:no-repeat;background-position:center;filter:saturate(1.05) contrast(1.04)}
.bg:after{content:"";position:absolute;inset:0;background:${isPerfume ? 'radial-gradient(circle at 50% 35%,rgba(232,196,107,.22),transparent 31%),linear-gradient(145deg,rgba(16,35,24,.35),rgba(16,35,24,.86))' : 'linear-gradient(90deg,rgba(16,35,24,.35),transparent 45%)'}}
.top{position:absolute;z-index:4;top:${isVertical ? 52 : 46}px;left:${isWide ? 66 : 52}px;right:${isWide ? 66 : 52}px;display:flex;align-items:center;justify-content:space-between}
.top img{width:${isWide ? 146 : 128}px}.site{direction:ltr;font-size:${isWide ? 25 : 23}px;font-weight:800;text-shadow:0 5px 18px rgba(0,0,0,.45)}
.panel{position:absolute;z-index:3;left:${isWide ? 72 : 58}px;right:${isWide ? (isPerfume ? 72 : 520) : 58}px;bottom:${isWide ? 64 : 76}px;padding:${isWide ? '34px 38px' : '36px 38px'};border-radius:8px;background:rgba(16,35,24,.82);border:1px solid rgba(232,196,107,.38);box-shadow:0 28px 70px rgba(0,0,0,.34)}
.eyebrow{display:inline-flex;border-radius:999px;background:rgba(232,196,107,.15);border:1px solid rgba(232,196,107,.48);color:#F0D99B;padding:8px 16px;font-size:${isWide ? 23 : 24}px;font-weight:800}
h1{margin:18px 0 10px;font-size:${titleSize}px;line-height:1.08;font-weight:800;letter-spacing:0;color:#FDFBF7;text-shadow:0 8px 30px rgba(0,0,0,.45)}
.subtitle{font-size:${isWide ? 30 : 31}px;line-height:1.25;font-weight:800;color:#F0D99B;margin-bottom:12px}
p{margin:0;font-size:${bodySize}px;line-height:1.48;font-weight:700;color:#F4EFE6}.cta{display:inline-flex;margin-top:22px;background:#E8C46B;color:#102318;border-radius:8px;padding:12px 19px;font-size:${isWide ? 24 : 25}px;font-weight:800}
.badge{position:absolute;z-index:3;top:${isVertical ? 188 : 150}px;right:${isWide ? 72 : 58}px;background:#FDFBF7;color:#102318;border-radius:8px;padding:14px 18px;font-size:${isWide ? 26 : 28}px;font-weight:800;box-shadow:0 16px 45px rgba(0,0,0,.24)}
${isPerfume ? `.product{position:absolute;z-index:2;top:${isWide ? 150 : 210}px;left:${isWide ? 130 : 0}px;right:${isWide ? 'auto' : '0'};margin:auto;width:${isWide ? 470 : 540}px;height:${isWide ? 470 : 540}px;border-radius:8px;background:rgba(253,251,247,.12);display:grid;place-items:center}.product img{width:82%;height:82%;object-fit:contain}` : ''}
</style></head><body><main class="poster"><div class="bg"></div><div class="top"><div class="site">app.alzbdh.com</div><img src="${logo}" alt="الزبدة"></div>${isPerfume ? `<div class="product"><img src="${image}" alt=""></div>` : ''}<div class="badge">محتوى جديد</div><section class="panel"><div class="eyebrow">${escapeHtml(copy.eyebrow)}</div><h1>${escapeHtml(copy.title)}</h1><div class="subtitle">${escapeHtml(copy.subtitle)}</div><p>${escapeHtml(copy.body)}</p><div class="cta">${escapeHtml(copy.cta)}</div></section></main></body></html>`;
}

function registerRow({ row, item, postKey, image }) {
  return {
    post_key: postKey,
    content_type: `monthly-${item.type}`,
    item: item.title,
    slug: row.source_id,
    platform: row.platform,
    text: row.text,
    hashtags: row.hashtags,
    image,
    posted: 'false',
    posted_at_riyadh: '',
    buffer_post_id: '',
    buffer_channel_id: '',
    post_url: '',
    notes: `Ready in monthly batch ${batchSlug}; source plan ${relToRepo(path.join(outDir, 'plan.json'))}.`,
  };
}

async function renderAsset(browser, item, key, sourceImage) {
  const format = { ...formats[key], key };
  const htmlDir = path.join(htmlRoot, format.dir);
  const imageDir = path.join(imageRoot, format.dir);
  await fs.mkdir(htmlDir, { recursive: true });
  await fs.mkdir(imageDir, { recursive: true });
  const fileBase = `${item.type}-${item.slug}`.replace(/[^A-Za-z0-9_-]/g, '-');
  const htmlPath = path.join(htmlDir, `${fileBase}.html`);
  const imagePath = path.join(imageDir, `${fileBase}.png`);
  await fs.writeFile(htmlPath, posterHtml(item, format, sourceImage));
  const page = await browser.newPage({ viewport: { width: format.width, height: format.height }, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: imagePath });
  await page.close();
  return imagePath;
}

async function main() {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(assetDir, { recursive: true });

  const [travelConfig, perfumeFeed, places] = await Promise.all([
    fetchJson(`${apiBase}/api/v1/travel/config`),
    fetchJson(`${apiBase}/api/v1/perfumes/feed?page=1&page_size=80&sort=rank`),
    gatherPlaces(),
  ]);

  const destinations = [
    ...(travelConfig.destinations?.local || []),
    ...(travelConfig.destinations?.international || []),
  ]
    .filter((item) => item.available !== false && item.image)
    .filter((item) => destinationPriority.includes(item.id))
    .sort((a, b) => destinationPriority.indexOf(a.id) - destinationPriority.indexOf(b.id))
    .map(normalizeDestination);

  const perfumes = (perfumeFeed.items || [])
    .slice(12)
    .filter((item) => item.image_url)
    .slice(0, 8)
    .map(normalizePerfume);

  const needed = {
    place: dayTypes.filter((type) => type === 'place').length,
    destination: dayTypes.filter((type) => type === 'destination').length,
    perfume: dayTypes.filter((type) => type === 'perfume').length,
  };
  assertPool('places', places, needed.place);
  assertPool('destinations', destinations, needed.destination);
  assertPool('perfumes', perfumes, needed.perfume);

  const pools = {
    place: places,
    destination: destinations,
    perfume: perfumes,
  };
  const cursors = { place: 0, destination: 0, perfume: 0 };
  const days = dayTypes.map((type, index) => {
    const pool = pools[type];
    const item = pool[cursors[type] % pool.length];
    cursors[type] += 1;
    return {
      date: addDays('2026-07-06', index),
      type,
      item,
    };
  });
  const uniqueDayItems = new Set(days.map((day) => `${day.type}:${day.item.slug}`));
  if (uniqueDayItems.size !== days.length) {
    throw new Error(`Monthly batch day subjects must be unique, got ${uniqueDayItems.size} unique subjects for ${days.length} days.`);
  }

  const sourceImages = new Map();
  for (const item of [...places, ...destinations, ...perfumes]) {
    const ext = imageExtension(item.imageUrl);
    const target = path.join(assetDir, item.type, `${item.slug}${ext}`);
    sourceImages.set(item.slug, await downloadImage(item.imageUrl, target));
  }

  const rows = [];
  const registerRows = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [index, day] of days.entries()) {
      const { item, date } = day;
      const copy = composeCopy(item);
      const prompt = prompts[index % prompts.length];
      const promptSource = `monthly-${batchSlug}-${date}-prompt`;
      const promptPostKey = `monthly-${batchSlug}::${date}::prompt::x`;
      const promptRow = {
        date,
        time_riyadh: '09:45',
        theme: item.title,
        content_type: `monthly-${item.type}`,
        source_id: promptSource,
        platform: 'X',
        channel_kind: 'prompt',
        image_path: '',
        public_url: '',
        text: `${prompt}\n\nموضوع اليوم: ${item.title}\n\n${site}`,
        hashtags: '#الزبدة #زبدة_الأماكن #زبدة_السفر #زبدة_العطور',
        buffer_status: 'ready',
      };
      rows.push(promptRow);
      registerRows.push(registerRow({ row: promptRow, item, postKey: promptPostKey, image: '' }));

      for (const key of Object.keys(formats)) {
        const format = formats[key];
        const rendered = await renderAsset(browser, item, key, sourceImages.get(item.slug));
        const relImage = relToRepo(rendered);
        const sourceId = `monthly-${batchSlug}-${item.type}-${item.slug}-${key}`;
        const postKey = `monthly-${batchSlug}::${date}::${key}::${item.type}-${item.slug}`;
        const row = {
          date,
          time_riyadh: format.time,
          theme: item.title,
          content_type: `monthly-${item.type}`,
          source_id: sourceId,
          platform: format.platform,
          channel_kind: 'visual',
          image_path: relImage,
          public_url: publicUrl(relImage),
          text: copy[key],
          hashtags: copy.hashtags,
          buffer_status: 'ready',
        };
        rows.push(row);
        registerRows.push(registerRow({ row, item, postKey, image: relImage }));
      }
    }
  } finally {
    await browser.close();
  }

  const planHeaders = ['date', 'time_riyadh', 'theme', 'content_type', 'source_id', 'platform', 'channel_kind', 'image_path', 'public_url', 'text', 'hashtags', 'buffer_status'];
  await fs.writeFile(path.join(outDir, 'plan.json'), `${JSON.stringify(rows, null, 2)}\n`);
  await fs.writeFile(path.join(outDir, 'plan.csv'), `${planHeaders.join(',')}\n${rows.map((row) => planHeaders.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`);
  await fs.writeFile(path.join(outDir, 'copy.md'), `# Monthly Captions\n\n${rows.map((row) => `## ${row.date} ${row.time_riyadh} — ${row.platform} — ${row.theme}\n\n${row.text}\n\n${row.hashtags}\n\n${row.public_url ? `Media: ${row.public_url}` : 'Media: text-only'}`).join('\n\n')}\n`);
  await fs.writeFile(path.join(outDir, 'source-data.json'), `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    batchSlug,
    source: {
      travelConfig: `${apiBase}/api/v1/travel/config`,
      perfumeFeed: `${apiBase}/api/v1/perfumes/feed`,
      placeSearch: `${apiBase}/place/search`,
    },
    placeQueries,
    counts: {
      places: places.length,
      destinations: destinations.length,
      perfumes: perfumes.length,
      days: days.length,
      rows: rows.length,
    },
    places,
    destinations,
    perfumes,
    days: days.map((day) => ({ date: day.date, type: day.type, id: day.item.id, title: day.item.title })),
  }, null, 2)}\n`);

  const dayLines = days.map((day) => {
    const dayRows = rows.filter((row) => row.date === day.date);
    return `### ${day.date} — ${day.item.title}\n\n${dayRows.map((row) => `- ${row.time_riyadh} ${row.platform}: ${row.channel_kind}${row.public_url ? ` — ${row.public_url}` : ''}`).join('\n')}`;
  }).join('\n\n');

  await fs.writeFile(path.join(outDir, 'README.md'), `# Monthly Social Content Batch\n\nWindow: 2026-07-06 to 2026-08-04\nTimezone: Asia/Riyadh\n\nThis batch extends the existing prepared feed after \`2026-06-22_to_2026-07-05\`. It uses live website/API content from app.alzbdh.com and api.alzbdh.com, with broader places outside Riyadh/Saudi, more destinations, and more perfumes that were not part of the early posted Guidance 46 campaign.\n\n## Daily Cadence\n\n- 09:45 X text prompt\n- 12:35 X visual post\n- 20:45 Instagram feed post\n- 21:30 TikTok post\n\n## Content Mix\n\n- 12 place-led days from live place search, including Dubai, Tokyo, Paris, London, Rome, Bangkok, Istanbul, Cairo, Bali, Miami, Atlanta, and Hanoi.\n- 10 destination-led days from production travel config.\n- 8 perfume-led days from the production perfume feed, starting after the already-used early products.\n\n## Days\n\n${dayLines}\n\n## Buffer Notes\n\n- These rows are ready source content only; they are not scheduled in Buffer.\n- The daily feeder should schedule only through the duplicate/timing gate and respect Buffer's 10 total scheduled-post limit.\n- Public URLs assume the repo has been pushed to \`main\`.\n`);

  const register = JSON.parse(await fs.readFile(registerPath, 'utf8'));
  const byKey = new Map(register.map((row, index) => [row.post_key, index]));
  for (const row of registerRows) {
    if (byKey.has(row.post_key)) {
      const index = byKey.get(row.post_key);
      register[index] = { ...row, ...pickExistingState(register[index]) };
    } else {
      register.push(row);
    }
  }
  const registerHeaders = Object.keys(register[0]);
  await fs.writeFile(registerPath, `${JSON.stringify(register, null, 2)}\n`);
  await fs.writeFile(path.join(repo, 'content/social_post_register.csv'), `${registerHeaders.join(',')}\n${register.map((row) => registerHeaders.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`);

  await fs.writeFile(path.join(outDir, 'summary.json'), `${JSON.stringify({
    batchSlug,
    generatedAt: new Date().toISOString(),
    days: days.length,
    rows: rows.length,
    visualAssets: rows.filter((row) => row.image_path).length,
    mix: {
      places: days.filter((day) => day.type === 'place').length,
      destinations: days.filter((day) => day.type === 'destination').length,
      perfumes: days.filter((day) => day.type === 'perfume').length,
    },
  }, null, 2)}\n`);

  console.log(`Generated ${rows.length} rows for ${days.length} days at ${relToRepo(outDir)}`);
}

function pickExistingState(existing) {
  return {
    posted: existing.posted,
    posted_at_riyadh: existing.posted_at_riyadh,
    buffer_post_id: existing.buffer_post_id,
    buffer_channel_id: existing.buffer_channel_id,
    post_url: existing.post_url,
  };
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
