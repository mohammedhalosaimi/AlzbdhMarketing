import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const outputPath = path.join(repo, 'content/ad-campaigns/variation-gallery.html');
const galleryDir = path.dirname(outputPath);

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const groups = [
  {
    key: 'perfumes',
    title: 'العطور',
    eyebrow: 'Perfumes',
    description: 'كل تنويعات العطور الفعلية: منشورات الحساب، إعلانات العطور، وستوري الدفعات القادمة.',
    roots: [
      'content/perfumes/images',
      'content/marketing ad/perfumes/images',
      'content/two-week-batch/2026-06-22_to_2026-07-05/stories/images',
      'content/monthly-batch'
    ],
    match: (relPath) => relPath.includes('/perfumes/') || /-perfumes-/.test(relPath) || /\/perfume-/.test(relPath)
  },
  {
    key: 'places',
    title: 'الأماكن',
    eyebrow: 'Places',
    description: 'مطاعم، كافيهات، معالم، وخرائط الرياض باستخدام الصور والهوية الموجودة فعلياً في الحساب.',
    roots: [
      'content/places/images',
      'content/marketing ad/places/images',
      'content/two-week-batch/2026-06-22_to_2026-07-05/stories/images',
      'content/monthly-batch'
    ],
    match: (relPath) => relPath.includes('/places/') || /-places-/.test(relPath) || /\/place-/.test(relPath)
  },
  {
    key: 'destinations',
    title: 'الوجهات',
    eyebrow: 'Destinations',
    description: 'تنويعات زبدة السفر والوجهات بصيغ X وInstagram وTikTok والستوري.',
    roots: [
      'content/travel/images',
      'content/marketing ad/travel/images',
      'content/two-week-batch/2026-06-22_to_2026-07-05/stories/images',
      'content/monthly-batch'
    ],
    match: (relPath) => relPath.includes('/travel/') || /-travel-/.test(relPath) || /\/destination-/.test(relPath)
  },
  {
    key: 'ads',
    title: 'الإعلانات والمحتوى التسويقي',
    eyebrow: 'Marketing ads',
    description: 'إعلانات تطبيق الزبدة، الشات، الخريطة، ومحتوى الاستحواذ المباشر على المستخدمين.',
    roots: [
      'content/mobile-app/images',
      'content/marketing ad/mobile-app/images'
    ],
    match: (relPath) => relPath.includes('/mobile-app/')
  }
];

async function walk(relativeRoot) {
  const root = path.join(repo, relativeRoot);
  const files = [];

  async function visit(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await visit(abs);
      } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
        files.push(abs);
      }
    }
  }

  await visit(root);
  return files;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function titleCase(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^20\d{2}-\d{2}-\d{2}-/, '')
    .replace(/^ChIJ[A-Za-z0-9_-]+$/, 'مكان من الدفعة')
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function sourceLabel(relPath) {
  if (relPath.includes('content/marketing ad/')) return 'Paid marketing';
  if (relPath.includes('content/two-week-batch/')) return 'Upcoming batch story';
  if (relPath.includes('content/monthly-batch/')) return 'Next month batch';
  if (relPath.includes('content/mobile-app/')) return 'Mobile app';
  if (relPath.includes('content/perfumes/')) return 'Account perfume';
  if (relPath.includes('content/places/')) return 'Account place';
  if (relPath.includes('content/travel/')) return 'Account destination';
  return 'Asset';
}

function platformLabel(relPath) {
  if (relPath.includes('x_1600x900')) return 'X 1600x900';
  if (relPath.includes('instagram_1080x1350')) return 'Instagram 1080x1350';
  if (relPath.includes('tiktok_1080x1920')) return 'TikTok 1080x1920';
  if (relPath.includes('/stories/images/')) return 'Story 1080x1920';
  return 'Image';
}

function aspectClass(relPath) {
  if (relPath.includes('x_1600x900')) return 'wide';
  if (relPath.includes('tiktok_1080x1920') || relPath.includes('/stories/images/')) return 'vertical';
  return 'portrait';
}

function itemFrom(abs, groupKey) {
  const relPath = path.relative(repo, abs).replaceAll(path.sep, '/');
  const imageSrc = path.relative(galleryDir, abs).replaceAll(path.sep, '/');
  const file = path.basename(abs);
  const parent = path.basename(path.dirname(abs));
  const title = titleCase(file);

  return {
    groupKey,
    relPath,
    imageSrc,
    title,
    platform: platformLabel(relPath),
    source: sourceLabel(relPath),
    aspect: aspectClass(relPath),
    sortKey: `${sourceLabel(relPath)} ${parent} ${file}`
  };
}

