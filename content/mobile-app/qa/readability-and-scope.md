# Mobile App Creative QA

Date: 2026-06-13

## Source Scope

- Main website: `https://alzbdh.com/`
- iOS App Store: `https://apps.apple.com/sa/app/alzbdh/id6741608525`
- User-confirmed app scope: iOS only, Riyadh only, coffee shops, restaurants, clinics, and chat.
- User-confirmed app name in Arabic: `الزبدة` (not `زبدة`).
- Replacement Arabic screenshots:
  - `/Users/mohammed/Desktop/Software_Projects/Alzbdh/Screenshots for Ads/IMG_8929.PNG` for chat.
  - `/Users/mohammed/Desktop/Software_Projects/Alzbdh/Screenshots for Ads/IMG_8936.PNG` for map/local discovery.
  - `/Users/mohammed/Desktop/Software_Projects/Alzbdh/Screenshots for Ads/IMG_8930.PNG` for place detail/review summary.

## Visual QA

- Changa font is used from the local marketing assets.
- White Zbdh logo appears on every image.
- `alzbdh.com` and `app.alzbdh.com` appear on every image.
- Arabic text is centered/aligned and does not overlap after the second render pass.
- Phone mockup uses Arabic in-app screenshots supplied by the user.
- CTA language is accurate: iOS/App Store only.
- The three mobile-app concepts use distinct visual treatments: chat-first, map-first, and place-detail-first, so the batch does not feel like one repeated AI template.

## Content QA

- No claim says the mobile app covers all cities.
- No claim says the mobile app includes travel, perfumes, or offers.
- The verticals are limited to restaurants, coffee shops, and clinics.
- Chat is framed as a decision helper, not as guaranteed booking or medical advice.
- Arabic screenshots are used because the target segment is Arabic speakers.
- Captions and hashtags use `الزبدة` / `#تطبيق_الزبدة` consistently.

## Fixes Applied

- Reduced Instagram phone mockup height after the first pass clipped the lower chat bubble.
- Moved X chat bubbles inside the phone safe area after the first pass placed them too close to the left edge.
- Replaced App Store screenshot creatives with Arabic app screenshots on 2026-06-13.
- Cropped the provided screenshots before embedding to remove the TestFlight/status-bar area from the ad mockups.
- Corrected Arabic brand usage from `زبدة` to `الزبدة` across image copy, captions, hashtags, Buffer-scheduled copy, and local logs.
