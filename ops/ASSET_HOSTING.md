# Asset Hosting

## Preferred Host

Use Cloudflare R2 through the existing owned CDN:

`https://images.alzbdh.com`

Suggested path convention:

`marketing/social/YYYY-MM/<vertical>/<slug>/<platform>.png`

Example:

`https://images.alzbdh.com/marketing/social/2026-06/places/earth-cafe/x.png`

## Why

Buffer requires media URLs to be publicly accessible at publish time. Temporary
hosts can expire or block fetches, which causes platform publishing failures,
especially on X.

## Avoid

- Temporary file hosts.
- Private URLs.
- Local filesystem paths.
- Vercel static assets for scheduled posts unless a deploy has already completed.
