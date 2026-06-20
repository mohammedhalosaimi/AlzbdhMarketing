#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const githubBase = 'https://raw.githubusercontent.com/mohammedhalosaimi/AlzbdhMarketing/main';
const batch = '2026-06-20_scratch-tonight';
const outRoot = path.join(repo, 'content/buffer-batches', batch);

const formats = {
  x: { platform: 'X', dir: 'x_1600x900', width: 1600, height: 900 },
  instagram: { platform: 'Instagram', dir: 'instagram_1080x1350', width: 1080, height: 1350 },
  tiktok: { platform: 'TikTok', dir: 'tiktok_1080x1920', width: 1080, height: 1920 },
};

const posts = [
  {
    key: 'scratch-2026-06-20-2020-tiktok-cairo',
    time: '20:20',
    platform: 'tiktok',
    type: 'scratch-destination',
    theme: 'القاهرة',
    source: 'scratch-cairo-destination-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/destination/cairo.jpg',
    label: 'زبدة السفر',
    title: 'القاهرة',
    subtitle: 'أهرامات، نيل، ومشاوير تحتاج ترتيب.',
    body: 'لا تبدأ الرحلة من عشرات القوائم. خذ الزبدة: وين تروح، متى تتحرك، ووش تخلي لوقت أهدأ.',
    cta: 'خططها قبل الحجز',
    caption: 'القاهرة تحتاج ترتيب أكثر من حماس. الزبدة تختصر لك البداية: أهم الأماكن، توقيت الحركة، ووش يستاهل وقتك.',
    hashtags: '#الزبدة #زبدة_السفر #القاهرة #سفر',
    alt: 'زبدة السفر - القاهرة',
  },
  {
    key: 'scratch-2026-06-20-2040-x-jori-elite',
    time: '20:40',
    platform: 'x',
    type: 'scratch-place',
    theme: 'مطعم جوري ايليت',
    source: 'scratch-jori-elite-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/place/ChIJY9xjgOhV4xURCoz4rIbIDHY.jpg',
    label: 'زبدة الأماكن',
    title: 'مطعم جوري ايليت',
    subtitle: 'مكان قرار، مو بس صورة.',
    body: 'إذا بتروح مع ناس، الزبدة تساعدك تعرف الطبق الأقوى والملاحظة الأهم قبل ما تحجز.',
    cta: 'خذ الخلاصة',
    caption: 'مطعم جوري ايليت؟ لا تبدأ من الصور فقط. الزبدة تختصر لك وش يمدحون ووش تنتبه له قبل الزيارة.',
    hashtags: '#الزبدة #زبدة_الأماكن #مطاعم',
    alt: 'زبدة الأماكن - مطعم جوري ايليت',
  },
  {
    key: 'scratch-2026-06-20-2100-instagram-pelicana-atlanta',
    time: '21:00',
    platform: 'instagram',
    type: 'scratch-place',
    theme: 'Pelicana Chicken Atlanta',
    source: 'scratch-pelicana-atlanta-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/place/ChIJ-7n8wJ0F9YgRTJpNQS1gDnM.jpg',
    label: 'زبدة الأماكن',
    title: 'Pelicana Chicken Atlanta',
    subtitle: 'دجاج كوري؟ خذ الزبدة قبل الطلب.',
    body: 'الاختيار السريع مو دايم واضح. الزبدة تجمع المدح والتنبيه عشان تعرف هل المكان يناسب طلعتك.',
    cta: 'اعرف وش تطلب',
    caption: 'Pelicana Chicken Atlanta من الأماكن اللي تحتاج تعرف وش تطلب قبل ما تروح. الزبدة تختصر لك المدح والملاحظات بدون لف.',
    hashtags: '#الزبدة #زبدة_الأماكن #atlanta #مطاعم',
    alt: 'زبدة الأماكن - Pelicana Chicken Atlanta',
  },
  {
    key: 'scratch-2026-06-20-2120-tiktok-lhomme-ideal',
    time: '21:20',
    platform: 'tiktok',
    type: 'scratch-perfume',
    theme: 'لوم إيديال بارفان',
    source: 'scratch-lhomme-ideal-parfum-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/perfume/guerlain-l-homme-id-al-parfum-90803.jpg',
    label: 'زبدة العطور',
    title: 'لوم إيديال بارفان',
    subtitle: 'حلاوة لوز مع عمق أنيق.',
    body: 'قبل الشراء، اسأل: هل يناسب جوك؟ الزبدة تعطيك الانطباع المختصر بدل وصف طويل.',
    cta: 'خذ زبدة العطر',
    caption: 'لوم إيديال بارفان من غيرلان: عطر يحتاج تعرف مزاجه قبل التجربة. الزبدة تختصر لك الانطباع وهل يناسبك.',
    hashtags: '#الزبدة #زبدة_العطور #عطور #غيرلان',
    alt: 'زبدة العطور - لوم إيديال بارفان',
  },
  {
    key: 'scratch-2026-06-20-2140-x-rusty-pelican',
    time: '21:40',
    platform: 'x',
    type: 'scratch-place',
    theme: 'Rusty Pelican Miami',
    source: 'scratch-rusty-pelican-miami-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/place/ChIJc2PcMM612YgR_kdEdDDuTrQ.jpg',
    label: 'زبدة الأماكن',
    title: 'Rusty Pelican Miami',
    subtitle: 'الإطلالة مهمة، بس الأكل أهم.',
    body: 'الزبدة تفصل لك التجربة: وش يستاهل، وش ممكن يكون عادي، وهل المكان مناسب للمناسبة.',
    cta: 'قرر بثقة',
    caption: 'Rusty Pelican Miami مو بس إطلالة. الزبدة تختصر لك هل التجربة تستاهل، ووش تنتبه له قبل الحجز.',
    hashtags: '#الزبدة #زبدة_الأماكن #miami #مطاعم',
    alt: 'زبدة الأماكن - Rusty Pelican Miami',
  },
  {
    key: 'scratch-2026-06-20-2200-instagram-tilia',
    time: '22:00',
    platform: 'instagram',
    type: 'scratch-perfume',
    theme: 'تيليا',
    source: 'scratch-tilia-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/perfume/marc-antoine-barrois-tilia-91688.jpg',
    label: 'زبدة العطور',
    title: 'تيليا',
    subtitle: 'ناعم، مضيء، ومزاجه واضح.',
    body: 'العطر الجميل مو شرط يناسب كل شخص. الزبدة تختصر لك الإحساس العام ومتى يكون اختياره منطقي.',
    cta: 'شوف يناسبك؟',
    caption: 'تيليا من مارك أنطوان باروا: عطر هادئ ومضيء. الزبدة تعطيك الانطباع المختصر قبل التجربة.',
    hashtags: '#الزبدة #زبدة_العطور #عطور',
    alt: 'زبدة العطور - تيليا',
  },
  {
    key: 'scratch-2026-06-20-2220-tiktok-intercontinental-cairo',
    time: '22:20',
    platform: 'tiktok',
    type: 'scratch-place',
    theme: 'InterContinental Cairo Semiramis',
    source: 'scratch-intercontinental-cairo-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/place/ChIJz2GOEc9AWBQRPWWYVRruSq8.jpg',
    label: 'زبدة الأماكن',
    title: 'Semiramis Cairo',
    subtitle: 'فندق على النيل، والقرار يحتاج سياق.',
    body: 'الموقع مهم، لكن الزبدة تنظر للصورة كاملة: الخدمة، الإطلالة، القرب، وهل يناسب نوع رحلتك.',
    cta: 'اعرف الخلاصة',
    caption: 'InterContinental Cairo Semiramis على النيل. الزبدة تساعدك تعرف هل الموقع والخدمة يناسبون خطتك.',
    hashtags: '#الزبدة #زبدة_الأماكن #القاهرة #فنادق',
    alt: 'زبدة الأماكن - InterContinental Cairo Semiramis',
  },
  {
    key: 'scratch-2026-06-20-2240-x-tuberose-astrale',
    time: '22:40',
    platform: 'x',
    type: 'scratch-perfume',
    theme: 'توبيروز أسترال',
    source: 'scratch-tuberose-astrale-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/perfume/maison-crivelli-tub-reuse-astrale-90733.jpg',
    label: 'زبدة العطور',
    title: 'توبيروز أسترال',
    subtitle: 'زهري، لافت، ويحتاج ذوقه.',
    body: 'مو كل عطر قوي يعني مناسب. الزبدة تختصر لك: الإحساس، المناسبة، وهل يستاهل التجربة.',
    cta: 'اقرأ الزبدة',
    caption: 'توبيروز أسترال من Maison Crivelli: عطر زهري لافت. الزبدة تختصر لك هل يناسبك قبل الشراء.',
    hashtags: '#الزبدة #زبدة_العطور #عطور',
    alt: 'زبدة العطور - توبيروز أسترال',
  },
  {
    key: 'scratch-2026-06-20-2300-instagram-hanoi-corner',
    time: '23:00',
    platform: 'instagram',
    type: 'scratch-place',
    theme: 'Hanoi Corner Restaurant',
    source: 'scratch-hanoi-corner-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/place/ChIJlR80_dG9NTERorHk3_x6wTQ.jpg',
    label: 'زبدة الأماكن',
    title: 'Hanoi Corner',
    subtitle: 'مطعم فيتنامي يحتاج طلب صح.',
    body: 'بدل تجربة عشوائية، خذ الزبدة: الطبق اللي عليه مدح، الملاحظة اللي تهمك، وهل المكان يناسبك.',
    cta: 'اختصر الطلب',
    caption: 'Hanoi Corner Restaurant: قبل ما تطلب، خذ الزبدة. وش يمدحون؟ وش تنتبه له؟ وهل المكان يناسب طلعتك؟',
    hashtags: '#الزبدة #زبدة_الأماكن #vietnamese #مطاعم',
    alt: 'زبدة الأماكن - Hanoi Corner Restaurant',
  },
  {
    key: 'scratch-2026-06-20-2320-tiktok-narcotic-delight',
    time: '23:20',
    platform: 'tiktok',
    type: 'scratch-perfume',
    theme: 'ناركوتيك ديلايت',
    source: 'scratch-narcotic-delight-night',
    image: 'content/monthly-batch/2026-07-06_to_2026-08-04/assets/source-images/perfume/initio-parfums-prives-narcotic-delight-89368.jpg',
    label: 'زبدة العطور',
    title: 'ناركوتيك ديلايت',
    subtitle: 'حلو، جريء، ومو لكل مزاج.',
    body: 'قبل ما تنجذب للاسم، شوف الزبدة: وش الإحساس؟ متى يلبس؟ وهل يناسب ذوقك؟',
    cta: 'خذ القرار',
    caption: 'ناركوتيك ديلايت من Initio: عطر جريء وحلو. الزبدة تختصر لك الإحساس وهل يناسبك.',
    hashtags: '#الزبدة #زبدة_العطور #عطور #initio',
    alt: 'زبدة العطور - ناركوتيك ديلايت',
  },
];

