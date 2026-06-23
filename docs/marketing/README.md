# الزبدة — Social Launch Brief (canonical)

**Read this first.** It is the single entry point for `docs/marketing/`: it says which doc is the source of truth, what may be advertised against the **current** product (claims checked against the live app + codebase, not just the docs), and where the brand voice and visual rules live.

**Owner:** Marketing · **Covers:** Riyadh Local + Travel Mode launch (the 16-ad MVP plan) · **Last reviewed:** 2026-06-05.

> This brief is the **authoritative override** for ad-safe claims. Where a source doc's feature/claim table conflicts with the [§3 claim ledger](#3-claim-ledger--checked-against-the-live-product) below, the ledger wins — it was verified against the running product.

---

## TL;DR

- **Canonical plan:** `MVPAdLaunchPlan.md` (16 ads). **Brand voice:** `ad-framework.md`. **Strategy depth:** `old_mvp-launch-social-ads.md`. **Generate from:** `social-post-template.md`.
- **The one rule:** every post is calm, honest, Saudi-dialect, RTL, **leads with free**, and follows friction → gentle invite → outcome.
- **Claim headline:** **web + iOS app are live; the paid tiers (SAR 50 / SAR 99) are live.** **Offline and Android/Play Store are NOT** — don't advertise them. **We plan, we don't book.**

---

## 1. What to read (doc map)

