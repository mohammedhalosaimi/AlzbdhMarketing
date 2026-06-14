# الزبدة — Screen-Demo Capture Plan (real app footage)

Some launch posts must be **real app footage, not AI generation** — they're proof that the product actually works. This plan is the capture brief for those: which flows to record, the fixture data they need, exact shot lists, and the product-state risks to clear first.

**Covers (matrix Track C + the demo reels):** Ad 2 Locate Me · Ad 4 Save It Now · Ad 5 Share · Ad 10 "after" side · Ad 11 AI Companion · the wizard demo (C1) · halal demo (C2) · during-trip demo (C4).
**Pairs with:** `social-post-generation-matrix.md` (§4 Track C), `social-post-template.md` (voice/visual), `README.md` §3 (claims).
**Blocker:** demo fixtures + an active-trip seed — **ZBDH-582** (must be ready before filming the during-trip and consistency-dependent shots).

---

## 0. Golden rules (every capture)

- **Real UI only.** Never film an empty state, a loading spinner, a skeleton, an error toast, or any Phase-2/unfinished screen. If a flow doesn't render with data, stop and use the ZBDH-582 fixture — don't fake it.
- **Arabic, RTL.** App locale Arabic; confirm RTL layout and Arabic copy before recording.
- **Western numerals 0–9** (the app already enforces this — ZBDH-156/400).
- **CTA = the tracked web action.** Screen demos end on an in-app action CTA (`افتح الخريطة`, `خطط رحلتك`, `جرّب الذكاء الاصطناعي`) that matches the ad's KPI event. iOS App Store is live, so an App Store end-frame is allowed on iOS placements — but **don't imply Android** (no Play Store). See `README.md` §3.
- **Brand frame.** End card on dark green `#1d3b2c`, الزبدة logo, teal `#0E7C7B` CTA button, cream `#FDFBF7` — per template §4.

---

## 1. Capture environment

| Setting | Value |
|---|---|
| App | `app.alzbdh.com` (web — React/Vite). Live; no native build needed |
| Device / viewport | Real phone **or** browser mobile emulation at **390×844** (iPhone 13/14), captured/exported to **1080×1920** (9:16) |
| Orientation | Portrait 9:16; keep content in the central safe area (template §4) |
| Account | Logged-in **demo account** seeded per ZBDH-582 (consistent place cards, favorites, itinerary, active trip) |
| Locale | Arabic UI, RTL confirmed |
| Recording | 60fps, clean status bar, notifications silenced, cursor hidden (emulation), no browser chrome in frame |
| Location (Ad 2) | Mock/allow geolocation to a Riyadh coordinate so "near me" returns real places |

---

## 2. Flow capture checklist

Each flow below is confirmed against the current web app. **Live?** = renders with data today (✅) or needs the ZBDH-582 fixture (⚠️).

| # | Flow → Ad(s) | Screen / route | Fixture data needed | Expected UI content | Live? |
|---|---|---|---|---|---|
| F1 | Local discover + "near me" → **Ad 2** | Explore / Local map | Riyadh place cards w/ Z-Score + gist; geolocation mocked to Riyadh | Map with category pins around user; tap pin → place card (name, Z-Score, 1-line gist) | ✅ (mock GPS) |
| F2 | Place card + Z-Score/gist → **Ad 3 (live text)** | `/place/:placeId` (PlaceDetailScreen) | بروز كافيه / ماما نوره / كانديرا with real Z-Score + زبده gist | Header image, Z-Score badge, نبذة/توصية الزبدة, honest pros/cons (incl. one caution) | ✅ |
| F3 | Save / favorite → **Ad 4** | place card heart → FavoritesScreen | 4 saved Riyadh places | Heart fills (teal), Favorites list with 4 cards + Z-Score/gist preview | ✅ |
| F4 | Share a place → **Ad 5** | PlaceDetailScreen share (`placeShare.js`) | one place (e.g. سيركولو) | Native share sheet / card preview (photo + name + Z-Score + gist); clipboard fallback | ✅ |
| F5 | Wizard → itinerary → **Ad 11 / C1** | TripPlannerWizard → ItineraryScreen | "Istanbul, family, 5 days" run | 4 wizard taps → Istanbul match %, then day-by-day (morning/afternoon/evening) | ✅ |
| F6 | Halal focus → **C2** | ItineraryScreen hotel/restaurant card | Istanbul itinerary w/ halal badges | 5-level halal badge zoom; زبده gist with honest pros/cons | ✅ |
| F7 | "After" clean itinerary scroll → **Ad 10** | ItineraryScreen | Istanbul itinerary | Smooth scroll: day cards, halal badges, gists, pre-flight checklist | ✅ |
| F8 | During-trip: today + nearby halal → **C4** | TodayItinerary / NearbyRestaurants | **active confirmed trip** (ZBDH-582) | Today's activities + countdown; "nearby halal" map w/ distance + halal badge | ⚠️ needs fixture |

---

## 3. Shot lists (per screen-demo reel)

