# Social Template Library

Reusable visual templates live here. Each template has real blank PNG base images
that the renderer writes on top of. The CSV calendar selects a `template_id`,
then `npm run render:calendar` renders platform-specific finished posts and a
Buffer-ready `plan.json`.

## Folders

- `places/` - restaurants, cafes, attractions, clinics, city discovery.
- `destinations/` - travel planning, highlights, timing, suitability.
- `perfumes/` - perfume notes, mood, brand, recommendation.
- `ads/` - acquisition and product marketing ads for the app.

Inside each category:

- `templates.json` - template metadata and `template_id` values.
- `images/<template_id>/` - blank write-on PNG templates for X, Instagram, and
  TikTok.
- `html/<template_id>/` - generated preview HTML used to render the PNG bases.

## Workflow

1. Run `npm run render:templates` after changing template styling.
2. Add or edit rows in `content/calendar/social-calendar.csv`.
3. Pick a `category` and matching `template_id`.
4. Run:

```bash
npm run render:calendar
```

5. Review rendered output in `content/rendered/<batch>/`.
6. Run the Buffer gate before scheduling:

```bash
npm run buffer:gate -- --date YYYY-MM-DD --current-scheduled N --plan content/rendered/<batch>/plan.json --audit-all-plans
```