function relFrom(fromDir, targetPath) {
  return path.relative(fromDir, targetPath).replaceAll(path.sep, '/');
}

function absRepoPath(relativePath) {
  return path.join(repo, relativePath);
}

function relToRepo(absPath) {
  return path.relative(repo, absPath).replaceAll(path.sep, '/');
}

function cleanGeneratedHtml(html) {
  return html.replace(/[ \t]+$/gm, '');
}

function publicUrl(relativePath) {
  return `${githubBase}/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function posterHtml(post, format, htmlDir) {
  const font400 = relFrom(htmlDir, absRepoPath('content/travel/assets/fonts/Changa-400.ttf'));
  const font700 = relFrom(htmlDir, absRepoPath('content/travel/assets/fonts/Changa-700.ttf'));
  const font800 = relFrom(htmlDir, absRepoPath('content/travel/assets/fonts/Changa-800.ttf'));
  const logo = relFrom(htmlDir, absRepoPath('brand/logos/logo-white.svg'));
  const image = relFrom(htmlDir, absRepoPath(post.image));
  const isWide = format.width > format.height;
  const isStory = format.height > 1500;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    @font-face{font-family:Changa;font-weight:400;src:url("${font400}") format("truetype");font-display:block}
    @font-face{font-family:Changa;font-weight:700;src:url("${font700}") format("truetype");font-display:block}
    @font-face{font-family:Changa;font-weight:800;src:url("${font800}") format("truetype");font-display:block}
    *{box-sizing:border-box}
    html,body{margin:0;width:${format.width}px;height:${format.height}px;overflow:hidden}
    body{font-family:Changa,system-ui,sans-serif;background:#102318;color:#FDFBF7}
    .poster{position:relative;width:100%;height:100%;overflow:hidden;background:#102318}
    .photo{position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(5,14,9,.18),rgba(5,14,9,.30) 38%,rgba(5,14,9,.82)),linear-gradient(90deg,rgba(16,35,24,.72),rgba(16,35,24,.20) 48%,rgba(16,35,24,.78)),url("${image}");background-size:cover;background-position:center;filter:saturate(1.05) contrast(1.03)}
    .top{position:absolute;z-index:2;top:${isStory ? 54 : 44}px;left:${isWide ? 66 : 50}px;right:${isWide ? 66 : 50}px;display:flex;align-items:center;justify-content:space-between}
    .top img{width:${isWide ? 146 : 126}px;filter:drop-shadow(0 4px 18px rgba(0,0,0,.48))}
    .site{direction:ltr;font-size:${isWide ? 24 : 23}px;font-weight:800;text-shadow:0 5px 18px rgba(0,0,0,.55)}
    .content{position:absolute;z-index:2;left:${isWide ? 72 : 54}px;right:${isWide ? 72 : 54}px;bottom:${isWide ? 56 : 64}px;display:grid;grid-template-columns:${isWide ? '1fr 1fr' : '1fr'};gap:${isWide ? 34 : 24}px;align-items:end}
    .panel{border-radius:8px;background:rgba(16,35,24,.76);border:1px solid rgba(232,196,107,.54);box-shadow:0 28px 70px rgba(0,0,0,.34);padding:${isWide ? '30px 36px' : isStory ? '38px 38px' : '34px 34px'};backdrop-filter:blur(2px)}
    .label{display:inline-flex;border-radius:999px;background:rgba(232,196,107,.16);border:1px solid rgba(232,196,107,.56);color:#E8C46B;padding:8px 16px;font-size:${isWide ? 23 : 24}px;font-weight:800}
    h1{margin:18px 0 8px;font-size:${isWide ? 72 : isStory ? 78 : 62}px;line-height:1.08;font-weight:800;letter-spacing:0;text-shadow:0 8px 30px rgba(0,0,0,.55);max-height:${isWide ? 166 : isStory ? 250 : 190}px;overflow:hidden}
    .subtitle{font-size:${isWide ? 30 : 31}px;line-height:1.24;font-weight:800;color:#E8C46B;margin-bottom:12px;max-height:${isWide ? 82 : 102}px;overflow:hidden}
    .body{font-size:${isWide ? 27 : isStory ? 31 : 27}px;line-height:1.46;font-weight:700;color:#F4EFE6;max-height:${isWide ? 170 : isStory ? 310 : 220}px;overflow:hidden}
    .cta{display:inline-flex;margin-top:22px;background:#E8C46B;color:#102318;border-radius:8px;padding:12px 19px;font-size:${isWide ? 24 : 25}px;font-weight:800}
    .side{display:${isWide ? 'block' : 'none'};align-self:stretch;border-radius:8px;border:1px solid rgba(232,196,107,.24);background:linear-gradient(135deg,rgba(253,251,247,.10),rgba(16,35,24,.18));min-height:292px;position:relative;overflow:hidden}
    .side:before{content:"";position:absolute;left:42px;bottom:42px;width:210px;height:210px;border:26px solid rgba(232,196,107,.28);border-radius:50%}
    .side:after{content:"";position:absolute;left:42px;right:42px;bottom:34px;height:8px;border-radius:999px;background:#E8C46B}
    .arc{position:absolute;z-index:1;left:${isWide ? 70 : 36}px;bottom:${isWide ? 48 : 38}px;width:${isWide ? 250 : 210}px;height:${isWide ? 250 : 210}px;border:22px solid rgba(232,196,107,.36);border-radius:50%;opacity:.62}
  </style>
</head>
<body>
  <main class="poster">
    <div class="photo"></div>
    <div class="arc"></div>
    <div class="top"><div class="site">app.alzbdh.com</div><img src="${logo}" alt="الزبدة"></div>
    <section class="content">
      <div class="panel">
        <div class="label">${escapeHtml(post.label)}</div>
        <h1>${escapeHtml(post.title)}</h1>
        <div class="subtitle">${escapeHtml(post.subtitle)}</div>
        <div class="body">${escapeHtml(post.body)}</div>
        <div class="cta">${escapeHtml(post.cta)}</div>
      </div>
      <div class="side"></div>
    </section>
  </main>
</body>
</html>`;
}