Timing is a starting point; keep the Arabic readable. Overlay font Readex Pro; end card per §0. Full copy/CTA also in the matrix and `MVPAdLaunchPlan.md`.

### Ad 2 — Locate Me Power (≈10s, screen demo)
1. **0–3s** — Explore map zooms to user location (mocked Riyadh). Overlay: `أنا هنا. وش الأفضل حولي؟`
2. **3–7s** — category pins appear; tap a cafe pin → place card slides up (name, Z-Score, gist). Overlay: `افتح موقعك… وخلاص.`
3. **7–10s** — end card, logo, CTA **`جرّب الخريطة الآن`**.
- **Caption:** ما تحتاج تسأل أحد. افتح الزبدة وهي تدلّك 📍

### Ad 4 — Save It Now (≈8s, screen demo)
1. **0–2s** — overlay `احفظها الحين. بترجع لها.`
2. **2–5s** — thumb taps heart on a place card (بروز كافيه); heart fills teal, subtle pulse.
3. **5–7s** — Favorites list: 4 saved places with Z-Score + gist preview.
4. **7–8s** — end card, logo, CTA **`ابدأ قائمتك`**.
- **Caption:** كل مكان حلو بالرياض — في مكان واحد ❤️

### Ad 11 — AI Companion (≈12s, screen demo)
1. **0–3s** — type in chat `أبي رحلة عائلية لتركيا 5 أيام`. Overlay: `مو AI يتفلسف. AI يخطط.`
2. **3–6s** — 4 quick wizard taps. Overlay: `4 أسئلة — رحلة كاملة.`
3. **6–9s** — Istanbul recommendation card "إسطنبول — 94% مناسب لك", halal badge.
4. **9–11s** — itinerary scroll: Day 1 morning/afternoon/evening, halal badges, gists.
5. **11–12s** — end card, logo, CTA **`جرّب الذكاء الاصطناعي`**.
- **Caption:** سألته 4 أسئلة وطلع لي جدول 5 أيام بإسطنبول: فنادق حلال، مطاعم، وزبدة صريحة لكل مكان. مجاناً. 🤖

### C1 — Wizard demo (≈15s) · C2 — Halal demo (≈12s) · C4 — During-trip demo (≈12s)
- **C1:** open → `خطط رحلتك` → 4 wizard taps → recommendations → full day-by-day scroll. Overlay seq: `4 أسئلة → رحلة كاملة`. CTA **`خطط رحلتك مجاناً`**. Keep itinerary scroll at real speed (let people read).
- **C2:** zoom the 5-level halal badge on a hotel/restaurant; show a gist with honest pros/cons. Overlay: `تبي تعرف هل المطعم حلال؟ الزبدة تعرف.` CTA **`اكتشف المطاعم الحلال`**.
- **C4:** today's itinerary + countdown → tap "nearby halal" → map with distances + halal badge → pick one. Overlay: `مو بس تخطيط. معك وأنت هناك.` CTA **`خطط رحلتك`**. **Requires the ZBDH-582 active-trip fixture.**

---

## 4. Required demo data (fixtures — owned by ZBDH-582)

- **Riyadh place cards:** بروز كافيه ("سبيشلتي ممتاز والأجواء هادية 👌"), ماما نوره ("أكل بيتي والكمية تكفي عيلة كاملة"), كانديرا ("رومانسي بس الأسعار مرتفعة شوي ⚠️"), سيركولو — each with a real Z-Score badge. The honest mix (2 positive + 1 caution) must be genuine.
- **Favorites:** 4 saved Riyadh places.
- **Travel itinerary:** Istanbul · family · 5 days — day-by-day, halal badges, زبده gists, pre-flight checklist.
- **Halal badge:** a real verified 5-level badge on a restaurant card.
- **AI assistant:** chat prompt `أبي رحلة عائلية لتركيا 5 أيام` → wizard → Istanbul 94% match.
- **Active trip (during-trip):** a seeded confirmed trip so Today + Nearby-halal render — **the one piece that doesn't exist by default → ZBDH-582.**

---

## 5. Risks & guardrails

| Risk | Handling |
|---|---|
| During-trip screens render empty without an active trip | **ZBDH-582** (blocker) — seed an active trip before filming F8/C4; if not ready, drop C4 from the first batch |
| GPS won't trigger in a desktop browser | Film on a real phone or mock geolocation to a Riyadh coordinate (F1/Ad 2) |
| Web Share sheet looks different per browser/OS | Film on a device with the native share sheet; clipboard-fallback path exists if needed |
| Place cards / Z-Score differ run-to-run | Use the ZBDH-582 demo account so cards are stable across takes |
| Showing unfinished UI | Stick to the F1–F7 flows confirmed ✅ above; F8 only after ZBDH-582 |
| Claim drift | Real halal badges and real transfer/Z-Score values only; lead with free; no Android/Play-Store implication (`README.md` §3) |

---

*Owner: Marketing production · Inputs: `social-post-generation-matrix.md` §4, `MVPAdLaunchPlan.md` · Fixtures: ZBDH-582 · Claims: `README.md` §3.*
