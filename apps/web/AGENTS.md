<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Web package rules

- Run `npm run check` before moving a task to Review.
- Run `npm run test:e2e` for navigation, lesson flow, progress, or
  authentication changes.
- Keep UI mobile-first, responsive, keyboard accessible, and compatible with
  the existing student self-study flow.
- Never use a Supabase service-role key in browser or client modules.
- Keep textbook data and content contracts in `src/features/content`; keep
  presentation components separate from content records.
