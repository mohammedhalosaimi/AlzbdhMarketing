# Social Calendar CSV

`social-calendar.csv` is the human-editable source of truth for upcoming creative.
Each row selects a reusable template and supplies the text for both the image and
the social caption.

Required columns:

- `post_key`
- `date`
- `time_riyadh`
- `platform`
- `category`
- `template_id`
- `subject_id`
- `title`
- `subtitle`
- `body`
- `cta`
- `caption`
- `hashtags`
- `image_url`
- `alt_text`
- `status`

Rows with `status=ready` are rendered by default.

