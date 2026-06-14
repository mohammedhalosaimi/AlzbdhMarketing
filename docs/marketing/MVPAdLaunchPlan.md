# الزبدة — MVP 16-Ad Launch Plan

**Campaigns:** Riyadh Local + Travel Mode  
**Formats:** Static (1080x1350), Video (1080x1920), Screen Demo Reels  
**Platforms:** Instagram, TikTok, X, Snapchat  
**Generation prompts:** Sora / Midjourney / DALL·E ready  
**Aligned with:** `mvp-launch-social-ads.md`, `ad-framework.md`  
**Source assets:** `apps/ads/zbdh-claude-style-v2.html`

---

## Campaign Structure

| Campaign | Objective | KPIs | Budget |
|----------|-----------|------|--------|
| **Riyadh Map Launch** | Engagement + in-app actions | map_open, place_open, save/share | 60% |
| **Travel Immersive** | App installs + trip generation | itinerary_generate, trip_confirm | 30% |
| **Scam Awareness** | Trust + retargeting conversion | app_open, itinerary_generate, share | 10% |

### Testing Schedule

| Week | Audience | Ads | Goal |
|------|----------|-----|------|
| 1 | Cold (broad Saudi) | Ad 1, 2, 7, 9 | Hook + awareness |
| 2 | Warm (video viewers 50%+) | Ad 3, 4, 10, 11 | Feature education |
| 3 | High intent (75%+ viewers + retarget) | Ad 5, 6, 8, 12 | Conversion |
| 2–3 | Warm + retarget (traveled before) | Ad 13, 14, 15, 16 | Trust + conversion |

---

# Riyadh Map Launch — 6 Ads

---

## Ad 1 — "Google Confusion" (Hook)

**Type:** Video (9–12s) + Static (1080x1350)  
**Angle:** Too many options, zero clarity  
**Target persona:** سلطان — Riyadh local, 20–40

**Script:**
> قوقل حيّرني.  
> 200 خيار… ولا قرار.  
> الزبدة؟  
> تعطيك الأفضل — والباقي تفاصيل.

**CTA:** افتح الخريطة

**Features shown:** Place discovery (2,000+ venues), Z-Score ratings, AI summaries

**Caption:**
> كل ما أبي مكان بالرياض أدخل قوقل وأطلع أتعب أكثر 😮‍💨 فيه حل أسهل

### Video Generation Prompt

```text
vertical 9:16 video, 9–12 seconds, fast-paced social media ad,

SCENE 1 (0–4s): young Saudi man in thobe sitting in modern Riyadh cafe at night,
holding iPhone, frustrated expression scrolling Google Maps,
text overlay (Readex Pro, white): "قوقل حيّرني. 200 خيار… ولا قرار."

SCENE 2 (4–9s): same man smiling, opens الزبدة app,
screen shows clean list with Arabic Z-Score badges and AI gist summaries,
text overlay: "الزبدة؟ تعطيك الأفضل — والباقي تفاصيل."
teal (#0E7C7B) accent color on UI elements,

SCENE 3 (9–12s): end card — dark green (#1d3b2c) background,
الزبدة logo centered, CTA button: "افتح الخريطة" in teal button with cream text,

Riyadh Boulevard lights in background through window,
cinematic but social-media authentic,
natural warm lighting, shallow depth of field,
smooth 2-second transition between frustration and relief,
Readex Pro Arabic typography throughout

Post caption: كل ما أبي مكان بالرياض أدخل قوقل وأطلع أتعب أكثر 😮‍💨 فيه حل أسهل
```

### Image Prompt

```text
premium minimalist app advertisement, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"قوقل حيّرني. 200 خيار… ولا قرار."
subheadline in Readex Pro 400: "الزبدة؟ تعطيك الأفضل."

CENTER: split composition —
LEFT: blurred chaotic Google Maps screenshot with dozens of red pins,
RIGHT: clean الزبدة app interface showing 3 curated place cards,
each with Arabic name + Z-Score badge + one-line AI gist,
teal (#0E7C7B) accent highlights on cream (#FDFBF7) cards,
subtle arrow/transition from chaos to clarity,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"افتح الخريطة"
الزبدة logo + "الزبدة" text centered below,

dark green (#1d3b2c) background,
Riyadh skyline silhouette at bottom edge,
premium tech brand feel, no clutter, 8k
```

---

## Ad 2 — "Locate Me Power"

**Type:** Screen demo reel (10s) + Static (1080x1350)  
**Angle:** Instant discovery from your location

**Script:**
> أنا هنا.  
> وش الأفضل حولي؟  
> افتح موقعك… وخلاص.

**CTA:** جرّب الخريطة الآن

**Features shown:** Category filters, GPS-based discovery, place cards with ratings

**Caption:**
> ما تحتاج تسأل أحد. افتح الزبدة وهي تدلّك 📍

### Video Prompt

```text
screen demo reel, 10 seconds, vertical 9:16,

SCENE 1 (0–3s): cinematic smartphone screen recording style,
clean الزبدة app interface zooming into Riyadh map,
text overlay (Readex Pro, white): "أنا هنا. وش الأفضل حولي؟"

SCENE 2 (3–7s): animated pins appear around user location with category icons,
user taps cafe pin — summary card slides up showing:
  Arabic name, Z-Score badge, one-line AI gist,
teal (#0E7C7B) accent pins on cream (#FDFBF7) card,

SCENE 3 (7–10s): text overlay: "افتح موقعك… وخلاص."
end card — الزبدة logo, CTA button: "جرّب الخريطة الآن" in teal,

urban Riyadh evening softly blurred behind phone mockup,
warm golden hour tones, premium product demo feel,
Readex Pro Arabic typography throughout

Post caption: ما تحتاج تسأل أحد. افتح الزبدة وهي تدلّك 📍
```

### Image Prompt