| Doc | Role | Status |
|---|---|---|
| **`MVPAdLaunchPlan.md`** | The 16-ad MVP plan — campaigns, ads, scripts, image/video prompts, budget split | ✅ **Source of truth** (the plan) |
| **`ad-framework.md`** | Brand positioning, 3-step loop, tone of voice, creative system, the Value-vs-Motion gate | ✅ Canonical (brand voice) |
| **`old_mvp-launch-social-ads.md`** | Full campaign strategy: personas, retargeting funnels, A/B tests, KPIs, budget, brand safety | ✅ Canonical (strategy) — **but its "Core Capabilities / Not Yet Live" tables are stale; use [§3](#3-claim-ledger--checked-against-the-live-product) instead** |
| **`social-post-template.md`** | The reusable per-ad generation template (ZBDH-581) — copy it once per ad | ✅ Use this to generate |
| **`cloud-content-storage-schema.md`** | Cloud-first schema for generated media, post registry, Buffer events, duplicate prevention, and daily scheduling runs | ✅ Proposed system design |
| **`ads/`** | Existing ad image assets | reference |
| `archive/marketing/MVPAdLaunchPlan-superseded-draft.md` | An earlier, leaner draft of the plan (shorter prompts; the file formerly named `MVPAdLaunchPlan copy.md`) | ⛔ **Superseded — do not use** |

**Read order for generating a post:** this brief → `social-post-template.md` (the how) → the specific ad in `MVPAdLaunchPlan.md` (the what) → check every claim against [§3](#3-claim-ledger--checked-against-the-live-product).

---

## 2. Brand voice, visuals & personas (summary)

Full, machine-followable rules live in `social-post-template.md`; this is the orientation.

**Voice** — صاحبك الرحّالة, your well-traveled Saudi friend who tells the truth. Casual Saudi dialect (no فصحى), calm, anti-hype, honest (name the downside, like the زبده gists do). Lead with the free experience; never name a competitor; no fake urgency. Western numerals 0–9 even in Arabic. _(Full do/don't: template §1 + `ad-framework.md` §13.)_

**Visuals** — RTL, Arabic-first. Palette: dark green `#1d3b2c` field, cream `#FDFBF7` cards, teal `#0E7C7B` accent/CTA, amber `#D4A017` caution, green `#16864F` halal-verified. Playfair Display headlines, Readex Pro body. ~70% whitespace, one human element, logo + CTA bottom on the dark field. Static **1080×1350**, reel **1080×1920** (8–15s). _(Full spec + safe areas: template §4.)_

**Personas** (target one per post):

| persona | who | hook energy |
|---|---|---|
| **أم فهد** — family planner | Saudi woman 28–42, kids; halal confidence | "رحلة العيلة؟ خلّها علينا." |
| **خالد** — group organizer | Saudi man 22–35; the group never agrees | "خطة وحدة. الكل يرتاح." |
| **نورة** — solo explorer | 23–32, solo/couple; halal non-negotiable | "أول رحلة لحالك؟ ما تحتاج تفكّر." |
| **سلطان** — Riyadh local | Riyadh resident 20–40; bored of the same places | "الويكند وصل وبعدك بالبيت؟" |

---

## 3. Claim ledger — checked against the live product

Every row was checked against the running app / codebase as of 2026-06-05. **This supersedes the feature tables in the source docs.**

| Claim | Source docs said | Current reality (verified) | Advertise? |
|---|---|---|---|
| **Web app** (`app.alzbdh.com`) | live | live | ✅ allowed |
| **iOS app** | "web only — App Store not published — do NOT advertise" | **Live** on the Saudi App Store (`apps.apple.com/sa/app/alzbdh/id6741608525`, landing PR #491) | ✅ allowed — iOS install CTA |
| **Android / Play Store** | grouped with "App Store not published" | **Not live** (only iOS badge shipped) | ⛔ no Android CTA yet |
| **Local Riyadh discovery** (2,000+ places, Z-Score, gists, filters, favorites, share) | live | live | ✅ allowed |
| **Travel planning** (AI chat + wizard, destination scoring, day-by-day, hotels, visa, pre-flight, maps, cost) | live | live | ✅ allowed |
| **During-trip** (today's view, check-in, nearby halal, emergency, live AI chat) | live | live | ✅ allowed |
| **Halal** (5-level badges, verification notes) | live | live — show real badges only | ✅ allowed |
| **Paid tiers** (`SAR 50` 3-trips, `SAR 99`/yr) | "everything free for now — do NOT advertise payment" | **Live** — `CheckoutScreen.jsx` sells both via Tap Payments + Apple Pay | ✅ truthful — but **lead with free, never lead with price** |
| **Offline access** | listed **both** as ✅ live and "Phase 3 / requires internet" | **Not built** (no service worker / IndexedDB in `apps/web`) | ⛔ do-not-advertise |
| **Booking / reservations** | "we plan, not book" | we plan, not book | ⛔ never say "booking" as a capability |
| **Real-time flight data / live prices** | Phase 3 | not live | ⛔ do-not-advertise |

**Quick buckets:**

- **✅ Allowed:** web + iOS app, all Local Riyadh features, all Travel planning + during-trip features, halal badges/gists, transfer-price & tourist-trap honesty, and the **free** experience. Paid tiers are truthful but **never lead with price**.
- **⚠️ Needs verification (confirm with product):** Android/Play Store launch timeline; any "real-time" data claim.
- **⛔ Do-not-advertise:** offline mode, booking/reservations, competitor names, fake urgency/scarcity/superlatives, unverified halal or unverified prices, and stale "App Store قريباً / coming soon" creative (iOS is live now).

**Brand safety (placement):** no political/religious-controversy or violence adjacency; no alcohol/gambling/non-halal association; block-list competitor keywords; Standard + Limited inventory filters on all platforms.

---

## 4. Open follow-ups (unresolved — not left implicit)

These are product/strategy decisions surfaced during consolidation. They don't block generation (the [§3](#3-claim-ledger--checked-against-the-live-product) stance is safe), but they should be resolved by Marketing/Product:

1. **Install vs. web CTA strategy.** The app is now live on iOS, but the plan's CTAs are web-first ("افتح الخريطة", "خطط رحلتك"). **Recommendation:** keep web CTAs as default; on iOS placements, drive App Store installs. Confirm with Product, then lock per-platform CTA destinations.
2. **Play Store timeline.** When does Android land? Until then, no Android install claim.
3. **Campaign accent color.** Ads use teal `#0E7C7B`; Design System V3's brand is forest `#1F3D2E` with no teal token. Marketing + Design to decide whether to reconcile the campaign accent with the app brand.
4. **Patch the source docs (optional).** `old_mvp-launch-social-ads.md` §3 and the implicit "web-only" framing are stale (payment + iOS now live). This brief overrides them; a future cleanup pass could edit those tables directly. A stale-marker banner has been added at that table.
5. **Numerals.** Legacy ad copy in the source docs uses Arabic-Indic ٠–٩; normalize to Western 0–9 (ZBDH-156/400) when porting copy into generated posts.
6. **Stale cross-reference.** `MVPAdLaunchPlan.md` cites `mvp-launch-social-ads.md`; the actual file is `old_mvp-launch-social-ads.md`. Fix on the next edit of the plan.

---

*Canonical for: `docs/marketing/` · Brand voice + visual rules: `ad-framework.md` + `social-post-template.md` · Generation matrix consumer: ZBDH-575 · Consolidation issue: ZBDH-574.*
