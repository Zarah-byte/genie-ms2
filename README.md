# Genie

A private family archive MVP called Genie, for preserving family trees, stories, photographs, recipes, migrations, letters, relationships, and unknown history with care.

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