```text
premium app showcase, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"أنا هنا. وش الأفضل حولي؟"
subheadline in Readex Pro 400: "افتح موقعك… وخلاص."

CENTER: iPhone centered displaying الزبدة map interface,
GPS pulse ring around user location pin (teal #0E7C7B),
6–8 category-colored pins radiating outward (cafes, restaurants, entertainment),
one place card expanded: Arabic name + Z-Score + "سبيشلتي ممتاز 👌" gist,
cream (#FDFBF7) card floating over map,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"جرّب الخريطة الآن"
الزبدة logo + "الزبدة" text centered below,

dark green (#1d3b2c) background,
Riyadh evening skyline softly blurred behind phone,
premium product showcase feel, 8k
```

---

## Ad 3 — "Pin مو بس Pin" (Z-Score)

**Type:** Video (15s) + Static (1080x1350)  
**Angle:** Every pin has an honest AI opinion — not just a location

**Script:**
> الخريطة تعطيك أماكن.  
> الزبدة تعطيك الزبدة.

**Show 3 real places (from DB):**
- بروز كافيه — "سبيشلتي ممتاز والأجواء هادية 👌"
- ماما نوره — "أكل بيتي والكمية تكفي عيلة كاملة 👨‍👩‍👧"
- كانديرا — "رومانسي بس الأسعار مرتفعة شوي ⚠️"

**CTA:** اكتشف أماكن الرياض

**Features shown:** زبده Gists (AI place summaries), Z-Score, pros/cons

**Caption:**
> كل مكان عليه زبدة صريحة — وش الحلو ووش السيء. بدون مجاملة 💯

### Video Prompt

```text
dynamic vertical 9:16 video, 15 seconds, 3-part montage,

INTRO (0–2s): text overlay (Playfair Display, white on dark):
"الخريطة تعطيك أماكن. الزبدة تعطيك الزبدة."

SEGMENT 1 (2–5s): بروز كافيه exterior in Riyadh,
AI summary overlay card: "سبيشلتي ممتاز والأجواء هادية 👌"
Arabic text with teal (#0E7C7B) highlight for positive,

SEGMENT 2 (5–8s): ماما نوره restaurant exterior,
AI summary overlay card: "أكل بيتي والكمية تكفي عيلة كاملة 👨‍👩‍👧"

SEGMENT 3 (8–11s): كانديرا exterior,
AI summary overlay card: "رومانسي بس الأسعار مرتفعة شوي ⚠️"
amber highlight for caution,

END (11–15s): الزبدة logo on dark green (#1d3b2c) background,
CTA button: "اكتشف أماكن الرياض" in teal with cream text,

fast but readable transitions (3s each),
night city vibes, warm interior lighting visible through windows,
clean Readex Pro typography throughout

Post caption: كل مكان عليه زبدة صريحة — وش الحلو ووش السيء. بدون مجاملة 💯
```

### Image Prompt

```text
premium 3-panel showcase, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"الخريطة تعطيك أماكن. الزبدة تعطيك الزبدة."

CENTER: 3 stacked place cards on dark green (#1d3b2c) background,
each card on cream (#FDFBF7) with rounded corners:

Card 1: بروز كافيه — Z-Score badge (teal),
  AI gist: "سبيشلتي ممتاز والأجواء هادية 👌"
  teal (#0E7C7B) positive accent line on left,

Card 2: ماما نوره — Z-Score badge,
  AI gist: "أكل بيتي والكمية تكفي عيلة كاملة 👨‍👩‍👧"
  teal positive accent line,

Card 3: كانديرا — Z-Score badge,
  AI gist: "رومانسي بس الأسعار مرتفعة شوي ⚠️"
  amber (#D4A017) caution accent line on left,

cards slightly overlapping with depth shadow,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"اكتشف أماكن الرياض"
الزبدة logo + "الزبدة" text centered below,

minimal premium layout, 8k
```

---

## Ad 4 — "Save It Now"

**Type:** Short demo (8s) + Static (1080x1350)  
**Angle:** Build your personal Riyadh list

**Hook:**
> احفظها الحين. بترجع لها.

**CTA:** ابدأ قائمتك

**Features shown:** Favorites/save functionality, place cards

**Caption:**
> كل مكان حلو بالرياض — في مكان واحد ❤️

### Video Prompt

```text
short demo, 8 seconds, vertical 9:16,

SCENE 1 (0–2s): text overlay (Readex Pro, white):
"احفظها الحين. بترجع لها."

SCENE 2 (2–5s): close-up smartphone interaction,
thumb taps heart icon on place card with بروز كافيه,
heart fills with teal (#0E7C7B) color, subtle pulse animation,

SCENE 3 (5–7s): favorites list showing 4 saved Riyadh places with thumbnails,
each with Z-Score badge and one-line gist preview,

END (7–8s): الزبدة logo, CTA button: "ابدأ قائمتك" in teal,

cozy indoor cafe environment, warm lighting,
Readex Pro Arabic typography throughout,
premium product demo style

Post caption: كل مكان حلو بالرياض — في مكان واحد ❤️
```

### Image Prompt

```text
premium app feature showcase, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"احفظها الحين. بترجع لها."

CENTER: iPhone displaying الزبدة favorites list,
4 saved Riyadh place cards stacked vertically:
each with thumbnail image, Arabic name, Z-Score badge, one-line gist,
heart icon filled with teal (#0E7C7B) on each card,
cream (#FDFBF7) card backgrounds with soft shadows,
top card slightly pulled out with finger-tap gesture indicator,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"ابدأ قائمتك"
الزبدة logo + "الزبدة" text centered below,

dark green (#1d3b2c) background,
cozy warm lighting feel,
premium product feature highlight, 8k
```

---

## Ad 5 — "Share Without Explaining"

**Type:** Short reel (8s) + Static (1080x1350)  
**Angle:** Send a place card instead of typing paragraphs

**Hook:**
> صاحبك يسألك "وين نروح؟"  
> ما يحتاج شرح. شاركها وخلاص.

