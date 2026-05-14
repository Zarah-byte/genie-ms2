# Genie Agent Notes

This project is Genie: a Major Studio Capstone MVP for a private family archive website.

## Product Intent

- Use the product name `Genie` everywhere in user-facing product, metadata, documentation, and deployment copy.
- Build a quiet, warm, memory-based archive experience.
- Avoid generic SaaS/dashboard styling.
- Keep public demo data fake and clearly separate from private archive data.
- Treat incomplete family history gently and without shame.
- The public landing page should feel like an archival constellation map, not a SaaS dashboard.
- Use the supplied Genie SVG assets from `public/genie-logo.svg`, `public/icons/arrow-right.svg`, and `public/icons/explore.svg` for brand and primary marketing controls.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Storage
- React Flow for family tree visualization
- Zod for validation
- Vercel deployment

## Security Rules

- Never expose service role keys.
- Use only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in browser code.
- Keep invite/PIN creation and hashing server-side.
- Enable RLS on every public table.
- Every archive-owned table row must include `archive_id`.
- Every owner-editable action must verify ownership through RLS and server-side auth.

## Frontend Rules

- Keep the marketing page responsive across mobile, tablet, laptop, and desktop breakpoints.
- Use `Ovo` for expressive display/heading text and `Mulish` for body/UI text.
- Keep letter spacing neutral unless a specific asset requires otherwise.
- Preserve full-viewport marketing behavior: intro panel open first, Explore mode hides the panel and centers the constellation.
- Do not connect the marketing demo to real Supabase data; it must use mock data only.
