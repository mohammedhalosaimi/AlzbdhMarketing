# Alzbdh Cloud Content Storage Schema

Status: proposal for replacing local image folders + CSV/JSON registries with cloud storage and a real scheduling registry.

Goal: every image, caption, scheduled post, Buffer ID, and duplicate-prevention fingerprint lives in cloud-backed storage. The automation should be able to answer one question before scheduling anything:

> Has this creative, text, media, or source already been used on this platform?

## What We Need

| Layer | Use | Recommended service |
|---|---|---|
| Object storage | Stores generated images, source photos, videos, thumbnails, HTML previews, rendered templates | S3, Cloudflare R2, Supabase Storage, or GCS |
| Database | Stores media metadata, content source rows, post registry, Buffer status, duplicate hashes | Postgres, preferably Supabase/Postgres |
| CDN | Public delivery for Buffer media URLs | Cloudflare CDN, S3 CloudFront, Supabase public CDN |
| Job queue | Daily generation/scheduling jobs, retries, Buffer sync | GitHub Actions, Supabase Edge Functions cron, Cloudflare Workers cron, or Temporal |
| Secrets vault | Buffer tokens, cloud storage keys, DB URL | GitHub Actions secrets, Doppler, 1Password, cloud secret manager |
| Audit log | Every scheduling/edit/delete/error event | Database table, plus optional log drain |

## Storage Buckets

Use separate buckets so public access, retention, and permissions are easy to control.

| Bucket | Access | Purpose |
|---|---|---|
| `alzbdh-source-media` | private | Original source photos/screenshots before transformation |
| `alzbdh-generated-media` | public-read via CDN | Final images/videos used by Buffer |
| `alzbdh-preview-html` | private or signed URL | HTML render previews and QA pages |
| `alzbdh-thumbnails` | public-read | Small preview thumbnails for dashboards |
| `alzbdh-archive` | private | Old generated batches and deleted/retired assets |

## Object Key Convention

Do not store files by random names only. The path should be readable and stable.

```text
generated/
  {yyyy}/{mm}/{dd}/
    {platform_format}/
      {content_type}/
        {source_slug}/
          {post_key}.{ext}

source/
  {source_type}/
    {source_id}/
      original.{ext}

previews/
  {yyyy}/{mm}/{dd}/
    {post_key}.html
```

Examples:

```text
generated/2026/06/23/instagram_1080x1350/place/the-island-bangkok/2026-06-23-instagram-the-island-bangkok.png
generated/2026/06/23/tiktok_1080x1920/perfume/lhomme-ideal/2026-06-23-tiktok-lhomme-ideal.png
source/place/ChIJBYCkBQCZ4jARMk27YRVj-vM/original.jpg
previews/2026/06/23/2026-06-23-instagram-the-island-bangkok.html
```

## Core Rules

- Store media binaries in object storage, not in database rows.
- Store every media file metadata row in `media_assets`.
- Store every caption/creative concept in `content_items`.
- Store every platform-specific candidate in `post_variations`.
- Store every Buffer scheduled/sent/deleted post in `post_registry`.
- Before scheduling, reject duplicates using `post_key`, `platform + text_hash`, `platform + media_sha256`, `platform + source_id`, and `creative_hash`.
- Do not delete registry rows when deleting Buffer posts. Mark them `deleted` so the creative remains blocked from accidental reuse.

## Enum Values

Use check constraints or Postgres enums.

```sql
CREATE TYPE content_type AS ENUM (
  'place',
  'destination',
  'perfume',
  'ad',
  'app',
  'prompt',
  'scratch',
  'other'
);

CREATE TYPE social_platform AS ENUM (
  'x',
  'instagram',
  'instagram_story',
  'tiktok'
);

CREATE TYPE media_type AS ENUM (
  'source_image',
  'generated_image',
  'thumbnail',
  'video',
  'html_preview'
);

CREATE TYPE post_status AS ENUM (
  'draft',
  'ready',
  'blocked_duplicate',
  'scheduled',
  'sent',
  'failed',
  'deleted',
  'cancelled'
);
```

