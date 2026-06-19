import test from 'node:test';
import assert from 'node:assert/strict';

import {
  candidateEntry,
  scopeFillFutureCandidates,
} from '../scripts/buffer-feeder-gate.mjs';

test('fill-future returns no candidates when the target date has no approved rows', () => {
  const candidates = [
    { date: '2026-06-22', platform: 'X', time_riyadh: '09:45', text: 'x', hashtags: '', source_id: 'a' },
    { date: '2026-07-06', platform: 'Instagram', time_riyadh: '20:45', text: 'ig', hashtags: '', source_id: 'b' },
  ];

  assert.deepEqual(scopeFillFutureCandidates(candidates, '2026-06-19'), []);
});

test('candidateEntry uses the rewritten night time in the generated post key', () => {
  const candidate = candidateEntry({
    date: '2026-07-03',
    platform: 'X',
    time_riyadh: '09:45',
    text: 'وش تفضلون في محتوى السفر؟',
    hashtags: '#الزبدة',
    source_id: 'phuket',
  }, 'content/two-week-batch/example/plan.json');

  assert.equal(candidate._planned_time_riyadh, '09:45');
  assert.equal(candidate.time_riyadh, '21:00');
  assert.equal(candidate._post_key, '2026-07-03::21:00::x::phuket');
});
