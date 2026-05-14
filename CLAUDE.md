# Claude/Codex Project Guide

This is not a generic dashboard. It is a private family archive for preserving people, stories, photos, recipes, migrations, relationships, and missing information with care.

## Design Direction

- Warm neutral backgrounds, deep brown/black text, soft borders, generous spacing.
- Expressive headings, readable body text, quiet cards.
- Mobile-first, accessible, semantic HTML.
- Prefer clarity and intimacy over dense admin UI.

## Implementation Notes

- Public marketing pages may use mock people/stories/images.
- Private archive pages should be Supabase-ready and work with RLS.
- PIN access is read-only and is not a replacement for owner authentication.
- Do not hard-code secrets or move sensitive logic to the browser.
