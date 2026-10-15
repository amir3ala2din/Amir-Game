@AGENTS.md

# Amir tutor

Tutor Amir – English Learning Adventure: a bilingual (EN/AR, RTL-aware) quiz game for Algerian students (grades 3AP–3AS) and general CEFR levels (A1–B2). Ported from a single-file HTML (React + htm via CDN) into Next.js + Tailwind.

## Stack
- Next.js (App Router, JS, `src/`), Tailwind **3.4.17** (pinned to match the original HTML; not v4), `htm` for templates.
- No backend, no DB. Progress/mistakes/mute live in `localStorage` (`ta_best`, `ta_miss_<grade>`, `ta_mute`).

## Layout
- `src/app/page.js` — client-only (`next/dynamic`, `ssr:false`) because the app touches `document`, `localStorage`, `speechSynthesis`, `AudioContext` at module load. Don't make it a server component.
- `src/app/layout.js` — fonts (Baloo Bhaijaan 2 → `.hf`, Lalezar → `.hd`), metadata, viewport.
- `src/app/globals.css` — Tailwind directives + the original custom CSS (`.fl`, `.cta`, `.mq`, `.hf`, `.hd`).
- `src/components/TutorApp.js` — the whole app, ported verbatim: content DBs, game generators, UI. Uses `html\`...\`` (htm) with `className=`, not JSX. ESLint is disabled for this file on purpose.
- `public/logo.png` — extracted from the original base64.

## Architecture of TutorApp.js (search by name)
- **Content**: `VOC[grade]` (`"en|ar|emoji;…"`), `OPP`, `VERBS_DB`, `GRPX`/`GRP` (topic groups), `TEN` (grammar topics per grade), `VL` (verbs per grade), `SENTD`, `*D` banks (`MODD`, `CONDD`, `PASD`…).
- **Generators**: functions returning `() => question[]`; questions come from `mc(...)` (multiple choice) or `ty(...)` (typed). `bankSB(bank, titleEn, titleAr, explain)` builds a generator from a `[question, answer, wrongs, key]` bank.
- **Wiring**: `G(id, name, nameAr, emoji, gen)` = a game; `mkT` = a topic with games; `gradeTopics(grade)` assembles everything; `SCHOOL`/`GENERAL` = level pickers; `GEN` maps CEFR levels to grades.
- **Module-level mutable state**: `CURG` (current grade), `STAGE`, `MUTE`. Intentional — keep it.
- **UI**: `App` (screen state machine: home → path → level → kind → pos → topic → hub → play → result) and `Play`.
- Every learner-facing string has an English + Arabic pair; keep both when adding content.

## Commands
```bash
npm run dev     # http://localhost:3000
npm run build   # must pass before you finish
```

## Rules
- Next.js here is a newer version than your training data: check `node_modules/next/dist/docs/` before using Next APIs.
- Use the project skills for content work: `/add-vocab`, `/add-grammar-bank`, `/verify-app`.
- Keep edits to `TutorApp.js` surgical (long dense lines): use targeted Edit on a unique substring, never reformat or rewrite the file.
- Don't add dependencies for things the file already does.
