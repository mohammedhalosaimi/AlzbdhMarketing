# Rendered ad cards (Track-D static assets)

1080×1350 PNGs exported from `apps/ads/zbdh-claude-style-v2.html` (the "Claude-style" ready ad set) — **postable as-is**, no AI generation needed. These are the fastest-to-live statics in the matrix (`social-post-generation-matrix.md` §4, Track D).

Re-export with `apps/etl/marketing/export_ad_cards.py` (see its header).

| File | Headline | Maps to | Status |
|---|---|---|---|
| `zbdh-ad-H1.png` | رحلة العيلة؟ خلّها علينا. | **Ad 8** (Istanbul / family travel) | ✅ ready |
| `zbdh-ad-H2.png` | أول رحلة لحالك؟ ما تحتاج تفكّر. | Travel — solo | ✅ ready |
| `zbdh-ad-H3.png` | شهر العسل؟ يبي له ترتيب. | Travel — honeymoon | ✅ ready |
| `zbdh-ad-H4.png` | جوعان وبرّا؟ حلال قريب. | Travel — nearby halal | ✅ ready |
| `zbdh-ad-H5.png` | رحلة مع الربع؟ خطة وحدة تكفي. | Travel — group | ✅ ready |
| `zbdh-ad-H6.png` | لندن مع الأطفال؟ فاهمينك. | Travel — London w/ kids | ✅ ready |
| `zbdh-ad-H9.png` | الويكند وصل وبعدك بالبيت؟ | **Ad 6** (Riyadh — سيركولو) | ✅ ready |
| ~~H7~~ (بروز كافيه) | وش أحسن كافيه قريب مني؟ | **Ad 6/3** (Riyadh) | ⛔ not exported — dead photo URL → **ZBDH-585** |
| ~~H8~~ (ماما نوره) | عشاء العيلة وين الليلة؟ | **Ad 6** (Riyadh) | ⛔ not exported — dead photo URL → **ZBDH-585** |
| ~~H10~~ (كانديرا) | مكان رومانسي بدون بحث؟ | **Ad 6/3** (Riyadh) | ⛔ not exported — dead photo URL → **ZBDH-585** |

**Why 7 of 10:** the three Riyadh Local cards point their `<img>` at the retired `zbdh-images.s3.me-south-1.amazonaws.com/elite_places/…` bucket (migrated to `images.alzbdh.com`), so the place photo 404s. Fix tracked in **ZBDH-585**; once the HTML `src`s are swapped, re-run the exporter to add H7/H8/H10.

> Numerals note: the prompt-bar text in this HTML uses Arabic-Indic digits (`٥ أيام`). For new/edited cards, normalize to Western 0–9 per the brand rule (`../README.md` / `../social-post-template.md` §1).
