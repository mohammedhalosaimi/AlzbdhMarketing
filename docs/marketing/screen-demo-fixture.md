# Screen-Demo Fixture — scope (ZBDH-582)

What to seed so the **real-app screen-demo reels** (`screen-demo-capture-plan.md`, Track C: Ads 2/4/11 + wizard/halal/during-trip) film against stable, populated UI — no empty states, no AI mockups.

**Verified against the DB (2026-06-05):** most flows render today, but two gaps must be seeded:
- **`user_trips` is empty (0 docs)** → the during-trip Today / Nearby-halal screens render blank. **This is the blocker.**
- Favorites + a consistent Istanbul itinerary should be pinned to one demo account so takes are repeatable.

**Environment:** seed and film against **dev** (`api-dev.alzbdh.com` / the dev DB), not prod. Don't write demo data to the production cluster.

---

## 1. The demo account (login)

Users are phone-auth (`users` collection, keyed by `phone_number`). Two options:

- **Recommended — reuse the Apple-review OTP bypass:** `+966500846946` with OTP `0101` (intentional, never removed — it's the App Store review bypass). No new credentials, instant login for capture.
- Or a dedicated demo phone (e.g. `+966500000001`) with a known OTP in dev.

Pin all fixture data below to that account's `user_id`.

---

## 2. What to seed (per the capture plan's flows)

| # | Fixture | Collection | Key fields | Renders | Status |
|---|---|---|---|---|---|
| 1 | **Demo user** | `users` | `phone_number`, `_id`/`user_id`, `created_at` | login for capture | ✅ exists / reuse bypass |
| 2 | **4 saved favorites** | profile favorites (`/v1/auth/me/favorites`) | 4 Riyadh `place_id`s | Ad 4 Favorites list | ⚠️ seed |
| 3 | **Istanbul itinerary** | `itineraries` | `user_id`, `destination=istanbul`, `days[]` (halal badges, gists), `status` | Ad 11/wizard + halal demo | ✅ exists (416 itineraries) — pin one to the demo user |
| 4 | **Active trip** | `user_trips` (**empty**) | `user_id`, `itinerary_id`, `status=active`, `start_date`/`end_date` spanning today, `current_day` | during-trip Today + Nearby (C4) | ⛔ **must create** |
| 5 | *(optional)* check-ins | `activity_checkins` | `user_trip_id`, a couple done | Today timeline progress | optional polish |

**Riyadh place cards** (Ad 2/3, place detail, gists/Z-Score) already render from `travel_cafes/restaurants` — no seed needed; just use the stable top places from `content-pipeline.json` so cards match across takes.

---

## 3. Seed approach

A small idempotent script (skeleton committed at `apps/etl/marketing/seed_demo_fixture.py`) that, against the **dev** DB:
1. ensures the demo `users` doc (or reuses the bypass account) → `user_id`;
2. sets 4 Riyadh `place_id` favorites on the profile;
3. finds an Istanbul family itinerary in `itineraries` (or generates one via the wizard) and sets its `user_id` to the demo user;
4. **creates the missing `user_trips` doc** (`status=active`, dates spanning today, linked `itinerary_id`) so during-trip renders;
5. (optional) inserts a couple `activity_checkins`.

It defaults to **`--dry-run`** and must be pointed at dev explicitly — never run blind against prod.

---

## 4. Done when

- The demo account logs in on dev and shows: 4 favorites, the Istanbul itinerary (halal badges + gists + pre-flight), and a **live during-trip Today view + Nearby-halal** (because an active `user_trips` exists).
- `screen-demo-capture-plan.md` F8/C4 (during-trip) can be filmed end-to-end.
- The seed is documented/repeatable (script + the place_ids + itinerary_id used).
- Any flow still rendering empty after seeding is flagged back to the capture plan to drop/substitute.

---

*Pairs with: `screen-demo-capture-plan.md` (ZBDH-579). Scope only — seeding runs against dev when capture is scheduled.*
