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
- P2-02 navigation foundation completed pending review: added a schema-validated demo repository, responsive lesson list/detail routes, an accessible no-audio fallback, and a safe 404 response for missing lesson IDs. Demo content is visibly marked as not approved for study.
- P2-02 verification: `npm run test`, `npm run test:e2e -- tests/e2e/lesson-navigation.spec.ts`, `npm run lint`, `npm run typecheck`, and `npm run build` passed in `apps/web`.
- P1-04 foundation implemented: added versioned content/progress tables, published-content and student-owned RLS policies, indexes for RLS access paths, validated public Supabase environment variables, browser/server client factories, and a non-secret environment example.
- P1-04 application verification: `npm run test -- src/lib/env.test.ts`, `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build` passed in `apps/web`.
- P1-04 blocker: no Supabase CLI, `supabase/config.toml`, linked/local disposable project, or two authenticated test users are available. The migration and RLS verification query have not been executed against Postgres/Auth; no RLS claim is made yet.
- P0-01 source identified by product owner: Tiếng Anh 4 Global Success, Học liệu.VN e-book ID `3`, page reference URL recorded in `docs/content-authoring.md`.
- P0-01 metadata cross-check: public Học liệu Global Success metadata identifies the title as Tiếng Anh 4 (English 4 — Global Success), NXB Giáo dục Việt Nam × Pearson, with 24 units across two semesters.
- P0-01 rights status: source identity is recorded, but ownership/allowed-use evidence is still pending; textbook content must not be ingested or published yet.
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
- Current next action: provision or link a disposable Supabase project, apply `0001_content_and_progress.sql`, and run the prepared two-user RLS verification query; P0-01 remains ready when the textbook is provided.
- Blockers: P0-01 still needs content/media ownership and allowed-use evidence; P1-04 also needs a disposable Supabase project/CLI configuration and two test-user identities for live RLS verification.

## Update template

```text
### YYYY-MM-DD — TASK-ID
- Change:
- Verification:
- Evidence:
- Blockers:
- Next action:
```
