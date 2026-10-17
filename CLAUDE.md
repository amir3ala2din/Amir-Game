@AGENTS.md

# Amir Tutor UI

Bilingual (EN/AR, RTL-aware) English quiz game for Algerian students (grades 3AP–3AS) and CEFR levels A1–B2. Next.js 16 App Router + React 19 + TypeScript (strict) + Tailwind 4 + TanStack Query. Path alias `@/*` → repo root. Ported from the single-file `TutorApp.js` of the Amir-Game repo; behaviour is identical (verified topic-by-topic, game-by-game).

## Data: Supabase (project `amir-tutor`, ref `qcuwozhzaukpjqsrfjgw`, eu-west-3) with a mock mode

Everything the app reads or writes goes through a handler in `query/apis/*.api.ts`. `NEXT_PUBLIC_MOCK=true` (from `@/utils`) serves content from `mock/` and progress from localStorage; `false` uses Supabase (`.env`: URL + publishable key only, never a service key in a `NEXT_PUBLIC_` var).

- **Content** (read-only for the app, RLS = public select): ~27 tables, read in one call by the `get_content()` SQL function, which returns the `Content` document of `types/content.types.ts`. Edit rows in Supabase, or edit `mock/` and re-seed (`npm run seed`, needs `SUPABASE_KEY` = service role; it does not delete). `npm run verify:content` checks the DB against `mock/`.
- **Progress** (per user, RLS = own rows): `game_best` (via `save_best()` keeping the max), `missed_words`, `user_prefs`. Users sign in anonymously on first use (`ensureUser` in `utils/supabase.utils.ts`); if anonymous sign-ins are disabled in the project, progress falls back to localStorage (same keys as the original app).
- Schema lives in `supabase/migrations/` (mirrors what was applied through the MCP). Keep the mock branch working when changing a handler.

## Where things are

| Path | What |
|---|---|
| `types/content.types.ts` | `Content` and every data shape (the future DB schema). `game.types.ts`: questions, games, topics. |
| `mock/*.mock.ts` | Typed content, assembled in `mock/index.ts`; source for `npm run seed`. |
| `lib/content.ts` | Module-level store (`content`, `derived`). `ContentGate` loads content via `useContent()` and calls `setContent` before any screen renders. Generators read it synchronously. |
| `lib/generators/*` | Question generators (`vocab`, `grammar`, `banks`, `practice`); each returns `() => Question[]`. |
| `lib/topics.ts` | Wires generators into games/topics per grade (`topicsFor`, `gradesOf`, `mistakesTopic`). Game/topic **ids are stored in `ta_best`** — don't rename them. |
| `lib/session.ts` | `session.grade` = grade being played (module-level on purpose; `F`, `gradeWords` consumers read it). |
| `app/page-client.tsx` | Screen state machine: home → path → level → kind → pos → topic → hub → play → result. |
| `sections/*.section.tsx` | One component per screen, presentational. |
| `query/queries/` | `useContent`, `useProgress` (queries) and `useProgressMutations`. |

## Rules

- Every learner-facing string has an English + Arabic pair; keep both.
- `npm run build` and `npm run lint` must pass before finishing.
- Next.js here is newer than training data: check `node_modules/next/dist/docs/` before using Next APIs.
