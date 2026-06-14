# Post Batch — Travel Mode (Ads 7–12) · ZBDH-577

Platform-ready post packages for the Travel Immersive campaign (30% budget). Grouped by testing phase.

**Use with:** `social-post-generation-matrix.md`, `social-post-template.md`, `MVPAdLaunchPlan.md §Ad N` (full prompts), `README.md` §3.
**Voice:** Saudi dialect, honest, calm, no فصحى. **Numerals:** 0–9. **Lead with free.**
**Claims (verified live):** trip planning (chat + wizard), destination scoring, day-by-day itinerary, halal badges, زبده gists, visa/pre-flight checklist, during-trip assistance. iOS App Store install CTA allowed on iOS; **no Android**.
**Concierge Pause:** every reel includes the 1–2s beat where chaos resolves into a structured itinerary (`ad-framework.md` §5) — marked ⏸ below.
**AI-image prompts:** tighten `§Ad N` for *realistic* travel photography (photoreal, natural light, real destinations) with brand-safe Arabic overlays in Readex Pro; keep the brand palette and safe areas (template §4).

### Hashtag bank (mix 3–5)
`#الزبدة` `#رحلتك_مرتبة` `#سفر` `#رحلة` `#تخطيط_رحلات` `#حلال` `#سفر_حلال` `#سياحة_عائلية` `#شهر_عسل` + destination: `#فيتنام` `#إسطنبول` `#تركيا`

### Phase grouping
- **Cold hook (W1):** Ad 7 (Vietnam), Ad 9 (Stop traveling like a tourist)
- **Warm education (W2):** Ad 10 (Before/After), Ad 11 (AI Companion)
- **High-intent conversion (W3):** Ad 8 (Istanbul), Ad 12 (Ultra Premium)

### Asset map
| Asset | Supports |
|---|---|
| `zbdh-claude-style-v2.html` → **H1** | **Ad 8** (ready static) |
| `zbdh-claude-style-v2.html` → H1–H6 style | **Ad 12** (partial) |
| AI generation (Track A/B) | Ads 7, 9, 10 |
| Screen demo (ZBDH-579/582) | Ad 11 |

---

## Cold hook (Week 1)

### Ad 7 — Vietnam Immersive · `itinerary_generate` · CTA **خطّطها في الزبدة** ⏸
**Hook:** VIETNAM — عيشها مثل أهلها. · **Asset:** AI static + video `§Ad 7`.
- **Instagram:** فيتنام مو بس فو وقهوة. الزبدة ترتب لك كل يوم — وتدلّك على المطاعم الحلال ✈️🇻🇳 `#الزبدة #فيتنام #سفر_حلال`
- **TikTok:** فيتنام بعيون محلية مو سياحية 🇻🇳 الزبدة ترتب أيامك + مطاعم حلال موثقة. `#الزبدة #فيتنام #سفر`
- **X:** فيتنام، 6 أيام، مطاعم حلال، يوم بيوم. قول الوجهة والزبدة تبني الرحلة ✈️🇻🇳
- **Snapchat:** فيتنام مرتبة + حلال موثق ✈️
- **YouTube Short:** خطط رحلة فيتنام بالذكاء الاصطناعي | الزبدة — يوم بيوم + مطاعم حلال
- **Claims:** ✅ destination scoring, AI itinerary, halal badges.

### Ad 9 — Stop Traveling Like a Tourist · `itinerary_generate` · CTA **خطط رحلتك مجاناً** ⏸ (bilingual)
**Hook:** Stop traveling like a tourist. عِشها مثل أهلها. · **Asset:** AI video + static `§Ad 9`.
- **Instagram:** السياح يروحون نفس الأماكن. الزبدة تخطط لك أماكن ما تلقاها بقوقل 🗺️ `#الزبدة #سفر #رحلتك_مرتبة`
- **TikTok:** Stop traveling like a tourist 🛑 عِشها مثل أهلها — الزبدة ترتبها لك من الصبح للمسا. `#الزبدة #سفر #travel`
- **X:** Stop traveling like a tourist. عِشها مثل أهلها. الزبدة ترتب كل يوم — من الصبح للمسا. مجاناً.
- **Snapchat:** عِشها مثل أهلها — مو مثل السياح 🗺️
- **YouTube Short:** سافر مثل أهل البلد مو مثل السياح | الزبدة
- **Claims:** ✅ itinerary, activity gists, halal badges, local tips.

## Warm education (Week 2)

