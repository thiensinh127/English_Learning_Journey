# Codex Workflow and Quality Gates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure a lightweight, repeatable Codex workflow that keeps product decisions, code quality, and delivery progress visible without premature automation.

**Architecture:** Root `AGENTS.md` holds persistent rules. The future `apps/web` package owns quality commands and scoped instructions. Git hooks and CI enforce those commands. Skills and integrations are added only when their workflow repeats or external service is adopted.

**Tech Stack:** Codex instructions, Git, npm scripts, Husky, lint-staged, GitHub Actions, TypeScript, Next.js, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-19-grade4-english-learning-app-design.md`

## Global Constraints

- Optimize for Vietnamese grade 4 student self-study.
- Keep textbook content separate from presentation code.
- Do not add AI-generated student-facing content without review and safety boundaries.
- Do not add parent/teacher features, multiple grades, or multiple textbook series before MVP validation.
- Keep secrets out of source control; protect student data through server-side authorization and RLS.
- Do not configure a product model router before MVP validation.

## Review Focus

- A new session identifies the active task and required checks without reading every document.
- Pre-commit checks are fast; Playwright and release checks run in CI.
- Failed quality commands block commits or CI instead of merely appearing in prose.
- Missing external integrations never block local development.
- Project Codex configuration contains no secrets, provider credentials, or broad destructive-command hooks.

## File Structure

- `AGENTS.md`: root product and engineering rules.
- `apps/web/AGENTS.md`: web-package commands and local rules.
- `apps/web/package.json`: canonical `check` command.
- `apps/web/lint-staged.config.mjs` and `apps/web/.husky/pre-commit`: fast local quality gate.
- `.github/workflows/quality.yml`: full pull-request quality gate.
- `.codex/config.toml`: project-root and instruction-discovery settings only.
- `.agents/skills/content-qc/SKILL.md`: textbook-content QC workflow.
- `.agents/skills/student-flow-qa/SKILL.md`: child-facing flow QA workflow.
- `docs/codex-playbook.md`: human-readable operating guide.
- `docs/decisions/0002-codex-automation-boundaries.md`: scope decision.

## Tasks

### Task 1: Establish project instruction discovery

**Files:** Create `.codex/config.toml` and `docs/decisions/0002-codex-automation-boundaries.md`; modify `docs/backlog.md` and `docs/progress.md`.

**Consumes:** Root `AGENTS.md` and the design spec.

**Produces:** A Git project boundary and project-scoped Codex configuration without credentials.

- [ ] **Step 1: Add and start the tracking task**

Add `P1-06 | P0 | Establish Codex workflow and quality gates | In Progress | P1-01` to the backlog.

- [ ] **Step 2: Initialize Git only if required**

Run from repository root: `git rev-parse --is-inside-work-tree || git init`, then `git status --short`.

Expected: Git reports a work tree and lists project files as untracked or changed.

- [ ] **Step 3: Create safe project configuration**

Create `.codex/config.toml` with `project_root_markers = [".git"]` and `project_doc_max_bytes = 32768`. Do not include API keys, model-provider configuration, notification commands, or hooks.

- [ ] **Step 4: Record the automation boundary decision**

Create ADR 0002 with the decision: use AGENTS.md, package scripts, Git hooks, and CI for quality gates; do not add Codex tool hooks, provider settings, model routing, or external MCP dependencies until a repeated need exists.

- [ ] **Step 5: Verify instruction loading**

Run: `codex --ask-for-approval never "List project instruction files and the current delivery task. Do not change files."`

Expected: Codex reports root `AGENTS.md`, task P1-06, and no file changes.

- [ ] **Step 6: Record verification and commit**

Move P1-06 to `Review`, update `docs/progress.md`, then commit exactly the changed configuration and docs with message `chore: establish Codex project workflow`.

### Task 2: Define executable web-package quality commands

**Files:** Create `apps/web/AGENTS.md`; modify `apps/web/package.json`, `docs/backlog.md`, and `docs/progress.md`.

**Consumes:** Next.js app and test tooling from foundation Task 1.

**Produces:** `npm run check` and package-specific instructions.

- [ ] **Step 1: Prove the aggregate check is currently absent**

Run from `apps/web`: `npm run check`.

Expected: missing-script failure.

- [ ] **Step 2: Define canonical scripts**

Add `lint: eslint .`, `typecheck: tsc --noEmit`, `test: vitest run`, `test:e2e: playwright test`, `build: next build`, and `check: npm run lint && npm run typecheck && npm run test && npm run build` to `apps/web/package.json`.

- [ ] **Step 3: Add scoped web-app instructions**

Create `apps/web/AGENTS.md` with rules: run `npm run check` before Review; run `npm run test:e2e` for navigation, lesson flow, progress, or authentication changes; keep UI mobile-first and accessible; never use Supabase service-role keys in client modules; keep textbook data in `src/features/content`.

- [ ] **Step 4: Verify commands and instruction precedence**

Run `npm run check` from `apps/web`, then from root run `codex --cd apps/web --ask-for-approval never "List active instructions and required checks for a lesson navigation change. Do not change files."`.

Expected: quality checks pass and Codex reports root plus web-package instructions, with web-package rules applied last.

- [ ] **Step 5: Record verification and commit**

Update backlog/progress and commit the changed files with message `chore: add web quality command contract`.

### Task 3: Enforce fast local checks and complete CI checks

**Files:** Create `apps/web/lint-staged.config.mjs`, `apps/web/.husky/pre-commit`, and `.github/workflows/quality.yml`; modify `apps/web/package.json`.

**Consumes:** Task 2 quality scripts.

**Produces:** Staged-file checks before commit and full pull-request checks in GitHub Actions.

- [ ] **Step 1: Install hook tooling**

Run from `apps/web`: `npm install -D husky lint-staged`, then `npx husky init`.

- [ ] **Step 2: Configure the fast gate**

Configure lint-staged so `*.{ts,tsx,js,jsx}` runs `eslint --fix` and `*.{json,md,yml,yaml}` runs `prettier --write`; set the pre-commit hook to `npx lint-staged`.

- [ ] **Step 3: Test blocking behavior**

Create and stage a temporary TypeScript file containing `const unused = 1;`; run `.husky/pre-commit`.

Expected: non-zero exit due to lint failure. Remove the temporary file afterward.

- [ ] **Step 4: Add full CI workflow**

Create `.github/workflows/quality.yml` to run on pull requests and pushes to `main`: checkout, Node 22 setup with npm cache for `apps/web/package-lock.json`, `npm ci`, `npm run check`, Playwright Chromium install, and `npm run test:e2e` from `apps/web`.

- [ ] **Step 5: Verify and commit**

Run from `apps/web`: `npm run check`, `npx playwright install --with-deps chromium`, and `npm run test:e2e`. Record results, then commit with message `ci: enforce web quality checks`.

### Task 4: Add only two reusable repository skills

**Files:** Create `.agents/skills/content-qc/SKILL.md`, `.agents/skills/student-flow-qa/SKILL.md`, and `docs/codex-playbook.md`.

**Consumes:** The content schema, student UI, and quality commands from foundation tasks.

**Produces:** A content-review workflow and a student-flow QA workflow.

- [ ] **Step 1: Create `content-qc` skill**

The skill must trigger for vocabulary, sentence patterns, exercises, answer keys, audio, images, or source records. It must require reading `docs/content-authoring.md`, validating records, checking Vietnamese meaning, age-appropriate examples, source/ownership, review status, and recording results in `docs/progress.md`.

- [ ] **Step 2: Create `student-flow-qa` skill**

The skill must trigger for navigation, lesson cards, learning content, exercises, results, progress, or review behavior. It must run focused unit tests, relevant mobile and desktop Playwright flows, check primary actions, keyboard use, missing media, missing lesson, and record results in `docs/progress.md`.

- [ ] **Step 3: Verify discovery and publish playbook**

Run: `codex --ask-for-approval never "List repository skills and their triggers. Do not change files."`.

Expected: Codex lists `content-qc` and `student-flow-qa`.

Create `docs/codex-playbook.md` with the operating sequence: read backlog/progress; state task ID and criteria; set In Progress; run focused and full checks; run browser tests for student flows; record evidence; use content-qc or student-flow-qa when triggered; add GitHub/Figma/Linear only after that service is adopted.

- [ ] **Step 4: Record verification and commit**

Update tracking and commit skills/playbook with message `docs: add Codex workflow skills`.

### Task 5: Define model and integration boundaries

**Files:** Modify `docs/codex-playbook.md` and `docs/decisions/0002-codex-automation-boundaries.md`.

**Consumes:** Reviewed MVP scope and established workflow.

**Produces:** A clear distinction between selecting a development-session model and building a student-product model router.

- [ ] **Step 1: Add development-session model policy**

Document: use the default model for inspection, documentation, and small edits; increase reasoning only for architecture, security/RLS, migrations, or complex debugging; use the fastest appropriate setting for mechanical work; explain a model/reasoning change in the task update; keep account-specific model IDs only in user-level Codex configuration, never in project config.

- [ ] **Step 2: Add product AI boundary**

Document: MVP has no model router. Any post-pilot AI use needs an ADR defining use case, human review, source grounding, child safety, cost/latency limit, logging, fallback, and tests.

- [ ] **Step 3: Scan before commit**

Run: `rg -n --hidden -g '!node_modules' -g '!package-lock.json' 'OPENAI_API_KEY|SUPABASE_SERVICE_ROLE_KEY|model_provider|model_providers|sk-[A-Za-z0-9_-]+'`.

Expected: no credentials or provider configuration in project files.

- [ ] **Step 4: Record verification and commit**

Update tracking and commit with message `docs: define Codex model and integration policy`.

## Plan self-review

- Root and nested AGENTS rules, package commands, Git hooks, CI, two reusable skills, optional MCP/plugins, and model boundaries each have an owning task.
- The plan intentionally excludes product model routing, student AI content, and external integrations until their real need exists.
- `npm run check` is the shared contract for Codex and CI; both skills write evidence to `docs/progress.md`.
- Review focus is covered by instruction discovery, hook failure/pass behavior, full CI, skills discovery, and secret/provider scan.
