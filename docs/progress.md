# Progress Log

## 2026-09-19

- P1-01 started in isolated Git worktree `feat/foundation`.
- Ruling: the AppShell failing test belongs to Task 2, immediately before AppShell implementation; Task 1 must retain a passing TypeScript build.
- P1-01 verification: Node 22.23.2; `npm run lint`, `npm run typecheck`, and `npm run build` passed in `apps/web`.
- P1-02/P1-03 started and completed in `feat/foundation`: added the Vitest browser test environment and an accessible, responsive `AppShell` for the home route.
- Ruling: enable Vitest globals and `vitest/globals` TypeScript declarations — the planned test intentionally uses global `it` and `expect`, but Task 1's initial configuration supplied neither; without this correction tests and typecheck fail — cost if wrong: tests use standard Vitest globals rather than explicit imports.
- Ruling: rename `vitest.config.ts` to `vitest.config.mts` — Vitest supports this discovered config extension, and it removes the future-Vite warning caused by ESM syntax in a CommonJS-loaded `.ts` file — cost if wrong: the plan's initial config filename changes to keep quality gates warning-free.
- P1-02/P1-03 verification: `npm run test -- src/components/app-shell.test.tsx`, `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build` passed in `apps/web`.
- P0-02 completed pending review: added validated lesson, vocabulary, and sentence-pattern schemas plus the content authoring/review contract at `docs/content-authoring.md`.
- P0-02 verification: `npm run test -- src/features/content/schema.test.ts`, `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build` passed in `apps/web`.
- Product direction agreed: content-first MVP with light gamification and controlled AI later.
- Primary user agreed: grade 4 student self-study.
- MVP learning target agreed: vocabulary and sentence patterns by textbook lesson.
- Technical direction agreed: Next.js/TypeScript, Supabase, responsive web/PWA, Vercel, Vitest, and Playwright.
- Design spec restored at `docs/superpowers/specs/2026-09-19-grade4-english-learning-app-design.md`.
- Master implementation outline remains at `docs/superpowers/plans/2026-09-19-grade4-english-learning-app-implementation-plan.md`.
- Detailed foundation plan created at `docs/superpowers/plans/2026-09-19-foundation-and-content-contract.md`.
- Codex workflow and quality-gates plan created at `docs/superpowers/plans/2026-09-19-codex-workflow-and-quality-gates.md`.
- Performance and reliability standards agreed: Core Web Vitals, API p95 latency, on-demand media/data loading, idempotent progress writes, indexed RLS queries, and release monitoring.
- Delivery timeline created: eight weeks part-time or five to six weeks full-time when pilot content is ready at kickoff.
- Development-agent routing policy created: one main coordinator, at most two concurrent subagents, and model selection kept in user-level Codex configuration.
- Execution autonomy agreed: continue approved-plan work without routine confirmations; log low-impact assumptions and stop only for material missing authority or inputs.
- Current next action: build the typed fixture repository and lesson navigation foundation (Foundation Task 4); P0-01 remains ready when the textbook is provided.
- Blockers: exact textbook and content/media ownership details are not yet supplied.

## Update template

```text
### YYYY-MM-DD — TASK-ID
- Change:
- Verification:
- Evidence:
- Blockers:
- Next action:
```
