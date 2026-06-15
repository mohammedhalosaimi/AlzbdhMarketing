import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const batchSlug = '2026-06-22_to_2026-07-05';
const outDir = path.join(here, batchSlug);
const storyDir = path.join(outDir, 'stories');
const storyHtmlDir = path.join(storyDir, 'html');
const storyImageDir = path.join(storyDir, 'images');

const githubBase = 'https://raw.githubusercontent.com/mohammedhalosaimi/AlzbdhMarketing/main';
const appStore = 'https://apps.apple.com/sa/app/alzbdh/id6741608525';
const site = 'https://app.alzbdh.com';

const formats = {
  x: { dir: 'x_1600x900', width: 1600, height: 900 },
  instagram: { dir: 'instagram_1080x1350', width: 1080, height: 1350 },
  tiktok: { dir: 'tiktok_1080x1920', width: 1080, height: 1920 },
  story: { dir: 'instagram_story_1080x1920', width: 1080, height: 1920 }
};

const dailyPlan = [
  { date: '2026-06-22', type: 'places', id: 'ChIJPYjxol8dLz4RDxJc9VrkOT0', theme: 'ايس كريم وكافيه ٣٦' },
  { date: '2026-06-23', type: 'travel', id: 'bangkok', theme: 'بانكوك' },
  { date: '2026-06-24', type: 'places', id: 'ChIJcd8ZfOHjLj4R2MhcWMOsPiw', theme: 'كافيه ليلو' },
  { date: '2026-06-25', type: 'travel', id: 'dubai', theme: 'دبي' },
  { date: '2026-06-26', type: 'places', id: 'ChIJrVtg__X7Lj4RtLz4nFSoYR4', theme: 'واجهة روشن' },
  { date: '2026-06-27', type: 'places', id: 'ChIJi0_LHmkPLz4R_4sfMGrGI6A', theme: 'منتزه وادي نمار' },
  { date: '2026-06-28', type: 'travel', id: 'london', theme: 'لندن' },
  { date: '2026-06-29', type: 'places', id: 'ChIJ5xG77av7Lj4Rjwobo8hGpdQ', theme: 'تشرنوبل ليزر تاق' },
  { date: '2026-06-30', type: 'perfumes', id: 'angels-share-paradis', theme: 'أنجلز شير بارادي' },
  { date: '2026-07-01', type: 'travel', id: 'paris', theme: 'باريس' },
  { date: '2026-07-02', type: 'perfumes', id: 'bottled-absolu', theme: 'بوتلد أبسولو' },
  { date: '2026-07-03', type: 'travel', id: 'phuket', theme: 'بوكيت' },
  { date: '2026-07-04', type: 'places', id: 'ChIJAfOOqq9V4xURBaACs3r2n1w', theme: 'WBJ ABHA' },
  { date: '2026-07-05', type: 'perfumes', id: 'babycat-raw-bourbon', theme: 'بيبيكات راو بوربون' }
];

const morningPrompts = [
  'صباح الخير. اليوم وش قرارك الأصعب: كوفي هادي، مطعم عائلي، أو عيادة قريبة؟ الزبدة هدفها تختصر أول 10 دقايق من الحوسة.',
  'لو بتطلع اليوم، لا تبدأ من 200 تعليق. ابدأ بالسؤال الصح: وش الزبدة؟',
  'وش أكثر شيء يخليك تتردد قبل تختار مكان؟ السعر؟ الزحمة؟ المواقف؟ ولا اختلاف الآراء؟',
  'صباح الاختيارات الواضحة. الزبدة مو بديل عن ذوقك، هي تختصر الطريق لين قرارك.',
  'اليوم جرّب تسأل بالطريقة الطبيعية: وين مكان مرتب وقريب؟ وخذ الزبدة بدون لفّة طويلة.',
  'لو عندك ساعة وحدة بس تطلع فيها، وش تحتاج تعرف عن المكان قبل تروح؟',
  'السفر يبدأ بسؤال بسيط: وش يستاهل وقتي؟ زبدة السفر تحاول تجاوبك قبل لا تحجز.',
  'مو كل تقييم عالي يعني مناسب لك. الزبدة تساعدك تفهم ليه الناس تمدح المكان.',
  'العطور فيها كلام كثير. زبدة العطور تختصر: الريحة، المناسبة، وهل يستاهل التجربة.',
  'قبل لا تختار وجهة، اسأل: التأشيرة؟ الميزانية؟ وش التجربة اللي تستاهل؟',
  'أحياناً أفضل قرار هو إنك تستبعد الخيار الغلط بسرعة. هنا يجي دور الزبدة.',
  'وش تفضلون في محتوى السفر: وجهات اقتصادية، قريبة، ولا فخمة؟',
  'القروب يقول وين نروح؟ أنت افتح الزبدة وخذ جواب أوضح.',
  'نهاية الأسبوع تحتاج قرار أخف. مكان واضح، زبدة مختصرة، ووقت أقل في البحث.'
];

