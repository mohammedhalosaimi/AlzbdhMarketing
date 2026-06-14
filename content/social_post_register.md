# Social Post Register

This is the canonical posting tracker for Buffer or any social media manager workflow.

## How to use
- Use `post_key` as the idempotency key.
- Before scheduling/posting, skip any row where `posted=true` or `buffer_post_id` is filled.
- After Buffer schedules or publishes the post, update `posted`, `posted_at_riyadh`, `buffer_post_id`, `buffer_channel_id`, and `post_url` if available.
- The image paths are relative to `June marketing content/`.

## Counts
- Total platform posts: 96
- Travel posts: 39
- Places posts: 45
- Perfumes posts: 3
- Mobile app posts: 9

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

## Posted Log
- 2026-06-13 18:01-18:06 Riyadh: Published Guidance 46 perfume posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2d70e3768f4d60d56dafca, Instagram 6a2d712161b0aab8c15f6837, TikTok 6a2d718608bd17e5f3a90ff0.
- 2026-06-13 17:48-17:52 Riyadh: Published Tokyo travel posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2d6dc39017a527dd65399a, Instagram 6a2d6ded768f4d60d56d9a30, TikTok 6a2d6e3ce1196234c341463f.
- 2026-06-13 17:36-17:41 Riyadh: Published Deep Fries places posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2d6ae89017a527dd652a67, Instagram 6a2d6b3208bd17e5f3a8e676, TikTok 6a2d6b949017a527dd652db6.
- 2026-06-12 22:37-22:40 Riyadh: Published Vietnam launch posts via Buffer to X, Instagram, and TikTok. Buffer IDs: X 6a2c5ffc28ce56702c0fa9b5, Instagram 6a2c600fda3868703ac08f09, TikTok 6a2c602eda3868703ac08fe8.

## Manual Account Changes
- 2026-06-13 Riyadh: Vietnam launch posts were manually deleted by the user from the social accounts; the register keeps them as used creative to avoid accidental reposting unless explicitly requested.

## Scheduled Queue
- 2026-06-17 to 2026-06-19 Riyadh: Scheduled mobile-app acquisition posts via Buffer for X, Instagram, and TikTok. Themes: اسأل زبدة, وين نروح الليلة, بدل ما تقرأ ٢٠٠ تعليق.

- 2026-06-14 Riyadh: Scheduled إيرث كافيه posts via Buffer. X 12:35 (6a2d77d361b0aab8c15f8dfe), Instagram 20:45 (6a2d77df08bd17e5f3a93710), TikTok 21:30 (6a2d77e9adc07817f4124573).
- 2026-06-15 Riyadh: Scheduled إسطنبول posts via Buffer. X 12:35 (6a2d77f7e1196234c341862a), Instagram 20:45 (6a2d7803768f4d60d56dd7d7), TikTok 21:30 (6a2d780dadc07817f4124622).
- 2026-06-16 Riyadh: Scheduled المتحف الوطني السعودي posts via Buffer. X 12:35 (6a2d781761b0aab8c15f8f72), Instagram 20:45 (6a2d7823e1196234c34186a8), TikTok 21:30 (6a2d782c768f4d60d56dd8b7).