**CTA:** شارك الزبدة

**Features shown:** Place sharing, AI gist as shareable card

**Caption:**
> بدال ما تكتب ٥ رسائل وتشرح المكان… شارك البطاقة وخلاص 🔗

### Video Prompt

```text
short reel, 8 seconds, vertical 9:16,

SCENE 1 (0–3s): young Saudi man in car at night,
phone notification: friend texts "وين نروح الليلة؟",
text overlay (Readex Pro): "صاحبك يسألك وين نروح؟"

SCENE 2 (3–6s): opens الزبدة app, taps share on سيركولو بوبولاري card,
WhatsApp share sheet appears, card preview shows:
  photo + name + Z-Score + one-line gist,
text overlay: "ما يحتاج شرح. شاركها وخلاص."

SCENE 3 (6–8s): friend replies with 🔥 emoji,
end card — الزبدة logo, CTA button: "شارك الزبدة" in teal,

modern Riyadh city lights through car window,
natural phone screen glow, authentic social vibe,
Readex Pro Arabic typography throughout

Post caption: بدال ما تكتب ٥ رسائل وتشرح المكان… شارك البطاقة وخلاص 🔗
```

### Image Prompt

```text
social sharing concept, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"صاحبك يسألك وين نروح؟"
subheadline in Readex Pro 400: "ما يحتاج شرح. شاركها وخلاص."

CENTER: two phones side by side on dark green (#1d3b2c) background,
LEFT phone: WhatsApp chat showing friend asking "وين نروح الليلة؟",
RIGHT phone: الزبدة app with share button highlighted,
floating between them: shared place card preview showing:
  place photo + Arabic name + Z-Score + one-line gist,
  teal (#0E7C7B) share icon with curved arrow connecting both phones,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"شارك الزبدة"
الزبدة logo + "الزبدة" text centered below,

modern Riyadh night vibes in soft background,
premium social lifestyle feel, 8k
```

---

## Ad 6 — Premium Static (Instagram 4:5)

**Type:** Static (1080x1350) + Video (10s)  
**Headline:** افتح الخريطة… وخلاص.  
**Sub:** أماكن الرياض مع زبدة صريحة.  
**CTA:** اكتشف الحين

**Features shown:** Map UI with pins, place cards, Z-Score

**Matches:** Claude-style Ad Set H (H7–H10) in `apps/ads/zbdh-claude-style-v2.html`

### Image Prompt

```text
premium minimalist app advertisement, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"افتح الخريطة… وخلاص."
subheadline in Readex Pro 400: "أماكن الرياض مع زبدة صريحة."

CENTER: smartphone centered displaying الزبدة app map interface,
teal (#0E7C7B) accent pins on light map,
one place card expanded showing Arabic name + Z-Score + gist,
Riyadh Kingdom Tower softly blurred in background,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"اكتشف الحين"
الزبدة logo + "الزبدة" text centered below,

dark green (#1d3b2c) background around phone,
cream (#FDFBF7) card elements,
luxury tech brand feel, no clutter, 8k
```

### Video Prompt

```text
vertical 9:16 video, 10 seconds, premium app showcase,

SCENE 1 (0–3s): cinematic overhead shot of Riyadh at night,
camera dives down toward illuminated streets,
text overlay (Playfair Display, cream): "افتح الخريطة… وخلاص."

SCENE 2 (3–7s): smooth zoom into الزبدة app on smartphone,
map interface loads with animated teal (#0E7C7B) pins appearing,
user taps a pin — place card slides up showing:
  Arabic name, Z-Score badge, AI gist summary,
text overlay (Readex Pro): "أماكن الرياض مع زبدة صريحة."

SCENE 3 (7–10s): card expands showing full details with pros/cons,
pull back to reveal Riyadh skyline behind phone,
end card — dark green (#1d3b2c) background,
الزبدة logo centered, CTA button: "اكتشف الحين" in teal,

Kingdom Tower and Boulevard visible in aerial shot,
cinematic warm golden lighting, smooth camera movements,
Readex Pro Arabic typography throughout

Post caption: خريطة الرياض بعيون الزبدة — أماكن مجرّبة وآراء صريحة 📍
```

---

# Travel Mode Launch — 6 Ads

**Theme:** عيش المدينة مثل أهلها.

---

## Ad 7 — Vietnam Immersive Poster

**Type:** Static (1080x1350) + Video (12s)  
**Headline:** VIETNAM — عيشها مثل أهلها.  
**CTA:** خطّطها في الزبدة

**Features shown:** Destination scoring, AI itinerary, halal badges

**Caption:**
> فيتنام مو بس فو وقهوة. الزبدة ترتب لك كل يوم — وتدلّك على المطاعم الحلال ✈️🇻🇳

### Image Prompt

```text
cinematic travel poster, photorealistic, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, white text with subtle shadow:
"VIETNAM — عيشها مثل أهلها."

CENTER: Hanoi Old Quarter lantern-lit street at golden hour,
young Saudi traveler in casual modern clothes walking confidently,
street food stalls and motorbikes softly blurred,
warm gold and teal color grading,

BOTTOM BAR: semi-transparent dark green (#1d3b2c) overlay,
CTA button: "خطّطها في الزبدة" in teal (#0E7C7B) with cream text,
الزبدة logo + "الزبدة" text centered,

luxury travel campaign aesthetic,
rich saturated tones, 8k resolution

Post caption: فيتنام مو بس فو وقهوة. الزبدة ترتب لك كل يوم — وتدلّك على المطاعم الحلال ✈️🇻🇳
```

### Video Prompt

