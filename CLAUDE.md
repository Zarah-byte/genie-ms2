# Genie Claude/Codex Project Guide

This project is Genie. It is not a generic dashboard. It is a private family archive for preserving people, stories, photos, recipes, migrations, relationships, and missing information with care.

Use `Genie` as the product name everywhere: app metadata, README copy, onboarding/auth surfaces, marketing content, and deployment language.

## Design Direction

- Warm neutral backgrounds, deep brown/black text, soft borders, generous spacing.
- Expressive headings, readable body text, quiet cards.
- Mobile-first, accessible, semantic HTML.
- Prefer clarity and intimacy over dense admin UI.
- The public landing page should feel like an emotional archival constellation map.
- Maintain responsive behavior across phone, tablet, laptop, and desktop widths.
- Use the supplied Genie SVG files for the logo and marketing control icons.

## Implementation Notes

- Public marketing pages may use mock people/stories/images.
- Private archive pages should be Supabase-ready and work with RLS.
- PIN access is read-only and is not a replacement for owner authentication.
- Do not hard-code secrets or move sensitive logic to the browser.
- Supabase service role keys must never be exposed to the browser.
- Marketing demo data must stay mock-only until a real authenticated archive flow is used.
