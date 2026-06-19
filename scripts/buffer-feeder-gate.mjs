#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = process.cwd();
const RIYADH_TZ = 'Asia/Riyadh';
const REGISTER_PATH = 'content/social_post_register.json';
const DEFAULT_SELECTION_PATH = '.gstack/alzbdh-daily-buffer-feeder-selection.json';
const PLAN_GLOBS = [
  'content/buffer-batches',
  'content/two-week-batch',
  'content/monthly-batch',
];
const BALANCED_CHANNELS = ['x', 'instagram', 'tiktok'];
const PRIME_TIME_BY_CHANNEL = {
  x: { morning: '21:00', daytime: '22:00' },
  instagram: { morning: '21:20', daytime: '22:20' },
  tiktok: { morning: '21:40', daytime: '22:40' },
};

const PLATFORM_CHANNEL = {
  x: 'x',
  twitter: 'x',
  instagram: 'instagram',
  'instagram story': 'instagram',
  tiktok: 'tiktok',
};

const EXPECTED_DIMENSIONS = {
  x: { width: 1600, height: 900 },
  twitter: { width: 1600, height: 900 },
  instagram: { width: 1080, height: 1350 },
  'instagram story': { width: 1080, height: 1920 },
  tiktok: { width: 1080, height: 1920 },
};

const MORNING_PATTERNS = [
  /صباح الخير/u,
  /صباحك/u,
  /صباح الاختيارات/u,
  /هذا الصباح/u,
];

const EVENING_PATTERNS = [
  /مساء الخير/u,
  /الليلة/u,
  /هالمساء/u,
  /هذا المساء/u,
];