```text
vertical cinematic travel video, 12 seconds, 9:16,

SCENE 1 (0–3s): aerial drone shot of Hanoi Old Quarter at golden hour,
lantern-lit streets, motorbikes flowing like rivers,
text overlay (Playfair Display, white with shadow): "VIETNAM"

SCENE 2 (3–6s): young Saudi traveler walking through vibrant street market,
trying local street food at a stall, smiling,
text overlay (Readex Pro): "عيشها مثل أهلها."

SCENE 3 (6–9s): traveler opens الزبدة app on phone,
day-by-day itinerary visible: Day 1 activities listed,
halal badge on restaurant entry, AI gist visible,
teal (#0E7C7B) accents on cream (#FDFBF7) cards,

SCENE 4 (9–10s): montage — Ha Long Bay, coffee drip, temple visit,

END (10–12s): dark green (#1d3b2c) background,
الزبدة logo centered, CTA button: "خطّطها في الزبدة" in teal,

warm golden tones, cinematic shallow depth of field,
Vietnamese ambient sounds implied,
Readex Pro Arabic typography throughout

Post caption: فيتنام مو بس فو وقهوة. الزبدة ترتب لك كل يوم — وتدلّك على المطاعم الحلال ✈️🇻🇳
```

---

## Ad 8 — Istanbul Immersive

**Type:** Static (1080x1350) + Video (12s)  
**Headline:** ISTANBUL — عِشها كأنك واحد منهم.  
**CTA:** خطط رحلتك

**Features shown:** Day-by-day itinerary, halal restaurants, destination scoring

**Caption:**
> إسطنبول غير لما تخطط صح: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان. الزبدة ترتبها لك ✈️

### Image Prompt

```text
cinematic travel poster, photorealistic, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, white text with subtle shadow:
"ISTANBUL — عِشها كأنك واحد منهم."

CENTER: Istanbul sunset from Galata Tower viewpoint,
Bosphorus and mosques visible in golden light,
Saudi family (couple + child) on terrace enjoying Turkish tea,
warm stained glass lighting from nearby lamp,
shallow depth of field,

BOTTOM BAR: semi-transparent dark green (#1d3b2c) overlay,
CTA button: "خطط رحلتك" in teal (#0E7C7B) with cream text,
الزبدة logo + "الزبدة" text centered,

luxury travel poster aesthetic, 8k

Post caption: إسطنبول غير لما تخطط صح: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان. الزبدة ترتبها لك ✈️
```

### Video Prompt

```text
vertical cinematic travel video, 12 seconds, 9:16,

SCENE 1 (0–3s): sweeping aerial of Istanbul at sunset,
Hagia Sophia and Blue Mosque silhouettes against golden sky,
text overlay (Playfair Display, white with shadow): "ISTANBUL"

SCENE 2 (3–6s): Saudi family on rooftop terrace overlooking Bosphorus,
father pours Turkish tea, child points at passing ferry,
text overlay (Readex Pro): "عِشها كأنك واحد منهم."

SCENE 3 (6–9s): mother opens الزبدة app,
itinerary card shows: Day 2 — Sultanahmet area activities,
halal badge on restaurant, hotel card with halal amenities listed,
teal (#0E7C7B) accents on cream (#FDFBF7) cards,

SCENE 4 (9–10s): quick montage — Grand Bazaar, Bosphorus cruise, street simit vendor,

END (10–12s): dark green (#1d3b2c) background,
الزبدة logo centered, CTA button: "خطط رحلتك" in teal,

warm golden hour lighting throughout,
family-friendly warm atmosphere,
Readex Pro Arabic typography throughout

Post caption: إسطنبول غير لما تخطط صح: فنادق حلال، مطاعم موثقة، وزبدة صريحة لكل مكان. الزبدة ترتبها لك ✈️
```

---

## Ad 9 — "Stop Traveling Like a Tourist"

**Type:** Video (15s) + Static (1080x1350)  
**Angle:** Bilingual hook — English catches attention, Arabic delivers

**Script:**
> Stop traveling like a tourist.  
> عِشها مثل أهلها.  
> الزبدة ترتبها لك — كل يوم، من الصبح للمسا.

**CTA:** خطط رحلتك مجاناً

**Features shown:** Full itinerary scroll, activity gists, halal badges, local tips

**Caption:**
> السياح يروحون نفس الأماكن. الزبدة تخطط لك أماكن ما تلقاها بقوقل 🗺️

### Video Prompt

```text
vertical cinematic travel montage, 15 seconds, 9:16,

SCENE 1 (0–3s): tourist crowd at famous landmark (generic, overcrowded),
text overlay (bold English, white): "Stop traveling like a tourist."

SCENE 2 (3–6s): cut to narrow hidden alley, local tea shop, authentic market,
text overlay (Playfair Display, Arabic): "عِشها مثل أهلها."

SCENE 3 (6–10s): confident young Saudi traveler exploring local area with phone,
text overlay (Readex Pro): "الزبدة ترتبها لك — كل يوم، من الصبح للمسا."

SCENE 4 (10–12s): phone screen shows الزبدة day-by-day itinerary,
halal badges visible on restaurant entries, activity gists visible,

END (12–15s): end card — cream (#FDFBF7) background,
الزبدة logo centered, CTA button: "خطط رحلتك مجاناً" in teal,

warm golden light throughout, smooth slow motion,
Arabic + English typography fade-in,
premium documentary style

Post caption: السياح يروحون نفس الأماكن. الزبدة تخطط لك أماكن ما تلقاها بقوقل 🗺️
```

### Image Prompt

```text
bold bilingual travel poster, 1080x1350 (4:5 vertical),

TOP: bold English headline in Playfair Display 800, cream (#FDFBF7):
"Stop traveling like a tourist."
Arabic headline below in Readex Pro 600:
"عِشها مثل أهلها."

CENTER: split composition —
TOP HALF: crowded tourist landmark (generic European square),
desaturated, slightly dull color grading,
small text label: "السياح" in muted gray,

BOTTOM HALF: hidden local alley with authentic tea shop,
warm saturated golden tones, vibrant and inviting,
small text label: "أهل البلد" in teal (#0E7C7B),

thin teal dividing line between both halves,
iPhone in center overlap showing الزبدة itinerary with local spots,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"خطط رحلتك مجاناً"
الزبدة logo + "الزبدة" text centered below,

dark green (#1d3b2c) background frame,
premium travel campaign feel, 8k
```

