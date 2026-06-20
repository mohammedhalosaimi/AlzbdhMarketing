#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');

const formats = [
  { key: 'x', dir: 'x_1600x900', width: 1600, height: 900 },
  { key: 'instagram', dir: 'instagram_1080x1350', width: 1080, height: 1350 },
  { key: 'tiktok', dir: 'tiktok_1080x1920', width: 1080, height: 1920 },
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

function photoFrameCss(layout, isWide, isStory) {
  if (layout === 'feature-ad') {
    return isWide
      ? 'top:140px;left:120px;right:120px;height:360px'
      : `top:${isStory ? 172 : 146}px;left:70px;right:70px;height:${isStory ? 650 : 430}px`;
  }
  if (layout === 'split-detail') {
    return isWide
      ? 'top:150px;left:70px;width:690px;height:650px'
      : `top:${isStory ? 172 : 146}px;left:64px;right:64px;height:${isStory ? 760 : 500}px`;
  }
  if (layout === 'checklist') {
    return isWide
      ? 'top:150px;left:70px;width:500px;height:650px'
      : `top:${isStory ? 172 : 146}px;left:70px;right:70px;height:${isStory ? 560 : 410}px`;
  }
  if (layout === 'proof-card') {
    return isWide
      ? 'top:132px;left:120px;right:120px;height:350px'
      : `top:${isStory ? 170 : 144}px;left:70px;right:70px;height:${isStory ? 560 : 380}px`;
  }
  if (layout === 'spotlight') {
    return isWide
      ? 'top:130px;right:78px;width:560px;height:640px'
      : `top:${isStory ? 168 : 142}px;left:86px;right:86px;height:${isStory ? 620 : 420}px`;
  }
  return isWide
    ? 'top:150px;right:70px;width:690px;height:650px'
    : `top:${isStory ? 172 : 146}px;left:64px;right:64px;height:${isStory ? 760 : 500}px`;
}

function plateCss(layout, isWide, isStory) {
  if (layout === 'feature-ad') {
    return isWide
      ? 'left:90px;right:90px;bottom:70px;height:300px'
      : `left:56px;right:56px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 540 : 420}px`;
  }
  if (layout === 'split-detail') {
    return isWide
      ? 'left:820px;right:72px;bottom:64px;height:590px'
      : `left:54px;right:54px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 610 : 440}px`;
  }
  if (layout === 'checklist') {
    return isWide
      ? 'left:640px;right:72px;bottom:64px;height:590px'
      : `left:56px;right:56px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 720 : 500}px`;
  }
  if (layout === 'proof-card') {
    return isWide
      ? 'left:150px;right:150px;bottom:70px;height:315px'
      : `left:56px;right:56px;bottom:${isStory ? 90 : 76}px;height:${isStory ? 680 : 500}px`;
  }
  if (layout === 'spotlight') {
    return isWide
      ? 'left:92px;right:720px;bottom:64px;height:590px'
      : `left:64px;right:64px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 650 : 480}px`;
  }
  return isWide
    ? 'left:72px;right:820px;bottom:64px;height:590px'
    : `left:54px;right:54px;bottom:${isStory ? 88 : 74}px;height:${isStory ? 610 : 440}px`;
}

async function loadTemplates() {
  const templateDirs = ['places', 'destinations', 'perfumes', 'ads'];
  const templates = [];
  for (const dir of templateDirs) {
    const file = path.join(repo, 'content/templates', dir, 'templates.json');
    const items = JSON.parse(await fs.readFile(file, 'utf8'));
    templates.push(...items);
  }
  return templates;
}

function baseHtml({ template, format, htmlDir }) {
  const logo = relFrom(htmlDir, absRepoPath('brand/logos/logo-white.svg'));
  const accent = template.accent || '#E8C46B';
  const isWide = format.width > format.height;
  const isStory = format.height > 1500;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    *{box-sizing:border-box}
    html,body{margin:0;width:${format.width}px;height:${format.height}px;overflow:hidden}
    body{background:#102318}
    .poster{position:relative;width:100%;height:100%;overflow:hidden;background:
      radial-gradient(circle at 16% 74%, color-mix(in srgb, ${accent} 32%, transparent), transparent 24%),
      radial-gradient(circle at 88% 18%, rgba(121,184,168,.32), transparent 24%),
      linear-gradient(135deg,#102318 0%,#163f35 46%,#0c1711 100%)}
    .poster:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(253,251,247,.08),transparent 34%,rgba(0,0,0,.18));opacity:.72}
    .top{position:absolute;z-index:4;top:${isStory ? 54 : 44}px;left:${isWide ? 66 : 50}px;right:${isWide ? 66 : 50}px;display:flex;align-items:center;justify-content:space-between}
    .top img{width:${isWide ? 145 : 126}px}.site{direction:ltr;color:#FDFBF7;font:800 ${isWide ? 24 : 23}px system-ui,sans-serif;text-shadow:0 5px 18px rgba(0,0,0,.45)}
    .photo-frame{position:absolute;z-index:2;overflow:hidden;border-radius:8px;border:2px solid rgba(253,251,247,.18);background:linear-gradient(135deg,rgba(253,251,247,.16),rgba(253,251,247,.04));box-shadow:0 30px 80px rgba(0,0,0,.32)}
    .photo-frame:before{content:"";position:absolute;inset:18px;border-radius:6px;border:2px dashed rgba(253,251,247,.16)}
    .photo-frame:after{content:"";position:absolute;left:28px;right:28px;bottom:28px;height:8px;border-radius:999px;background:${accent};opacity:.72}
    .photo-frame{${photoFrameCss(template.layout, isWide, isStory)}}
    .plate{position:absolute;z-index:3;border-radius:8px;background:rgba(16,35,24,.86);border:1px solid color-mix(in srgb, ${accent} 55%, transparent);box-shadow:0 28px 70px rgba(0,0,0,.34)}
    .plate{${plateCss(template.layout, isWide, isStory)}}
    .arc{position:absolute;z-index:1;left:${isWide ? 76 : 42}px;bottom:${isWide ? 58 : 44}px;width:${isWide ? 260 : 220}px;height:${isWide ? 260 : 220}px;border:22px solid color-mix(in srgb, ${accent} 55%, transparent);border-radius:50%;opacity:.48}
  </style>
</head>
<body>
  <main class="poster ${templateClass(template.layout)}">
    <div class="top"><div class="site">app.alzbdh.com</div><img src="${logo}" alt=""></div>
    <div class="photo-frame"></div>
    <div class="plate"></div>
    <div class="arc"></div>
  </main>
</body>
</html>`;
}

async function renderBase(browser, template, format) {
  const outDir = path.join(repo, 'content/templates', template.category, 'images', template.template_id);
  const htmlDir = path.join(repo, 'content/templates', template.category, 'html', template.template_id);
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(htmlDir, { recursive: true });

  const htmlPath = path.join(htmlDir, `${format.dir}.html`);
  const imagePath = path.join(outDir, `${format.dir}.png`);
  await fs.writeFile(htmlPath, cleanGeneratedHtml(baseHtml({ template, format, htmlDir })));

  const page = await browser.newPage({ viewport: { width: format.width, height: format.height }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  await page.screenshot({ path: imagePath });
  await page.close();
  return imagePath;
}

async function main() {
  const templates = await loadTemplates();
  const browser = await chromium.launch({ headless: true });
  const rendered = [];
  try {
    for (const template of templates) {
      for (const format of formats) {
        rendered.push(await renderBase(browser, template, format));
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`Rendered ${rendered.length} base template image(s):`);
  for (const image of rendered) console.log(`- ${relToRepo(image)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