## Table: `content_sources`

Canonical source entities from the product: places, destinations, perfumes, and ad concepts.

```sql
CREATE TABLE content_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type content_type NOT NULL,
  source_id TEXT NOT NULL,
  source_slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'ar-SA',

  app_url TEXT,
  source_url TEXT,
  city TEXT,
  country TEXT,
  brand_name TEXT,
  category TEXT,
  score NUMERIC(4, 2),
  claim_summary TEXT,

  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (source_type, source_id)
);
```

Indexes:

```sql
CREATE INDEX idx_content_sources_type ON content_sources(source_type);
CREATE INDEX idx_content_sources_slug ON content_sources(source_slug);
CREATE INDEX idx_content_sources_city_country ON content_sources(city, country);
```

## Table: `media_assets`

One row per file in cloud storage.

```sql
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type media_type NOT NULL,

  bucket TEXT NOT NULL,
  object_key TEXT NOT NULL,
  public_url TEXT,
  signed_url_expires_at TIMESTAMPTZ,

  sha256 TEXT NOT NULL,
  perceptual_hash TEXT,
  byte_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  file_ext TEXT NOT NULL,

  width INTEGER,
  height INTEGER,
  duration_ms INTEGER,
  platform_format TEXT, -- x_1600x900, instagram_1080x1350, tiktok_1080x1920

  source_ref UUID REFERENCES content_sources(id),
  parent_asset_id UUID REFERENCES media_assets(id),
  template_id TEXT,
  render_engine TEXT, -- playwright, imagegen, manual, etc.
  prompt TEXT,

  alt_text TEXT,
  qa_status TEXT NOT NULL DEFAULT 'unchecked',
  qa_notes TEXT,

  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ,

  UNIQUE (bucket, object_key),
  UNIQUE (sha256)
);
```

Indexes:

```sql
CREATE INDEX idx_media_assets_source_ref ON media_assets(source_ref);
CREATE INDEX idx_media_assets_platform_format ON media_assets(platform_format);
CREATE INDEX idx_media_assets_perceptual_hash ON media_assets(perceptual_hash);
```

## Table: `content_items`

A reusable content idea or caption unit before it becomes platform-specific.

```sql
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_ref UUID REFERENCES content_sources(id),

  content_type content_type NOT NULL,
  campaign TEXT,
  theme TEXT NOT NULL,
  angle TEXT, -- organic, ad, prompt, comparison, reminder, etc.
  language TEXT NOT NULL DEFAULT 'ar',

  hook TEXT,
  body TEXT NOT NULL,
  cta TEXT,
  hashtags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  claims JSONB NOT NULL DEFAULT '{}'::jsonb,

  text_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ready',
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Indexes:

```sql
CREATE INDEX idx_content_items_source_ref ON content_items(source_ref);
CREATE INDEX idx_content_items_campaign ON content_items(campaign);
CREATE UNIQUE INDEX idx_content_items_text_hash ON content_items(text_hash);
```

## Table: `post_variations`

One candidate post per platform. This is where the image, text, and platform format come together before Buffer.

```sql
CREATE TABLE post_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_key TEXT NOT NULL UNIQUE,

  content_item_id UUID REFERENCES content_items(id),
  source_ref UUID REFERENCES content_sources(id),
  media_asset_id UUID REFERENCES media_assets(id),

  platform social_platform NOT NULL,
  platform_format TEXT NOT NULL,
  content_type content_type NOT NULL,
  item_name TEXT NOT NULL,

  post_text TEXT NOT NULL,
  hashtags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  text_hash TEXT NOT NULL,
  media_sha256 TEXT,
  source_fingerprint TEXT NOT NULL,
  creative_hash TEXT NOT NULL,

  planned_date DATE,
  planned_time_riyadh TIME,
  status post_status NOT NULL DEFAULT 'ready',
  duplicate_reason TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Indexes:

