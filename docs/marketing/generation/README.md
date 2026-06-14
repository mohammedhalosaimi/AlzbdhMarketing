# Content Pipeline — generation-ready posts (ZBDH-584)

**One file, real data, any tool.** This folder holds the social content generated from the live travel DB + the 16 MVP concept ads, in a single tool-agnostic feed you can hand to Nano Banana / Gemini, DALL·E, Midjourney, Sora, or an API loop.

| File | Use |
|---|---|
| **`content-pipeline.json`** | machine-readable — loop over `posts[]` with an image/video API |
| **`content-pipeline.md`** | human-readable mirror — skim, copy a post, paste into a generator |
| `../../../apps/etl/marketing/build_content_pipeline.py` | the engine — re-run to refresh |

## What's in it (48 posts)

| type | n | source | the visual |
|---|---|---|---|
| `local_standout` | 30 | real Riyadh places (cafes/restaurants/attractions) | **real photo** + branded overlay |
| `halal_find` | 6 | real verified-halal restaurants (halal is the hook) | **real photo** + halal badge |
| `travel_famous` | 10 | destination highlights (آيا صوفيا، البازار…) | generate / hero photo |
| `travel_tip` | 10 | real attraction gist + tips | generate / attraction photo |
| `scam_avoid` | 10 | real `honest_warnings_ar` + real transfer `price_sar` | generate (trust card) |
| `concept_ad` | 16 | `MVPAdLaunchPlan.md` (prompts inlined) | generate |

Plus 7 **ready-to-post PNGs** already rendered in [`assets/`](assets/) (Track-D static cards — no generation needed). Counts grow when you bump the tunables and re-run.

Every real-data post embeds **only real DB text** — honest gists, real Z-Score, real prices — so the marketing is true to the product (passes the claim ledger in [`../README.md`](../README.md) §3).

## Each post (schema)

```json
{
  "id": "riyadh-standout-cafe-01",
  "type": "local_standout",
  "campaign": "Riyadh Map",
  "subject": { "name_ar": "...", "area_ar": "حي بدر", "z_score": 9.7, "halal": "حلال معتمد", "avg_cost_sar": 75 },
  "hook_ar": "...",
  "caption": { "instagram": "...", "tiktok": "...", "x": "..." },
  "hashtags": ["#الزبدة", "#الرياض", "#زبدة_المكان"],
  "cta_ar": "اكتشف أماكن الرياض",
  "source_image": "https://images.alzbdh.com/.../main.jpg",
  "image_prompt": "Using the attached real photo of … compose a 1080x1350 card …",
  "video_prompt": "",
  "claims": "✅ real Z-Score + زبده gist from the app DB",
  "source": { "collection": "travel_cafes", "id": "...", "z_score": 9.7 }
}
```

## How to generate

**Static image — Nano Banana / Gemini (best for real-place posts):** it edits images, so feed **`source_image`** as the base + **`image_prompt`** as the instruction → it composes the branded card around the real photo (real photo + cream card + Arabic gist + Z-Score/halal badges). For posts with no `source_image` (scams, some travel), `image_prompt` is a from-scratch generation prompt.

**Static image — DALL·E / Midjourney:** use **`image_prompt`** directly (these don't take a base photo as reliably; for real-place posts, generate the card and drop the real photo in, or use the brand HTML exports).

**Video — Sora / video API:** use **`video_prompt`** where present (travel + concept ads).

**Then post:** the `caption` for that platform + `hashtags` + `cta_ar`.

> ⚠️ **Arabic text caveat:** image models often garble RTL Arabic. Either (a) generate the visual without the Arabic and overlay the exact `caption`/`hook_ar` text yourself in Readex Pro, or (b) generate with text and regenerate if it's mangled. Brand rules: [`../social-post-template.md`](../social-post-template.md) §4.

### API loop (sketch)
```python
import json
posts = json.load(open("content-pipeline.json"))["posts"]
for p in posts:
    img = generate_image(prompt=p["image_prompt"], base_image=p.get("source_image"))  # Nano Banana / Gemini
    schedule(image=img, caption=p["caption"]["instagram"], hashtags=p["hashtags"])
```

## Re-run / refresh (as the DB grows)

```bash
python3 apps/etl/marketing/build_content_pipeline.py
```
Reads `MONGODB_URI` / `MONGODB_DB_NAME` from `apps/api/.env` (gitignored — never hardcoded). Tune counts / featured destinations at the top of the script (`N_CAFES`, `FEATURE_DESTS`, `SCAM_DESTS`).

*Owner: Marketing · ZBDH-584 · real data + concept ads, one feed.*
