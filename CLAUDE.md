@AGENTS.md

# Amir Tutor UI

Bilingual (EN/AR, RTL-aware) English quiz game for Algerian students (grades 3AP–3AS) and CEFR levels A1–B2. Next.js 16 App Router + React 19 + TypeScript (strict) + Tailwind 4 + TanStack Query. Path alias `@/*` → repo root. Ported from the single-file `TutorApp.js` of the Amir-Game repo; behaviour is identical (verified topic-by-topic, game-by-game).

## Current phase: mock data, Supabase later

Everything the app reads or writes goes through a handler in `query/apis/*.api.ts` that branches on `isMocked` (`NEXT_PUBLIC_MOCK === "true"`, from `@/utils`).

- `content.api.ts` → `Content` (all vocabulary, banks, reading texts, programme data). Mock = `mock/`. **TODO(supabase):** build `Content` from tables.
- `progress.api.ts` → best scores, missed words, mute. Mock = localStorage (same keys as the original: `ta_best`, `ta_miss_<grade>`, `ta_mute`). **TODO(supabase):** per-user rows once auth exists.
- Keep the mock branch working when wiring the real one.

## Where things are

| Path | What |
|---|---|
| `types/content.types.ts` | `Content` and every data shape (the future DB schema). `game.types.ts`: questions, games, topics. |
| `mock/*.mock.ts` | Typed content, assembled in `mock/index.ts`. Generated once from the original; edit by hand now. |
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