```sql
CREATE UNIQUE INDEX idx_post_variations_creative_hash ON post_variations(creative_hash);
CREATE INDEX idx_post_variations_platform_text ON post_variations(platform, text_hash);
CREATE INDEX idx_post_variations_platform_media ON post_variations(platform, media_sha256);
CREATE INDEX idx_post_variations_platform_source ON post_variations(platform, source_fingerprint);
CREATE INDEX idx_post_variations_status_date ON post_variations(status, planned_date);
```

## Table: `post_registry`

The permanent scheduling and publishing ledger. This replaces `social_post_register.csv/json/md`.

```sql
CREATE TABLE post_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_variation_id UUID REFERENCES post_variations(id),
  media_asset_id UUID REFERENCES media_assets(id),

  post_key TEXT NOT NULL UNIQUE,
  platform social_platform NOT NULL,
  channel_id TEXT NOT NULL,

  content_type content_type NOT NULL,
  item_name TEXT NOT NULL,
  source_id TEXT,
  source_fingerprint TEXT NOT NULL,

  post_text TEXT NOT NULL,
  hashtags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  text_hash TEXT NOT NULL,
  media_sha256 TEXT,
  creative_hash TEXT NOT NULL,

  status post_status NOT NULL,
  scheduled_at_riyadh TIMESTAMPTZ,
  scheduled_date_riyadh DATE,
  buffer_post_id TEXT UNIQUE,
  buffer_channel_id TEXT,
  buffer_status TEXT,
  sent_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  post_url TEXT,

  error_code TEXT,
  error_message TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Indexes:

```sql
CREATE UNIQUE INDEX idx_post_registry_creative_hash ON post_registry(creative_hash);
CREATE INDEX idx_post_registry_platform_text ON post_registry(platform, text_hash);
CREATE INDEX idx_post_registry_platform_media ON post_registry(platform, media_sha256);
CREATE INDEX idx_post_registry_platform_source ON post_registry(platform, source_fingerprint);
CREATE INDEX idx_post_registry_date_status ON post_registry(scheduled_date_riyadh, status);
CREATE INDEX idx_post_registry_buffer_status ON post_registry(buffer_status);
```

## Table: `buffer_events`

Append-only audit log for every Buffer action.

```sql
CREATE TABLE buffer_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_registry_id UUID REFERENCES post_registry(id),
  buffer_post_id TEXT,

  event_type TEXT NOT NULL, -- create, update, delete, publish_now, sent, failed, sync
  event_status TEXT NOT NULL, -- success, error, ignored
  request_payload JSONB,
  response_payload JSONB,
  error_message TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Indexes:

```sql
CREATE INDEX idx_buffer_events_post ON buffer_events(post_registry_id);
CREATE INDEX idx_buffer_events_buffer_post_id ON buffer_events(buffer_post_id);
CREATE INDEX idx_buffer_events_created_at ON buffer_events(created_at);
```

## Table: `daily_schedule_runs`

Tracks each automation run and prevents silent overfills.

```sql
CREATE TABLE daily_schedule_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_date_riyadh DATE NOT NULL,
  run_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  run_finished_at TIMESTAMPTZ,

  requested_capacity INTEGER NOT NULL DEFAULT 10,
  current_scheduled_before INTEGER NOT NULL,
  selected_count INTEGER NOT NULL DEFAULT 0,
  scheduled_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,

  status TEXT NOT NULL, -- running, success, partial, failed
  selection_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb,
  gate_report JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,

  UNIQUE (run_date_riyadh)
);
```

## Duplicate Check Query

Run this before calling Buffer.

```sql
SELECT
  id,
  post_key,
  platform,
  buffer_post_id,
  status,
  CASE
    WHEN post_key = :post_key THEN 'same_post_key'
    WHEN platform = :platform AND text_hash = :text_hash THEN 'same_text_same_platform'
    WHEN platform = :platform AND media_sha256 = :media_sha256 THEN 'same_media_same_platform'
    WHEN platform = :platform AND source_fingerprint = :source_fingerprint THEN 'same_source_same_platform'
    WHEN creative_hash = :creative_hash THEN 'same_creative_hash'
  END AS duplicate_reason
FROM post_registry
WHERE
  post_key = :post_key
  OR creative_hash = :creative_hash
  OR (platform = :platform AND text_hash = :text_hash)
  OR (platform = :platform AND media_sha256 = :media_sha256)
  OR (platform = :platform AND source_fingerprint = :source_fingerprint)
LIMIT 10;
```