---

## Ad 10 — Before / After Travel

**Type:** Video (12s) + Static (1080x1350)  
**Angle:** Same trip, completely different experience

**Before (بدون الزبدة):**
- 37 browser tabs open
- WhatsApp voice notes piling up
- Notes app with broken links
- "حلال؟؟؟" with question marks

**After (مع الزبدة):**
- Clean day-by-day itinerary
- Halal badges on every restaurant
- Destination scoring with match %
- زبده gist: honest pros and cons
- Pre-flight checklist ready

**CTA:** جرّب الفرق

**Features shown:** Wizard → itinerary flow, halal badges, gists, pre-flight checklist

### Video Prompt

```text
split-screen vertical video, 12 seconds, 9:16, satisfying left-to-right reveal,

LEFT SIDE "بدون الزبدة" (0–6s):
chaotic phone screen — 37 open tabs, Notes app with broken links,
WhatsApp voice notes piling up, "حلال؟؟؟" search with no answers,
stressed person face in corner, warm harsh lighting,

RIGHT SIDE "مع الزبدة" (wipe reveal at 6s):
clean الزبدة itinerary — cream (#FDFBF7) cards, teal (#0E7C7B) accents,
halal badges on restaurants, destination scoring with match %,
زبده gist with honest pros/cons, pre-flight checklist,
calm person face in corner, soft natural lighting,

END (10–12s): end card — dark green (#1d3b2c) background,
text (Playfair Display): "نفس الرحلة. تخطيط مختلف."
الزبدة logo, CTA button: "جرّب الفرق" in teal,

smooth 2-second wipe transition,
Readex Pro Arabic typography throughout

Post caption: نفس الوجهة. بس التخطيط فرق. جرّب الزبدة ✈️
```

### Image Prompt

```text
premium before-after comparison poster, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"نفس الرحلة. تخطيط مختلف."
subheadline in Readex Pro 400:
"بدون الزبدة / مع الزبدة"

CENTER: split layout with strong contrast,
LEFT side: messy phone screen collage with 37 open tabs, WhatsApp voice notes,
Notes app with broken links, search text "حلال؟؟؟", red/amber stress accents,
RIGHT side: clean iPhone showing الزبدة itinerary interface,
Day-by-day cards, halal badges, destination match score, pre-flight checklist,
teal (#0E7C7B) highlights and cream cards,

thin glowing teal divider between both sides,
small labels above each side:
"بدون الزبدة" / "مع الزبدة"

BOTTOM: CTA button — teal background, cream text:
"جرّب الفرق"
الزبدة logo centered below,
dark green (#1d3b2c) background frame,
high-end premium SaaS ad aesthetic, 8k
```

---

## Ad 11 — AI Companion Angle

**Type:** Video (12s) + Static (1080x1350)  
**Angle:** This AI actually does something useful

**Script:**
> مو AI يتفلسف.  
> AI يخطط.  
> ٤ أسئلة — رحلة كاملة.

**CTA:** جرّب الذكاء الاصطناعي

**Features shown:** AI chat planning, wizard flow (4 questions → full itinerary), destination scoring

**Caption:**
> سألته ٤ أسئلة وطلع لي جدول ٥ أيام بإسطنبول: فنادق حلال، مطاعم، وزبدة صريحة لكل مكان. مجاناً. 🤖

### Video Prompt

```text
premium tech ad, 12 seconds, vertical 9:16,

SCENE 1 (0–3s): text overlay (Readex Pro, bold): "مو AI يتفلسف. AI يخطط."
typing prompt in الزبدة chat: "أبي رحلة عائلية لتركيا ٥ أيام",

SCENE 2 (3–6s): AI responds with wizard cards — quick taps through 4 selections,
text overlay: "٤ أسئلة — رحلة كاملة."

SCENE 3 (6–9s): destination recommendations appear with match scores,
إسطنبول card showing 94% match, halal badge, destination score,

SCENE 4 (9–11s): full itinerary scrolls — hotels, activities, halal badges, AI gists,
Day 1 card with morning/afternoon/evening activities visible,

END (11–12s): end card — dark green (#1d3b2c) background,
text (Playfair Display): "AI يخطط."
الزبدة logo, CTA button: "جرّب الذكاء الاصطناعي" in teal,

airport lounge background softly blurred,
teal (#0E7C7B) UI accents on cream (#FDFBF7) cards,
Readex Pro Arabic typography, smooth animations

Post caption: سألته ٤ أسئلة وطلع لي جدول ٥ أيام بإسطنبول: فنادق حلال، مطاعم، وزبدة صريحة لكل مكان. مجاناً. 🤖
```

### Image Prompt

```text
premium AI travel planning poster, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream text, RTL:
"مو AI يتفلسف. AI يخطط."
subheadline in Readex Pro 400:
"٤ أسئلة — رحلة كاملة."

CENTER: iPhone centered on dark green (#1d3b2c) background,
screen shows الزبدة AI chat interface:
user input: "أبي رحلة عائلية لتركيا ٥ أيام"
below it, 4 wizard cards answered,
then destination recommendation card:
"إسطنبول — 94% مناسب لك"
halal badge visible, AI itinerary preview below,
teal (#0E7C7B) accents, cream (#FDFBF7) cards, soft glow around phone,

BOTTOM: CTA button — teal background, cream text:
"جرّب الذكاء الاصطناعي"
الزبدة logo centered below,
minimal high-end AI product ad style, 8k
```

---

## Ad 12 — Ultra Premium Minimal

**Type:** Static (1080x1350) + Video (10–12s)  
**Headline (English):** Travel. Refined.  
**Headline (Arabic):** رحلتك، مرتبة.  
**Sub:** من الفكرة لآخر يوم — مجاناً.  
**CTA:** جرّب الزبدة

