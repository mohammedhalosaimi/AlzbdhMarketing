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

const defaultCalendar = 'content/calendar/social-calendar.csv';
const defaultRenderedRoot = 'content/rendered';

const formats = {
  x: { platform: 'X', dir: 'x_1600x900', width: 1600, height: 900 },
  twitter: { platform: 'X', dir: 'x_1600x900', width: 1600, height: 900 },
  instagram: { platform: 'Instagram', dir: 'instagram_1080x1350', width: 1080, height: 1350 },
  tiktok: { platform: 'TikTok', dir: 'tiktok_1080x1920', width: 1080, height: 1920 },
};

function parseArgs(argv) {
  const args = {
    calendar: defaultCalendar,
    out: '',
    batch: '',
    includeDrafts: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--calendar') args.calendar = argv[++i];
    else if (arg === '--out') args.out = argv[++i];
    else if (arg === '--batch') args.batch = argv[++i];
    else if (arg === '--include-drafts') args.includeDrafts = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (char !== '\r') {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows
    .filter((items) => items.some((item) => String(item || '').trim()))
    .map((items) => Object.fromEntries(headers.map((header, index) => [header, items[index] || ''])));
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

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'post';
}

function platformKey(value) {
  return String(value || '').trim().toLowerCase();
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

function absRepoPath(relativePath) {
  return path.join(repo, relativePath);
}

function cleanGeneratedHtml(html) {
  return html.replace(/[ \t]+$/gm, '');
}

function sourceForCss(imageUrl, htmlDir) {
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return relFrom(htmlDir, absRepoPath(imageUrl));
}

async function fileExists(absPath) {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function templateBaseImage(template, format) {
  const basePath = path.join(repo, 'content/templates', template.category, 'images', template.template_id, `${format.dir}.png`);
  return (await fileExists(basePath)) ? basePath : '';
}

async function loadTemplates() {
  const templateDirs = ['places', 'destinations', 'perfumes', 'ads'];
  const templates = new Map();
  for (const dir of templateDirs) {
    const file = path.join(repo, 'content/templates', dir, 'templates.json');
    const items = JSON.parse(await fs.readFile(file, 'utf8'));
    for (const item of items) templates.set(item.template_id, item);
  }
  return templates;
}

function validateRow(row, templates) {
  const required = [
    'post_key',
    'date',
    'time_riyadh',
    'platform',
    'category',
    'template_id',
    'title',
    'body',
    'caption',
    'hashtags',
    'image_url',
  ];
  const missing = required.filter((key) => !String(row[key] || '').trim());
  if (missing.length) throw new Error(`${row.post_key || '(missing key)'} missing ${missing.join(', ')}`);
  if (!formats[platformKey(row.platform)]) throw new Error(`${row.post_key}: unsupported platform ${row.platform}`);
  if (!templates.has(row.template_id)) throw new Error(`${row.post_key}: unknown template_id ${row.template_id}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) throw new Error(`${row.post_key}: date must be YYYY-MM-DD`);
  if (!/^\d{2}:\d{2}$/.test(row.time_riyadh)) throw new Error(`${row.post_key}: time_riyadh must be HH:MM`);
}

function templateClass(layout) {
  return {
    'score-card': 'layout-score',
    'split-detail': 'layout-split',
    'product-focus': 'layout-product',
    'feature-ad': 'layout-ad',
    checklist: 'layout-checklist',
    'proof-card': 'layout-proof',
    spotlight: 'layout-spotlight',
  }[layout] || 'layout-split';
}

function imageFit(layout) {
  return layout === 'product-focus' || layout === 'feature-ad' || layout === 'spotlight' ? 'contain' : 'cover';
}

function photoCss(layout, isWide, isStory) {
  if (layout === 'feature-ad') {
    return isWide
      ? 'top:160px;left:140px;right:140px;height:320px'
      : `top:${isStory ? 194 : 168}px;left:92px;right:92px;height:${isStory ? 606 : 386}px`;
  }
  if (layout === 'split-detail') {
    return isWide
      ? 'top:170px;left:90px;width:650px;height:610px'
      : `top:${isStory ? 194 : 168}px;left:86px;right:86px;height:${isStory ? 716 : 456}px`;
  }
  if (layout === 'checklist') {
    return isWide
      ? 'top:170px;left:90px;width:460px;height:610px'
      : `top:${isStory ? 194 : 168}px;left:92px;right:92px;height:${isStory ? 516 : 366}px`;
  }
  if (layout === 'proof-card') {
    return isWide
      ? 'top:152px;left:140px;right:140px;height:310px'
      : `top:${isStory ? 192 : 166}px;left:92px;right:92px;height:${isStory ? 516 : 336}px`;
  }
  if (layout === 'spotlight') {
    return isWide
      ? 'top:150px;right:98px;width:520px;height:600px'
      : `top:${isStory ? 190 : 164}px;left:108px;right:108px;height:${isStory ? 576 : 376}px`;
  }
  return isWide
    ? 'top:170px;right:90px;width:650px;height:610px'
    : `top:${isStory ? 194 : 168}px;left:86px;right:86px;height:${isStory ? 716 : 456}px`;
}

function panelCss(layout, isWide, isStory) {
  if (layout === 'feature-ad') {
    return isWide
      ? 'left:90px;right:90px;bottom:70px;height:300px;text-align:center;padding:34px 50px'
      : `left:56px;right:56px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 540 : 420}px;text-align:center;padding:42px 42px`;
  }
  if (layout === 'split-detail') {
    return isWide
      ? 'left:820px;right:72px;bottom:64px;height:590px;padding:34px 38px'
      : `left:54px;right:54px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 610 : 440}px;padding:38px 36px`;
  }
  if (layout === 'checklist') {
    return isWide
      ? 'left:640px;right:72px;bottom:64px;height:590px;padding:34px 38px'
      : `left:56px;right:56px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 720 : 500}px;padding:38px 36px`;
  }
  if (layout === 'proof-card') {
    return isWide
      ? 'left:150px;right:150px;bottom:70px;height:315px;text-align:center;padding:34px 50px'
      : `left:56px;right:56px;bottom:${isStory ? 90 : 76}px;height:${isStory ? 680 : 500}px;text-align:center;padding:42px 42px`;
  }
  if (layout === 'spotlight') {
    return isWide
      ? 'left:92px;right:720px;bottom:64px;height:590px;padding:34px 38px'
      : `left:64px;right:64px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 650 : 480}px;padding:38px 36px`;
  }
  return isWide
    ? 'left:72px;right:820px;bottom:64px;height:590px;padding:34px 38px'
    : `left:54px;right:54px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 610 : 440}px;padding:38px 36px`;
}

function posterHtml({ row, template, format, htmlDir, baseImage }) {
  const font400 = relFrom(htmlDir, absRepoPath('content/travel/assets/fonts/Changa-400.ttf'));
  const font700 = relFrom(htmlDir, absRepoPath('content/travel/assets/fonts/Changa-700.ttf'));
  const font800 = relFrom(htmlDir, absRepoPath('content/travel/assets/fonts/Changa-800.ttf'));
  const logo = relFrom(htmlDir, absRepoPath('brand/logos/logo-white.svg'));
  const image = sourceForCss(row.image_url, htmlDir);
  const base = baseImage ? relFrom(htmlDir, baseImage) : '';
  const isWide = format.width > format.height;
  const isStory = format.height > 1500;
  const accent = template.accent || '#E8C46B';

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
    .poster{position:relative;width:100%;height:100%;overflow:hidden;background:#102318${base ? ` url("${base}") center/cover no-repeat` : ''}}
    ${base ? `
    .photo{position:absolute;z-index:2;overflow:hidden;border-radius:6px;background-image:url("${image}");background-size:${imageFit(template.layout)};background-position:center;background-repeat:no-repeat;filter:saturate(1.04) contrast(1.04)}
    .photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,14,9,.02),rgba(5,14,9,.24))}
    .photo{${photoCss(template.layout, isWide, isStory)}}
    ` : `
    .photo{position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(5,14,9,.16),rgba(5,14,9,.56) 54%,rgba(5,14,9,.92)),url("${image}");background-size:${imageFit(template.layout)};background-position:center;background-repeat:no-repeat;filter:saturate(1.04) contrast(1.04)}
    .photo:after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(16,35,24,.92),rgba(16,35,24,.58) 42%,rgba(16,35,24,.24))}
    `}
    .top{position:absolute;z-index:3;top:${isStory ? 54 : 44}px;left:${isWide ? 66 : 50}px;right:${isWide ? 66 : 50}px;display:flex;align-items:center;justify-content:space-between}
    .top img{width:${isWide ? 145 : 126}px}.site{direction:ltr;font-size:${isWide ? 24 : 23}px;font-weight:800;text-shadow:0 5px 18px rgba(0,0,0,.45)}
    .panel{position:absolute;z-index:2;border-radius:8px;background:rgba(16,35,24,.84);border:1px solid color-mix(in srgb, ${accent} 55%, transparent);box-shadow:0 28px 70px rgba(0,0,0,.34)}
    ${base ? `
    .panel{background:transparent;border:0;box-shadow:none}
    .panel{${panelCss(template.layout, isWide, isStory)}}
    ` : `
    .layout-score .panel{left:${isWide ? 72 : 54}px;right:${isWide ? 520 : 54}px;bottom:${isWide ? 64 : 74}px;padding:${isWide ? '34px 38px' : '38px 36px'}}
    .layout-split .panel{left:${isWide ? 72 : 54}px;right:${isWide ? 420 : 54}px;bottom:${isWide ? 64 : 74}px;padding:${isWide ? '32px 38px' : '36px 36px'}}
    .layout-product .panel{left:${isWide ? 74 : 56}px;right:${isWide ? 560 : 56}px;bottom:${isWide ? 64 : 74}px;padding:${isWide ? '32px 38px' : '36px 36px'}}
    .layout-ad .panel{left:${isWide ? 90 : 56}px;right:${isWide ? 90 : 56}px;bottom:${isWide ? 70 : 86}px;text-align:center;padding:${isWide ? '34px 50px' : '42px 42px'}}
    `}
    .eyebrow{display:inline-flex;align-items:center;border-radius:999px;background:color-mix(in srgb, ${accent} 18%, transparent);border:1px solid color-mix(in srgb, ${accent} 55%, transparent);color:${accent};padding:8px 16px;font-size:${isWide ? 23 : 24}px;font-weight:800}
    .title{margin:18px 0 10px;font-size:${isWide ? 74 : isStory ? 74 : 64}px;line-height:1.08;font-weight:800;letter-spacing:0;color:#FDFBF7;text-shadow:0 8px 30px rgba(0,0,0,.45);max-height:${isWide ? 172 : 236}px;overflow:hidden}
    .subtitle{font-size:${isWide ? 30 : 31}px;line-height:1.25;font-weight:800;color:${accent};margin-bottom:12px;max-height:${isWide ? 78 : 96}px;overflow:hidden}
    .body{margin:0;font-size:${isWide ? 28 : isStory ? 30 : 27}px;line-height:1.48;font-weight:700;color:#F4EFE6;max-height:${isWide ? 164 : isStory ? 300 : 230}px;overflow:hidden}
    .cta{display:inline-flex;margin-top:22px;background:${accent};color:#102318;border-radius:8px;padding:12px 19px;font-size:${isWide ? 24 : 25}px;font-weight:800}
    .badge{position:absolute;z-index:2;top:${isStory ? 188 : 150}px;right:${isWide ? 72 : 54}px;background:#FDFBF7;color:#102318;border-radius:8px;padding:13px 17px;font-size:${isWide ? 25 : 27}px;font-weight:800;box-shadow:0 16px 45px rgba(0,0,0,.24)}
    .mark{position:absolute;z-index:1;left:${isWide ? 76 : 42}px;bottom:${isWide ? 58 : 44}px;width:${isWide ? 260 : 220}px;height:${isWide ? 260 : 220}px;border:22px solid color-mix(in srgb, ${accent} 55%, transparent);border-radius:50%;opacity:.48}
  </style>
</head>
<body>
  <main class="poster ${templateClass(template.layout)}">
    <div class="photo"></div>
    ${base ? '' : '<div class="mark"></div>'}
    ${base ? '' : `<div class="top"><div class="site">app.alzbdh.com</div><img src="${logo}" alt="الزبدة"></div>`}
    ${base ? '' : `<div class="badge">${escapeHtml(row.category)}</div>`}
    <section class="panel">
      <div class="eyebrow">${escapeHtml(template.label)}</div>
      <h1 class="title">${escapeHtml(row.title)}</h1>
      <div class="subtitle">${escapeHtml(row.subtitle)}</div>
      <p class="body">${escapeHtml(row.body)}</p>
      <div class="cta">${escapeHtml(row.cta)}</div>
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
    fit('.title', 38);
    fit('.subtitle', 22);
    fit('.body', 20);
  });
}

async function renderRow(browser, row, template, outDir) {
  const format = formats[platformKey(row.platform)];
  const fileBase = slugify(row.post_key);
  const htmlDir = path.join(outDir, 'html', format.dir);
  const imageDir = path.join(outDir, 'images', format.dir);
  await fs.mkdir(htmlDir, { recursive: true });
  await fs.mkdir(imageDir, { recursive: true });

  if (!/^https?:\/\//i.test(row.image_url)) {
    await fs.access(absRepoPath(row.image_url));
  }

  const htmlPath = path.join(htmlDir, `${fileBase}.html`);
  const imagePath = path.join(imageDir, `${fileBase}.png`);
  const baseImage = await templateBaseImage(template, format);
  await fs.writeFile(htmlPath, cleanGeneratedHtml(posterHtml({ row, template, format, htmlDir, baseImage })));

  const page = await browser.newPage({ viewport: { width: format.width, height: format.height }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  await fitText(page);
  await page.screenshot({ path: imagePath });
  await page.close();
  return imagePath;
}

function buildPlanRow(row, imagePath, calendarPath) {
  const relImage = relToRepo(imagePath);
  return {
    date: row.date,
    time_riyadh: row.time_riyadh,
    theme: row.title,
    content_type: `csv-${row.category}`,
    source_id: row.post_key,
    platform: formats[platformKey(row.platform)].platform,
    channel_kind: 'csv-template',
    image_path: relImage,
    public_url: publicUrl(relImage),
    text: row.caption,
    hashtags: row.hashtags,
    buffer_status: 'ready',
    post_key: row.post_key,
    template_id: row.template_id,
    subject_id: row.subject_id,
    alt_text: row.alt_text,
    source_calendar: calendarPath,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const calendarPath = args.calendar;
  const csvRows = parseCsv(await fs.readFile(path.join(repo, calendarPath), 'utf8'));
  const templates = await loadTemplates();
  const rows = csvRows.filter((row) => args.includeDrafts || String(row.status || '').trim().toLowerCase() === 'ready');
  for (const row of rows) validateRow(row, templates);

  const firstDate = rows.map((row) => row.date).sort()[0] || 'empty';
  const batchName = args.batch || `${firstDate}_social-calendar`;
  const outDir = path.join(repo, args.out || path.join(defaultRenderedRoot, batchName));
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const planRows = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const row of rows) {
      const template = templates.get(row.template_id);
      const imagePath = await renderRow(browser, row, template, outDir);
      planRows.push(buildPlanRow(row, imagePath, calendarPath));
    }
  } finally {
    await browser.close();
  }

  const headers = ['date', 'time_riyadh', 'theme', 'content_type', 'source_id', 'platform', 'channel_kind', 'image_path', 'public_url', 'text', 'hashtags', 'buffer_status', 'post_key', 'template_id', 'subject_id', 'alt_text', 'source_calendar'];
  const templateCounts = {};
  for (const row of planRows) templateCounts[row.template_id] = (templateCounts[row.template_id] || 0) + 1;

  await fs.writeFile(path.join(outDir, 'plan.json'), `${JSON.stringify(planRows, null, 2)}\n`);
  await fs.writeFile(path.join(outDir, 'plan.csv'), `${headers.join(',')}\n${planRows.map((row) => headers.map((key) => csvEscape(row[key])).join(',')).join('\n')}\n`);
  await fs.writeFile(path.join(outDir, 'summary.json'), `${JSON.stringify({
    batch: path.basename(outDir),
    calendar: calendarPath,
    renderedAt: new Date().toISOString(),
    rows: planRows.length,
    templates: templateCounts,
    images: planRows.map((row) => row.image_path),
  }, null, 2)}\n`);
  await fs.writeFile(path.join(outDir, 'README.md'), `# Rendered Social Calendar\n\nCalendar: \`${calendarPath}\`\nRows: ${planRows.length}\n\n${planRows.map((row) => `- ${row.date} ${row.time_riyadh} ${row.platform} — ${row.template_id} — ${row.theme}`).join('\n')}\n`);

  console.log(`Rendered ${planRows.length} row(s) to ${relToRepo(outDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