### Ad 10 — Before / After · `itinerary_generate` · CTA **جرّب الفرق** ⏸ (wipe reveal)
**Hook:** نفس الرحلة. تخطيط مختلف. · **Asset:** AI split-screen video + static `§Ad 10`.
- **Instagram:** نفس الوجهة. بس التخطيط فرق. 37 تاب وفوضى ضد جدول مرتب + حلال موثق. جرّب الزبدة ✈️ `#الزبدة #رحلتك_مرتبة`
- **TikTok:** بدون الزبدة: 37 تاب وفوضى 😵 — مع الزبدة: جدول مرتب وحلال موثق 😌 `#الزبدة #سفر`
- **X:** نفس الرحلة، تخطيط مختلف: 37 تاب → جدول يوم بيوم + شارات حلال + قائمة تجهيز. جرّب الفرق.
- **Snapchat:** نفس الرحلة، تخطيط مختلف 😵→😌
- **YouTube Short:** قبل وبعد: تخطيط رحلة بالزبدة | الفرق
- **Claims:** ✅ wizard→itinerary, halal badges, gists, pre-flight checklist.

### Ad 11 — AI Companion · `itinerary_generate` · CTA **جرّب الذكاء الاصطناعي** ⏸ (screen demo — ZBDH-579/582)
**Hook:** مو AI يتفلسف. AI يخطط. 4 أسئلة — رحلة كاملة. · **Asset:** real-app screen demo `§Ad 11`.
- **Instagram:** سألته 4 أسئلة وطلع لي جدول 5 أيام بإسطنبول: فنادق حلال، مطاعم، وزبدة صريحة لكل مكان. مجاناً. 🤖 `#الزبدة #تخطيط_رحلات`
- **TikTok:** 4 أسئلة → رحلة كاملة 🤖 مو AI يتفلسف، AI يخطط. `#الزبدة #ذكاء_اصطناعي #سفر`
- **X:** مو AI يتفلسف — AI يخطط. 4 أسئلة → جدول 5 أيام بإسطنبول: فنادق حلال، مطاعم، زبدة صريحة. مجاناً.
- **Snapchat:** 4 أسئلة ورحلتك جاهزة 🤖
- **YouTube Short:** خطط رحلة كاملة بـ 4 أسئلة | الزبدة AI
- **Claims:** ✅ AI chat, wizard (4 Q → trip), destination scoring. Lead with مجاناً.

## High-intent conversion (Week 3)

### Ad 8 — Istanbul Immersive · `itinerary_generate`/`trip_confirm` · CTA **خطط رحلتك** ⏸
**Hook:** ISTANBUL — عِشها كأنك واحد منهم. · **Asset:** **READY** static H1 + video `§Ad 8`.
- **Instagram:** إسطنبول غير لما تخطط صح: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان. الزبدة ترتبها لك ✈️ `#الزبدة #إسطنبول #سياحة_عائلية`
- **TikTok:** عائلة بإسطنبول بدون لخبطة — فنادق حلال + جدول يومي جاهز 🇹🇷 `#الزبدة #إسطنبول #سفر_حلال`
- **X:** إسطنبول مع العيلة: فنادق حلال، مطاعم موثقة، جدول يوم بيوم. الزبدة ترتبها ✈️
- **Snapchat:** إسطنبول مرتبة للعيلة 🇹🇷
- **YouTube Short:** رحلة عائلية لإسطنبول بالذكاء الاصطناعي | الزبدة
- **Claims:** ✅ day-by-day, halal restaurants, destination scoring.

### Ad 12 — Ultra Premium Minimal · `trip_confirm` · CTA **جرّب الزبدة** ⏸ (bilingual)
**Hook:** رحلتك، مرتبة. / Travel. Refined. — من الفكرة لآخر يوم — مجاناً. · **Asset:** partial ready (H1–H6) + video `§Ad 12`.
- **Instagram:** رحلتك، مرتبة. من الفكرة لآخر يوم — مجاناً. ✨ `#الزبدة #رحلتك_مرتبة`
- **TikTok:** رحلتك، مرتبة ✨ من الفكرة لآخر يوم — مجاناً. `#الزبدة #سفر`
- **X:** رحلتك، مرتبة. Travel. Refined. من الفكرة لآخر يوم — مجاناً.
- **Snapchat:** رحلتك، مرتبة ✨
- **YouTube Short:** الزبدة — رحلتك مرتبة من الفكرة لآخر يوم
- **Claims:** ✅ itinerary, halal badge, gist. Price posture: free.

---

*Batch owner: Marketing · Ads 7–12 · Closes ZBDH-577. Render from `§Ad N` prompts (Track A/B) or export H1 (Track D); Ad 11 via ZBDH-579/582.*
