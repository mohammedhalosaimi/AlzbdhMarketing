# الزبدة — Social Post Generation Template

**Purpose:** One reusable template that captures الزبدة's brand voice and campaign structure so every social post feels like the same brand — not a random one-off creative. Copy [§7 The reusable post template](#7-the-reusable-post-template-copy-me) once per ad, fill every field, obey the rules in §1–§6, then run the [§8 quality gate](#8-quality-gate--value-vs-motion) before shipping.

**Use it for:** the 16-ad MVP launch plan (`MVPAdLaunchPlan.md`) and any new post in the same campaigns.
**Who fills it:** a human marketer **or** Codex/an AI generator. Every rule below is written to be machine-followable.
**Source of truth:** `ad-framework.md` (voice + quality gate), `MVPAdLaunchPlan.md` (16-ad plan + visual spec), `old_mvp-launch-social-ads.md` (personas, KPIs, claim safety).

> **Status note:** This template is internally consistent and ready to use. A few product claims and one color value drifted between the source docs and current product reality — they are flagged inline in [§5 Claim safety](#5-claim-safety) and collected in [Appendix A](#appendix-a--open-questions-for-zbdh-574). Resolving them is **ZBDH-574**'s job (consolidate `docs/marketing/`); this template does not block on it.

---

## 1. Brand voice rules

**One voice, every post: صاحبك الرحّالة — your well-traveled Saudi friend who tells you the truth.** Calm, competent concierge. Not a robot that replaced a travel agent, not a hype machine.

| Do | Don't |
|---|---|
| Casual Saudi dialect (عامية), spoken like a friend | Corporate Arabic / فصحى (MSA) in the copy |
| "نرتبها لك" — first person plural, we're with you | "ذكاؤنا الاصطناعي يسوي كل شي" — magic-AI overclaim |
| Honest: say what's great **and** what's not | "أفضل مطعم بالعالم! 5 نجوم!" — fake superlatives |
| Calm confidence, no urgency | "احجز الحين! العرض ينتهي بعد 3 دقائق!" — fake urgency |
| Acknowledge the mess, then relieve it | Pretend planning was always easy |
| Anti-hype: "تخطيط ذكي" | Hype: "ثورة في عالم السفر" |
| Show one real outcome (a trip, a place card) | Show the tech stack / buzzwords |
| Bilingual where it flows naturally (Saudis code-switch) | Force English, or translate word-for-word |
| Lead with the **free** experience | Lead with pricing |

**Hard rules**
- **Saudi dialect only** in headlines, scripts, and captions. English lines are allowed as a deliberate code-switch (see [§2](#2-the-3-step-message-loop)), never as the default.
- **Never name a competitor.** Contrast the *experience* instead (calm vs. panic, halal-first vs. generic, full-trip vs. booking-only). See [§5](#5-claim-safety).
- **No fake urgency, no fake scarcity, no fake ratings.** This restraint *is* the differentiator vs. booking sites — protect it.
- **Honesty is the brand.** The زبده gist includes downsides ("رومانسي بس الأسعار مرتفعة شوي ⚠️"). Ads must be as honest as the gists.
- **Numerals — use Western digits 0–9**, even inside Arabic copy (e.g. `200 خيار`, `5 أيام`, `15 يورو`), matching the app's enforced convention (ZBDH-156/400). _The legacy ad docs use Arabic-Indic ٠–٩; normalize to 0–9 when porting copy from them — tracked in [Appendix A](#appendix-a--open-questions-for-zbdh-574)._
- **Emoji:** sparing and meaningful (📍 ✈️ 👌 ⚠️ ✅), mostly in captions. Never in the headline.

**The 5-word test:** you should be able to repeat any post's message in ≤5 words ("AI plans your trip properly" / "أماكن الرياض بزبدة صريحة"). If you can't, the post is doing too much.

---

## 2. The 3-step message loop

**Every post follows the same arc: friction → gentle invite → outcome.** Don't claim magic — show a real trip (or a real place) taking shape.

### A) Acknowledge the friction — a real traveler/local moment
> "قوقل حيّرني. 200 خيار… ولا قرار."
> "الرحلة بعد 10 أيام وما عندي إلا التذكرة."
> "صاحبك يسألك وين نروح؟"
> "جوعان وبرّا — وين أقرب مطعم حلال؟"
> EN: "When you've got 37 tabs open and still no plan…"

### B) Invite, don't solve — concierge language
> "قولنا وين. واحنا نرتبها."
> "اختر الجو. واحنا نلقّى لك المكان."
> "افتح موقعك… وخلاص."
> EN: "Tell us where. We'll think it through."

### C) Outcome + unity — "we" language + a tangible result
> "الزبدة تعطيك الأفضل — والباقي تفاصيل."
> "نرتب لك كل يوم — من الصبح للمسا."
> "نقولك الحلو والسيء. بصراحة."
> EN: "We turn a destination into a trip that actually works."

### Fill-in-the-blank generators (endless variants)

**Arabic:**
> لما أكون **[موقف ضغط]**، ما أحتاج **[شي مزعج]**. أحتاج **[نتيجة واضحة]**.
> الزبدة **[نتيجة ملموسة]** — بدون تعقيد.

_e.g._ "لما أخطط لرحلة عائلية، ما أحتاج 100 خيار. أحتاج خطة وحدة تمشي."

**English:**
> When I'm **[travel-stress scenario]**, I don't need **[common app annoyance]**. I need **[clarity outcome]**.
> الزبدة is **[a concierge / a thinking partner]** that helps me **[tangible result]** — without the noise.

**Concierge Pause (every video):** include one 1–2s beat where chaos resolves into a structured plan — user shares a destination → brief pause → day-by-day itinerary appears → exhale. This is الزبدة's signature moment.

---

## 3. Campaign fields

These 13 fields are the schema for every post. **They are also the column set ZBDH-575 uses to build the generation matrix** — one filled template = one matrix row.

| # | Field | What it is | Allowed values / source |
|---|---|---|---|
| 1 | **campaign** | Which campaign bucket the post belongs to | `Riyadh Map Launch` · `Travel Immersive` · `Scam Awareness` (see table below) |
| 2 | **audience** | Cold / warm / high-intent targeting layer | `Cold (broad Saudi)` · `Warm (50%+ video viewers)` · `High-intent (75%+ / retarget)` |
| 3 | **persona** | The single person this post talks to | `أم فهد` · `خالد` · `نورة` · `سلطان` (see persona table) |
| 4 | **platform** | Primary placement (drives length + format) | `Instagram` · `TikTok` · `X` · `Snapchat` · `YouTube Shorts` |
| 5 | **objective** | Funnel stage / goal | `Awareness` · `Engagement` · `Conversion` · `Retention` |
| 6 | **KPI** | The one metric this post is judged on | Tracked event, e.g. `map_open` · `place_open` · `save/share` · `itinerary_generate` · `trip_confirm` · `app_open` |
| 7 | **hook** | The friction line (loop step A) — first 1s | Saudi dialect, ≤8 words, stops the scroll |
| 8 | **script** | The full loop A→B→C as timed beats (video) or 1 headline + 1 subline (static) | Follows [§2](#2-the-3-step-message-loop) |
| 9 | **caption** | The post caption (the "forward-to-group-chat" line) | Casual, 1–2 lines, may carry emoji + hashtags |
| 10 | **CTA** | One call to action | One verb phrase (bank below). Never lead with price. |
| 11 | **asset type** | What gets produced | `Static (1080×1350)` · `Reel/Video (1080×1920)` · `Carousel` · `Screen-demo reel`. May be both static + reel. |
| 12 | **prompt** | The generation prompt(s) — image and/or video | Follows [§4 visual rules](#4-visual-rules); see template for structure |
| 13 | **production notes** | Anything the producer needs | Real DB place names, source asset, A/B variant, audio direction, "record from real app", etc. |

### Campaign quick-reference (`MVPAdLaunchPlan.md`)

| campaign | objective | example KPIs | budget |
|---|---|---|---|
| **Riyadh Map Launch** | Engagement + in-app actions | `map_open`, `place_open`, `save/share` | 60% |
| **Travel Immersive** | App installs + trip generation | `itinerary_generate`, `trip_confirm` | 30% |
| **Scam Awareness** | Trust + retargeting conversion | `app_open`, `itinerary_generate`, `share` | 10% |

### Persona quick-reference (`old_mvp-launch-social-ads.md` §2)

| persona | who | pain | hook energy | features to show | platforms |
|---|---|---|---|---|---|
| **أم فهد** — family planner | Saudi woman 28–42, kids | exhausted planning trips that please everyone; halal confidence | "رحلة العيلة؟ خلّها علينا." | halal badges, family timing, زبده gists, day-by-day | Instagram, Snapchat, TikTok |
| **خالد** — group organizer | Saudi man 22–35, plans with friends | the group chat never agrees | "خطة وحدة. الكل يرتاح." | wizard speed, group itineraries, budget control | X, TikTok, Instagram |
| **نورة** — solo explorer | 23–32, solo/couple | wants unique, halal non-negotiable | "أول رحلة لحالك؟ ما تحتاج تفكّر." | AI chat, destination scoring, honeymoon/solo filters | TikTok, Instagram |
| **سلطان** — Riyadh local | Riyadh resident 20–40 | same places every weekend; doesn't know what's actually good | "الويكند وصل وبعدك بالبيت؟" | place discovery, Z-Score, AI summaries, filters | Instagram, Snapchat, TikTok |

### CTA bank (one per post; match it to the KPI)

`افتح الخريطة` · `جرّب الخريطة الآن` · `اكتشف أماكن الرياض` · `ابدأ قائمتك` · `شارك الزبدة` · `اكتشف الحين` · `خطّطها في الزبدة` · `خطط رحلتك` · `خطط رحلتك مجاناً` · `جرّب الزبدة` · `جرّب الذكاء الاصطناعي` · `لقّى حلال` · `اكتشف المطاعم الحلال` · `خطط رحلتك صح` · `اكتشف الأماكن الحقيقية`

**CTA destination:** web app `app.alzbdh.com` and/or the **live iOS app** (`apps.apple.com/sa/app/alzbdh/id6741608525`). Emphasize the App Store CTA on iOS. **No Android/Play Store CTA yet** (not live — see [§5](#5-claim-safety)).

---

## 4. Visual rules

### Direction & language
- **RTL.** All Arabic text right-aligned. Logo and CTA read naturally in an RTL layout.
- Arabic-first; an English line may sit above/below the Arabic in bilingual posts.

### Brand palette

| Role | Hex | Notes |
|---|---|---|
| **Page / background** | `#1d3b2c` dark green | the field every ad sits on |
| **Card / surface** | `#FDFBF7` cream | place cards, itinerary cards, end-card panel (= design-system `--zb-bg`) |
| **Primary accent / CTA** | `#0E7C7B` teal | CTA button fill, positive highlights, pins, active UI |
| **Caution / warning** | `#D4A017` amber | scam alerts, "⚠️ مرتفع شوي", tourist-trap flags |
| **Positive / halal-verified** | green `#16864F` | verified-halal badge, "✅ موثق" |
| **Headline on dark** | `#FDFBF7` cream | high contrast on the dark-green field |

> ⚠️ **Color divergence (flagged for ZBDH-574):** the 16-ad corpus uses **teal `#0E7C7B`** as the primary accent and **`#1d3b2c`** dark green, but Design System V3's brand is **forest `#1F3D2E`** with **no teal token**. Keep using the ad palette above for these 16 ads (all existing assets match it), but marketing + design should decide whether to reconcile the campaign accent with the app brand. See [Appendix A](#appendix-a--open-questions-for-zbdh-574).

### Typography
- **Headline:** Playfair Display 800 (editorial serif).
- **Body / overlay / UI labels:** Readex Pro 400–600 (Arabic + Latin, matches the app).
- One headline + one subline max on a static. No paragraph copy in the creative — that's for the landing page.

### Composition
- **~70% whitespace / negative space** — "breathing room before the trip starts." Minimalist editorial; never cluttered.
- One "human" element only: a phone showing a clean itinerary, a hand holding a boarding pass, a map with a single pin, a family at a table, a solo traveler at a view.
- Optional split-screen: chaos (tabs/panic) on one side → calm الزبدة plan on the other.
- **Logo placement:** `apps/ads/zbdh-logo-color.svg` + the word "الزبدة", centered (or bottom-right) at the bottom, on the dark-green field.
- **CTA placement:** teal `#0E7C7B` rounded button, cream text, sitting just **above** the logo.

### Dimensions & safe areas

| asset type | ratio | pixels | duration |
|---|---|---|---|
| Static feed / carousel | 4:5 | **1080×1350** | — |
| Static square / feed | 1:1 | 1080×1080 | — |
| Reel / TikTok / Story / Short | 9:16 | **1080×1920** | 8–15s (max 30s) |
| X (Twitter) image | 16:9 | 1200×675 | — |

- **9:16 safe area:** keep headline, CTA, and logo inside the central ~1080×1420 zone. Leave **≥250px clear at the top** (platform UI/handle) and **≥420px at the bottom** (caption, CTA sticker, profile bar). Don't put the logo or CTA where the platform overlays its own buttons.
- **4:5 safe area:** ~64px inner margin on all sides; keep the CTA button clear of the bottom edge.
- **Reel pacing:** readable transitions (~2–3s per beat); slow enough to read Arabic. Keep the Concierge Pause.

---

## 5. Claim safety

Check every claim against this list before publishing. When in doubt, treat a claim as **needs-verification** (move it down a tier), not allowed.

### ✅ Allowed — live and working (safe to show, demo, screenshot)
- **Local (Riyadh):** place discovery (2,000+ venues), Z-Score ratings, AI place summaries (زبده gists with honest pros/cons), category filters, review/sentiment analysis, favorites, place sharing.
- **Travel — planning:** AI chat planning (4–9 questions), card wizard, explore/browse destinations, destination scoring (match %), day-by-day itinerary, hotel recommendations, زبده gists, local tips, visa info per nationality, pre-flight checklist, interactive day maps, cost summary.
- **Travel — during-trip:** today's itinerary + countdown, activity check-in, nearby halal discovery (GPS), emergency services, live context-aware AI chat.
- **Halal:** 5-level halal badge system on hotels/restaurants/activities, halal verification notes. _Show real badges from the app; never invent a halal status._
- **Transfers / scams:** real transfer-route price ranges, airport→hotel cost estimates, honest "tourist-trap" / inflated-price flags.
- **Price posture:** lead with the **free** experience ("مجاناً / your first trip is on us"). Free AI planning is real; **paid tiers are live** (`SAR 50` for 3 trips, `SAR 99`/yr unlimited — Tap Payments + Apple Pay). Prices may be stated honestly, but **never lead the ad with price**.
- **iOS app:** the app is **live on the Saudi App Store** (`apps.apple.com/sa/app/alzbdh/id6741608525`). iOS install CTAs are allowed.

### ⚠️ Needs verification — confirm with product before using (ZBDH-574)
- **Offline access.** Listed as both a live feature and "Phase 3 / requires internet" in the same source doc. **Don't advertise offline** until confirmed.
- **Android / Play Store.** Only iOS is confirmed live. **No Android install claim** until the Play Store listing is verified.
- **Real-time flight data / live prices.** Treat as not-live unless confirmed.

### ⛔ Do-not-advertise
- **Booking / payments.** الزبدة **plans, it doesn't book.** Never say "احجز/booking" as a product capability. (Influencer briefs already forbid the word "booking".)
- **Naming competitors.** Contrast the experience, never the brand name (Booking.com, TripAdvisor, Expedia, Almosafer, ChatGPT…).
- **Fake urgency / scarcity / superlatives.** "آخر غرفة!", "5 نجوم! أفضل مطعم!", countdown timers. This is the anti-pattern we parody — never commit it ourselves.
- **Unverified halal or unverified prices.** Only show a halal level or a transfer price that exists in the app's data.
- **"App Store — قريباً / coming soon" placeholders.** iOS is live now; don't run stale "coming soon" creative.

### Brand safety (placement)
- No placement next to political/religious-controversy or violence content; no association with alcohol, gambling, or non-halal brands. Block-list competitor keywords + controversial topics; Standard + Limited inventory filters on all platforms.

---

## 6. Quality gate — "Value vs Motion"

Run this before publishing **any** post (from `ad-framework.md` §9). Five questions:

1. Does this ad show a **real trip/place outcome**, or just vibes?
2. Can someone repeat the message in **5 words**?
3. Does it feel **calmer** than the travel ads sitting next to it?
4. Would a Saudi traveler **forward it to their group chat**?
5. Does it show something **no competitor can claim** (halal-first, during-trip, Saudi personality, honest gists)?

**If any answer is "no":** reduce elements, shorten copy, add whitespace, and show one clear itinerary/place moment. Then re-check.

Plus a fast compliance pass:
- [ ] Voice = casual Saudi dialect, anti-hype, honest ([§1](#1-brand-voice-rules))
- [ ] Loop present: friction → invite → outcome ([§2](#2-the-3-step-message-loop))
- [ ] One CTA, matched to the KPI; doesn't lead with price ([§3](#3-campaign-fields))
- [ ] RTL, brand palette, fonts, ~70% whitespace, logo + CTA placement, safe areas ([§4](#4-visual-rules))
- [ ] Every claim is in the ✅ Allowed tier ([§5](#5-claim-safety))
- [ ] Western numerals 0–9; no competitor named; no fake urgency

---

## 7. The reusable post template (copy me)

Copy everything between the lines, once per ad. Fill **every** field. Delete the asset block you don't need (Static vs. Reel), or keep both if the ad ships in both formats.

~~~markdown
## Ad [N] — "[short name]"  ·  campaign: [Riyadh Map Launch | Travel Immersive | Scam Awareness]

- **audience:** [Cold | Warm | High-intent]
- **persona:** [أم فهد | خالد | نورة | سلطان]
- **platform:** [Instagram | TikTok | X | Snapchat | YouTube Shorts]
- **objective:** [Awareness | Engagement | Conversion | Retention]
- **KPI:** [tracked event — e.g. map_open / itinerary_generate / save]
- **asset type:** [Static 1080×1350 | Reel 1080×1920 | Carousel | both]

**hook (loop A, ≤8 words):**
> [friction line in Saudi dialect]

**script (loop A→B→C):**
> [A friction] → [B gentle invite] → [C outcome + unity]

**CTA:** [one phrase from the CTA bank]

**caption:**
> [1–2 casual lines, optional emoji + hashtags]

**features shown (all ✅ Allowed):** [feature, feature, feature]

### Image prompt — Static (1080×1350, RTL)
```text
premium minimalist app advertisement, 1080x1350 (4:5 vertical), RTL,
TOP: headline in Playfair Display 800, cream (#FDFBF7), RTL: "[headline]"
     subheadline in Readex Pro 400: "[subline]"
CENTER: [one human element / phone mockup / split-screen — one clear outcome],
        teal (#0E7C7B) accents on cream (#FDFBF7) cards,
        [amber (#D4A017) for any caution flag],
BOTTOM: CTA button — teal (#0E7C7B) bg, cream text, rounded: "[CTA]"
        الزبدة logo (apps/ads/zbdh-logo-color.svg) + "الزبدة" centered below,
dark green (#1d3b2c) background, ~70% whitespace, no clutter, 8k
```

### Video prompt — Reel/Video (1080×1920, 9:16, 8–15s)
```text
vertical 9:16 video, [N] seconds, RTL Arabic typography (Readex Pro),
SCENE 1 (0–Xs) FRICTION: [scene] — text overlay: "[A]"
SCENE 2 (X–Ys) INVITE:   [app/screen] — text overlay: "[B]"
                         >> Concierge Pause: chaos resolves into a structured plan <<
SCENE 3 (Y–Zs) OUTCOME:  [itinerary/place card with teal #0E7C7B on cream #FDFBF7]
END CARD: dark green (#1d3b2c), الزبدة logo, CTA button "[CTA]" in teal
```

**production notes:** [real DB places / source asset / A/B variant / audio direction / record-from-real-app / etc.]
~~~

---

## 8. Worked examples

Two fully-filled posts — one Riyadh Local, one Travel Mode — that pass the [§6](#6-quality-gate--value-vs-motion) gate. Both use only ✅ Allowed claims and real DB places.

### Example A — Riyadh Local

## Ad — "بِن مو بس بِن" (Z-Score honesty)  ·  campaign: Riyadh Map Launch

- **audience:** Cold (broad Riyadh)
- **persona:** سلطان — Riyadh local, 20–40
- **platform:** Instagram (also TikTok)
- **objective:** Engagement
- **KPI:** place_open (secondary: save/share)
- **asset type:** both — Static 1080×1350 + Reel 1080×1920 (12s)

**hook (loop A):**
> الخريطة تعطيك أماكن. الزبدة تعطيك الزبدة.

**script (loop A→B→C):**
> A: "الخريطة تعطيك أماكن." → B: "كل مكان عليه زبدة صريحة — وش الحلو ووش السيء." → C: "تقرأ، وتقرر — بدون مجاملة."

**CTA:** اكتشف أماكن الرياض

**caption:**
> كل مكان عليه زبدة صريحة — وش الحلو ووش السيء. بدون مجاملة 💯 #الزبدة #الرياض #زبدة_المكان

**features shown (all ✅ Allowed):** place discovery, Z-Score ratings, زبده gists (honest pros/cons)

#### Image prompt — Static (1080×1350, RTL)
```text
premium 3-panel showcase, 1080x1350 (4:5 vertical), RTL,
TOP: headline in Playfair Display 800, cream (#FDFBF7), RTL:
     "الخريطة تعطيك أماكن. الزبدة تعطيك الزبدة."
CENTER: 3 stacked place cards on dark green (#1d3b2c), each on cream (#FDFBF7), rounded:
  Card 1 — بروز كافيه: Z-Score badge (teal #0E7C7B),
           gist "سبيشلتي ممتاز والأجواء هادية 👌", teal positive accent line,
  Card 2 — ماما نوره: Z-Score badge,
           gist "أكل بيتي والكمية تكفي عيلة كاملة 👨‍👩‍👧", teal accent line,
  Card 3 — كانديرا: Z-Score badge,
           gist "رومانسي بس الأسعار مرتفعة شوي ⚠️", amber (#D4A017) caution line,
  cards slightly overlapping with soft depth shadow,
BOTTOM: CTA button — teal (#0E7C7B) bg, cream text, rounded: "اكتشف أماكن الرياض"
        الزبدة logo + "الزبدة" centered below,
~70% whitespace, minimal premium layout, 8k
```

#### Video prompt — Reel (1080×1920, 9:16, 12s)
```text
dynamic vertical 9:16 video, 12 seconds, 3-part montage, Readex Pro Arabic typography,
INTRO (0–2s) FRICTION: dark field, text (Playfair Display, cream #FDFBF7):
       "الخريطة تعطيك أماكن. الزبدة تعطيك الزبدة."
SEG 1 (2–5s) INVITE: بروز كافيه exterior at night, gist card slides up:
       "سبيشلتي ممتاز والأجواء هادية 👌" (teal #0E7C7B highlight),
SEG 2 (5–8s): ماما نوره exterior, gist card: "أكل بيتي والكمية تكفي عيلة كاملة 👨‍👩‍👧",
SEG 3 (8–10s) OUTCOME: كانديرا exterior, gist card:
       "رومانسي بس الأسعار مرتفعة شوي ⚠️" (amber #D4A017 caution),
END (10–12s): dark green (#1d3b2c), الزبدة logo, CTA button "اكتشف أماكن الرياض" in teal,
readable ~3s transitions, warm night-city lighting, cream (#FDFBF7) cards throughout
```

**production notes:** Real DB places (بروز كافيه, ماما نوره, كانديرا — Ad-3 set). Pull live Z-Score + gist text from the app so the honest mix (2 positive, 1 caution) is real, not staged. Lo-fi audio, no VO. A/B: positive-only vs. honest-mix cards → save rate.

---

### Example B — Travel Mode

## Ad — "عيشها مثل أهلها" (Istanbul, family + halal)  ·  campaign: Travel Immersive

- **audience:** Warm (50%+ video viewers)
- **persona:** أم فهد — family planner, 28–42
- **platform:** TikTok (also Instagram Reels)
- **objective:** Conversion
- **KPI:** itinerary_generate (secondary: trip_confirm)
- **asset type:** both — Static 1080×1350 + Reel 1080×1920 (12s)

**hook (loop A):**
> إسطنبول مع العيلة… من وين تبدأ؟

**script (loop A→B→C):**
> A: "إسطنبول مع العيلة — من وين تبدأ؟" → B: "قولنا الجو والميزانية، واحنا نرتب كل يوم." → C: "5 أيام مرتبة: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان."

**CTA:** خطط رحلتك مجاناً

**caption:**
> إسطنبول غير لما تخطط صح: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان. الزبدة ترتبها لك — مجاناً ✈️ #الزبدة #رحلتك_مرتبة #سفر_حلال

**features shown (all ✅ Allowed):** card wizard, destination scoring (match %), day-by-day itinerary, 5-level halal badges, زبده gists, pre-flight checklist

#### Image prompt — Static (1080×1350, RTL)
```text
cinematic travel poster, photorealistic, 1080x1350 (4:5 vertical), RTL,
TOP: headline in Playfair Display 800, cream (#FDFBF7) with subtle shadow:
     "ISTANBUL — عيشها مثل أهلها."
CENTER: Saudi family on a terrace overlooking the Bosphorus at golden hour (one human element),
        foreground iPhone showing الزبدة itinerary card:
          "اليوم 2 — السلطان أحمد", halal badge (green #16864F) on a restaurant,
          زبده gist line, match score badge, teal (#0E7C7B) accents on cream (#FDFBF7) cards,
BOTTOM BAR: semi-transparent dark green (#1d3b2c) overlay,
        CTA button — teal (#0E7C7B) bg, cream text: "خطط رحلتك مجاناً",
        الزبدة logo + "الزبدة" centered,
~70% breathing room, warm golden grade, 8k
```

#### Video prompt — Reel (1080×1920, 9:16, 12s)
```text
vertical cinematic travel video, 12 seconds, 9:16, Readex Pro Arabic typography,
SCENE 1 (0–3s) FRICTION: family at a busy Istanbul viewpoint, mother on phone,
       text (Playfair Display, cream #FDFBF7): "إسطنبول مع العيلة… من وين تبدأ؟"
SCENE 2 (3–6s) INVITE: phone shows الزبدة card wizard — quick taps: عائلي → ثقافة+أكل → 5 أيام,
       text (Readex Pro): "قولنا الجو والميزانية."
       >> Concierge Pause: cards settle, a full itinerary assembles <<
SCENE 3 (6–10s) OUTCOME: day-by-day itinerary scrolls — "اليوم 2" activities,
       halal badge (green #16864F) on a restaurant, زبده gist visible, pre-flight checklist,
       teal (#0E7C7B) accents on cream (#FDFBF7) cards,
END (10–12s): dark green (#1d3b2c), الزبدة logo, CTA button "خطط رحلتك مجاناً" in teal,
warm golden hour grade, family-friendly, smooth readable transitions
```

**production notes:** Record the wizard→itinerary flow from the real app (Istanbul, family, 5 days) so badges/gists/match% are real. Keep the itinerary scroll at real speed (let viewers read). Lead with "مجاناً", never a price. Bilingual headline (EN "ISTANBUL" + Arabic) for the code-switch audience.

---

## Appendix A — Open questions for ZBDH-574

Claim/visual drift found while building this template. These belong to **ZBDH-574** (consolidate `docs/marketing/` + verify ad-safe claims); captured here so generation work doesn't inherit a stale claim.

| # | Item | Source doc says | Reality / current evidence | Recommended template stance |
|---|---|---|---|---|
| 1 | **iOS App Store** | "Web app only… App Store — Not published — Do NOT Advertise" | **Live:** `apps.apple.com/sa/app/alzbdh/id6741608525` (landing PR #491, on `main`) | Allowed (iOS install CTA). Update source docs. |
| 2 | **Android / Play Store** | grouped with "App Store — not published" | Not confirmed live (only iOS badge shipped) | Needs-verification → no Android CTA yet |
| 3 | **Offline access** | listed **both** as ✅ live and as "Phase 3 / requires internet" | contradictory | Needs-verification → don't advertise offline |
| 4 | **Paid tiers / pricing** (`SAR 50` 3-trips, `SAR 99`/yr) | strategy doc says "everything free for now / do-not-advertise payment" | **Live** — in-app checkout sells both tiers via Tap + Apple Pay (`apps/web/src/screens/CheckoutScreen.jsx`) | Lead with free; prices truthful but never lead with them |
| 5 | **Campaign accent color** | ads use teal `#0E7C7B` + dark green `#1d3b2c` | Design System V3 brand is forest `#1F3D2E`, no teal token | Keep ad palette for these 16 ads; marketing+design to decide on reconciliation |
| 6 | **Numerals in ad copy** | legacy ad docs use Arabic-Indic ٠–٩ | app convention is Western 0–9 (ZBDH-156/400) | Use 0–9; normalize legacy copy when ported |
| 7 | **`MVPAdLaunchPlan copy.md`** | near-duplicate of the canonical plan | needs triage | ZBDH-574 to mark/rename/archive the duplicate |

---

*Document owner: Marketing · Aligned with: `ad-framework.md`, `MVPAdLaunchPlan.md`, `old_mvp-launch-social-ads.md` · Consumed by: ZBDH-575 (generation matrix) · Claims to reconcile: ZBDH-574.*
