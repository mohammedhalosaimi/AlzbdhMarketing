import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const dataPath = path.join(root, 'data/mobile-app-campaign.json');
const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));

const formats = {
  x: { dir: 'x_1600x900', width: 1600, height: 900 },
  instagram: { dir: 'instagram_1080x1350', width: 1080, height: 1350 },
  tiktok: { dir: 'tiktok_1080x1920', width: 1080, height: 1920 }
};

const screenshotsDir = path.join(root, 'assets/screenshots');
await fs.mkdir(screenshotsDir, { recursive: true });

async function download(url, dest) {
  try {
    await fs.access(dest);
    return;
  } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buffer);
}

for (let i = 0; i < (data.screenshot_urls ?? []).length; i += 1) {
  await download(data.screenshot_urls[i], path.join(screenshotsDir, `app-store-${i + 1}.jpg`));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function rel(fromDir, target) {
  return path.relative(fromDir, target).replaceAll(path.sep, '/');
}

function htmlFor(campaign, format) {
  const htmlDir = path.join(root, 'html', format.dir);
  const screenshot = campaign.screenshot_file
    ? rel(htmlDir, path.join(root, campaign.screenshot_file))
    : rel(htmlDir, path.join(screenshotsDir, `app-store-${campaign.screenshot + 1}.jpg`));
  const logo = rel(htmlDir, path.join(root, 'assets/logos/logo-white.svg'));
  const font400 = rel(htmlDir, path.join(root, 'assets/fonts/Changa-400.ttf'));
  const font600 = rel(htmlDir, path.join(root, 'assets/fonts/Changa-600.ttf'));
  const font700 = rel(htmlDir, path.join(root, 'assets/fonts/Changa-700.ttf'));
  const font800 = rel(htmlDir, path.join(root, 'assets/fonts/Changa-800.ttf'));
  const isX = format.width > format.height;
  const scale = isX ? 'wide' : format.height > 1500 ? 'story' : 'post';
  const style = campaign.style ?? 'chat';
  const titleHtml = escapeHtml(campaign.title).replaceAll('الزبدة', '<span class="accent">الزبدة</span>');
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
@font-face{font-family:Changa;font-weight:400;src:url("${font400}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:600;src:url("${font600}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:700;src:url("${font700}") format("truetype");font-display:block}
@font-face{font-family:Changa;font-weight:800;src:url("${font800}") format("truetype");font-display:block}
*{box-sizing:border-box}
html,body{margin:0;width:${format.width}px;height:${format.height}px;overflow:hidden}
body{font-family:Changa,system-ui,sans-serif;background:#102318;color:#FDFBF7}
.poster{position:relative;width:100%;height:100%;overflow:hidden;background:
  radial-gradient(circle at 18% 14%, rgba(217,181,109,.18), transparent 31%),
  linear-gradient(135deg,#102318 0%,#1F3D2E 52%,#0B1711 100%)}
.poster.style-map{background:
  radial-gradient(circle at 76% 18%, rgba(124,199,160,.22), transparent 33%),
  linear-gradient(145deg,#0D2117 0%,#1E4636 48%,#102318 100%)}
.poster.style-detail{background:
  radial-gradient(circle at 74% 75%, rgba(240,217,155,.20), transparent 32%),
  linear-gradient(130deg,#12261A 0%,#0C1812 42%,#243621 100%)}
.poster:before{content:"";position:absolute;inset:0;background:
  linear-gradient(90deg,rgba(253,251,247,.045) 1px,transparent 1px),
  linear-gradient(0deg,rgba(253,251,247,.035) 1px,transparent 1px);
  background-size:56px 56px;mask-image:linear-gradient(180deg,rgba(0,0,0,.7),rgba(0,0,0,.08))}
.poster.style-map:before{background-size:42px 42px;opacity:.68}
.poster.style-detail:before{background-size:76px 76px;opacity:.55}
.top{position:absolute;z-index:5;top:${isX ? 54 : 52}px;left:${isX ? 72 : 58}px;right:${isX ? 72 : 58}px;display:flex;align-items:center;justify-content:space-between}
.logo{width:${isX ? 142 : 136}px;filter:drop-shadow(0 7px 20px rgba(0,0,0,.45))}
.site{direction:ltr;font-size:${isX ? 26 : 25}px;font-weight:700;color:#E9F1EA;text-shadow:0 3px 14px rgba(0,0,0,.45)}
.content{position:absolute;z-index:3;display:grid;gap:${isX ? 40 : 30}px;align-items:center;
  ${isX ? 'grid-template-columns:1fr 520px;left:88px;right:88px;top:132px;bottom:74px;' : 'grid-template-rows:auto 1fr;left:58px;right:58px;top:138px;bottom:62px;'}}
.style-map .content{${isX ? 'grid-template-columns:560px 1fr;' : 'top:116px;bottom:52px;'}}
.style-detail .content{${isX ? 'grid-template-columns:1fr 520px;' : 'top:126px;bottom:58px;'}}
.copy{min-width:0;${isX ? 'padding-left:28px;' : 'text-align:center;'}}
.style-map .copy{${isX ? 'order:2;padding-left:0;padding-right:24px;text-align:right;' : ''}}
.style-map .visual{${isX ? 'order:1;' : ''}}
.hook{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(240,217,155,.42);background:rgba(240,217,155,.12);color:#F0D99B;border-radius:999px;padding:${isX ? '8px 20px' : '8px 18px'};font-size:${isX ? 25 : 25}px;font-weight:800;line-height:1.25}
h1{margin:${isX ? '24px 0 8px' : '20px auto 8px'};max-width:${isX ? 820 : 920}px;font-size:${isX ? 86 : scale === 'story' ? 90 : 78}px;line-height:1.08;font-weight:800;letter-spacing:0;color:#FDFBF7;text-shadow:0 8px 30px rgba(0,0,0,.45)}
h1 .accent{color:${campaign.accent};display:inline}
.subtitle{font-size:${isX ? 38 : 35}px;font-weight:700;line-height:1.22;color:#E5EDE7;text-shadow:0 4px 18px rgba(0,0,0,.42)}
.body{margin:${isX ? '24px 0 0' : '18px auto 0'};max-width:${isX ? 720 : 840}px;font-size:${isX ? 31 : 31}px;line-height:1.55;font-weight:600;color:#F4EFE6}
.chips{display:flex;flex-wrap:wrap;gap:12px;${isX ? 'margin-top:26px;' : 'margin:24px auto 0;justify-content:center;'}}
.chip{border-radius:999px;background:rgba(253,251,247,.10);border:1px solid rgba(253,251,247,.20);padding:9px 15px;font-size:${isX ? 22 : 23}px;font-weight:700;color:#E5EDE7}
.cta{display:inline-flex;margin-top:${isX ? 28 : 26}px;background:${campaign.accent};color:#102318;border-radius:8px;padding:${isX ? '13px 22px' : '13px 22px'};font-size:${isX ? 26 : 27}px;font-weight:800;line-height:1.25;box-shadow:0 16px 38px rgba(0,0,0,.28)}
.visual{position:relative;display:flex;align-items:center;justify-content:center;min-height:0;${isX ? '' : 'height:100%;'}}
.phone{position:relative;width:${isX ? 390 : scale === 'story' ? 452 : 318}px;height:${isX ? 752 : scale === 'story' ? 974 : 690}px;border-radius:${isX ? 54 : 56}px;background:#050807;padding:${isX ? 16 : 15}px;box-shadow:0 36px 90px rgba(0,0,0,.52), inset 0 0 0 2px rgba(255,255,255,.08);overflow:hidden}
.style-map .phone{width:${isX ? 420 : scale === 'story' ? 480 : 340}px;height:${isX ? 810 : scale === 'story' ? 1038 : 736}px;transform:${isX ? 'rotate(-2deg)' : 'none'}}
.style-detail .phone{width:${isX ? 410 : scale === 'story' ? 438 : 320}px;height:${isX ? 790 : scale === 'story' ? 944 : 692}px;transform:${isX ? 'rotate(1.5deg)' : 'none'}}
.screen{width:100%;height:100%;border-radius:${isX ? 40 : 44}px;object-fit:cover;object-position:center top;display:block}
.chat{position:absolute;z-index:4;left:${isX ? 22 : 18}px;right:${isX ? 22 : 18}px;bottom:${isX ? 72 : 44}px;display:${campaign.screenshot_file ? 'none' : 'grid'};gap:12px;direction:rtl}
.bubble{padding:${isX ? '13px 16px' : '13px 15px'};border-radius:8px;font-size:${isX ? 21 : scale === 'story' ? 24 : 20}px;font-weight:700;line-height:1.34;box-shadow:0 14px 34px rgba(0,0,0,.32)}
.bubble.user{background:#FDFBF7;color:#102318;justify-self:end}
.bubble.app{background:rgba(31,61,46,.92);border:1px solid rgba(240,217,155,.34);color:#FDFBF7;justify-self:start}
.badge{display:none}
.badge strong{display:block;color:${campaign.accent};font-size:${isX ? 27 : scale === 'story' ? 30 : 25}px;line-height:1.05}
.badge span{display:block;color:#E5EDE7;font-size:${isX ? 18 : scale === 'story' ? 20 : 17}px;font-weight:700;margin-top:3px}
.foot{position:absolute;z-index:5;left:${isX ? 72 : 58}px;right:${isX ? 72 : 58}px;bottom:${isX ? 28 : 26}px;display:flex;align-items:center;justify-content:space-between;color:#CFE0D5;font-size:${isX ? 19 : 21}px;font-weight:700}
.ios{direction:rtl}
@media(max-width:1200px){h1{font-size:${scale === 'story' ? 82 : 72}px}.phone{width:${scale === 'story' ? 472 : 410}px}}
</style>
</head>
<body>
<main class="poster style-${escapeHtml(style)}">
  <div class="top">
    <div class="site">alzbdh.com</div>
    <img class="logo" src="${logo}" alt="الزبدة">
  </div>
  <section class="content">
    <div class="copy">
      <div class="hook">${escapeHtml(campaign.hook)}</div>
      <h1>${titleHtml}</h1>
      <div class="subtitle">${escapeHtml(campaign.subtitle)}</div>
      <p class="body">${escapeHtml(campaign.body)}</p>
      <div class="chips">
        <span class="chip">الرياض فقط</span>
        <span class="chip">مطاعم</span>
        <span class="chip">كافيهات</span>
        <span class="chip">عيادات</span>
      </div>
      <div class="cta">${escapeHtml(campaign.cta)}</div>
    </div>
    <div class="visual">
      <div class="phone">
        <img class="screen" src="${screenshot}" alt="">
        <div class="chat">
          <div class="bubble user">${escapeHtml(campaign.prompt)}</div>
          <div class="bubble app">${escapeHtml(campaign.answer)}</div>
        </div>
        <div class="badge"><strong>iOS</strong><span>متوفر الآن</span></div>
      </div>
    </div>
  </section>
  <div class="foot">
    <span class="ios">حمّل تطبيق الزبدة</span>
    <span>app.alzbdh.com</span>
  </div>
</main>
</body>
</html>`;
}

const browser = await chromium.launch({ headless: true });
try {
  for (const campaign of data.campaigns) {
    for (const [platform, format] of Object.entries(formats)) {
      const htmlDir = path.join(root, 'html', format.dir);
      const imageDir = path.join(root, 'images', format.dir);
      await fs.mkdir(htmlDir, { recursive: true });
      await fs.mkdir(imageDir, { recursive: true });
      const htmlPath = path.join(htmlDir, `${campaign.slug}.html`);
      const imagePath = path.join(imageDir, `${campaign.slug}.png`);
      await fs.writeFile(htmlPath, htmlFor(campaign, format));
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
for (const campaign of data.campaigns) {
  rows.push({
    slug: campaign.slug,
    platform: 'Instagram',
    text: `${campaign.title}\n\n${campaign.body} تطبيق الزبدة حالياً يركز على الرياض: مطاعم، كافيهات، وعيادات، ومعه شات يساعدك تختصر القرار.\n\nحمّله من App Store:\n${data.sources.ios_app_store}`,
    hashtags: '#الزبدة #تطبيق_الزبدة #الرياض #مطاعم_الرياض #كافيهات_الرياض #عيادات_الرياض'
  });
  rows.push({
    slug: campaign.slug,
    platform: 'TikTok',
    text: `${campaign.hook}\n\n${campaign.title}: ${campaign.body}\n\nحمّل تطبيق الزبدة على iOS:\n${data.sources.ios_app_store}`,
    hashtags: '#الزبدة #تطبيق_الزبدة #الرياض #وين_نروح #مطاعم_الرياض #كافيهات_الرياض'
  });
  rows.push({
    slug: campaign.slug,
    platform: 'X',
    text: `${campaign.title}: ${campaign.body}\n\nتطبيق الزبدة على iOS يساعدك تختار مطاعم، كافيهات، وعيادات في الرياض بدون حوسة.\n\n${data.sources.ios_app_store}`,
    hashtags: '#الزبدة #تطبيق_الزبدة #الرياض'
  });
}

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

await fs.writeFile(
  path.join(root, 'copy/captions.csv'),
  ['slug,platform,text,hashtags', ...rows.map((row) => ['slug', 'platform', 'text', 'hashtags'].map((key) => csvEscape(row[key])).join(','))].join('\n') + '\n'
);

await fs.writeFile(
  path.join(root, 'copy/captions-and-hashtags.md'),
  `# Mobile App Captions\n\n${rows.map((row) => `## ${row.slug} - ${row.platform}\n\n${row.text}\n\n${row.hashtags}`).join('\n\n')}\n`
);