const readJson = async (relative) => JSON.parse(await fs.readFile(path.join(repo, relative), 'utf8'));
const travelData = await readJson('content/travel/data/website-destinations-used.json');
const placesData = await readJson('content/places/data/website-places-used.json');
const perfumeData = await readJson('content/perfumes/data/live-perfumes-products.json');
const registerPath = path.join(repo, 'content/social_post_register.json');
const register = JSON.parse(await fs.readFile(registerPath, 'utf8'));

const travelBySlug = new Map(travelData.destinations.map((item) => [item.slug, item]));
const placesById = new Map(placesData.places.map((item) => [item.place_id, item]));
const perfumeBySlug = new Map(perfumeData.products.map((item) => [item.slug, item]));

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function relToRepo(filePath) {
  return path.relative(repo, filePath).replaceAll(path.sep, '/');
}

function publicUrl(relativePath) {
  return `${githubBase}/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}

function localRel(fromDir, relativePath) {
  return path.relative(fromDir, path.join(repo, relativePath)).replaceAll(path.sep, '/');
}

function formatReviews(value) {
  return value === 'تقييمات كثيرة' ? 'مراجعات كثيرة' : `${value} تقييم`;
}

function shorten(text, max = 150) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentenceEnd = clean.slice(0, max).search(/[.!؟]/u);
  if (sentenceEnd > 32) return clean.slice(0, sentenceEnd + 1).trim();
  const window = clean.slice(0, max).trim();
  const lastClause = Math.max(window.lastIndexOf('،'), window.lastIndexOf('؛'));
  if (lastClause > max * 0.55) return window.slice(0, lastClause).trim();
  const lastSpace = window.lastIndexOf(' ');
  if (lastSpace > max * 0.55) return window.slice(0, lastSpace).trim();
  return window;
}

function imagePathFor(item, platform) {
  if (item.type === 'travel') return `content/travel/images/${formats[platform].dir}/${item.id}.png`;
  if (item.type === 'places') return `content/places/images/${formats[platform].dir}/${item.id}.png`;
  if (item.type === 'perfumes') return `content/marketing ad/perfumes/images/${formats[platform].dir}/${item.id}.png`;
  throw new Error(`Unknown type ${item.type}`);
}

function storyBackgroundPath(item) {
  if (item.type === 'travel') return `content/travel/assets/heroes/${item.id}.jpg`;
  if (item.type === 'places') {
    const data = placesById.get(item.id);
    if (!data?.localImage) throw new Error(`Missing place hero image for ${item.id}`);
    return `content/places/${data.localImage}`;
  }
  if (item.type === 'perfumes') {
    const data = perfumeBySlug.get(item.id);
    if (!data?.localImage) throw new Error(`Missing perfume image for ${item.id}`);
    return data.localImage;
  }
  throw new Error(`Unknown story background type ${item.type}`);
}

function itemData(item) {
  if (item.type === 'travel') return travelBySlug.get(item.id);
  if (item.type === 'places') return placesById.get(item.id);
  if (item.type === 'perfumes') {
    return perfumeBySlug.get(item.id);
  }
  return null;
}

function visualCopy(item) {
  const data = itemData(item);
  if (!data) throw new Error(`Missing source data for ${item.type}:${item.id}`);

  if (item.type === 'travel') {
    const visa = data.stats?.['التأشيرة'];
    const budget = data.stats?.['الميزانية'];
    return {
      title: data.title,
      vertical: 'زبدة السفر',
      x: {
        text: `${data.title} في بالك؟\n\n${shorten(data.summary, 125)}\n\n${visa}، والميزانية ${budget}. خططها على ${site}`,
        hashtags: `#الزبدة #زبدة_السفر #${data.title.replace(/\s+/g, '_')}`
      },
      instagram: {
        text: `صراحة، ${data.title} مو وجهة تمشيها بعشوائية.\n\nزبدة السفر: ${shorten(data.summary, 210)}\n\nخططها على ${site}`,
        hashtags: `#الزبدة #زبدة_السفر #سفر #رحلات #${data.title.replace(/\s+/g, '_')}`
      },
      tiktok: {
        text: `${data.title} في بالك؟ خذ الزبدة قبل لا تتوه.\n\n${(data.activities ?? []).filter((activity) => !activity.match(/^[^\p{L}\p{N}]+$/u)).slice(0, 2).join('، ') || shorten(data.summary, 80)}.\n\nخططها على ${site}`,
        hashtags: `#الزبدة #زبدة_السفر #سفر #${data.title.replace(/\s+/g, '_')}`
      },
      story: {
        title: `زبدة السفر: ${data.title}`,
        body: `${visa} • ميزانية ${budget}`,
        cta: 'خططها بدون حوسة'
      }
    };
  }

  if (item.type === 'places') {
    const reviews = formatReviews(data.reviews);
    const placeLabel = `${data.category} في ${data.city}`;
    return {
      title: data.name,
      vertical: 'زبدة الأماكن',
      x: {
        text: `${data.name} — ${placeLabel}.\n\nتقييم الزبدة ${data.score}/10 من ${reviews}. ${shorten(data.recommendation || data.gist, 120)}\n\n${site}`,
        hashtags: `#الزبدة #زبدة_الأماكن #${data.city} #${data.category}`
      },
      instagram: {
        text: `${data.name} طالع بقوة في الزبدة.\n\n${data.category} في ${data.city} بتقييم الزبدة ${data.score}/10. ${shorten(data.gist, 190)}\n\nافتح ${site} وشوف الأماكن حواليك بدون حوسة.`,
        hashtags: `#الزبدة #زبدة_الأماكن #${data.city} #${data.category} #صراحة #يستاهل`
      },
      tiktok: {
        text: `وين تروح؟\n\n${data.category}: ${data.name}\nتقييم الزبدة ${data.score}/10، والزبدة تقول: ${shorten(data.recommendation || data.gist, 95)}\n\n${site}`,
        hashtags: `#الزبدة #زبدة_الأماكن #${data.city} #${data.category}`
      },
      story: {
        title: data.name,
        body: `${data.category} في ${data.city} • تقييم الزبدة ${data.score}/10`,
        cta: 'احفظه للطلعة الجاية'
      }
    };
  }

  const perfumeTitle = data.arabicName;
  const perfumeBrand = data.arabicBrand;
  const perfumeSummary = shorten(data.summary, 150);
  return {
    title: perfumeTitle,
    vertical: 'زبدة العطور',
    x: {
      text: `${perfumeTitle} من ${perfumeBrand}.\n\n${perfumeSummary}\n\nخذ الزبدة قبل التجربة: وش ريحته؟ ولمين يناسب؟\n\n${site}`,
      hashtags: '#الزبدة #زبدة_العطور #عطور'
    },
    instagram: {
      text: `${perfumeTitle} من ${perfumeBrand}.\n\nزبدة العطور تقول: ${perfumeSummary}\n\nبدل الوصف الطويل، خذ الانطباع المختصر وشوف إذا يناسب ذوقك.\n\n${site}`,
      hashtags: '#الزبدة #زبدة_العطور #عطور #عطور_نيش'
    },
    tiktok: {
      text: `${perfumeTitle}.\n\n${perfumeSummary}\n\nزبدة العطور تختصر لك: وش ريحته؟ ولمين يناسب؟\n\n${site}`,
      hashtags: '#الزبدة #زبدة_العطور #عطور'
    },
    story: {
      title: perfumeTitle,
      body: `${perfumeBrand} • تقييم ${data.rating} من ${data.reviews}`,
      cta: 'خذ الزبدة قبل تشتري'
    }
  };
}

