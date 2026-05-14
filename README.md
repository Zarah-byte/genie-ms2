# Genie

Genie is a private family archive MVP for preserving family trees, stories, photographs, recipes, migrations, letters, relationships, and unknown history with care.

## Getting Started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Copy your project URL and publishable key into `.env.local`.
3. Generate `INVITE_CODE_PEPPER` with:

```bash
openssl rand -base64 32
```

4. Run the SQL in `supabase/migrations/0001_initial_schema.sql` in Supabase SQL Editor or through the Supabase CLI.
5. Create a private storage bucket named `archive-media`.

## Demo Account Seed

Use this for critiques, presentations, and portfolio demos with real backend-authenticated data.

1. Ensure these env vars are set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only, never client-side)
   - `INVITE_CODE_PEPPER`
2. Run:

```bash
npm run seed:demo
```

What the script does:
- Creates or updates auth user `demo@genie.local` with password `DemoFamily2026!`.
- Ensures profile + owner archive + owner membership exist.
- Creates/reuses family PIN `FAMILY-DEMO-2026` (stored hashed in DB, not raw).
- Seeds a multi-generation family dataset (people, relationships, stories, story-person links, and media placeholders).
- Runs idempotently: re-running updates records and avoids duplicate link rows.

Demo login:
- Email: `demo@genie.local`
- Password: `DemoFamily2026!`
- Family PIN (for `/join`): `FAMILY-DEMO-2026`

## MVP Routes

- `/` public marketing site with explorable fake family tree.
- `/login` and `/signup` Supabase Auth screens.
- `/onboarding`, `/onboarding/archive`, `/onboarding/pin` owner setup flow.
- `/archive` protected archive home.
- `/archive/tree`, `/archive/people`, `/archive/stories`, `/archive/media`, `/archive/settings`.
- `/view/[pin]` read-only PIN viewer entry.
- `/join` form for entering a PIN.

## Security Shape

- Browser clients use only the public Supabase URL and publishable/anon key.
- Invite PIN generation and hashing happens in server actions.
- RLS policies enforce owner editing and member/viewer reading.
- Storage paths are expected to begin with `archive_id/`.

## Deployment Checklist

- Add Supabase env vars in Vercel.
- Set Supabase Auth site URL to the Vercel production URL.
- Add local and production redirect URLs for `/auth/confirm`.
- Confirm RLS is enabled on all public tables.
- Confirm `archive-media` bucket policies are installed.
- Run `npm run typecheck` and `npm run build`.
