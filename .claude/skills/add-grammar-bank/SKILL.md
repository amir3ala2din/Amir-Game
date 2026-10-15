---
name: add-grammar-bank
description: Add a grammar topic (multiple-choice question bank) to Amir tutor and attach it to one or more grades. Use for new grammar points like articles, quantifiers, reported speech.
---

# Add a grammar bank

All edits go in `src/components/TutorApp.js`. Copy the pattern of an existing bank, e.g. `PASD`/`pasSB`.

1. **Bank** — `const XD=[["She ___ to school every day.","goes",["go","going","gone"]], …];` (≥8 items; `___` marks the gap; 3 wrong options; optional 4th element = a key for `explain`).
2. **Generator** — `const xSB=bankSB(XD,"Choose …","اختر …",()=>["Rule in English.","القاعدة بالعربية."]);` (explain returns `[en, ar]`, may use `(answer, key)`).
3. **Register the topic** (keys must be new; grep first):
   - `TN.key=["Topic title","العنوان","🔤"]` — add inside the `TN` object.
   - `TG.key=()=>[SBG("xx",xSB)]` — add inside the `TG` object (`xx` = unique short game id).
4. **Attach to grades** — the *last* `Object.assign(TEN,{…})` calls win; add `["key",term]` to the grade's array (term 1–3).
5. Arabic is required for every title and explanation. Don't reformat surrounding lines.
6. Run `/verify-app`.
