# Social Post Register

This is the canonical posting tracker for Buffer or any social media manager workflow.

## How to use
- Use `post_key` as the idempotency key.
- Before scheduling/posting, skip any row where `posted=true` or `buffer_post_id` is filled.
- After Buffer schedules or publishes the post, update `posted`, `posted_at_riyadh`, `buffer_post_id`, `buffer_channel_id`, and `post_url` if available.
- Image paths are relative to the marketing repo root unless a row has an explicit public URL.

## Counts
- Total platform posts: 196
- Travel posts: 39
- Places posts: 45
- Perfumes posts: 3
- Mobile app posts: 9
- Marketing content posts: 12
- Engagement posts: 4
- Two-week batch places posts: 40
- Two-week batch travel posts: 25
- Two-week batch perfume posts: 5
- Rendered CSV template posts: 4

## Voice sources
- `docs/marketing/README.md`
- `docs/marketing/social-post-template.md`
- `docs/marketing/ad-framework.md`
- `docs/design/AlzbdhDesignSystemV3.html`
- `docs/BRD.md`

## Files
- `social_post_register.csv` for spreadsheets/Buffer tracking.
- `social_post_register.json` for automation.
- Per-folder caption files remain in `travel/copy/`, `places/copy/`, and `perfumes/copy/`.
- `marketing-content/` contains the current campaign-ready ad/account pack across places, travel, perfumes, and mobile app.
- `two-week-batch/2026-06-22_to_2026-07-05/` contains the next 14-day rolling Buffer batch.

## Posted Log
- 2026-06-13 18:01-18:06 Riyadh: Published Guidance 46 perfume posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2d70e3768f4d60d56dafca, Instagram 6a2d712161b0aab8c15f6837, TikTok 6a2d718608bd17e5f3a90ff0.
- 2026-06-13 17:48-17:52 Riyadh: Published Tokyo travel posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2d6dc39017a527dd65399a, Instagram 6a2d6ded768f4d60d56d9a30, TikTok 6a2d6e3ce1196234c341463f.
- 2026-06-13 17:36-17:41 Riyadh: Published Deep Fries places posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2d6ae89017a527dd652a67, Instagram 6a2d6b3208bd17e5f3a8e676, TikTok 6a2d6b949017a527dd652db6.
- 2026-06-12 22:37-22:40 Riyadh: Published Vietnam launch posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2c5ffc28ce56702c0fa9b5, Instagram 6a2c600fda3868703ac08f09, TikTok 6a2c602eda3868703ac08fe8.

## Manual Account Changes
- 2026-06-13 Riyadh: Vietnam launch posts were manually deleted by the user from the social accounts; the register keeps them as used creative to avoid accidental reposting unless explicitly requested.
- 2026-06-15 Riyadh: Sent-post audit found older published places captions with `تقييم زبدة` / `زبدة الرياض` wording. Recommendation: do not mass-delete unless brand consistency is more important than preserving early account activity; Buffer cannot edit already-sent posts from this connector.

## Scheduled Queue
- 2026-06-20 Riyadh: Scheduled scratch tonight posts via Buffer, generated without the template renderer. TikTok 20:20 (6a36c9fe2186d297628a2730), 21:20 (6a36ca1e9513262b4d2ea2db), 22:20 (6a36ca3f566900623a6195f2), 23:20 (6a36ca5e2186d297628a2956); X 20:40 (6a36ca09cc3bc13e7add6261), 21:40 (6a36ca28566900623a619559), 22:40 (6a36ca489513262b4d2ea37f); Instagram 21:00 (6a36ca13cfab3643d8c8a25f), 22:00 (6a36ca322186d297628a284d), 23:00 (6a36ca54566900623a619663).
- 2026-06-22 to 2026-07-05 Riyadh: Prepared 70 rolling-feed posts locally for X, Instagram, Instagram Story-style assets, and TikTok. These are marked `ready` only; do not pre-schedule all rows because the Buffer plan is capped at 10 scheduled posts. Daily feeder should schedule the same-day five-post batch and then write back Buffer IDs.
- 2026-06-17 to 2026-06-19 Riyadh: Scheduled mobile-app acquisition posts via Buffer for X, Instagram, and TikTok. Themes: اسأل الزبدة, وين نروح الليلة, بدل ما تقرأ ٢٠٠ تعليق.

- 2026-06-15 Riyadh: Updated scheduled Buffer captions that had brand wording issues:
  - إسطنبول Instagram/TikTok now says `خلّ الزبدة` / `الزبدة`.
  - المتحف الوطني السعودي X/Instagram/TikTok now says `تقييم الزبدة` and `في الزبدة` instead of app-brand wording without the article.
- 2026-06-17 to 2026-06-19 Riyadh: Added X-only engagement prompts at 17:20 to make the account more conversational without over-posting visual content on Instagram/TikTok. Buffer IDs: 6a2fd917de9e76f6203923cb, 6a2fd945f18d4698afaa4851, 6a2fd976c266f6f56ba5ca53.
- 2026-06-17 Riyadh: Added one X-only morning prompt at 09:45 to test the Saudi weekday mid-morning window. Buffer ID: 6a2ffa5d9815dc2cea27b661.
- 2026-06-15 Riyadh: Refreshed scheduled media URLs in Buffer from older GitHub raw paths to GitHub Release assets under `buffer-media-2026-06-15`, without pushing repository contents. Updated all scheduled visual posts through 2026-06-21 except الطائف Instagram/TikTok, where Buffer returned a 429 rate limit before the final two edits. Retry after the connector cooldown.
- 2026-06-20 Riyadh: Scheduled يرمين posts via Buffer. X 12:35 (6a2fd79dbc4ff5b211518dfe), Instagram 20:45 (6a2fd7d2c11354a315fdc648), TikTok 21:30 (6a2fd8259417b7b890885861).
- 2026-06-20 Riyadh: Scheduled rendered CSV template posts via Buffer. Hànội/Hanoi X 18:10 (6a36920e85c1c7cceb0b7b01), Happy London Instagram 18:45 (6a36921b9513262b4d2d57b7), Rabbit TikTok 19:20 (6a36922b9513262b4d2d586e), Alzbdh app ad X 19:55 (6a36923b85c1c7cceb0b7cbe).
- 2026-06-21 Riyadh: Scheduled الطائف posts via Buffer. X 12:35 (6a2fd85dbc4ff5b2115192a4), Instagram 20:45 (6a2fd896c266f6f56ba5c66c), TikTok 21:30 (6a2fd8d2c11354a315fdcbfe).

- 2026-06-14 Riyadh: Scheduled إيرث كافيه posts via Buffer. X 12:35 (6a2d77d361b0aab8c15f8dfe), Instagram 20:45 (6a2d77df08bd17e5f3a93710), TikTok 21:30 (6a2d77e9adc07817f4124573).
- 2026-06-15 Riyadh: Scheduled إسطنبول posts via Buffer. X 12:35 (6a2d77f7e1196234c341862a), Instagram 20:45 (6a2d7803768f4d60d56dd7d7), TikTok 21:30 (6a2d780dadc07817f4124622).
- 2026-06-16 Riyadh: Scheduled المتحف الوطني السعودي posts via Buffer. X 12:35 (6a2d781761b0aab8c15f8f72), Instagram 20:45 (6a2d7823e1196234c34186a8), TikTok 21:30 (6a2d782c768f4d60d56dd8b7).
