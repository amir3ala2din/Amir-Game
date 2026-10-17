# Amir Tutor UI

English learning game (EN/AR) for Algerian students. Next.js 16 · TypeScript · Tailwind 4 · TanStack Query · Supabase.

```bash
cp .env.example .env   # set the Supabase URL + publishable key, or NEXT_PUBLIC_MOCK=true for no backend
npm install
npm run dev            # http://localhost:3000
```

Content comes from Supabase (`get_content()`), progress is per user; `mock/` is the offline copy and the seed source. See `CLAUDE.md`.