const seen = new Set();
const groupedItems = {};

for (const group of groups) {
  const items = [];
  for (const root of group.roots) {
    const files = await walk(root);
    for (const abs of files) {
      const relPath = path.relative(repo, abs).replaceAll(path.sep, '/');
      const key = `${group.key}:${relPath}`;
      if (seen.has(key) || !group.match(relPath)) continue;
      seen.add(key);
      items.push(itemFrom(abs, group.key));
    }
  }
  groupedItems[group.key] = items.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

const allItems = Object.values(groupedItems).flat();

const nav = groups.map((group) => {
  const count = groupedItems[group.key].length;
  return `<a href="#${group.key}"><span>${escapeHtml(group.eyebrow)}</span><strong>${count}</strong></a>`;
}).join('');

function card(item) {
  return `<article class="asset-card ${item.aspect}">
    <div class="thumb">
      <img src="${escapeHtml(item.imageSrc)}" alt="${escapeHtml(item.title)}">
    </div>
    <div class="asset-info">
      <div class="chips">
        <span>${escapeHtml(item.platform)}</span>
        <span>${escapeHtml(item.source)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.relPath)}</p>
    </div>
  </article>`;
}

const sections = groups.map((group) => {
  const items = groupedItems[group.key];
  return `<section id="${group.key}">
    <div class="section-head">
      <div>
        <div class="eyebrow">${escapeHtml(group.eyebrow)}</div>
        <h2>${escapeHtml(group.title)}</h2>
        <p>${escapeHtml(group.description)}</p>
      </div>
      <strong>${items.length} صور فعلية</strong>
    </div>
    <div class="asset-grid">
      ${items.map(card).join('\n')}
    </div>
  </section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Alzbdh Real Social Variations</title>
  <style>
    @font-face {
      font-family: Changa;
      font-weight: 400;
      src: url("../travel/assets/fonts/Changa-400.ttf") format("truetype");
      font-display: block;
    }
    @font-face {
      font-family: Changa;
      font-weight: 700;
      src: url("../travel/assets/fonts/Changa-700.ttf") format("truetype");
      font-display: block;
    }
    @font-face {
      font-family: Changa;
      font-weight: 800;
      src: url("../travel/assets/fonts/Changa-800.ttf") format("truetype");
      font-display: block;
    }
    :root {
      --green: #1F3D2E;
      --deep: #102318;
      --paper: #FDFBF7;
      --cream: #F7F3EA;
      --gold: #E8C46B;
      --muted: #647166;
      --line: rgba(31, 61, 46, .14);
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--cream);
      color: var(--deep);
      font-family: Changa, Tahoma, Arial, sans-serif;
      letter-spacing: 0;
    }
    header {
      min-height: 56vh;
      display: grid;
      align-items: end;
      padding: 42px clamp(20px, 5vw, 72px);
      background:
        linear-gradient(135deg, rgba(16,35,24,.94), rgba(31,61,46,.88)),
        url("../mobile-app/assets/screenshots-ar/ad-ready/map-only-ar.png");
      background-size: cover;
      background-position: center top;
      color: var(--paper);
    }
    .hero {
      width: min(1220px, 100%);
      margin-inline: auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 24px;
      align-items: end;
    }
    .brand {
      width: 154px;
      display: block;
      margin-bottom: 22px;
    }
    .label {
      display: inline-flex;
      width: fit-content;
      border: 1px solid rgba(232,196,107,.55);
      color: var(--gold);
      border-radius: 999px;
      padding: 7px 14px;
      font-weight: 800;
      direction: ltr;
    }
    h1 {
      margin: 16px 0 12px;
      max-width: 900px;
      font-size: clamp(42px, 6vw, 84px);
      line-height: 1.05;
      letter-spacing: 0;
      font-weight: 800;
    }
    header p {
      max-width: 780px;
      margin: 0;
      color: #F4EFE6;
      font-size: clamp(18px, 2vw, 25px);
      line-height: 1.55;
      font-weight: 700;
    }
    .count {
      background: rgba(253,251,247,.12);
      border: 1px solid rgba(253,251,247,.24);
      border-radius: 8px;
      padding: 20px 24px;
      min-width: 210px;
    }
    .count strong {
      display: block;
      color: var(--gold);
      font-size: 62px;
      line-height: 1;
      direction: ltr;
    }
    .count span {
      display: block;
      margin-top: 8px;
      font-size: 18px;
      font-weight: 800;
    }
    nav {
      position: sticky;
      top: 0;
      z-index: 10;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: var(--paper);
      border-bottom: 1px solid var(--line);
    }
    nav a {
      min-width: 0;
      padding: 14px clamp(12px, 2vw, 24px);
      color: var(--deep);
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      border-inline-start: 1px solid var(--line);
      font-weight: 800;
    }
    nav span { color: var(--muted); direction: ltr; }
    nav strong { color: var(--green); direction: ltr; }
    section {
      padding: 46px clamp(18px, 4vw, 58px) 62px;
    }
    .section-head {
      width: min(1480px, 100%);
      margin: 0 auto 24px;
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 20px;
    }
    .eyebrow {
      direction: ltr;
      text-align: right;
      color: #B77816;
      font-size: 16px;
      font-weight: 800;
      text-transform: uppercase;
    }
    h2 {
      margin: 2px 0 8px;
      font-size: clamp(34px, 4vw, 58px);
      line-height: 1.1;
      letter-spacing: 0;
    }
    .section-head p {
      margin: 0;
      max-width: 780px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
      font-weight: 700;
    }
    .section-head strong {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px 14px;
      white-space: nowrap;
      color: var(--green);
      font-weight: 800;
    }
    .asset-grid {
      width: min(1480px, 100%);
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 18px;
    }
    .asset-card {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 18px 46px rgba(16,35,24,.08);
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .thumb {
      background: #EDE7DA;
      min-height: 280px;
      display: grid;
      place-items: center;
      padding: 10px;
    }
    .thumb img {
      display: block;
      max-width: 100%;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 6px;
      background: #0D1E15;
      box-shadow: 0 10px 28px rgba(16,35,24,.18);
    }
    .wide .thumb { aspect-ratio: 16 / 9; }
    .portrait .thumb { aspect-ratio: 4 / 5; }
    .vertical .thumb { aspect-ratio: 9 / 16; }
    .asset-info {
      padding: 13px 14px 15px;
      display: grid;
      gap: 8px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      direction: ltr;
      justify-content: flex-end;
    }
    .chips span {
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 12px;
      color: var(--green);
      background: #fff;
      font-weight: 800;
    }
    h3 {
      margin: 0;
      color: var(--deep);
      font-size: 20px;
      line-height: 1.25;
      font-weight: 800;
      letter-spacing: 0;
    }
    .asset-info p {
      margin: 0;
      color: var(--muted);
      direction: ltr;
      text-align: left;
      font-size: 12px;
      line-height: 1.45;
      overflow-wrap: anywhere;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    footer {
      padding: 28px clamp(18px, 4vw, 58px) 42px;
      background: var(--paper);
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-weight: 700;
    }
    footer div {
      width: min(1480px, 100%);
      margin-inline: auto;
      display: flex;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }
    @media (max-width: 860px) {
      .hero { grid-template-columns: 1fr; }
      nav { grid-template-columns: 1fr 1fr; }
      .section-head { display: block; }
      .section-head strong { display: inline-flex; margin-top: 14px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="hero">
      <div>
        <img class="brand" src="../../brand/logos/logo-white.svg" alt="الزبدة">
        <span class="label">Real generated social assets</span>
        <h1>تنويعات المنشورات الفعلية</h1>
        <p>هذه الصفحة تعرض الصور الحقيقية الموجودة في ملفات التسويق: نفس الهوية، نفس الخط، نفس الصور، ونفس صيغ المنصات. لا توجد بطاقات وهمية هنا.</p>
      </div>
      <aside class="count">
        <strong>${allItems.length}</strong>
        <span>صورة فعلية</span>
      </aside>
    </div>
  </header>
  <nav>${nav}</nav>
  ${sections}
  <footer>
    <div>
      <span>Generated from existing image assets in content/*/images.</span>
      <span>Buffer scheduling still requires duplicate and time checks.</span>
    </div>
  </footer>
</body>
</html>`;

await fs.writeFile(outputPath, html);
console.log(`Wrote ${path.relative(repo, outputPath)} with ${allItems.length} real image assets.`);
for (const group of groups) {
  console.log(`- ${group.key}: ${groupedItems[group.key].length}`);
}
