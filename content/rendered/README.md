# Rendered Social Output

`npm run render:calendar` writes dated render batches here. Each batch contains:

- `plan.json` - Buffer-compatible rows.
- `plan.csv` - review/export version.
- `images/<platform-size>/` - final social images.
- `html/<platform-size>/` - HTML source used to render images.
- `summary.json` - counts and template usage.

The Buffer feeder now scans this folder, so rendered CSV batches can be scheduled
through the same duplicate and timing gate as generated batches.

