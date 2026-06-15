import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const sharp = require('sharp');

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const outputRoot = path.join(repo, 'content/marketing ad');
const outputRelPrefix = 'content/marketing ad';

const formats = {
  x: { dir: 'x_1600x900', width: 1600, height: 900 },
  instagram: { dir: 'instagram_1080x1350', width: 1080, height: 1350 },
  tiktok: { dir: 'tiktok_1080x1920', width: 1080, height: 1920 }
};

const rel = (fromDir, target) => path.relative(fromDir, path.resolve(repo, target)).replaceAll(path.sep, '/');

const sources = {
  logoWhite: 'brand/logos/logo-white.svg',
  logoColor: 'brand/logos/logo-color.svg',
  font400: 'content/travel/assets/fonts/Changa-400.ttf',
  font600: 'content/travel/assets/fonts/Changa-600.ttf',
  font700: 'content/travel/assets/fonts/Changa-700.ttf',
  font800: 'content/travel/assets/fonts/Changa-800.ttf',
  appStore: 'https://apps.apple.com/sa/app/alzbdh/id6741608525',
  site: 'https://app.alzbdh.com'
};

const campaigns = [
  {
    vertical: 'places',
    slug: 'riyadh-map-decision',
    title: 'وين نروح الليلة؟',
    eyebrow: 'تطبيق الزبدة',
    subtitle: 'مطعم، كوفي، أو عيادة في الرياض.',
    body: 'الخريطة قدامك، والزبدة تختصر القرار بدون لفّة تعليقات.',
    cta: 'حمّل تطبيق الزبدة',
    image: 'content/mobile-app/assets/screenshots-ar/ad-ready/map-only-ar.png',
    style: 'map',
    captions: {
      x: 'وين نروح الليلة؟\n\nمطعم، كوفي، أو عيادة في الرياض. افتح الخريطة وخذ الزبدة بدون لفّة تعليقات.\n\nحمّل تطبيق الزبدة على iOS:\nhttps://apps.apple.com/sa/app/alzbdh/id6741608525',
      instagram: 'وين نروح الليلة؟\n\nالرياض مليانة خيارات، بس مو كل خيار يستاهل وقتك. افتح الخريطة في تطبيق الزبدة، فلتر بين مطاعم وكافيهات وعيادات، وخذ قرارك أسرع.\n\nحمّله من App Store:\nhttps://apps.apple.com/sa/app/alzbdh/id6741608525',
      tiktok: 'وين نروح الليلة؟\n\nمطعم؟ كوفي؟ عيادة؟ تطبيق الزبدة يخلي خريطة الرياض أوضح، والقرار أسرع.\n\nحمّل تطبيق الزبدة على iOS:\nhttps://apps.apple.com/sa/app/alzbdh/id6741608525'
    },
    hashtags: {
      x: '#الزبدة #تطبيق_الزبدة #الرياض',
      instagram: '#الزبدة #تطبيق_الزبدة #الرياض #مطاعم_الرياض #كافيهات_الرياض #عيادات_الرياض',
      tiktok: '#الزبدة #تطبيق_الزبدة #الرياض #وين_نروح #مطاعم_الرياض #كافيهات_الرياض'
    }
  },
  {
    vertical: 'travel',
    slug: 'travel-compare',
    title: 'نفس الوجهة. التخطيط هو الفرق.',
    eyebrow: 'زبدة السفر',
    subtitle: 'بدون حوسة مواقع وقروبات.',
    body: 'مع الزبدة: خطة أوضح، أماكن تستاهل، وقرار أسرع قبل ما تحجز.',
    cta: 'وش وجهتكم الجاية؟',
    image: 'content/travel/assets/heroes/tokyo.jpg',
    style: 'compare',
    captions: {
      x: 'نفس الوجهة. التخطيط هو الفرق.\n\nبدون الزبدة: قروبات وآراء متضاربة.\nمع الزبدة: خطة أوضح وأماكن تستاهل قبل ما تحجز.\n\napp.alzbdh.com',
      instagram: 'نفس الوجهة. التخطيط هو الفرق.\n\nالسفر مو بس تذاكر وفندق. زبدة السفر تساعدك تفهم الوجهة، ترتب الأيام، وتعرف وش يستاهل قبل ما تضيع بين المواقع.\n\napp.alzbdh.com',
      tiktok: 'بدون الزبدة: لفّة مواقع.\nمع الزبدة: خطة أوضح.\n\nوش وجهتكم الجاية؟\napp.alzbdh.com'
    },
    hashtags: {
      x: '#الزبدة #زبدة_السفر #سفر',
      instagram: '#الزبدة #زبدة_السفر #سفر #رحلات #تخطيط_سفر',
      tiktok: '#الزبدة #زبدة_السفر #سفر #وين_نسافر'
    }
  },
  {
    vertical: 'perfumes',
    slug: 'perfume-verdict',
    title: 'عطر نيش بدون حوسة',
    eyebrow: 'زبدة العطور',
    subtitle: 'لا تشتري من الوصف الجميل بس.',
    body: 'خذ الزبدة: وش ريحته؟ لمين يناسب؟ وهل يستاهل التجربة؟',
    cta: 'خذ الزبدة',
    image: 'content/perfumes/assets/product-images/guidance-46.jpg',
    style: 'product',
    captions: {
      x: 'عطر نيش بدون حوسة.\n\nلا تشتري من الوصف الجميل بس. خذ الزبدة: وش ريحته؟ لمين يناسب؟ وهل يستاهل التجربة؟\n\napp.alzbdh.com',
      instagram: 'عطر نيش بدون حوسة.\n\nزبدة العطور تختصر لك الانطباع: النوتات، الإحساس، ومتى يناسبك العطر بدون كلام تسويقي زائد.\n\napp.alzbdh.com',
      tiktok: 'لا تشتري من الوصف الجميل بس.\n\nخذ الزبدة: وش ريحته؟ لمين يناسب؟ وهل يستاهل التجربة؟\n\napp.alzbdh.com'
    },
    hashtags: {
      x: '#الزبدة #زبدة_العطور #عطور',
      instagram: '#الزبدة #زبدة_العطور #عطور #عطور_نيش #Perfume',
      tiktok: '#الزبدة #زبدة_العطور #عطور #عطر'
    }
  },
  {
    vertical: 'mobile-app',
    slug: 'ask-zbdh-chat',
    title: 'اسأل الزبدة',
    eyebrow: 'تطبيق الزبدة',
    subtitle: 'اكتبها مثل ما تقولها لخويك.',
    body: 'كوفي هادي؟ أفضل شاورما؟ عيادة قريبة؟ الشات يختصر القرار في الرياض.',
    cta: 'حمّل التطبيق',
    image: 'content/mobile-app/assets/screenshots-ar/ad-ready/chat-ar-clean.png',
    style: 'chat',
    captions: {
      x: 'اسأل الزبدة.\n\nكوفي هادي؟ أفضل شاورما؟ عيادة قريبة؟ اكتبها مثل ما تقولها لخويك، والشات يختصر القرار في الرياض.\n\nhttps://apps.apple.com/sa/app/alzbdh/id6741608525',
      instagram: 'اسأل الزبدة.\n\nاكتبها بالطريقة اللي تفكر فيها: كوفي هادي، أفضل شاورما، أو عيادة قريبة. تطبيق الزبدة يساعدك تختصر القرار في الرياض.\n\nحمّله من App Store:\nhttps://apps.apple.com/sa/app/alzbdh/id6741608525',
      tiktok: 'اسأل الزبدة.\n\nكوفي هادي؟ أفضل شاورما؟ عيادة قريبة؟ اكتبها مثل ما تقولها لخويك.\n\nحمّل تطبيق الزبدة على iOS:\nhttps://apps.apple.com/sa/app/alzbdh/id6741608525'
    },
    hashtags: {
      x: '#الزبدة #تطبيق_الزبدة #الرياض',
      instagram: '#الزبدة #تطبيق_الزبدة #الرياض #مطاعم_الرياض #كافيهات_الرياض',
      tiktok: '#الزبدة #تطبيق_الزبدة #الرياض #وين_نروح'
    }
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function htmlFor(campaign, format, htmlDir) {
  const isWide = format.width > format.height;
  const isStory = format.height > 1500;
  const logo = rel(htmlDir, campaign.style === 'map' ? sources.logoColor : sources.logoWhite);
  const image = rel(htmlDir, campaign.image);
  const title = escapeHtml(campaign.title).replaceAll('الزبدة', '<span>الزبدة</span>');
  const font400 = rel(htmlDir, sources.font400);
  const font600 = rel(htmlDir, sources.font600);
  const font700 = rel(htmlDir, sources.font700);
  const font800 = rel(htmlDir, sources.font800);

  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:Changa;font-weight:400;src:url("${font400}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:600;src:url("${font600}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:700;src:url("${font700}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:800;src:url("${font800}") format("truetype");font-display:block}
*{box-sizing:border-box}html,body{margin:0;width:${format.width}px;height:${format.height}px;overflow:hidden}body{font-family:Changa,system-ui,sans-serif}
.poster{position:relative;width:100%;height:100%;overflow:hidden;background:#102318;color:#FDFBF7}
.top{position:absolute;z-index:8;inset-block-start:${isWide ? 54 : 52}px;inset-inline:${isWide ? 72 : 58}px;display:flex;align-items:center;justify-content:space-between}.top img{width:${isWide ? 150 : 138}px}.site{direction:ltr;font-size:${isWide ? 27 : 25}px;font-weight:800;text-shadow:0 4px 18px rgba(0,0,0,.36)}
.eyebrow{display:inline-flex;padding:${isWide ? '8px 18px' : '8px 17px'};border-radius:999px;background:rgba(240,217,155,.16);border:1px solid rgba(240,217,155,.42);color:#F0D99B;font-size:${isWide ? 25 : 24}px;font-weight:800}
h1{margin:18px 0 0;font-size:${isWide ? 82 : isStory ? 88 : 74}px;line-height:1.08;font-weight:800;letter-spacing:0}h1 span{color:#E8C46B}.subtitle{font-size:${isWide ? 36 : 34}px;font-weight:800;line-height:1.25;margin-block-start:14px}.body{font-size:${isWide ? 31 : 30}px;line-height:1.5;font-weight:700;color:#F4EFE6}.cta{display:inline-flex;margin-block-start:22px;padding:13px 22px;border-radius:8px;background:#E8C46B;color:#102318;font-size:${isWide ? 26 : 27}px;font-weight:800}
.bg{position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(6,14,9,.32),rgba(6,14,9,.78)),url("${image}");background-size:cover;background-position:center}
.card{position:absolute;z-index:3;border-radius:8px}
.map{background:#F7F3EA;color:#102318}.map .site{color:#1F3D2E;text-shadow:none}.map-scene{position:absolute;inset-inline:${isWide ? 60 : 44}px;inset-block-start:${isWide ? 145 : 145}px;height:${isWide ? 535 : isStory ? 960 : 760}px;border-radius:18px;overflow:hidden;transform:rotate(-2deg);box-shadow:0 28px 80px rgba(16,35,24,.25);border:1px solid rgba(31,61,46,.16)}.map-scene img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:saturate(1.08) contrast(1.03)}.map-scene:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(247,243,234,0),rgba(16,35,24,.31))}.map .card{inset-inline:${isWide ? '760px 72px' : '70px'};inset-block-end:${isWide ? '78px' : '84px'};background:#FDFBF7;color:#102318;padding:${isWide ? '36px 42px' : '38px 42px'};box-shadow:0 28px 70px rgba(16,35,24,.16)}.map h1{color:#102318}.map .body{color:#34463b}.callout{position:absolute;z-index:5;inset-block-start:${isWide ? 520 : isStory ? 815 : 650}px;inset-inline-end:${isWide ? 900 : 78}px;background:#1F3D2E;color:#FDFBF7;border:1px solid rgba(232,196,107,.55);border-radius:8px;padding:14px 18px;font-size:${isWide ? 25 : 27}px;font-weight:800}
.compare .card{inset-block:${isWide ? '198px 88px' : '248px 118px'};width:${isWide ? 560 : 430}px;padding:${isWide ? 36 : 32}px}.compare .without{inset-inline-end:${isWide ? 94 : 72}px;background:#FDFBF7;color:#102318}.compare .with{inset-inline-start:${isWide ? 94 : 72}px;background:#1F3D2E;color:#FDFBF7;border:1px solid rgba(232,196,107,.42)}.compare h2{margin:0 0 18px;font-size:${isWide ? 48 : 44}px}.compare p{font-size:${isWide ? 30 : 27}px;line-height:1.55;font-weight:700}.compare .cta{font-size:${isWide ? 24 : 23}px}
.product{background:radial-gradient(circle at 50% 22%,rgba(232,196,107,.20),transparent 28%),linear-gradient(145deg,#09110d,#1F3D2E 58%,#0b1711)}.bottle{position:absolute;z-index:2;inset-block-start:${isWide ? 138 : isStory ? 190 : 176}px;inset-inline:0;margin:auto;width:${isWide ? 410 : isStory ? 420 : 360}px;height:${isWide ? 410 : isStory ? 420 : 360}px;border-radius:8px;background:rgba(253,251,247,.08);display:flex;align-items:center;justify-content:center}.bottle img{max-width:78%;max-height:78%;border-radius:8px}.product .card{inset-inline:${isWide ? 170 : 70}px;inset-block-end:${isWide ? 80 : 88}px;text-align:center}.product .body{max-width:${isWide ? 980 : 870}px;margin-inline:auto}
.chat{background:linear-gradient(145deg,#102318,#1F3D2E 58%,#0b1711)}.chat .grid{position:absolute;z-index:3;inset-inline:${isWide ? 90 : 58}px;inset-block:${isWide ? 145 : 135}px ${isWide ? 70 : 70}px;display:grid;grid-template-columns:${isWide ? '1fr 480px' : '1fr'};grid-template-rows:${isWide ? '1fr' : 'auto 1fr'};gap:${isWide ? 56 : 26}px;align-items:center}.chat .phone{justify-self:center;width:${isWide ? 410 : isStory ? 470 : 330}px;height:${isWide ? 760 : isStory ? 940 : 660}px;border:14px solid #050807;border-radius:54px;overflow:hidden;box-shadow:0 36px 90px rgba(0,0,0,.52)}.chat .phone img{width:100%;height:100%;object-fit:cover;object-position:center top}.chat .copy{text-align:${isWide ? 'right' : 'center'}}
</style></head><body><main class="poster ${campaign.style}"><div class="top"><div class="site">app.alzbdh.com</div><img src="${logo}" alt="الزبدة"></div>${bodyFor(campaign, image, title)}</main></body></html>`;
}

function bodyFor(campaign, image, title) {
  if (campaign.style === 'map') {
    return `<section class="map-scene"><img src="${image}" alt="خريطة الزبدة في الرياض"></section><div class="callout">خيارات قريبة منك بدون لفّة</div><section class="card"><p class="eyebrow">${campaign.eyebrow}</p><h1>${title}</h1><p class="subtitle">${campaign.subtitle}</p><p class="body">${campaign.body}</p><div class="cta">${campaign.cta}</div></section>`;
  }
  if (campaign.style === 'compare') {
    return `<div class="bg"></div><section class="card without"><h2>بدون الزبدة</h2><p>قروبات، آراء متضاربة، ولفّة مواقع قبل كل قرار.</p></section><section class="card with"><h2>مع الزبدة</h2><p>${campaign.body}</p><div class="cta">${campaign.cta}</div></section>`;
  }
  if (campaign.style === 'product') {
    return `<section class="bottle"><img src="${image}" alt="عطر"></section><section class="card"><p class="eyebrow">${campaign.eyebrow}</p><h1>${title}</h1><p class="subtitle">${campaign.subtitle}</p><p class="body">${campaign.body}</p><div class="cta">${campaign.cta}</div></section>`;
  }
  return `<section class="grid"><div class="copy"><p class="eyebrow">${campaign.eyebrow}</p><h1>${title}</h1><p class="subtitle">${campaign.subtitle}</p><p class="body">${campaign.body}</p><div class="cta">${campaign.cta}</div></div><div class="phone"><img src="${image}" alt="شات تطبيق الزبدة"></div></section>`;
}

const browser = await chromium.launch({ headless: true });
try {
  for (const campaign of campaigns) {
    for (const [platform, format] of Object.entries(formats)) {
      const dir = path.join(outputRoot, campaign.vertical);
      const htmlDir = path.join(dir, 'html', format.dir);
      const imageDir = path.join(dir, 'images', format.dir);
      await fs.mkdir(htmlDir, { recursive: true });
      await fs.mkdir(imageDir, { recursive: true });
      const htmlPath = path.join(htmlDir, `${campaign.slug}.html`);
      const imagePath = path.join(imageDir, `${campaign.slug}.png`);
      await fs.writeFile(htmlPath, htmlFor(campaign, format, htmlDir));
      const page = await browser.newPage({ viewport: { width: format.width, height: format.height }, deviceScaleFactor: 1 });
      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: imagePath });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const rows = [];
for (const campaign of campaigns) {
  for (const platform of Object.keys(formats)) {
    rows.push({
      vertical: campaign.vertical,
      slug: campaign.slug,
      platform,
      image_path: `${outputRelPrefix}/${campaign.vertical}/images/${formats[platform].dir}/${campaign.slug}.png`,
      text: campaign.captions[platform],
      hashtags: campaign.hashtags[platform]
    });
  }
}

const csvEscape = (value) => {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

await fs.mkdir(path.join(outputRoot, 'copy'), { recursive: true });
await fs.writeFile(
  path.join(outputRoot, 'copy/captions.csv'),
  ['vertical,slug,platform,image_path,text,hashtags', ...rows.map((row) => ['vertical', 'slug', 'platform', 'image_path', 'text', 'hashtags'].map((key) => csvEscape(row[key])).join(','))].join('\n') + '\n'
);

await fs.writeFile(
  path.join(outputRoot, 'copy/captions-and-hashtags.md'),
  `# Marketing Content Captions\n\n${rows.map((row) => `## ${row.vertical} / ${row.slug} / ${row.platform}\n\nImage: \`${row.image_path}\`\n\n${row.text}\n\n${row.hashtags}`).join('\n\n')}\n`
);

await fs.writeFile(
  path.join(outputRoot, 'README.md'),
  `# Marketing Content\n\nCampaign-ready content for the current social cadence.\n\n## Verticals\n\n- \`places\`: Riyadh map/app decision ad.\n- \`travel\`: planning comparison account content.\n- \`perfumes\`: concise perfume decision ad.\n- \`mobile-app\`: direct app acquisition/chat ad.\n\nEach vertical has platform-specific images under \`images/\` and source HTML under \`html/\`.\n\n## Buffer note\n\nBuffer requires public media URLs. Local files here must be pushed or otherwise hosted before they can replace scheduled Buffer assets.\n`
);

const contactItems = campaigns.map((campaign) => ({
      file: path.join(outputRoot, campaign.vertical, 'images/instagram_1080x1350', `${campaign.slug}.png`),
  label: `${campaign.vertical}: ${campaign.slug}`
}));
const thumbW = 270;
const thumbH = 338;
const labelH = 28;
const gap = 28;
const pad = 20;
const width = pad * 2 + contactItems.length * thumbW + (contactItems.length - 1) * gap;
const height = pad * 2 + thumbH + labelH;
const composites = [];
for (let i = 0; i < contactItems.length; i += 1) {
  const x = pad + i * (thumbW + gap);
  const img = await sharp(contactItems[i].file).resize(thumbW, thumbH, { fit: 'cover', position: 'top' }).png().toBuffer();
  composites.push({ input: img, left: x, top: pad });
  const label = Buffer.from(`<svg width="${thumbW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg"><style>text{font:14px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;fill:#111}</style><text x="0" y="18">${escapeHtml(contactItems[i].label)}</text></svg>`);
  composites.push({ input: label, left: x, top: pad + thumbH + 8 });
}
await sharp({ create: { width, height, channels: 4, background: '#fff' } })
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(path.join(outputRoot, 'contact-sheet.png'));