async function fitText(page) {
  await page.evaluate(() => {
    const fit = (selector, minSize) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const style = window.getComputedStyle(el);
      let size = Number.parseFloat(style.fontSize);
      while ((el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) && size > minSize) {
        size -= 2;
        el.style.fontSize = `${size}px`;
      }
    };
    fit('h1', 38);
    fit('.subtitle', 22);
    fit('.body', 20);
  });
}

async function renderPost(browser, post) {
  const format = formats[post.platform];
  const htmlDir = path.join(outRoot, 'html', format.dir);
  const imageDir = path.join(outRoot, 'images', format.dir);
  await fs.mkdir(htmlDir, { recursive: true });
  await fs.mkdir(imageDir, { recursive: true });
  await fs.access(absRepoPath(post.image));

  const htmlPath = path.join(htmlDir, `${post.key}.html`);
  const imagePath = path.join(imageDir, `${post.key}.png`);
  await fs.writeFile(htmlPath, cleanGeneratedHtml(posterHtml(post, format, htmlDir)));

  const page = await browser.newPage({ viewport: { width: format.width, height: format.height }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  await fitText(page);
  await page.screenshot({ path: imagePath });
  await page.close();
  return { format, imagePath };
}

async function main() {
  await fs.rm(outRoot, { recursive: true, force: true });
  await fs.mkdir(outRoot, { recursive: true });
  const rows = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const post of posts) {
      const { format, imagePath } = await renderPost(browser, post);
      const relImage = relToRepo(imagePath);
      rows.push({
        date: '2026-06-20',
        time_riyadh: post.time,
        theme: post.theme,
        content_type: post.type,
        source_id: post.source,
        platform: format.platform,
        channel_kind: 'scratch-tonight',
        image_path: relImage,
        public_url: publicUrl(relImage),
        text: post.caption,
        hashtags: post.hashtags,
        buffer_status: 'ready',
        post_key: post.key,
        alt_text: post.alt,
      });
    }
  } finally {
    await browser.close();
  }

  const headers = ['date', 'time_riyadh', 'theme', 'content_type', 'source_id', 'platform', 'channel_kind', 'image_path', 'public_url', 'text', 'hashtags', 'buffer_status', 'post_key', 'alt_text'];
  await fs.writeFile(path.join(outRoot, 'plan.json'), `${JSON.stringify(rows, null, 2)}\n`);
  await fs.writeFile(path.join(outRoot, 'plan.csv'), `${headers.join(',')}\n${rows.map((row) => headers.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`);
  await fs.writeFile(path.join(outRoot, 'README.md'), `# Scratch Tonight Buffer Batch\n\nDate: 2026-06-20\nWindow: 20:20-23:20 Asia/Riyadh\n\nGenerated from scratch without using the template renderer.\n\n${rows.map((row) => `- ${row.time_riyadh} ${row.platform}: ${row.theme}`).join('\n')}\n`);
  console.log(`Rendered ${rows.length} scratch post(s) to ${relToRepo(outRoot)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
