---
name: add-vocab
description: Add vocabulary words or a new topic group for a grade (3AP…3AS) in Amir tutor. Use when the user wants more words, a new vocabulary topic, verbs, adjectives or opposites.
---

# Add vocabulary

All edits go in `src/components/TutorApp.js`. Grades: `3AP 4AP 5AP 1AM 2AM 3AM 4AM 1AS 2AS 3AS`.

1. **Pick the grade** (ask if unclear). `grep -n 'GRPX' src/components/TutorApp.js` — `GRPX[grade]` is defined more than once; later `Object.assign(GRPX, …)` / reassignments win, so edit the **last** definition for that grade.
2. **New topic group** → append to `GRPX[grade]`:
   `["Topic EN","موضوع","🎒", term, "known,words,newword|عربي|😀;other|عربي"]`
   `term` is 1–3. Words with `en|ar|emoji` that aren't in `VOC[grade]` are auto-added; plain words must already exist in `VOC[grade]`. Emoji is optional (falls back to `EMO`).
3. **Words only** → append `;en|ar|emoji` to the `VOC[grade]` string.
4. **Part of speech**: unknown words are treated as nouns. Verbs → add to `VS` (and `VL[grade]` if it should drive verb games; past form goes in `VERBS_DB` as `[en,past,ar,object]`). Adjectives → add to `AS`; opposite pairs go in `OPP[grade]` as `en|ar|opp|oppAr`.
5. Every word needs an Arabic translation. No duplicates within a grade (`grep -c '"word|'` first).
6. Run `/verify-app`.
