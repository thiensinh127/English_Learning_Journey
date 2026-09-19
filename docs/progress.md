# Progress Log

## 2026-09-19

- Textbook pipeline implementation completed through the first Unit 1 pilot:
  provenance/activity contracts, four repository skills, PDF page extraction,
  verified Volume 1 book map, approved-media manifest tooling, deterministic
  activities, and an approved-content repository gate. Commits: `fb2441c`,
  `ad73de1`, `ab12741`, `2fd0499`, `233c007`, `c2ee38b`.
- Pipeline verification: web `npm run check` passed with 10 test files/33
  tests and production build; `npm run test:e2e` passed 2 tests; Python
  pipeline passed 12 tests; all four repository skill validators passed.
- PDF evidence: the supplied 82-page PDF has no text layer; all pages are
  marked image-only for review. The normalized book map is sourced from the
  verified FlipBuilder HTML book map; no silent OCR or guessed text was added.
- Unit 1 pilot is `in_review` and intentionally not published. Student routes
  use the approved repository by default; demo fixtures require explicit
  development `?demo=1` mode. Missing audio remains an accessible fallback.
- Remaining blockers: formal permission artifact location, concrete approved
  audio/image input URLs, human content review for Unit 1, and live Supabase/
  RLS verification.
- P0-01 rights update: product owner confirmed that permission to use the
  *Tiếng Anh 4 Global Success* content/media has been obtained. Task moved to
  Review; retain the permission artifact when available and do not publish
  content outside the approved scope.
- Next action after rights confirmation: prepare the approved pilot content
  package for P0-03 and complete live Supabase/RLS verification for P1-04.
- UI design system established from the approved responsive mockup: Baloo 2
  display headings, Nunito body text, semantic Journey color tokens, 8px
  spacing rhythm, 48px minimum touch targets, and mobile/tablet/desktop rules.
- Added `docs/design-system.md` as the visual source of truth and updated
  `apps/web/AGENTS.md` to require it for future UI work.
- Updated the web shell to load the approved fonts, expose `journey-*` Tailwind
  color tokens, use the light sky background, and rename metadata to English
  Learning Journey.
- Design-system verification: `npm run check` passed (lint, typecheck, 5 test
  files/9 tests, and production build).
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
- Foundation review: full application suite passed — lint, typecheck, 9 unit tests, 1 Playwright journey, and production build. Foundation closeout remains pending because live RLS verification and release performance instrumentation are not yet evidenced.
- Vertical-slice plan created at `docs/superpowers/plans/2026-09-19-learning-vertical-slice.md`; implementation is gated by P0-01 allowed-use evidence and P1-04 live RLS verification.
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
- Current next action: obtain allowed-use evidence for the Global Success source and provision/link a disposable Supabase project, then apply `0001_content_and_progress.sql` and run the two-user RLS verification query before implementing the vertical slice.
- Blockers: P0-01 still needs content/media ownership and allowed-use evidence; P1-04 also needs a disposable Supabase project/CLI configuration and two test-user identities for live RLS verification.
- P1-06 started: the project workflow configuration and automation-boundary ADR are being added before quality hooks, CI, and reusable repository skills.
- P1-06 Task 1 moved to Review: added `.codex/config.toml` with project-root discovery only and ADR 0002 for quality automation, external integration, and model-routing boundaries.
- P1-06 Task 1 verification: `codex exec -s read-only ...` listed `AGENTS.md`, `apps/web/AGENTS.md`, and the active backlog task without changing files; `git diff --check` passed.
- Ruling: use `codex exec` for non-TTY instruction verification because the plan's interactive `codex --ask-for-approval` command refuses to start when `TERM=dumb`; this changes only the verification invocation, not project behavior.
- P1-06 Task 2 started: `npm run check` was absent as expected; the package contract and nested web instructions are now being added.
- P1-06 Task 2 moved to Review: added `npm run check` and scoped web-package rules for quality, e2e coverage, accessibility, Supabase boundaries, and content separation.
- P1-06 Task 2 verification: from `apps/web`, `npm run check` passed with lint, typecheck, 5 test files/9 tests, and production build; Codex read the root and nested instructions in read-only mode.
- P1-06 Task 3 ruling: keep the lint-staged configuration under `apps/web`, but place the executable Husky hook at repository root because this worktree's Git root is the monorepo root; a nested `apps/web/.husky/pre-commit` would not be invoked by Git after clone.
- P1-06 Task 3 ruling: make the web package's `prepare` script initialize Husky from the repository root (`cd ../.. && apps/web/node_modules/.bin/husky`); running plain `husky` from `apps/web` cannot discover this worktree's Git root.
- P1-06 Task 3 verification: root Husky bootstrap set `core.hooksPath=.husky/_`; a staged invalid TypeScript file caused `.husky/pre-commit` to exit with status 1 and report the parse error. An unused variable was not a valid failure fixture because the current ESLint preset does not enable that rule.
- P1-06 Task 3 CI added: `.github/workflows/quality.yml` runs `npm ci`, `npm run check`, Playwright Chromium installation, and `npm run test:e2e` on pushes to `main` and pull requests.
- P1-06 Task 3 moved to Review: added root Husky/lint-staged enforcement, Prettier for staged JSON/Markdown/YAML, ESLint for staged source files, and GitHub Actions quality checks.
- P1-06 Task 3 verification: root hook passed on real staged files; `npm run check` passed with 5 test files/9 tests and production build; `npm run test:e2e` passed 1 Playwright test; `npx playwright install --with-deps chromium` exited 0; `git diff --check` passed.
- Ruling: add a portable nvm fallback in the root hook because Git's hook environment omitted the interactive shell's Node PATH; the hook still fails clearly when no Node.js installation is available.
- P1-06 Task 4 started: adding only `content-qc` and `student-flow-qa` repository skills plus the Codex operating playbook.
- P1-06 Task 4 moved to Review: added `content-qc`, `student-flow-qa`, and `docs/codex-playbook.md` with content-rights, deterministic QA, accessibility, performance, and evidence boundaries.
- P1-06 Task 4 verification: both skills passed `skill-creator/scripts/quick_validate.py`; Codex read-only discovery listed both repository skills and their triggers; placeholder scan and `git diff --check` passed.
- P1-06 Task 5 started: documenting development-session model selection and the post-pilot product AI boundary; no model provider or router is being added to the repository.
- P1-06 Task 5 moved to Review: documented user-level development model policy and deferred product AI/model-router boundary in the playbook and ADR 0002.
- P1-06 Task 5 verification: the planned secret scan matched only literal command examples inside plan documents; an assignment-pattern scan excluding plan text returned no credentials or provider configuration, and `git diff --check` passed.
- Ruling: retain the literal scan examples in the implementation plan as documentation, but use the assignment-pattern scan as the credential evidence because the plan necessarily contains the searched token names.
- P1-06 completed: Codex project configuration, web quality command contract, root Husky/lint-staged hook, GitHub Actions workflow, two repository skills, playbook, and model/integration boundaries are committed.
- P1-06 final verification: `npm run check` passed (lint, typecheck, 5 test files/9 tests, production build); `npm run test:e2e` passed 1 Playwright test; both skill validators passed; secret assignment scan found no credentials/provider configuration; `git diff --check` passed.
- Next action: resolve P0-01 allowed-use evidence and P1-04 live Supabase/RLS setup before implementing the gated vertical slice in `docs/superpowers/plans/2026-09-19-learning-vertical-slice.md`.

## Update template

```text
### YYYY-MM-DD — TASK-ID
- Change:
- Verification:
- Evidence:
- Blockers:
- Next action:
```
