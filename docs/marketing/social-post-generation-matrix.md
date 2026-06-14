# الزبدة — Social Post Generation Matrix (16-ad MVP)

The single orchestration sheet for generating all 16 launch posts. It maps each ad to its campaign, persona, platform variants, objective/KPI, copy, CTA, prompt source, asset status, and claim check — so the batch-generation issues (ZBDH-576/577/578) can run straight from this table.

**How to use it (4 inputs):**
1. **This matrix** = *what* to make for each ad + the production metadata.
2. **`social-post-template.md`** = *how* to write/format each post (voice, loop, fields, visual rules, copy-paste block).
3. **`MVPAdLaunchPlan.md`** = the authoritative *full copy + image/video prompts* per ad (this matrix points to it as `§Ad N`; don't re-transcribe — generate from the source prompt).
4. **`README.md` §3** = the verified claim ledger every post must pass.

**Source of truth:** `MVPAdLaunchPlan.md` (the 16 ads), `old_mvp-launch-social-ads.md` (personas, A/B, KPIs, cadence), `ad-framework.md` (voice + Value-vs-Motion gate). Numerals are Western 0–9 (per ZBDH-156/400); CTAs are verbatim from the plan.

---

## 1. Campaigns at a glance

| Campaign | Ads | Budget | Objective | In-app KPIs |
|---|---|---|---|---|
| **Riyadh Map Launch** | 1–6 | 60% | Engagement + in-app actions | `map_open`, `place_open`, `save`, `share` |
| **Travel Immersive** | 7–12 | 30% | App installs + trip generation | `itinerary_generate`, `trip_confirm` |
| **Travel Scam Awareness** | 13–16 | 10% (within Travel) | Trust + retargeting conversion | `app_open`, `itinerary_generate`, `share` |

---

## 2. Master matrix

All 13 required fields live across this table (§2) and the per-ad cards (§3). Format codes: **S** = static 1080×1350, **V** = video/reel 1080×1920, **SD** = real-app screen demo. Track: **A** AI static · **B** AI video · **C** screen recording · **D** ready/exportable asset.

| Ad | Campaign | Format | Persona | Phase / objective | Primary KPI | CTA | Asset status | Track |
|----|----------|--------|---------|-------------------|-------------|-----|--------------|-------|
| **1** Google Confusion | Riyadh Map | V 9–12s + S | سلطان | W1 Awareness | place_open | افتح الخريطة | Needs production | B + A |
| **2** Locate Me Power | Riyadh Map | SD 10s + S | سلطان | W1→2 Engagement | map_open | جرّب الخريطة الآن | Record from real app | C |
| **3** Pin مو بس Pin (Z-Score) | Riyadh Map | V 15s + S | سلطان | W2 Engagement | place_open / save | اكتشف أماكن الرياض | Partial ready (H7–H10) | D + B |
| **4** Save It Now | Riyadh Map | SD 8s + S | سلطان | W2 Engagement | save | ابدأ قائمتك | Record from real app | C |
| **5** Share Without Explaining | Riyadh Map | V 8s + S | سلطان / خالد | W3 Engagement→Conv. | share | شارك الزبدة | Needs production | B |
| **6** Premium Static | Riyadh Map | S + V 10s | سلطان | W3 Conversion | map_open / place_open | اكتشف الحين | **Ready** (H7–H10) | D |
| **7** Vietnam Immersive | Travel | S + V 12s | نورة / أم فهد | W1 Awareness | itinerary_generate | خطّطها في الزبدة | Needs AI generation | A + B |
| **8** Istanbul Immersive | Travel | S + V 12s | أم فهد | W3 Conversion | itinerary_generate / trip_confirm | خطط رحلتك | **Ready** static (H1) | D + B |
| **9** Stop Traveling Like a Tourist | Travel | V 15s + S (bi) | نورة | W1 Awareness | itinerary_generate | خطط رحلتك مجاناً | Needs production | B + A |
| **10** Before / After | Travel | V 12s + S | أم فهد / خالد | W2 Engagement | itinerary_generate | جرّب الفرق | Needs production | B + A |
| **11** AI Companion | Travel | SD 12s + S | خالد / نورة | W2 Engagement | itinerary_generate | جرّب الذكاء الاصطناعي | Record from real app | C |
| **12** Ultra Premium Minimal | Travel | S + V 10–12s (bi) | نورة / GCC | W3 Conversion | trip_confirm | جرّب الزبدة | Partial ready (H1–H6 style) | D + B |
| **13** التاكسي المشبوه (Taxi Trap) | Scam | V 12s + S | خالد / first-timer | W2–3 Trust / retarget | app_open / itinerary_generate | خطط رحلتك صح | Needs production | B + A |
| **14** حلال مضروب (Fake Halal) | Scam | V 15s + S | أم فهد | W2–3 Trust | itinerary_generate | اكتشف المطاعم الحلال | Needs production | B + A |
| **15** المطعم السياحي (Tourist Trap) | Scam | V 12s + S | سلطان / نورة | W2–3 Trust / retarget | share / itinerary_generate | اكتشف الأماكن الحقيقية | Needs production | B + A |
| **16** صاحبك اللي سافر | Scam | S + V 10–12s | any / أم فهد | W2–3 Trust / retarget | app_open | خطط رحلتك مع الزبدة | Needs AI generation | A + B |

---

## 3. Per-ad generation cards

Source copy & captions are the identifying lines; **the authoritative full script + image/video prompts are in `MVPAdLaunchPlan.md §Ad N`** — generate from there. Every card's features are ✅ allowed per `README.md` §3.

### Riyadh Map Launch (Ads 1–6) — persona سلطان

**Ad 1 — Google Confusion** · V 9–12s + S · W1 Awareness · KPI `place_open`
- **Source copy:** "قوقل حيّرني. 200 خيار… ولا قرار. الزبدة؟ تعطيك الأفضل — والباقي تفاصيل." (full: §Ad 1)
- **Caption:** كل ما أبي مكان بالرياض أدخل قوقل وأطلع أتعب أكثر 😮‍💨 فيه حل أسهل
- **Prompt source:** §Ad 1 (image + video). **Track B** (video) + **A** (static). **Notes:** split chaos→clarity; show place discovery + Z-Score + AI gist.
- **Claims:** ✅ place discovery (2,000+), Z-Score, AI summaries.

**Ad 2 — Locate Me Power** · SD 10s + S · W1→2 Engagement · KPI `map_open`
- **Source copy:** "أنا هنا. وش الأفضل حولي؟ افتح موقعك… وخلاص." (full: §Ad 2)
- **Caption:** ما تحتاج تسأل أحد. افتح الزبدة وهي تدلّك 📍
- **Prompt source:** §Ad 2 (screen-demo storyboard). **Track C** — record GPS pins + place-card from the live app. **Notes:** real screen recording (see ZBDH-579).
- **Claims:** ✅ GPS discovery, category filters, place cards.

**Ad 3 — Pin مو بس Pin (Z-Score)** · V 15s + S carousel · W2 Engagement · KPI `place_open` / `save`
- **Source copy:** "الخريطة تعطيك أماكن. الزبدة تعطيك الزبدة." (3 real places: بروز كافيه / ماما نوره / كانديرا — full: §Ad 3)
- **Caption:** كل مكان عليه زبدة صريحة — وش الحلو ووش السيء. بدون مجاملة 💯
- **Prompt source:** §Ad 3 (image + video); static partly **ready** as H7–H10 in `apps/ads/zbdh-claude-style-v2.html`. **Track D** (static) + **B** (video). **Notes:** pull live Z-Score + gist text so the honest mix (2 positive, 1 caution) is real.
- **Claims:** ✅ زبده gists (honest pros/cons), Z-Score. Show real gist text only.

**Ad 4 — Save It Now** · SD 8s + S · W2 Engagement · KPI `save`
- **Source copy:** "احفظها الحين. بترجع لها." (full: §Ad 4)
- **Caption:** كل مكان حلو بالرياض — في مكان واحد ❤️
- **Prompt source:** §Ad 4. **Track C** — record favorite/save flow from the live app. **Notes:** screen recording (ZBDH-579).
- **Claims:** ✅ favorites/save.

**Ad 5 — Share Without Explaining** · V 8s + S · W3 Engagement→Conversion · KPI `share`
- **Source copy:** "صاحبك يسألك وين نروح؟ ما يحتاج شرح. شاركها وخلاص." (full: §Ad 5)
- **Caption:** بدال ما تكتب 5 رسائل وتشرح المكان… شارك البطاقة وخلاص 🔗
- **Prompt source:** §Ad 5 (image + video). **Track B** — acted car scene + WhatsApp share-sheet of a place card. **Notes:** show real shareable place card.
- **Claims:** ✅ place sharing, gist-as-card.

**Ad 6 — Premium Static** · S + V 10s · W3 Conversion · KPI `map_open` / `place_open`
- **Source copy:** headline "افتح الخريطة… وخلاص." · sub "أماكن الرياض مع زبدة صريحة." (full: §Ad 6)
- **Caption:** خريطة الرياض بعيون الزبدة — أماكن مجرّبة وآراء صريحة 📍
- **Prompt source:** §Ad 6; static **ready** as H7–H10 in `zbdh-claude-style-v2.html`. **Track D**. **Notes:** export-ready — fastest path to a live static.
- **Claims:** ✅ map UI, place cards, Z-Score.

### Travel Immersive (Ads 7–12)

**Ad 7 — Vietnam Immersive** · S + V 12s · نورة / أم فهد · W1 Awareness · KPI `itinerary_generate`
- **Source copy:** "VIETNAM — عيشها مثل أهلها." (full: §Ad 7)
- **Caption:** فيتنام مو بس فو وقهوة. الزبدة ترتب لك كل يوم — وتدلّك على المطاعم الحلال ✈️🇻🇳
- **Prompt source:** §Ad 7 (image + video). **Track A/B** — AI travel poster + reel. **Notes:** show day-by-day + halal badge on a real itinerary card.
- **Claims:** ✅ destination scoring, AI itinerary, halal badges.

**Ad 8 — Istanbul Immersive** · S + V 12s · أم فهد (family) · W3 Conversion · KPI `itinerary_generate` / `trip_confirm`
- **Source copy:** "ISTANBUL — عِشها كأنك واحد منهم." (full: §Ad 8)
- **Caption:** إسطنبول غير لما تخطط صح: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان. الزبدة ترتبها لك ✈️
- **Prompt source:** §Ad 8; static **ready** as H1 in `zbdh-claude-style-v2.html`. **Track D + B**. **Notes:** family scene + day-2 itinerary, halal hotel/restaurant cards.
- **Claims:** ✅ day-by-day, halal restaurants, destination scoring.

**Ad 9 — Stop Traveling Like a Tourist** · V 15s + S (bilingual) · نورة · W1 Awareness · KPI `itinerary_generate`
- **Source copy:** "Stop traveling like a tourist. عِشها مثل أهلها. الزبدة ترتبها لك — كل يوم، من الصبح للمسا." (full: §Ad 9)
- **Caption:** السياح يروحون نفس الأماكن. الزبدة تخطط لك أماكن ما تلقاها بقوقل 🗺️
- **Prompt source:** §Ad 9 (image + video). **Track B + A** — tourist-vs-local montage; bilingual EN hook / AR delivery. **Notes:** strong TikTok hook.
- **Claims:** ✅ itinerary, activity gists, halal badges, local tips.

**Ad 10 — Before / After** · V 12s + S · أم فهد / خالد · W2 Engagement · KPI `itinerary_generate`
- **Source copy:** "نفس الرحلة. تخطيط مختلف." (بدون الزبدة / مع الزبدة — full: §Ad 10)
- **Caption:** نفس الوجهة. بس التخطيط فرق. جرّب الزبدة ✈️
- **Prompt source:** §Ad 10 (image + video). **Track B + A** — split-screen wipe (37 tabs → clean itinerary). **Notes:** the satisfying reveal IS the message.
- **Claims:** ✅ wizard→itinerary, halal badges, gists, pre-flight checklist.

**Ad 11 — AI Companion** · SD 12s + S · خالد / نورة · W2 Engagement · KPI `itinerary_generate`
- **Source copy:** "مو AI يتفلسف. AI يخطط. 4 أسئلة — رحلة كاملة." (full: §Ad 11)
- **Caption:** سألته 4 أسئلة وطلع لي جدول 5 أيام بإسطنبول: فنادق حلال، مطاعم، وزبدة صريحة لكل مكان. مجاناً. 🤖
- **Prompt source:** §Ad 11. **Track C** — record real chat→wizard→itinerary (Istanbul 94% match). **Notes:** screen recording (ZBDH-579); strong YT Short.
- **Claims:** ✅ AI chat, wizard (4 Q → trip), destination scoring. Lead with "مجاناً".

**Ad 12 — Ultra Premium Minimal** · S + V 10–12s (bilingual) · نورة / GCC · W3 Conversion · KPI `trip_confirm`
- **Source copy:** "رحلتك، مرتبة." / "Travel. Refined." · sub "من الفكرة لآخر يوم — مجاناً." (full: §Ad 12)
- **Caption:** (brand statement — minimal; see §Ad 12)
- **Prompt source:** §Ad 12; close to H1–H6 style in `zbdh-claude-style-v2.html`. **Track D + B**. **Notes:** zero-clutter brand film; lead with free, no price.
- **Claims:** ✅ itinerary, halal badge, gist. Price posture: free.

### Travel Scam Awareness (Ads 13–16)

**Ad 13 — التاكسي المشبوه (Taxi Trap)** · V 12s + S · خالد / first-timer · W2–3 Trust/retarget · KPI `app_open` / `itinerary_generate`
- **Source copy:** "التاكسي من المطار: 50 يورو. قوقل يقول: 15. انصابت؟ عادي، كلنا مرينا فيها. الزبدة تقولك السعر الحقيقي — قبل لا تركب." (full: §Ad 13)
- **Caption:** أول يوم بالرحلة وانصبت بالتاكسي؟ مو لازم. الزبدة تعطيك السعر الحقيقي قبل لا تطلع من المطار 🚕💸
- **Prompt source:** §Ad 13 (image + video). **Track B + A**. **Notes:** show a **real** transfer-route price range; strong X/TikTok.
- **Claims:** ✅ transfer routes with real prices, airport→hotel estimates. Use real ranges only.

**Ad 14 — حلال مضروب (Fake Halal)** · V 15s + S · أم فهد · W2–3 Trust · KPI `itinerary_generate`
- **Source copy:** "المطعم كاتب حلال على الباب. بس هل فعلاً حلال؟ … الزبدة تحقّقت لك — ما نكتب حلال إلا إذا متأكدين." (full: §Ad 14)
- **Caption:** كلمة "حلال" على الباب ما تكفي. الزبدة تعطيك تصنيف حلال حقيقي — مو مجاملة 🥩✅
- **Prompt source:** §Ad 14 (image + video). **Track B + A**. **Notes:** show a **real** 5-level halal badge + verification note; never fabricate a halal status.
- **Claims:** ✅ 5-level halal badges, verification notes, halal gists. Real badges only.

**Ad 15 — المطعم السياحي (Tourist Trap)** · V 12s + S · سلطان / نورة · W2–3 Trust/retarget · KPI `share` / `itinerary_generate`
- **Source copy:** "4.5 نجوم على قوقل. دفعت ثلاث أضعاف. والأكل؟ عادي. التقييم كان من سيّاح — مو من أهل البلد. الزبدة تعطيك رأي صريح — بدون مجاملة." (full: §Ad 15)
- **Caption:** 4.5 نجوم ومطعم سياحي والأكل عادي؟ كلنا مرينا فيها. الزبدة تقولك الصدق — من أول 💯🍽️
- **Prompt source:** §Ad 15 (image + video). **Track B + A**. **Notes:** Z-Score vs inflated rating; tourist-trap flag in amber.
- **Claims:** ✅ Z-Score, honest gist, tourist-trap flags, local-vs-tourist review analysis.

**Ad 16 — صاحبك اللي سافر** · S + V 10–12s · any / أم فهد · W2–3 Trust/retarget · KPI `app_open`
- **Source copy:** "صاحبك اللي سافر قبلك؟ هذي الزبدة." · sub "تحذيرات حقيقية. أماكن مجرّبة. بدون نصب." (full: §Ad 16)
- **Caption:** الزبدة مو تطبيق سياحي عادي. الزبدة = صاحبك اللي سبقك وسافر وقالك وش تسوي ووش تتجنب. بدون مجاملة 🤝✈️
- **Prompt source:** §Ad 16 (image + video). **Track A + B** — 3 stacked alert cards (taxi/halal/tourist-trap). **Notes:** ties the 3 scam ads together; retargeting closer.
- **Claims:** ✅ scam warnings, honest gists, halal badges, transfer prices, tourist-trap alerts.

---

## 4. Generation tracks (split screen-recording vs AI generation)

Separating real-app capture from AI generation so the two pipelines can run in parallel.

| Track | Pipeline | Ads | Blocked on |
|---|---|---|---|
| **A — AI static image** | DALL·E / Midjourney (1080×1350) from §Ad N image prompt | 1, 7, 9, 10, 13, 14, 15, 16 (+ static halves of 3, 12) | — |
| **B — AI video** | Sora (1080×1920) from §Ad N video prompt | 1, 5, 7, 9, 10, 13, 14, 15, 16 (+ video halves of 3, 8, 12) | — |
| **C — Real-app screen recording** | Capture from the live app (no AI) | **2, 4, 11** (+ partial 3 for live gist text) | **ZBDH-579** (screen-demo capture plan) |
| **D — Ready / exportable now** | Export from `apps/ads/zbdh-claude-style-v2.html` | **6** (H7–H10), **8** (H1), **3** (partial H7–H10), **12** (partial H1–H6) | — (fastest path to live) |

**Fastest-to-live first pass:** Track D (Ads 6, 8 static) → Track C once ZBDH-579 lands (Ads 2, 4, 11) → Track A/B for the rest.

---

## 5. Platform variant map (first-pass)

★ = primary placement · ✓ = also produce. Reels/videos export 9:16; static exports 4:5 (IG feed) and 16:9 (X).

| Ad | IG Reel | IG Story | IG Feed | TikTok | X | Snap | YT Short |
|----|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | ★ | ✓ | ✓ | ✓ | ✓ | | |
| 2 | ★ | ✓ | | ✓ | | ✓ | |
| 3 | ★ | ✓ | ✓ | ✓ | ✓ | | |
| 4 | ★ | ✓ | | ✓ | | ✓ | |
| 5 | ★ | ✓ | | ★ | ✓ | | |
| 6 | ✓ | ✓ | ★ | | ✓ | ✓ | |
| 7 | ★ | ✓ | ✓ | ★ | | | |
| 8 | ✓ | ✓ | ★ | ✓ | | | ✓ |
| 9 | ★ | ✓ | ✓ | ★ | ✓ | | ✓ |
| 10 | ★ | ✓ | ✓ | ✓ | ✓ | | |
| 11 | ★ | ✓ | | ★ | | | ★ |
| 12 | ✓ | ✓ | ★ | | ✓ | | ✓ |
| 13 | ★ | ✓ | | ★ | ★ | | |
| 14 | ★ | ✓ | ✓ | ✓ | | ✓ | |
| 15 | ★ | | ✓ | ★ | ✓ | | |
| 16 | ✓ | ✓ | ★ | ✓ | ✓ | | |

Platform formatting rules (length, audio, hooks) per network: `old_mvp-launch-social-ads.md` §12.

---

## 6. Testing schedule & 8-week cadence

### Week 1–3 ad rollout (from `MVPAdLaunchPlan.md`)

| Week | Audience | Ads | Goal |
|------|----------|-----|------|
| 1 | Cold (broad Saudi) | 1, 2, 7, 9 | Hook + awareness |
| 2 | Warm (video viewers 50%+) | 3, 4, 10, 11 | Feature education |
| 3 | High intent (75%+ viewers + retarget) | 5, 6, 8, 12 | Conversion |
| 2–3 | Warm + retarget (traveled before) | 13, 14, 15, 16 | Trust + conversion |

### 8-week phase cadence (from `old_mvp-launch-social-ads.md`)

| Weeks | Phase | Emotion | Lead metric |
|---|---|---|---|
| 1–2 | Awareness | frustration → relief | CPM, 3s view rate |
| 3–4 | Engagement | curiosity → "I want that" | save rate, share rate, 75% view |
| 5–6 | Conversion | desire → action | CPI, cost per first itinerary |
| 7–8 | Retention | belonging → advocacy | DAU, trip completion, UGC |

**A/B tests by phase** (full table: old_mvp §13):
- **W1–2:** hook (Arabic vs bilingual)→3s view · friction (37 tabs vs WhatsApp)→save · CTA (جرّبها مجاناً vs خطط رحلتك)→CTR · end-card palette (sand vs dark-green)→recall.
- **W3–4:** demo (screen-rec vs animated)→75% view · focus (wizard→itinerary vs halal+gists)→save · length (8s vs 15s)→completion · audio (lo-fi vs trending)→share.
- **W5–6:** social proof (numbers vs UGC)→CPI · free messaging (أول رحلة مجاناً vs خطط بلا حدود مجاناً)→CTR · install CTA (direct vs landing)→install-to-trip · objection handling (on/off)→conversion.

**KPI targets** (W2 / W4 / W6 / W8 — full table: old_mvp §14):

| Metric | W2 | W4 | W6 | W8 |
|---|---|---|---|---|
| Impressions | 500K | 1.5M | 2.5M | 4M |
| Video views (3s+) | 100K | 400K | 700K | 1M |
| App installs | 500 | 2,000 | 5,000 | 8,000 |
| First itinerary | 200 | 1,000 | 3,000 | 5,000 |
| CPI (SAR) | 8 | 5 | 4 | 3 |
| Cost / itinerary (SAR) | 15 | 10 | 7 | 5 |

**North-star:** trips planned per week. **Optimization rules** (old_mvp §16): kill if CPI > SAR 12 after 72h & 2,000+ imps · scale +30% if CPI < SAR 4 and install-to-trip > 50% · refresh creative if CTR drops 20%+ · rebalance 15% budget if one platform's CPI is 2×+ another. **Reporting cadence:** daily (CPI/pacing) · twice-weekly (platform compare) · weekly (funnel + A/B) · bi-weekly (creative kill/scale) · monthly (full review).

> The publishing calendar, A/B ownership, and reporting setup are formalized in **ZBDH-580**; this section is the input.

---

## 7. Claim check (per the verified ledger)

Every post must pass `README.md` §3. Status of the 16 ads against it:

- **✅ All 16 are clear to generate.** None of them advertise offline mode, Android/Play Store, booking, fake urgency, or specific prices — so none hit a ⛔ rule.
- **Lead with free:** Ads 9, 11, 12 say "مجاناً" — correct framing; never add a price.
- **Real-data guardrails (do not fabricate):**
  - **Ad 3, 15** — show real **Z-Score + gist** text from the app (honest mix, incl. the caution).
  - **Ad 14** (+ halal mentions in 7, 8) — show a **real 5-level halal badge**; never invent a halal status.
  - **Ad 13, 16** — use **real transfer-price ranges** from the app, not made-up numbers.
- **iOS install CTA allowed** (App Store is live) — apply on iOS placements per README §4 follow-up #1; web CTA elsewhere; **no Android CTA**.
- **Honesty rule:** scam/tourist-trap ads (13–16) must contrast the *experience*, never name a competitor; "قوقل" appears as a generic search reference, not a competitor call-out.

---

*Generates from: `MVPAdLaunchPlan.md` (copy + prompts) · formatted by: `social-post-template.md` · claims gated by: `README.md` §3 · feeds: ZBDH-576/577/578 (batches), ZBDH-579 (screen-demo capture), ZBDH-580 (calendar/A-B/KPIs).*
