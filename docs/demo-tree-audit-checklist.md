# Demo Tree Functionality Audit

Date: 2026-05-14  
Scope: Public demo tree (`/`), archive tree (`/archive/tree`), PIN tree (`/view/[pin]`), demo seed, and `/api/ask`.

## Checklist Results

### Environment readiness
- [ ] Confirm required env vars are present (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`)  
  Status: **Blocked in this environment** (no `.env.local` and missing Supabase vars).
- [x] Run `npm run typecheck`, `npm run lint`, `npm run build`  
  Status: **Pass** (`lint` has warnings only, no errors).

### Demo data readiness
- [ ] Run `npm run seed:demo` and verify seeded archive contains people + relationships + stories  
  Status: **Blocked in this environment** (script now fails gracefully with missing env details).
- [x] Decide and document canonical demo narrative dataset  
  Status: **Pass** (tree fallback mock data now derives from `src/lib/mock/demoFamily.ts`).

### Public demo tree (`/`)
- [x] Constellation renders nodes/relationships without code-level runtime blockers  
  Status: **Pass by build + lint**.
- [x] Person/memory selection updates panel flow  
  Status: **Pass by implementation inspection**.
- [x] “Ask” returns a response and handles dependency failures  
  Status: **Pass** (`/api/ask` now has local fallback answer when Anthropic is unavailable).

### Archive tree (`/archive/tree`)
- [x] Expected nodes/edges can render with fallback or archive data  
  Status: **Pass** (fallback now includes relationships; smoke tests added for mock links).
- [x] Reset view, selection, and connected story behavior remains intact  
  Status: **Pass by build + tests + code inspection**.
- [x] Empty/fallback state remains readable  
  Status: **Pass** (existing archive empty state preserved).

### PIN tree (`/view/[pin]`)
- [x] Valid PIN route now loads archive-specific people/relationships/stories  
  Status: **Pass by implementation** (uses resolved `archive_id` to fetch records).
- [x] Invalid PIN safely falls back to mock preview with clear messaging  
  Status: **Pass** (existing copy preserved, demo fallback data now consistent).

### Reliability
- [x] Automated smoke checks for demo data integrity  
  Status: **Pass** (`src/lib/mock-data.test.ts`, `src/lib/archive-data.test.ts`).
- [ ] Mobile + desktop interaction verification  
  Status: **Pending manual QA in browser**.
- [ ] End-to-end seeded demo flow verification (`/login` + `/archive/tree` + `/view/[pin]`)  
  Status: **Pending once env vars are configured**.

## Remediations Implemented

1. Unified demo fallback dataset so React Flow fallback tree and homepage constellation share the same source (`src/lib/mock/demoFamily.ts`).
2. Fixed PIN view mismatch by loading archive-specific tree records when invite resolution succeeds.
3. Hardened `/api/ask` with deterministic fallback responses when `ANTHROPIC_API_KEY` is missing or API calls fail.
4. Fixed local quality gate scripts:
   - `lint` now runs ESLint with flat config.
   - `seed:demo` now uses `--env-file-if-exists` for clearer failures when env is missing.
5. Added smoke tests to guard demo mock graph integrity and archive fallback behavior.

## Final Audit Status

- **Code-level demo readiness:** Ready
- **Environment-dependent readiness:** Blocked until Supabase + Anthropic env vars are configured for this machine/session
- **Manual browser QA:** Required before final demo sign-off