**Matches:** Brand statement style from Ad Set B in `mvp-launch-social-ads.md`

### Image Prompt

```text
minimal luxury advertisement, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text:
"رحلتك، مرتبة."
subheadline in Readex Pro 400, smaller: "Travel. Refined."
tagline below: "من الفكرة لآخر يوم — مجاناً."

CENTER: single iPhone centered on dark green (#1d3b2c) background,
screen shows الزبدة itinerary interface:
  Day 1 card with morning/afternoon/evening activities,
  halal badge visible on restaurant entry,
  زبده gist summary visible on activity,
soft golden rim light on phone edges,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"جرّب الزبدة"
الزبدة logo + "الزبدة" text centered below,

zero clutter, premium brand aesthetic, 8k
```

### Video Prompt

```text
ultra-premium brand film, vertical 9:16 video, 10–12 seconds,

SCENE 1 (0–3s): dark green (#1d3b2c) background, soft spotlight slowly reveals iPhone silhouette,
minimal text fade-in (Playfair Display, cream):
"رحلتك، مرتبة."
small English line beneath: "Travel. Refined."

SCENE 2 (3–7s): phone screen wakes up elegantly,
smooth slow scroll through الزبدة itinerary:
Day 1 morning / afternoon / evening,
halal badge on restaurant entry,
clean AI gist card, refined teal (#0E7C7B) accents,

SCENE 3 (7–10s): close-up macro shots of interface details,
destination score badge, checklist item checked, elegant card transitions,
text overlay (Readex Pro): "من الفكرة لآخر يوم — مجاناً."

END (10–12s): minimalist end card,
الزبدة logo centered, CTA button: "جرّب الزبدة" in teal with cream text,
luxury ambient sound vibe implied, cinematic soft shadows,
no clutter, premium Apple-style motion language
```

---

# Travel Scam Awareness — 4 Ads

**Theme:** صاحبك اللي يحذّرك قبل لا تنصاب.  
**Angle:** Honest Saudi friend energy — warn them about real scams, position الزبدة as the local-knowledge shield.  
**Budget:** Included in Travel Mode 40% allocation.

---

## Ad 13 — "التاكسي المشبوه" (Taxi Trap)

**Type:** Video (12s) + Static (1080x1350)  
**Angle:** Every Saudi traveler has been ripped off by a taxi at least once  
**Target persona:** شاب سعودي يسافر أول مرة أو انصاب قبل

**Script:**
> التاكسي من المطار: "٥٠ يورو."  
> قوقل يقول: ١٥.  
> انصابت؟ عادي، كلنا مرينا فيها.  
> الزبدة تقولك السعر الحقيقي — قبل لا تركب.

**CTA:** خطط رحلتك صح

**Features shown:** Transfer routes with real prices, airport-to-hotel cost estimates, scam warnings

**Caption:**
> أول يوم بالرحلة وانصبت بالتاكسي؟ مو لازم. الزبدة تعطيك السعر الحقيقي قبل لا تطلع من المطار 🚕💸

### Video Prompt

```text
vertical 9:16 video, 12 seconds, social media ad,

SCENE 1 (0–3s): Saudi traveler at airport exit at night,
taxi driver gesturing aggressively, meter shows inflated price,
text overlay (Readex Pro, bold white): "التاكسي من المطار: ٥٠ يورو. قوقل يقول: ١٥."
red warning tint on screen edges,

SCENE 2 (3–7s): text overlay with empathy:
"انصابت؟ عادي، كلنا مرينا فيها."
quick montage: confused tourist at taxi stand, phone showing different prices,

SCENE 3 (7–10s): same traveler now calm, opens الزبدة app,
transfer route card shows: "المطار → الفندق: ١٥–١٨ يورو (متوسط)"
with warning badge: "⚠️ تجنب التاكسي خارج الصالة — استخدم التطبيق"
text overlay: "الزبدة تقولك السعر الحقيقي — قبل لا تركب."
teal (#0E7C7B) accents on cream (#FDFBF7) card,

END (10–12s): dark green (#1d3b2c) background,
الزبدة logo centered, CTA button: "خطط رحلتك صح" in teal,

airport terminal lighting, cinematic but authentic,
Readex Pro Arabic typography throughout

Post caption: أول يوم بالرحلة وانصبت بالتاكسي؟ مو لازم. الزبدة تعطيك السعر الحقيقي قبل لا تطلع من المطار 🚕💸
```

### Image Prompt

```text
premium travel warning poster, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream text, RTL:
"٥٠ يورو؟ المفروض ١٥."
subheadline in Readex Pro 400:
"الزبدة تقولك السعر الحقيقي قبل لا تركب."

CENTER: split visual —
LEFT: airport taxi stand at night, suspicious taxi driver, red warning atmosphere,
price board floating: "٥٠ يورو"
RIGHT: iPhone showing الزبدة transfer price card:
"المطار → الفندق: ١٥–١٨ يورو"
warning note: "تجنب التاكسي خارج الصالة"
teal (#0E7C7B) accents on cream cards,
small amber alert icon beside misleading fare,

BOTTOM: CTA button:
"خطط رحلتك صح"
الزبدة logo centered below,
dark green (#1d3b2c) premium background,
trust-building high-contrast travel safety creative, 8k
```

---

## Ad 14 — "حلال مضروب" (Fake Halal)

**Type:** Video (15s) + Static (1080x1350)  
**Angle:** The #1 Saudi travel anxiety — "هل الأكل فعلاً حلال؟"  
**Target persona:** عائلة سعودية تسافر وتبي تاكل بضمير مرتاح

**Script:**
> المطعم كاتب "حلال" على الباب.  
> بس هل فعلاً حلال؟  
> ولا بس عشان يجذب السياح؟  
> الزبدة تحقّقت لك — ما نكتب "حلال" إلا إذا متأكدين.

