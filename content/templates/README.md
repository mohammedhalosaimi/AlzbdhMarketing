# Social Template Library

Reusable visual templates live here. The CSV calendar selects a `template_id`, then
`npm run render:calendar` renders platform-specific images and a Buffer-ready
`plan.json`.

## Folders

- `places/` - restaurants, cafes, attractions, clinics, city discovery.
- `destinations/` - travel planning, highlights, timing, suitability.
- `perfumes/` - perfume notes, mood, brand, recommendation.
- `ads/` - acquisition and product marketing ads for the app.

## Workflow

1. Add or edit rows in `content/calendar/social-calendar.csv`.
2. Pick a `category` and matching `template_id`.
3. Run:

```bash
npm run render:calendar
```

4. Review rendered output in `content/rendered/<batch>/`.
5. Run the Buffer gate before scheduling:

```bash
npm run buffer:gate -- --date YYYY-MM-DD --current-scheduled N --plan content/rendered/<batch>/plan.json --audit-all-plans
```

