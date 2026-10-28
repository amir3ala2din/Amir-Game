# Tutor Amir – English Learning Adventure (Next.js)

Bilingual (English / Arabic) English learning games for Algerian students, 3AP to BAC, plus General English (A1–B2).
Flow: Home → Path → Grade → Vocabulary / Grammar / Exam Practice / My Mistakes → word type or grammar topic → game → results.

## Run it
Requires Node.js 18 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build a static site (for hosting)
```bash
npm run build    # creates the `out/` folder
```
Upload the `out/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, your own hosting).
For GitHub Pages under a sub-path, add `basePath: "/your-repo"` in `next.config.js`.

## Where things are
- `app/TutorApp.js` – the whole app: content databases (vocabulary, grammar banks, programmes per grade), game generators, and the screens.
- `app/globals.css` – Tailwind + custom animations and the home-page fonts.
- `public/logo.png` – transparent logo used on the home page.

## Notes
- Student progress ("mastered games", stars, My Mistakes) is saved in the browser (`localStorage`) on each device. There is no server or accounts.
- Spoken words use the browser's English voice; sounds are generated in the browser.
- Fonts (Baloo Bhaijaan 2, Lalezar) load from Google Fonts; everything else is bundled.
- The vocabulary, Arabic meanings and term assignments were compiled from teacher documents and should be reviewed against the official textbooks before commercial use.