If this returns any rows, do not schedule unless a human explicitly approves a new variation.

## Hash Rules

| Hash | Input | Purpose |
|---|---|---|
| `sha256` | Exact media file bytes | Blocks exact image reuse |
| `perceptual_hash` | Visual image fingerprint | Detects resized/minor-edited duplicate images |
| `text_hash` | Normalized post text + hashtags | Blocks repeated captions |
| `source_fingerprint` | Source type + source id/slug | Blocks same place/perfume/destination reuse on same platform |
| `creative_hash` | platform + normalized text + media sha + source fingerprint | Blocks the full creative combination |

Normalization should:

- remove Arabic diacritics and tatweel;
- normalize punctuation such as `،` and `؟`;
- collapse whitespace;
- lowercase English text;
- trim URLs consistently.

## Scheduling Flow

1. Generate or select `content_sources`.
2. Upload source media to `alzbdh-source-media`.
3. Generate final platform image/video and upload to `alzbdh-generated-media`.
4. Insert `media_assets`.
5. Insert `content_items`.
6. Insert `post_variations`.
7. Run duplicate query against `post_registry`.
8. If clean, create Buffer post.
9. Insert `post_registry` with `status = scheduled` and `buffer_post_id`.
10. Insert `buffer_events` with request/response payload.
11. Later sync Buffer sent/deleted/error states back into `post_registry`.

## Minimal API Shapes

Create media:

```json
{
  "bucket": "alzbdh-generated-media",
  "object_key": "generated/2026/06/23/tiktok_1080x1920/perfume/lhomme-ideal/post.png",
  "public_url": "https://cdn.alzbdh.com/generated/2026/06/23/tiktok_1080x1920/perfume/lhomme-ideal/post.png",
  "sha256": "...",
  "width": 1080,
  "height": 1920,
  "mime_type": "image/png",
  "platform_format": "tiktok_1080x1920",
  "source_id": "guerlain-l-homme-id-al-parfum-90803"
}
```

Create post registry row:

```json
{
  "post_key": "2026-06-23::12:35::tiktok::lhomme-ideal",
  "platform": "tiktok",
  "content_type": "perfume",
  "item_name": "لوم إيديال بارفان",
  "post_text": "لوم إيديال بارفان...",
  "hashtags": ["#الزبدة", "#زبدة_العطور", "#عطور"],
  "media_asset_id": "uuid",
  "scheduled_at_riyadh": "2026-06-23T12:35:00+03:00",
  "buffer_post_id": "6a3a27d4b87ceabd5a477223",
  "status": "scheduled"
}
```

## Migration From Current Files

| Current local file | New destination |
|---|---|
| `content/social_post_register.json` | `post_registry` |
| `content/social_post_register.csv` | export view only, not source of truth |
| `content/**/images/**` | `media_assets` + `alzbdh-generated-media` |
| `content/**/plan.json` | `post_variations` |
| `content/**/README.md` | batch notes in `daily_schedule_runs` or docs |

## Required Dashboard Views

| View | Purpose |
|---|---|
| Today scheduled | Shows all scheduled posts for the Riyadh day |
| Duplicate risk | Shows blocked candidates and the matching old post |
| Media library | Browse generated images by platform/source/date |
| Buffer sync | Shows scheduled/sent/failed/deleted Buffer states |
| Content coverage | Shows places/destinations/perfumes already used per platform |

## Non-Negotiables

- No Buffer scheduling without a `post_registry` write.
- No media scheduling without a `media_assets` row.
- No reuse when `platform + text_hash`, `platform + media_sha256`, or `platform + source_fingerprint` already exists.
- Deleted Buffer posts still count as used creative.
- A daily automation run must stop when `scheduled_count` reaches the Buffer account limit.