function storyHtml(item, copy, sourceImage) {
  const logo = localRel(storyHtmlDir, 'brand/logos/logo-white.svg');
  const font400 = localRel(storyHtmlDir, 'content/travel/assets/fonts/Changa-400.ttf');
  const font700 = localRel(storyHtmlDir, 'content/travel/assets/fonts/Changa-700.ttf');
  const font800 = localRel(storyHtmlDir, 'content/travel/assets/fonts/Changa-800.ttf');
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
@font-face{font-family:Changa;font-weight:400;src:url("${font400}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:700;src:url("${font700}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:800;src:url("${font800}") format("truetype");font-display:block}
*{box-sizing:border-box}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden}
body{font-family:Changa,system-ui,sans-serif;background:#102318;color:#FDFBF7}
.story{position:relative;width:100%;height:100%;overflow:hidden;background:#102318}
.bg{position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(6,14,9,.20),rgba(6,14,9,.70) 52%,rgba(6,14,9,.92)),url("${sourceImage}");background-size:cover;background-position:center;filter:saturate(1.05) contrast(1.02)}
.top{position:absolute;z-index:2;top:54px;left:58px;right:58px;display:flex;align-items:center;justify-content:space-between}
.logo{width:142px;filter:drop-shadow(0 8px 22px rgba(0,0,0,.5))}
.site{direction:ltr;font-size:27px;font-weight:800;text-shadow:0 5px 20px rgba(0,0,0,.5)}
.panel{position:absolute;z-index:2;left:58px;right:58px;bottom:92px;border-radius:8px;padding:42px;background:rgba(16,35,24,.82);border:1px solid rgba(240,217,155,.35);box-shadow:0 24px 70px rgba(0,0,0,.32)}
.eyebrow{display:inline-flex;border-radius:999px;background:rgba(240,217,155,.16);border:1px solid rgba(240,217,155,.42);padding:8px 18px;color:#F0D99B;font-size:25px;font-weight:800}
h1{font-size:82px;line-height:1.08;margin:20px 0 16px;font-weight:800;letter-spacing:0}
p{margin:0;font-size:34px;line-height:1.45;font-weight:700;color:#F4EFE6}
.cta{display:inline-flex;margin-top:28px;background:#E8C46B;color:#102318;border-radius:8px;padding:14px 22px;font-size:29px;font-weight:800}
.question{position:absolute;z-index:2;top:195px;right:58px;left:58px;display:flex;justify-content:center}
.question span{background:#FDFBF7;color:#102318;border-radius:999px;padding:14px 24px;font-size:30px;font-weight:800;box-shadow:0 18px 42px rgba(0,0,0,.25)}
</style>
</head>
<body>
<main class="story">
  <div class="bg"></div>
  <div class="top"><div class="site">app.alzbdh.com</div><img class="logo" src="${logo}" alt="الزبدة"></div>
  <div class="question"><span>وش الزبدة؟</span></div>
  <section class="panel">
    <div class="eyebrow">${escapeHtml(copy.vertical)}</div>
    <h1>${escapeHtml(copy.story.title)}</h1>
    <p>${escapeHtml(copy.story.body)}</p>
    <div class="cta">${escapeHtml(copy.story.cta)}</div>
  </section>
</main>
</body>
</html>`;
}

function rowFromPost({ date, time, platform, channelKind, item, copy, image, text, hashtags, notes }) {
  const slug = `${item.type}-${item.id}`.replaceAll(/[^A-Za-z0-9_-]+/g, '-');
  return {
    post_key: `batch-${batchSlug}::${date}::${channelKind}::${platform.toLowerCase().replaceAll(' ', '-')}`,
    content_type: `batch-${item.type}`,
    item: copy.title,
    slug,
    platform,
    text,
    hashtags,
    image,
    posted: 'false',
    posted_at_riyadh: '',
    buffer_post_id: '',
    buffer_channel_id: '',
    post_url: '',
    notes: `Prepared for ${date} ${time} Riyadh. ${notes ?? ''}`.trim()
  };
}

await fs.mkdir(storyHtmlDir, { recursive: true });
await fs.mkdir(storyImageDir, { recursive: true });

const batchRows = [];
const registerRows = [];
const browser = await chromium.launch({ headless: true });
try {
  for (let index = 0; index < dailyPlan.length; index += 1) {
    const item = dailyPlan[index];
    const copy = visualCopy(item);
    const storyName = `${item.date}-${item.type}-${item.id}`.replaceAll(/[^A-Za-z0-9_-]+/g, '-');
    const storyHtmlPath = path.join(storyHtmlDir, `${storyName}.html`);
    const storyImagePath = path.join(storyImageDir, `${storyName}.png`);
    await fs.writeFile(storyHtmlPath, storyHtml(item, copy, localRel(storyHtmlDir, storyBackgroundPath(item))));
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    await page.goto(`file://${storyHtmlPath}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: storyImagePath });
    await page.close();

    const storyRel = relToRepo(storyImagePath);
    const xImage = imagePathFor(item, 'x');
    const igImage = imagePathFor(item, 'instagram');
    const ttImage = imagePathFor(item, 'tiktok');

    const posts = [
      {
        time: '09:45',
        platform: 'X',
        channelKind: 'morning',
        image: '',
        text: `${morningPrompts[index]}\n\n${site}`,
        hashtags: '#الزبدة #صراحة #يستاهل',
        public_url: ''
      },
      {
        time: '12:35',
        platform: 'X',
        channelKind: 'visual',
        image: xImage,
        text: copy.x.text,
        hashtags: copy.x.hashtags,
        public_url: publicUrl(xImage)
      },
      {
        time: '18:15',
        platform: 'Instagram Story',
        channelKind: 'story',
        image: storyRel,
        text: `${copy.story.title}\n\n${copy.story.body}\n\n${site}`,
        hashtags: '#الزبدة',
        public_url: publicUrl(storyRel)
      },
      {
        time: '20:45',
        platform: 'Instagram',
        channelKind: 'feed',
        image: igImage,
        text: copy.instagram.text,
        hashtags: copy.instagram.hashtags,
        public_url: publicUrl(igImage)
      },
      {
        time: '21:30',
        platform: 'TikTok',
        channelKind: 'feed',
        image: ttImage,
        text: copy.tiktok.text,
        hashtags: copy.tiktok.hashtags,
        public_url: publicUrl(ttImage)
      }
    ];

    for (const post of posts) {
      const scheduleRow = {
        date: item.date,
        time_riyadh: post.time,
        theme: item.theme,
        content_type: item.type,
        source_id: item.id,
        platform: post.platform,
        channel_kind: post.channelKind,
        image_path: post.image,
        public_url: post.public_url,
        text: post.text,
        hashtags: post.hashtags,
        buffer_status: 'ready'
      };
      batchRows.push(scheduleRow);
      registerRows.push(rowFromPost({
        date: item.date,
        time: post.time,
        platform: post.platform,
        channelKind: post.channelKind,
        item,
        copy,
        image: post.image,
        text: post.text,
        hashtags: post.hashtags,
        notes: post.public_url ? `Public URL after push: ${post.public_url}` : 'Text-only post.'
      }));
    }
  }
} finally {
  await browser.close();
}

const planHeaders = ['date', 'time_riyadh', 'theme', 'content_type', 'source_id', 'platform', 'channel_kind', 'image_path', 'public_url', 'text', 'hashtags', 'buffer_status'];
await fs.writeFile(path.join(outDir, 'plan.json'), JSON.stringify(batchRows, null, 2) + '\n');
await fs.writeFile(
  path.join(outDir, 'plan.csv'),
  `${planHeaders.join(',')}\n${batchRows.map((row) => planHeaders.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`
);

const daysMarkdown = dailyPlan.map((day) => {
  const rows = batchRows.filter((row) => row.date === day.date);
  return `### ${day.date} — ${day.theme}\n\n${rows.map((row) => `- ${row.time_riyadh} ${row.platform}: ${row.channel_kind}${row.public_url ? ` — ${row.public_url}` : ''}`).join('\n')}`;
}).join('\n\n');

await fs.writeFile(
  path.join(outDir, 'README.md'),
  `# Two-Week Organic Buffer Batch\n\nWindow: 2026-06-22 to 2026-07-05\nTimezone: Asia/Riyadh\n\nThis batch is designed for a rolling Buffer workflow under the 10 scheduled-post limit. The daily Codex feeder should schedule one day at a time. Launch-mode Buffer filling should use 9 same-day posts when capacity allows: three waves across X, Instagram, and TikTok.\n\n## Baseline Daily Cadence\n\n- 09:45 X text prompt\n- 12:35 X visual post\n- 18:15 Instagram Story-style asset\n- 20:45 Instagram feed post\n- 21:30 TikTok post\n\n## Launch-Mode Buffer Cadence\n\n- 12:15 / 12:35 / 12:55 first wave across X, Instagram, TikTok\n- 18:40 / 19:00 / 19:20 second wave across X, Instagram, TikTok\n- 21:05 / 21:25 / 21:45 third wave across X, Instagram, TikTok\n\n## Days\n\n${daysMarkdown}\n\n## Notes\n\n- No day repeats a visual source from this batch.\n- Perfume days rotate live website products and do not reuse Guidance 46.\n- Posts already published or already scheduled before 2026-06-22 are not reused as daily visual themes.\n- Public URLs assume the repo is pushed to \`main\`.\n`
);

await fs.writeFile(
  path.join(outDir, 'copy.md'),
  `# Captions And Hashtags\n\n${batchRows.map((row) => `## ${row.date} ${row.time_riyadh} — ${row.platform} — ${row.theme}\n\n${row.text}\n\n${row.hashtags}\n\n${row.public_url ? `Media: ${row.public_url}` : 'Media: text-only'}`).join('\n\n')}\n`
);

for (const row of registerRows) {
  const existingIndex = register.findIndex((existing) => existing.post_key === row.post_key);
  if (existingIndex === -1) {
    register.push(row);
  } else {
    const existing = register[existingIndex];
    register[existingIndex] = {
      ...row,
      posted: existing.posted,
      posted_at_riyadh: existing.posted_at_riyadh,
      buffer_post_id: existing.buffer_post_id,
      buffer_channel_id: existing.buffer_channel_id,
      post_url: existing.post_url
    };
  }
}

const headers = Object.keys(register[0]);
await fs.writeFile(registerPath, JSON.stringify(register, null, 2) + '\n');
await fs.writeFile(
  path.join(repo, 'content/social_post_register.csv'),
  `${headers.join(',')}\n${register.map((row) => headers.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`
);

const counts = register.reduce((acc, row) => {
  acc.total += 1;
  acc[row.content_type] = (acc[row.content_type] ?? 0) + 1;
  return acc;
}, { total: 0 });

await fs.writeFile(
  path.join(outDir, 'summary.json'),
  JSON.stringify({
    batchSlug,
    generatedAt: new Date().toISOString(),
    days: dailyPlan.length,
    posts: batchRows.length,
    registerCounts: counts,
    publicBase: githubBase
  }, null, 2) + '\n'
);

console.log(`Generated ${batchRows.length} posts for ${dailyPlan.length} days at ${path.relative(repo, outDir)}`);
