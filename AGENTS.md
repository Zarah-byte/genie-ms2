# Agent Notes

This project is a Major Studio Capstone MVP for a private family archive website.

## Product Intent

- Build a quiet, warm, memory-based archive experience.
- Avoid generic SaaS/dashboard styling.
- Keep public demo data fake and clearly separate from private archive data.
- Treat incomplete family history gently and without shame.

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