**CTA:** اكتشف المطاعم الحلال

**Features shown:** 5-level halal badge system, halal verification notes, restaurant AI gists with halal status

**Caption:**
> كلمة "حلال" على الباب ما تكفي. الزبدة تعطيك تصنيف حلال حقيقي — مو مجاملة 🥩✅

### Video Prompt

```text
vertical 9:16 video, 15 seconds, emotional + informative,

SCENE 1 (0–4s): close-up of restaurant storefront with "HALAL" sign,
camera zooms in — sign looks cheap, handwritten, suspicious,
text overlay (Readex Pro, bold): "المطعم كاتب حلال على الباب."
second line: "بس هل فعلاً حلال؟"

SCENE 2 (4–7s): Saudi family hesitating at restaurant entrance,
father looking at phone, mother holding child's hand,
text overlay: "ولا بس عشان يجذب السياح؟"
amber (#D4A017) warning tint,

SCENE 3 (7–11s): opens الزبدة app, restaurant card shows:
5-level halal badge (green ✅ "حلال موثق — شهادة رسمية"),
AI gist: "لحوم حلال مستوردة من البرازيل، مطبخ منفصل"
teal (#0E7C7B) accents, cream (#FDFBF7) card,
text overlay: "الزبدة تحقّقت لك."

SCENE 4 (11–13s): same family now eating happily inside restaurant,
warm golden lighting, authentic food on table,

END (13–15s): dark green (#1d3b2c) background,
text (Readex Pro): "ما نكتب حلال إلا إذا متأكدين."
الزبدة logo, CTA button: "اكتشف المطاعم الحلال" in teal,

warm restaurant lighting, family-friendly vibe,
Readex Pro Arabic typography throughout

Post caption: كلمة "حلال" على الباب ما تكفي. الزبدة تعطيك تصنيف حلال حقيقي — مو مجاملة 🥩✅
```

### Image Prompt

```text
premium halal verification poster, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream text, RTL:
"كلمة حلال ما تكفي."
subheadline in Readex Pro 400:
"الزبدة ما تكتب حلال إلا إذا متأكدين."

CENTER: restaurant storefront with questionable "HALAL" sign slightly blurred in background,
foreground iPhone displays الزبدة restaurant card with verified halal badge system:
green badge: "حلال موثق — شهادة رسمية"
supporting note: "مطبخ منفصل / مورد لحوم موثق"
AI gist line visible in Arabic,
teal (#0E7C7B) and green accents on cream card,
subtle amber warning icon referencing fake labels,

BOTTOM: CTA button:
"اكتشف المطاعم الحلال"
الزبدة logo below,
dark green (#1d3b2c) frame,
family-safe premium travel app aesthetic, 8k
```

---

## Ad 15 — "المطعم السياحي" (Tourist Trap Restaurant)

**Type:** Video (12s) + Static (1080x1350)  
**Angle:** You paid 3x for mediocre food because Google said 4.5 stars  
**Target persona:** سلطان يسافر ويبي يجرب أكل محلي حقيقي

**Script:**
> ٤.٥ نجوم على قوقل.  
> دفعت ثلاث أضعاف.  
> والأكل؟ عادي.  
> التقييم كان من سيّاح — مو من أهل البلد.  
> الزبدة تعطيك رأي صريح — بدون مجاملة.

**CTA:** اكتشف الأماكن الحقيقية

**Features shown:** Z-Score (honest rating), AI gist with pros/cons, "tourist trap" warning badges, local vs tourist review analysis

**Caption:**
> ٤.٥ نجوم ومطعم سياحي والأكل عادي؟ كلنا مرينا فيها. الزبدة تقولك الصدق — من أول 💯🍽️

### Video Prompt

```text
vertical 9:16 video, 12 seconds, relatable + honest,

SCENE 1 (0–3s): phone screen showing Google Maps restaurant with 4.5 stars,
thumb taps it excitedly,
cut to: mediocre plate of food, high price on receipt,
text overlay (Readex Pro, bold): "٤.٥ نجوم. دفعت ثلاث أضعاف. والأكل؟ عادي."

SCENE 2 (3–6s): frustrated expression, looking at phone bill,
text overlay: "التقييم كان من سيّاح — مو من أهل البلد."
red tint on Google rating,

SCENE 3 (6–10s): opens الزبدة app, same area shows different restaurant,
AI gist card: "مطعم محلي، الأسعار معقولة، المنسف أفضل شي 👌"
warning badge on tourist trap: "⚠️ أسعار مبالغ فيها للسياح"
Z-Score badge showing honest rating,
teal (#0E7C7B) positive highlight vs amber warning,

END (10–12s): dark green (#1d3b2c) background,
text (Readex Pro): "الزبدة تعطيك رأي صريح — بدون مجاملة."
الزبدة logo, CTA button: "اكتشف الأماكن الحقيقية" in teal,

restaurant atmosphere, warm but contrasting lighting between scenes,
Readex Pro Arabic typography throughout

Post caption: ٤.٥ نجوم ومطعم سياحي والأكل عادي؟ كلنا مرينا فيها. الزبدة تقولك الصدق — من أول 💯🍽️
```

### Image Prompt

```text
premium travel food truth poster, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream text, RTL:
"٤.٥ نجوم… والأكل عادي."
subheadline in Readex Pro 400:
"الزبدة تعطيك رأي صريح — بدون مجاملة."

CENTER: comparison composition,
LEFT: tourist-trap restaurant plate, inflated bill receipt, glowing Google-style 4.5 stars above,
slightly harsh lighting, red/amber caution tone,
RIGHT: iPhone showing الزبدة place card with:
Z-Score badge,
warning tag: "أسعار مبالغ فيها للسياح"
alternative local restaurant card below with positive gist:
"مطعم محلي، الأسعار معقولة، المنسف أفضل شي 👌"
teal highlights and cream cards,

BOTTOM: CTA button:
"اكتشف الأماكن الحقيقية"
الزبدة logo below,
dark green (#1d3b2c) background,
honest premium editorial ad style, 8k
```

