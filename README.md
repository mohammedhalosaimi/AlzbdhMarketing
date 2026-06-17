# Alzbdh Marketing

Dedicated marketing workspace for **الزبدة**.

This repository is intentionally separate from the product monorepo. It contains
brand assets, campaign creatives, social captions, schedules, QA notes, and
Buffer tracking logs for marketing operations.

## Structure

- `brand/` - logos, design-system references, colors, and typography sources.
- `content/` - generated social media campaigns and production-ready assets.
- `docs/marketing/` - marketing strategy, launch plans, ad frameworks, and templates.
- `ops/` - publishing, hosting, scheduling, and QA runbooks.

## Current Campaign Areas

- `content/travel/` - destination social posts.
- `content/places/` - local places, cafes, restaurants, clinics, and city discovery.
- `content/perfumes/` - perfume product/social creatives.
- `content/mobile-app/` - iOS Arabic app acquisition creatives.

## Publishing Rules

- App name in Arabic is always `الزبدة`.
- Use durable hosted media URLs for Buffer, preferably `images.alzbdh.com`.
- Do not use temporary media hosts for scheduled posts.
- Keep `content/social_post_register.*` updated after every Buffer action.
- Never repost an asset if its register row is marked posted or already scheduled.
- Run `npm run buffer:gate -- --date YYYY-MM-DD --current-scheduled N` before
  creating Buffer posts. Use `npm run buffer:select -- --date YYYY-MM-DD
  --current-scheduled N --fill-future` when today's rows are exhausted and the
  account has open scheduled-post capacity. A post is a duplicate if the same
  channel has matching normalized text, matching normalized media, or the same
  source with equivalent text anywhere in the used register history.
- Buffer's `scheduledPosts=10` limit is an account-level cap for this workspace.
  The daily feeder fills only the open slots up to 10 total scheduled posts.
- Time-sensitive wording must match Riyadh time. Morning copy such as
  `صباح الخير` is only valid from 05:00 through 11:59; night/evening copy such
  as `الليلة` is valid from 16:00 onward.

## Buffer Cadence

Timezone: Asia/Riyadh

- Launch mode: 9 same-day scheduled posts when Buffer capacity allows.
- Wave 1: 12:15 X, 12:35 Instagram, 12:55 TikTok.
- Wave 2: 18:40 X, 19:00 Instagram, 19:20 TikTok.
- Wave 3: 21:05 X, 21:25 Instagram, 21:45 TikTok.

Buffer's current plan caps scheduled posts at 10, so the daily feeder should schedule one day at a time rather than filling multiple future days.

## Source Repo

Created from selected marketing materials in:

`/Users/mohammed/Desktop/Software_Projects/ZbdhAIConcierge`

No product source code is required here.
