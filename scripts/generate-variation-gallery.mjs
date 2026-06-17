import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const sourcePath = path.join(repo, 'content/ad-campaigns/app-screenshot-variation-bank.md');
const outputPath = path.join(repo, 'content/ad-campaigns/variation-gallery.html');

const markdown = await fs.readFile(sourcePath, 'utf8');

function cleanCell(value) {
  return value
    .trim()
    .replace(/^`|`$/g, '')
    .replaceAll('`<br>`', '<br>')
    .replaceAll('<br>', '\n')
    .replaceAll('**', '')
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatText(value) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

function categoryFor(id) {
  if (id.includes('-PF-')) return 'perfumes';
  if (id.includes('-PL-')) return 'places';
  if (id.includes('-TV-')) return 'destinations';
  return 'ads';
}

const rows = markdown
  .split('\n')
  .filter((line) => /^\| (ORG|AD)-/.test(line))
  .map((line) => {
    const cells = line.slice(1, -1).split('|').map(cleanCell);
    const [id, pattern, imageText, angleOrCaption, formatOrCta] = cells;
    return {
      id,
      pattern,
      imageText,
      body: angleOrCaption,
      detail: formatOrCta,
      mode: id.startsWith('AD-') ? 'Paid ad' : 'Organic',
      category: categoryFor(id)
    };
  });

const groups = [
  {
    key: 'perfumes',
    title: 'زبدة العطور',
    eyebrow: 'Perfumes',
    description: 'Organic perfume education plus paid perfume-decision ads.'
  },
  {
    key: 'places',
    title: 'زبدة الأماكن',
    eyebrow: 'Places',
    description: 'Riyadh places, map discovery, place-detail proof, and visit-decision content.'
  },
  {
    key: 'destinations',
    title: 'زبدة السفر',
    eyebrow: 'Destinations',
    description: 'Travel planning, destination comparison, itinerary, and pre-booking decision content.'
  },
  {
    key: 'ads',
    title: 'إعلانات التطبيق والمحتوى التسويقي',
    eyebrow: 'Other marketing ads',
    description: 'Mobile app acquisition, product education, chat/map proof, and direct-response ads.'
  }
];

const patternLabels = {
  'Identity opener': 'هوية',
  'Product hero': 'بطل المنتج',
  'Score/proof card': 'إثبات',
  'Summary quote': 'خلاصة',
  'Map/discovery': 'خريطة',
  Discovery: 'اكتشاف',
  'Praise/complaint split': 'مدح/تنبيه',
  'Tabs/features': 'مزايا',
  'Three-angle story': 'ثلاث زوايا'
};

const cardsFor = (key) => rows
  .filter((row) => row.category === key)
  .map((row) => {
    const pattern = patternLabels[row.pattern] || row.pattern;
    return `<article class="card ${row.mode === 'Paid ad' ? 'paid' : 'organic'}">
      <div class="meta">
        <span class="id">${escapeHtml(row.id)}</span>
        <span>${escapeHtml(row.mode)}</span>
        <span>${escapeHtml(pattern)}</span>
      </div>
      <div class="poster">
        <div class="brand">الزبدة</div>
        <h3>${formatText(row.imageText)}</h3>
        <div class="screen-lines">
          <span></span><span></span><span></span>
        </div>
      </div>
      <p>${formatText(row.body)}</p>
      <div class="detail">${formatText(row.detail)}</div>
    </article>`;
  })
  .join('\n');

const navItems = groups.map((group) => {
  const count = rows.filter((row) => row.category === group.key).length;
  return `<a href="#${group.key}"><span>${escapeHtml(group.eyebrow)}</span><strong>${count}</strong></a>`;
}).join('');

const sections = groups.map((group) => {
  const count = rows.filter((row) => row.category === group.key).length;
  return `<section id="${group.key}" class="band ${group.key}">
    <div class="section-head">
      <div>
        <div class="eyebrow">${escapeHtml(group.eyebrow)}</div>
        <h2>${escapeHtml(group.title)}</h2>
        <p>${escapeHtml(group.description)}</p>
      </div>
      <strong>${count} variations</strong>
    </div>
    <div class="grid">${cardsFor(group.key)}</div>
  </section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Alzbdh Social Variation Gallery</title>
  <style>
    :root {
      --green: #173527;
      --green-2: #23624c;
      --cream: #f7f2e8;
      --paper: #fffaf1;
      --gold: #d7a63a;
      --teal: #08747a;
      --tomato: #ca5941;
      --ink: #102118;
      --muted: #5e6d63;
      --line: rgba(23, 53, 39, .15);
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--cream);
      color: var(--ink);
      font-family: Changa, "Noto Sans Arabic", Tahoma, Arial, sans-serif;
      letter-spacing: 0;
    }
    header {
      min-height: 72vh;
      display: grid;
      align-items: end;
      padding: 48px clamp(24px, 5vw, 76px);
      background:
        linear-gradient(135deg, rgba(16, 33, 24, .86), rgba(35, 98, 76, .84)),
        repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 78px),
        var(--green);
      color: var(--paper);
    }
    .hero {
      max-width: 1180px;
      width: 100%;
      margin-inline: auto;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 32px;
      align-items: end;
    }
    .label {
      display: inline-flex;
      width: fit-content;
      padding: 8px 14px;
      border: 1px solid rgba(215, 166, 58, .48);
      color: #f2d38a;
      font-weight: 800;
      border-radius: 999px;
      font-size: 16px;
    }
    h1 {
      margin: 18px 0 16px;
      max-width: 880px;
      font-size: clamp(46px, 6vw, 86px);
      line-height: 1.05;
      font-weight: 800;
      letter-spacing: 0;
    }
    header p {
      max-width: 760px;
      margin: 0;
      color: #f0eadf;
      font-size: clamp(18px, 2vw, 25px);
      line-height: 1.65;
      font-weight: 600;
    }
    .summary {
      background: rgba(255, 250, 241, .1);
      border: 1px solid rgba(255, 250, 241, .2);
      border-radius: 8px;
      padding: 22px;
    }
    .summary strong {
      display: block;
      color: #f2d38a;
      font-size: 62px;
      line-height: 1;
    }
    .summary span {
      display: block;
      margin-top: 8px;
      color: #fffaf1;
      font-weight: 800;
      font-size: 22px;
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
      color: var(--ink);
      text-decoration: none;
      padding: 14px clamp(10px, 2vw, 24px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      border-inline-start: 1px solid var(--line);
      font-weight: 800;
    }
    nav span { color: var(--muted); font-size: 14px; }
    nav strong { color: var(--teal); }
    .band {
      padding: 44px clamp(18px, 4vw, 64px) 64px;
    }
    .section-head {
      max-width: 1280px;
      margin: 0 auto 24px;
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 24px;
    }
    .eyebrow {
      color: var(--tomato);
      font-weight: 800;
      font-size: 15px;
      text-transform: uppercase;
      direction: ltr;
      text-align: right;
    }
    h2 {
      margin: 4px 0 8px;
      font-size: clamp(30px, 4vw, 54px);
      line-height: 1.1;
      letter-spacing: 0;
    }
    .section-head p {
      margin: 0;
      color: var(--muted);
      font-size: 17px;
      line-height: 1.6;
      max-width: 680px;
    }
    .section-head > strong {
      color: var(--green);
      border: 1px solid var(--line);
      background: var(--paper);
      border-radius: 8px;
      padding: 10px 14px;
      white-space: nowrap;
      direction: ltr;
    }
    .grid {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .card {
      min-width: 0;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      box-shadow: 0 18px 42px rgba(23, 53, 39, .08);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      padding: 12px;
      direction: ltr;
      justify-content: flex-end;
    }
    .meta span {
      border: 1px solid var(--line);
      color: var(--green);
      border-radius: 999px;
      padding: 5px 9px;
      font-size: 12px;
      font-weight: 800;
      background: #fff;
    }
    .meta .id {
      color: #fff;
      background: var(--green);
      border-color: var(--green);
    }
    .poster {
      min-height: 230px;
      margin: 0 12px;
      border-radius: 8px;
      padding: 18px;
      color: var(--paper);
      background:
        linear-gradient(150deg, rgba(23,53,39,.98), rgba(8,116,122,.88)),
        var(--green);
      display: grid;
      align-content: space-between;
      gap: 18px;
      position: relative;
      overflow: hidden;
    }
    .poster:after {
      content: "";
      position: absolute;
      inset-inline-start: -34px;
      inset-block-end: -60px;
      width: 145px;
      height: 145px;
      border-radius: 999px;
      border: 18px solid rgba(215,166,58,.24);
    }
    .brand {
      position: relative;
      z-index: 1;
      width: fit-content;
      background: rgba(255, 250, 241, .13);
      border: 1px solid rgba(255, 250, 241, .2);
      border-radius: 999px;
      padding: 5px 10px;
      font-weight: 800;
      color: #f4d992;
    }
    h3 {
      position: relative;
      z-index: 1;
      margin: 0;
      font-size: 30px;
      line-height: 1.25;
      letter-spacing: 0;
    }
    .screen-lines {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 8px;
    }
    .screen-lines span {
      display: block;
      height: 9px;
      border-radius: 999px;
      background: rgba(255, 250, 241, .38);
    }
    .screen-lines span:nth-child(2) { width: 76%; }
    .screen-lines span:nth-child(3) { width: 52%; background: rgba(215, 166, 58, .7); }
    .card p {
      margin: 0;
      padding: 16px 16px 12px;
      color: #273b31;
      line-height: 1.65;
      font-size: 15px;
      font-weight: 650;
    }
    .detail {
      margin: 0 16px 16px;
      border-top: 1px solid var(--line);
      padding-top: 12px;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.55;
      font-weight: 700;
    }
    .paid .poster {
      background:
        linear-gradient(150deg, rgba(202,89,65,.96), rgba(35,98,76,.9)),
        var(--tomato);
    }
    .paid .meta .id { background: var(--tomato); border-color: var(--tomato); }
    footer {
      padding: 28px clamp(18px, 4vw, 64px) 44px;
      color: var(--muted);
      background: var(--paper);
      border-top: 1px solid var(--line);
      font-weight: 700;
    }
    footer div {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    @media (max-width: 760px) {
      header { min-height: auto; padding-block: 34px; }
      .hero { grid-template-columns: 1fr; }
      nav { grid-template-columns: 1fr 1fr; }
      .section-head { display: block; }
      .section-head > strong { display: inline-flex; margin-top: 14px; }
      h3 { font-size: 26px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="hero">
      <div>
        <span class="label">Alzbdh Social Variation Gallery</span>
        <h1>كل تنويعات المحتوى التسويقي في عرض واحد</h1>
        <p>مقسمة حسب العطور، الأماكن، الوجهات، وإعلانات التطبيق. هذه نسخة عرض فقط من بنك الأفكار، ولا تعني أن أي منشور تم جدولته في Buffer.</p>
      </div>
      <aside class="summary">
        <strong>${rows.length}</strong>
        <span>unscheduled variations</span>
      </aside>
    </div>
  </header>
  <nav>${navItems}</nav>
  ${sections}
  <footer>
    <div>
      <span>Generated from content/ad-campaigns/app-screenshot-variation-bank.md</span>
      <span>Buffer scheduling still requires the duplicate and timing gate.</span>
    </div>
  </footer>
</body>
</html>`;

await fs.writeFile(outputPath, html);
console.log(`Wrote ${path.relative(repo, outputPath)} with ${rows.length} variations.`);