---

## Ad 16 — "صاحبك اللي سافر" (Your Friend Who Traveled)

**Type:** Static (1080x1350) + Video (10–12s)  
**Angle:** الزبدة = صاحبك اللي سبقك وسافر وجرّب وقالك الصدق  
**Target persona:** أي سعودي يخطط لرحلة ويبي نصيحة صادقة

**Headline:** صاحبك اللي سافر قبلك؟ هذي الزبدة.  
**Sub:** تحذيرات حقيقية. أماكن مجرّبة. بدون نصب.  
**CTA:** خطط رحلتك مع الزبدة

**Features shown:** Scam warnings, honest AI gists, halal badges, transfer prices, tourist trap alerts

**Caption:**
> الزبدة مو تطبيق سياحي عادي. الزبدة = صاحبك اللي سبقك وسافر وقالك وش تسوي ووش تتجنب. بدون مجاملة 🤝✈️

### Image Prompt

```text
premium minimalist advertisement, 1080x1350 (4:5 vertical),

TOP: headline in Playfair Display 800, cream (#FDFBF7) text, RTL:
"صاحبك اللي سافر قبلك؟ هذي الزبدة."
subheadline in Readex Pro 400:
"تحذيرات حقيقية. أماكن مجرّبة. بدون نصب."

CENTER: iPhone displaying الزبدة app with 3 stacked notification-style cards:
  Card 1 (amber): "⚠️ التاكسي من المطار — السعر الحقيقي ١٥ يورو مو ٥٠"
  Card 2 (green): "✅ مطعم حلال موثق — شهادة رسمية"
  Card 3 (teal): "💡 زبدة المكان: محلي، أسعار معقولة، تجنب الجلسات الخارجية"
cards on cream (#FDFBF7) background with teal (#0E7C7B) accents,
soft shadow on phone,

BOTTOM: CTA button — teal (#0E7C7B) background, cream text, rounded:
"خطط رحلتك مع الزبدة"
الزبدة logo + "الزبدة" text centered below,

dark green (#1d3b2c) background,
warm trust-building aesthetic, 8k

Post caption: الزبدة مو تطبيق سياحي عادي. الزبدة = صاحبك اللي سبقك وسافر وقالك وش تسوي ووش تتجنب. بدون مجاملة 🤝✈️
```

### Video Prompt

```text
vertical 9:16 video, 10–12 seconds, warm trusted-friend social ad,

SCENE 1 (0–3s): Saudi traveler packing suitcase at home,
friend sends voice note style message on phone,
text overlay (Readex Pro): "صاحبك اللي سافر قبلك؟"

SCENE 2 (3–6s): quick montage of travel risks:
airport taxi, fake halal sign, tourist-trap menu prices,
each scene freezes briefly with warning overlays,

SCENE 3 (6–9s): phone opens الزبدة app,
stacked cards appear one by one:
"السعر الحقيقي من المطار"
"مطعم حلال موثق"
"تجنب المكان السياحي هذا"
text overlay: "هذي الزبدة."

END (9–12s): dark green (#1d3b2c) background,
headline centered: "تحذيرات حقيقية. أماكن مجرّبة. بدون نصب."
CTA button: "خطط رحلتك مع الزبدة" in teal,
الزبدة logo centered,
warm home-to-travel color transition, trustworthy Saudi friend vibe
```

---

# Cross-Reference: Ready Assets

| Ad | Has Claude-Style Static? | Source |
|----|-------------------------|--------|
| Ad 1 (Google Confusion) | No — video only | Needs production |
| Ad 2 (Locate Me) | No — screen demo | Record from real app |
| Ad 3 (Z-Score) | Partial — H7–H10 show real places | `zbdh-claude-style-v2.html` |
| Ad 6 (Riyadh Static) | Yes — H7, H8, H9, H10 | `zbdh-claude-style-v2.html` |
| Ad 7 (Vietnam) | No | Needs AI generation |
| Ad 8 (Istanbul) | Yes — H1 | `zbdh-claude-style-v2.html` |
| Ad 10 (Before/After) | No — video | Needs production |
| Ad 11 (AI Companion) | No — screen demo | Record from real app |
| Ad 12 (Premium Minimal) | Partial — similar to H1–H6 style | `zbdh-claude-style-v2.html` |
| Ad 13 (Taxi Trap) | No — video | Needs production |
| Ad 14 (Fake Halal) | No — video | Needs production |
| Ad 15 (Tourist Trap Restaurant) | No — video | Needs production |
| Ad 16 (صاحبك اللي سافر) | No | Needs AI generation |

---

# Brand Guidelines for All Ads

| Element | Value |
|---------|-------|
| **Primary color** | Teal `#0E7C7B` |
| **Background** | Dark green `#1d3b2c` (page bg) / Cream `#FDFBF7` (cards) |
| **Headline font** | Playfair Display 800 |
| **Body font** | Readex Pro 400–600 |
| **Logo** | `apps/ads/zbdh-logo-color.svg` + "الزبدة" text |
| **CTA button** | Teal bg, cream text, rounded-lg |
| **Tone** | Saudi dialect, casual, honest. No corporate. No فصحى. |
| **Direction** | RTL. All Arabic text right-aligned. |

---

# Budget Split

| Allocation | % | Rationale |
|------------|---|-----------|
| Riyadh Map | 60% | Local engagement lowers CAC, higher retention, daily use habit |
| Travel Mode | 30% | Higher virality potential, aspirational content, broader reach |
| Scam Awareness | 10% | High relatability, trust-building, strong retargeting for conversion |

---

*Aligned with: `mvp-launch-social-ads.md` (full campaign), `ad-framework.md` (brand voice)*  
*Static assets: `apps/ads/zbdh-claude-style-v2.html` (10 ready-to-export 1080x1350 cards)*
