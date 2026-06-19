# Buffer Feeder Fill-Future Overfills Queue

- Occurrences: 1
- First seen: 2026-06-19
- Last seen: 2026-06-19

## Symptom

The daily Buffer feeder schedules a spread of posts across distant future dates
even though the target Riyadh date has no approved rows.

## Root Cause Pattern

The selector accepted every row with `date >= targetDate` whenever
`--fill-future` was enabled, so an empty queue on a no-content day caused the
balancer to fill the full account cap from later dates. The same code path also
rewrote some rows into the night window without updating the generated post key,
which made register entries misleading.

## Fix Pattern

Scope `--fill-future` to the target Riyadh date only: if that date has no
eligible rows, return an empty selection. When a row's scheduled time is
rewritten to the night window, build the generated post key from the rewritten
time rather than the stale source-plan time.

## Verification

- `node --test tests/buffer-feeder-gate.test.mjs`
- `npm run buffer:select -- --date 2026-06-19 --current-scheduled 0 --fill-future`

## Occurrence Log

| Date | Summary | Action |
| --- | --- | --- |
| 2026-06-19 | Daily feeder filled July dates from an empty June 19 queue. | Deleted 10 scheduled Buffer posts, reverted the register commit, and patched selector/date scoping. |
