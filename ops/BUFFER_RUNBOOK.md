# Buffer Runbook

## Before Scheduling

- Confirm the creative uses `الزبدة` for the app name.
- Confirm the image has the correct platform size.
- Confirm the media URL is hosted on `images.alzbdh.com`.
- Confirm the caption and hashtags match the platform.
- Confirm the row exists in `content/social_post_register.*`.

## After Scheduling

- Record the Buffer post ID.
- Record the channel ID.
- Record the scheduled Riyadh time.
- Record the hosted media URL.
- Keep `posted` as `false` until Buffer reports the post as sent.

## If a Post Fails

1. Check the Buffer error.
2. If the error mentions media accessibility, rehost the image on `images.alzbdh.com`.
3. Edit the existing Buffer post instead of creating a duplicate.
4. Update the register notes with the failed post ID and replacement media URL.
