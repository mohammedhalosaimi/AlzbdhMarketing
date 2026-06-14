# الزبدة — Launch Ops: Calendar, A/B, KPIs & Crisis Plan

The operations layer for the 16-ad MVP launch: when each post goes out, what we A/B test, how we measure it against the **actual tracking stack**, and how we respond when something goes wrong.

**Pairs with:** `social-post-generation-matrix.md` (what to post), `screen-demo-capture-plan.md` (real-app footage), `README.md` §3 (claims).
**Source:** `MVPAdLaunchPlan.md` testing schedule + `old_mvp-launch-social-ads.md` §13–18.
**Tracking stack:** PostHog (product events + autocapture, live in `apps/web`) · ad platforms (Meta/IG, TikTok, X, Snap, YouTube ads managers) for spend/reach · App Store Connect / SKAN for iOS installs · Sentry for app health. Join paid ↔ product by **UTM/campaign param**.

---

## 1. Publishing calendar (Week 1–8)

Paid rollout follows the matrix §6 schedule; organic runs alongside to keep the feed consistent.

| Week | Phase | Paid ads live | Lead platforms | Organic theme (alongside) |
|---|---|---|---|---|
| **1** | Awareness | Ads **1, 2, 7, 9** (cold) | IG Reels, TikTok | Friction stories (37 tabs, WhatsApp group) |
| **2** | Awareness→Engagement | + Ads **3, 4, 10, 11** (warm, 50%+ viewers) | IG, TikTok, X | Calm demos, زبده honesty |
| **3** | Engagement→Conversion | + Ads **5, 6, 8, 12** (high-intent) + **13–16** (retarget) | IG, TikTok, X, Snap | During-trip wins, real trips |
| **4** | Engagement | scale W2–3 winners; refresh fatigued creative | winners' platforms | Halal finds, destination intelligence |
| **5** | Conversion | install/first-itinerary drivers (8, 11, 12 + retarget 13–16) | IG, TikTok, YT Shorts | UGC / social proof |
| **6** | Conversion | scale top-CPI ads; objection-killer | winners | Data drops ("أكثر وجهة هالأسبوع") |
| **7** | Retention | retarget installed-not-planned; numbers post | IG Stories, X | User stories, weekly destination drop |
| **8** | Retention | advocacy / UGC asks; lookalikes from converters | IG, TikTok | Community, referral teaser |

**Per-platform cadence & best times (Saudi):**

| Platform | Cadence | Format | Best times |
|---|---|---|---|
| Instagram | 3–4 reels/wk + daily stories + 1–2 carousels/wk | 9:16 reels, 4:5 feed | Thu 8–10pm, Fri 12–2pm, Sat 9–11pm |
| TikTok | 3–5/wk | 9:16, raw/UGC | evenings; ride trending audio |
| X (Twitter) | 5–7/wk (threads + prompt-as-copy) | 16:9 image / text | Thu 9–11pm, Fri 1–3pm |
| Snapchat | 2–3/wk | 9:16 snap ads | 18–28 skew; airport geo-filters |
| YouTube Shorts | 1–2/wk (demos) | 9:16, 15–30s | evergreen / SEO titles |

---

## 2. A/B test plan

Each test: **variable · variants · audience · min runtime · success metric · decision rule.** (From `old_mvp` §13.)

### Wave 1 (Weeks 1–2 — Awareness)
| Variable | A | B | Audience | Min runtime | Success metric | Decision rule |
|---|---|---|---|---|---|---|
| Hook language | Arabic only | Bilingual (AR+EN) | Cold broad Saudi | 72h / 1,000 imp per variant | 3s view rate | Winner → 80% budget |
| Friction type | 37 tabs (Ad 1) | WhatsApp group | Cold | 72h | Save rate | Pause loser at −20% |
| CTA wording | جرّبها مجاناً | خطط رحلتك | Cold | 72h | CTR | Higher CTR wins |
| End-card palette | sand/cream | dark green | Cold | 72h | Brand recall (lift) | Adopt winner brand-wide |

### Wave 2 (Weeks 3–4 — Engagement)
| Variable | A | B | Audience | Min runtime | Success metric | Decision rule |
|---|---|---|---|---|---|---|
| Demo style | screen recording | animated mockup | Warm (50%+ viewers) | 72h | 75% view rate | Winner scales |
| Feature focus | wizard→itinerary | halal + زبده gists | Warm + Muslim-travel | 72h | Save rate | Higher save wins |
| Length | 8s | 15s | Warm | 72h | Completion rate | Shorter wins ties |
| Audio | lo-fi beat | trending sound | Warm | 72h | Share rate | Winner scales |

### Wave 3 (Weeks 5–6 — Conversion)
| Variable | A | B | Audience | Min runtime | Success metric | Decision rule |
|---|---|---|---|---|---|---|
| Social proof | numbers/stats | UGC testimonial | 75%+ viewers, retarget | 72h | CPI | Lower CPI wins |
| Free messaging | أول رحلة مجاناً | خطط بلا حدود مجاناً | High-intent | 72h | CTR | Higher CTR wins |
| Install CTA | direct app/store link | landing page first | High-intent | 72h | install / web-start → first-itinerary | Higher end-rate wins |
| Objection handling | included (E5) | not included | High-intent | 72h | Conversion rate | Adopt winner |

