---
name: verify-app
description: Build and smoke-test Amir tutor after a change. Use before finishing any task that touches src/.
---

# Verify

1. `npm run build` — must pass.
2. `npm run dev` in the background, open http://localhost:3000, and check the browser console shows no errors.
3. Click through for the changed grade: Start → path → grade → kind → topic → pick a game → answer one question. Confirm the new content appears and the result screen shows.
4. Stop the dev server (`kill $(lsof -ti :3000)`; don't use `pkill -f`).

Report what you actually ran and saw; if a step was skipped, say so.