function parseArgs(argv) {
  const args = {
    date: riyadhDate(new Date()),
    capacity: 10,
    currentScheduled: 0,
    writeSelection: '',
    plan: [],
    json: false,
    auditAllPlans: false,
    fillFuture: false,
    includeStories: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--date') args.date = argv[++i];
    else if (arg === '--capacity') args.capacity = Number(argv[++i]);
    else if (arg === '--current-scheduled') args.currentScheduled = Number(argv[++i]);
    else if (arg === '--write-selection') args.writeSelection = argv[++i] || DEFAULT_SELECTION_PATH;
    else if (arg === '--plan') args.plan.push(argv[++i]);
    else if (arg === '--json') args.json = true;
    else if (arg === '--audit-all-plans') args.auditAllPlans = true;
    else if (arg === '--fill-future') args.fillFuture = true;
    else if (arg === '--include-stories') args.includeStories = true;
    else failUsage(`Unknown argument: ${arg}`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) failUsage('--date must be YYYY-MM-DD');
  if (!Number.isInteger(args.capacity) || args.capacity < 0) failUsage('--capacity must be a non-negative integer');
  if (!Number.isInteger(args.currentScheduled) || args.currentScheduled < 0) {
    failUsage('--current-scheduled must be a non-negative integer');
  }
  return args;
}

function failUsage(message) {
  console.error(message);
  console.error('Usage: node scripts/buffer-feeder-gate.mjs [--date YYYY-MM-DD] [--capacity 10] [--current-scheduled N] [--write-selection PATH] [--plan PATH]');
  process.exit(2);
}

function riyadhDate(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: RIYADH_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function listPlanFiles() {
  const files = [];
  for (const dir of PLAN_GLOBS) {
    const absDir = path.join(ROOT, dir);
    if (!fs.existsSync(absDir)) continue;
    walk(absDir, files);
  }
  return files
    .filter((file) => file.endsWith('/plan.json'))
    .map((file) => path.relative(ROOT, file))
    .sort();
}

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
}

function platformKey(platform) {
  return String(platform || '').trim().toLowerCase();
}

function channelKey(platform) {
  return PLATFORM_CHANNEL[platformKey(platform)] || platformKey(platform);
}

function combinedText(row) {
  return [row.text, row.hashtags].filter(Boolean).join('\n\n').trim();
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[\u064B-\u065F\u0670\u0640]/gu, '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[،]/g, ',')
    .replace(/[؟]/g, '?')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeSource(value) {
  return String(value || '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/gu, '');
}

function normalizeMedia(value) {
  let raw = String(value || '').trim();
  if (!raw) return '';
  try {
    if (/^https?:\/\//i.test(raw)) {
      const url = new URL(raw);
      raw = decodeURIComponent(url.pathname);
    }
  } catch {
    raw = raw.split(/[?#]/)[0];
  }
  raw = raw.split(/[?#]/)[0].replace(/^\/+/, '');
  const parts = raw.split('/').filter(Boolean);
  const sizeIndex = parts.findIndex((part) => /^(x_1600x900|instagram_1080x1350|tiktok_1080x1920)$/i.test(part));
  if (sizeIndex >= 0) return parts.slice(sizeIndex, sizeIndex + 2).join('/').toLowerCase();
  const contentIndex = parts.findIndex((part) => part === 'content');
  if (contentIndex >= 0) return parts.slice(contentIndex + 1).join('/').toLowerCase();
  return parts.slice(-2).join('/').toLowerCase();
}

function rowMedia(row) {
  return row.public_url || row.image_path || row.image || '';
}

function usedRegistryRow(row) {
  const posted = String(row.posted || '').trim().toLowerCase() === 'true';
  const hasBufferId = Boolean(String(row.buffer_post_id || '').trim());
  const notes = String(row.notes || '');
  const noteUsed = /\b(scheduled|posted|published|sent|deleted|manual_fill_today)\b/i.test(notes);
  return posted || hasBufferId || noteUsed;
}

function registryEntry(row) {
  return {
    postKey: row.post_key || '',
    channel: channelKey(row.platform),
    platform: row.platform || '',
    text: normalizeText(combinedText(row)),
    media: normalizeMedia(rowMedia(row)),
    source: normalizeSource(row.source_id || row.slug || sourceFromPostKey(row.post_key)),
    bufferPostId: row.buffer_post_id || '',
  };
}

function sourceFromPostKey(postKey) {
  const parts = String(postKey || '').split('::');
  return parts[parts.length - 1] || '';
}

export function candidateEntry(row, planPath) {
  const source = row.source_id || row.slug || sourceFromPostKey(row.post_key);
  const scheduledTime = preferredRiyadhTime(row);
  const postKey = row.post_key || `${row.date || 'no-date'}::${scheduledTime || 'no-time'}::${platformKey(row.platform)}::${normalizeSource(source)}`;
  return {
    ...row,
    _planned_time_riyadh: row.time_riyadh,
    time_riyadh: scheduledTime,
    _plan: planPath,
    _post_key: postKey,
    _channel: channelKey(row.platform),
    _text_norm: normalizeText(combinedText(row)),
    _media_norm: normalizeMedia(rowMedia(row)),
    _source_norm: normalizeSource(source),
  };
}

export function preferredRiyadhTime(row) {
  const original = String(row.time_riyadh || '').trim();
  if (!/^\d{2}:\d{2}$/.test(original)) return original;
  const channel = channelKey(row.platform);
  const prime = PRIME_TIME_BY_CHANNEL[channel];
  if (!prime) return original;
  const hour = Number(original.slice(0, 2));
  if (hour >= 17) return original;
  if (MORNING_PATTERNS.some((pattern) => pattern.test(combinedText(row)))) return original;
  return hour < 11 ? prime.morning : prime.daytime;
}

export function scopeFillFutureCandidates(candidates, targetDate) {
  const todayCandidates = candidates.filter((row) => row.date === targetDate);
  if (todayCandidates.length > 0) return todayCandidates;
  return [];
}

function findDuplicate(candidate, usedEntries, selected) {
  const haystack = [...usedEntries, ...selected.map((row) => ({
    postKey: row._post_key,
    channel: row._channel,
    platform: row.platform,
    text: row._text_norm,
    media: row._media_norm,
    source: row._source_norm,
    bufferPostId: '',
  }))];

  for (const existing of haystack) {
    if (existing.postKey === candidate._post_key) continue;
    if (existing.channel !== candidate._channel) continue;
    if (candidate._text_norm && candidate._text_norm === existing.text) {
      return { reason: 'same normalized text', existing };
    }
    if (candidate._media_norm && candidate._media_norm === existing.media) {
      return { reason: 'same media', existing };
    }
    if (candidate._source_norm && candidate._source_norm === existing.source) {
      const equivalent = textOverlap(candidate._text_norm, existing.text) >= 0.72;
      return { reason: equivalent ? 'same source with equivalent text' : 'same source', existing };
    }
  }
  return null;
}

function textOverlap(a, b) {
  const aWords = new Set(String(a || '').split(/\s+/).filter((word) => word.length > 2));
  const bWords = new Set(String(b || '').split(/\s+/).filter((word) => word.length > 2));
  if (!aWords.size || !bWords.size) return 0;
  let intersection = 0;
  for (const word of aWords) if (bWords.has(word)) intersection += 1;
  return intersection / Math.min(aWords.size, bWords.size);
}

function compareRowOrder(a, b) {
  return `${a.date} ${a.time_riyadh} ${a.platform}`.localeCompare(`${b.date} ${b.time_riyadh} ${b.platform}`);
}

function futureScheduledCounts(register, date) {
  const counts = Object.fromEntries(BALANCED_CHANNELS.map((channel) => [channel, 0]));
  for (const row of register) {
    const posted = String(row.posted || '').trim().toLowerCase() === 'true';
    const hasBufferId = Boolean(String(row.buffer_post_id || '').trim());
    const scheduledAt = String(row.posted_at_riyadh || '').trim();
    const channel = channelKey(row.platform);
    if (!BALANCED_CHANNELS.includes(channel)) continue;
    if (posted || !hasBufferId || !scheduledAt) continue;
    if (scheduledAt >= `${date}T00:00:00+03:00`) counts[channel] += 1;
  }
  return counts;
}

function pickBalancedCandidates(candidates, usedEntries, remainingCapacity, seededCounts) {
  const selected = [];
  const queueCounts = { ...seededCounts };
  const pool = [...candidates].sort(compareRowOrder);

  while (selected.length < remainingCapacity) {
    const available = pool.filter((row) => !selected.includes(row) && !findDuplicate(row, usedEntries, selected));
    if (!available.length) break;

    let chosenChannel = '';
    let chosenChannelRow = null;

    for (const channel of BALANCED_CHANNELS) {
      const channelRows = available.filter((row) => row._channel === channel);
      if (!channelRows.length) continue;
      const firstRow = channelRows[0];
      if (!chosenChannel) {
        chosenChannel = channel;
        chosenChannelRow = firstRow;
        continue;
      }

      const currentCount = queueCounts[channel] ?? 0;
      const chosenCount = queueCounts[chosenChannel] ?? 0;
      if (currentCount < chosenCount) {
        chosenChannel = channel;
        chosenChannelRow = firstRow;
        continue;
      }
      if (currentCount === chosenCount && compareRowOrder(firstRow, chosenChannelRow) < 0) {
        chosenChannel = channel;
        chosenChannelRow = firstRow;
      }
    }

    if (!chosenChannelRow) break;
    selected.push(chosenChannelRow);
    queueCounts[chosenChannel] = (queueCounts[chosenChannel] ?? 0) + 1;
  }

  return { selected, queueCounts };
}

function validateTimeTone(row) {
  const text = combinedText(row);
  const hour = Number(String(row.time_riyadh || '00:00').slice(0, 2));
  const issues = [];
  if (MORNING_PATTERNS.some((pattern) => pattern.test(text)) && (hour < 5 || hour >= 12)) {
    issues.push(`morning copy at ${row.time_riyadh}`);
  }
  if (EVENING_PATTERNS.some((pattern) => pattern.test(text)) && hour < 16) {
    issues.push(`evening/night copy at ${row.time_riyadh}`);
  }
  return issues;
}

async function validateImage(row) {
  const imagePath = row.image_path || row.image || '';
  if (!imagePath) return [];
  if (/^https?:\/\//i.test(imagePath)) return [];
  const relative = imagePath.replace(/^content\//, 'content/');
  const abs = path.join(ROOT, relative);
  if (!fs.existsSync(abs)) return [`missing image: ${imagePath}`];

  const expected = EXPECTED_DIMENSIONS[platformKey(row.platform)];
  if (!expected) return [];

  const metadata = await sharp(abs).metadata();
  if (metadata.width !== expected.width || metadata.height !== expected.height) {
    return [`${row.platform} image is ${metadata.width}x${metadata.height}, expected ${expected.width}x${expected.height}`];
  }
  return [];
}

function validateRequired(row) {
  const issues = [];
  for (const field of ['date', 'time_riyadh', 'platform', 'text']) {
    if (!String(row[field] || '').trim()) issues.push(`missing ${field}`);
  }
  if (!/^\d{2}:\d{2}$/.test(String(row.time_riyadh || ''))) issues.push(`invalid time_riyadh: ${row.time_riyadh || '(blank)'}`);
  const key = platformKey(row.platform);
  if (!PLATFORM_CHANNEL[key]) issues.push(`unsupported platform: ${row.platform}`);
  if (key !== 'x' && key !== 'twitter' && !String(row.public_url || row.image_path || row.image || '').trim()) {
    issues.push(`${row.platform} requires media`);
  }
  return issues;
}

function printReport(report) {
  console.log(`Buffer feeder gate (${report.date}, ${RIYADH_TZ})`);
  console.log(`Plans: ${report.planFiles.length}`);
  console.log(`Registry rows: ${report.registryRows}`);
  console.log(`Used registry rows: ${report.usedRegistryRows}`);
  console.log(`Buffer capacity: ${report.currentScheduled}/${report.capacity} scheduled, ${report.remainingCapacity} slot(s) open`);
  console.log(`Candidates for date: ${report.candidateCount}`);
  console.log(`Selected: ${report.selected.length}`);
  console.log(`Skipped duplicates: ${report.skippedDuplicates.length}`);
  console.log(`Blocked issues: ${report.issues.length}`);
  if (report.selected.length) {
    console.log('\nSelection:');
    for (const row of report.selected) {
      console.log(`- ${row.date} ${row.time_riyadh} ${row.platform} ${row._post_key}`);
    }
  }
  if (report.skippedDuplicates.length) {
    console.log('\nSkipped duplicates:');
    for (const skip of report.skippedDuplicates.slice(0, 25)) {
      const id = skip.duplicate.existing.bufferPostId || skip.duplicate.existing.postKey || '(unknown)';
      console.log(`- ${skip.row._post_key}: ${skip.duplicate.reason} -> ${id}`);
    }
  }
  if (report.issues.length) {
    console.log('\nIssues:');
    for (const issue of report.issues.slice(0, 50)) console.log(`- ${issue}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const register = readJson(REGISTER_PATH);
  const planFiles = args.plan.length ? args.plan : listPlanFiles();
  const usedEntries = register.filter(usedRegistryRow).map(registryEntry);
  const remainingCapacity = Math.max(0, args.capacity - args.currentScheduled);
  let selected = [];
  const skippedDuplicates = [];
  const issues = [];
  const allCandidates = [];
  const eligibleCandidates = [];
  const seededQueueCounts = futureScheduledCounts(register, args.date);
  const usedPostKeys = new Set(register.filter(usedRegistryRow).map((row) => row.post_key).filter(Boolean));

  const postKeys = new Set();
  for (const row of register) {
    if (postKeys.has(row.post_key)) issues.push(`duplicate register post_key: ${row.post_key}`);
    postKeys.add(row.post_key);
  }

  for (const planPath of planFiles) {
    const rows = readJson(planPath);
    if (!Array.isArray(rows)) {
      issues.push(`plan is not an array: ${planPath}`);
      continue;
    }
    for (const raw of rows) {
      const row = candidateEntry(raw, planPath);
      if (!args.includeStories && platformKey(row.platform) === 'instagram story') continue;
      if (args.auditAllPlans || row.date === args.date || (args.fillFuture && row.date >= args.date)) {
        allCandidates.push(row);
      }
    }
  }

  allCandidates.sort(compareRowOrder);

  for (const row of allCandidates) {
    const rowIssues = [
      ...validateRequired(row),
      ...validateTimeTone(row),
      ...(await validateImage(row)),
    ];

    if (rowIssues.length) {
      for (const issue of rowIssues) issues.push(`${row._post_key}: ${issue}`);
      continue;
    }

    if (usedPostKeys.has(row._post_key)) {
      skippedDuplicates.push({
        row,
        duplicate: {
          reason: 'same post_key',
          existing: { postKey: row._post_key, bufferPostId: '' },
        },
      });
      continue;
    }

    const duplicate = findDuplicate(row, usedEntries, []);
    if (duplicate) {
      skippedDuplicates.push({ row, duplicate });
      continue;
    }

    const selectable = row.date === args.date || (args.fillFuture && row.date >= args.date);
    if (selectable) eligibleCandidates.push(row);
  }

  if (args.fillFuture) {
    selected = pickBalancedCandidates(
      scopeFillFutureCandidates(eligibleCandidates, args.date),
      usedEntries,
      remainingCapacity,
      seededQueueCounts,
    ).selected;
  } else {
    selected = eligibleCandidates.slice(0, remainingCapacity);
  }

  const report = {
    date: args.date,
    timezone: RIYADH_TZ,
    planFiles,
    registryRows: register.length,
    usedRegistryRows: usedEntries.length,
    capacity: args.capacity,
    currentScheduled: args.currentScheduled,
    remainingCapacity,
    seededQueueCounts,
    candidateCount: allCandidates.filter((row) => row.date === args.date).length,
    fillFuture: args.fillFuture,
    selected,
    skippedDuplicates,
    issues,
  };

  if (args.writeSelection) {
    fs.mkdirSync(path.dirname(path.join(ROOT, args.writeSelection)), { recursive: true });
    fs.writeFileSync(path.join(ROOT, args.writeSelection), `${JSON.stringify(selected, null, 2)}\n`);
  }

  if (args.json) console.log(JSON.stringify(report, null, 2));
  else printReport(report);

  if (issues.length) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