**Protocol:** ≥72h and ≥1,000 impressions per variant before calling it; winner takes 80% budget, loser keeps 20% for continued learning; log results weekly.

---

## 3. KPI dashboard requirements

The dashboard joins **ad-platform spend/reach** with **PostHog product events** (by UTM/campaign). Targets from `old_mvp` §14.

### Reach & engagement (ad platforms — per ads manager)
| Metric | Source | W2 | W4 | W6 | W8 |
|---|---|---|---|---|---|
| Impressions | ad platforms | 500K | 1.5M | 2.5M | 4M |
| Video views (3s+) | ad platforms | 100K | 400K | 700K | 1M |
| Engagement rate | ad platforms | 3% | 4% | 5% | 5% |
| CTR | ad platforms | — | — | — | — (track per ad) |

### Conversion & product (PostHog + stores)
| Metric / event | Source | Status | W2 → W8 target |
|---|---|---|---|
| Web-app starts (session on `app.alzbdh.com`) | PostHog (`$pageview`/session) | ✅ autocapture | rising |
| iOS installs | App Store Connect / SKAN | ✅ store | 500 → 8,000 (installs, blended) |
| First itinerary generated | PostHog `itinerary_generate` | ✅ **instrumented** | 200 → 5,000 |
| Trip confirmed | PostHog `trip_confirm` | ✅ **instrumented** | track |
| `map_open` | PostHog | ✅ **instrumented** (ZBDH-583, `DiscoverScreen`) | track (Riyadh) |
| `place_open` | PostHog | ✅ **instrumented** (ZBDH-583, `PlaceDetailScreen`) | track (Riyadh) |
| `save` / `share` | PostHog | ✅ **instrumented** (ZBDH-583, `FavoritesContext` / `PlaceDetailScreen`) | track (Riyadh) |
| CPI (blended) | ad spend ÷ installs/web-starts | derived | SAR 8 → 3 |
| Cost per first itinerary | ad spend ÷ `itinerary_generate` | derived | SAR 15 → 5 |

**North-star:** **trips planned per week** (`itinerary_generate`, PostHog). The Riyadh Map KPIs (`map_open`, `place_open`, `save`, `share`) are now **emitted** (ZBDH-583) — **validate them firing in PostHog (dev → prod) before Week 1.**

---

## 4. Kill / scale rules (adapted to the stack)

Read CPI/CTR from the ad managers; read the conversion funnel (`itinerary_generate`, `trip_confirm`) from PostHog. (From `old_mvp` §16.)

- **Kill:** CPI > SAR 12 after 72h and 2,000+ impressions → pause the ad set.
- **Scale:** CPI < SAR 4 **and** start→first-itinerary > 50% (PostHog funnel) → +30% budget.
- **Creative fatigue:** CTR drops 20%+ from peak → refresh creative (new hook, same message).
- **Platform rebalance:** one platform's CPI ≥ 2× another's → shift 15% budget to the winner.

**Reporting cadence:** daily (CPI, spend pacing, any rejected ad — media buyer) · twice-weekly (platform comparison, pause underperformers) · weekly (full funnel impressions→starts→first-itinerary + A/B results) · bi-weekly (creative ranking: kill bottom 20%, scale top 20%) · monthly (full review, budget reallocation).

---

## 5. Brand safety & crisis response

### Brand safety (placement)
- ❌ No adjacency to political/religious controversy or violence; no alcohol/gambling/non-halal association.
- ✅ Block-list: competitor brand keywords + controversial topics. Inventory filter: **Standard + Limited** on all platforms.

### Crisis response
| Scenario | Response | Owner |
|---|---|---|
| **Halal badge inaccuracy reported** | Pause halal-focused ads (C2, Ad 14). Issue a correction on social. Fix in app. Resume only after verified. | Marketing lead + eng |
| **App outage during campaign** | Pause all conversion ads (Ads 5/6/8/11/12 + 13–16). Run awareness only. Post "نشتغل على المشكلة" story. Watch Sentry for recovery. | Media buyer + eng |
| **Negative viral post** | Do **not** argue in comments. Respond once, calmly, from the official account. Prepare counter-UGC. | Marketing lead |
| **Cultural-sensitivity issue in an ad** | Pull immediately. Apologize simply, no excuses. Replace the creative within 24h. | Marketing lead |

---

## 6. Follow-ups
- **ZBDH-583** — ✅ `map_open` / `place_open` / `save` / `share` instrumented in PostHog; **validate firing in dev → prod before Week 1.**
- **ZBDH-582** — demo fixtures + active-trip seed (needed for the demo-reel batch, indirectly for UGC proof).
- Confirm UTM convention per ad (`utm_campaign=<campaign>`, `utm_content=ad-NN`) so paid↔product join works on day 1.
- Decide install-vs-web CTA per platform (README §4 follow-up #1) before Wave 3 install tests.

---

*Owner: Marketing + media buyer · Inputs: `MVPAdLaunchPlan.md`, `old_mvp-launch-social-ads.md` §13–18 · Measurement: PostHog + ad platforms + App Store Connect + Sentry.*
