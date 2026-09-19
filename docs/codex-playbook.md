# Codex project playbook

## Operating sequence

1. Read the active task in `docs/backlog.md` and the latest `docs/progress.md`.
2. State the task ID, user impact, acceptance criteria, dependencies, and
   smallest safe change; move the task to `In Progress` before edits.
3. Use `content-qc` for textbook-derived records and `student-flow-qa` for
   child-facing flows when their triggers apply.
4. Make the smallest coherent change and keep content separate from UI.
5. Run focused tests first, then `apps/web` quality checks and relevant
   Playwright coverage.
6. Record commands, evidence, assumptions, blockers, and the next action in
   `docs/progress.md`; move the task to `Review` only after verification.
7. Move to `Done` only after required external gates, including rights and live
   RLS verification, are actually evidenced.

Git hooks provide a fast local gate. GitHub Actions provides the complete web
quality and browser gate. Missing external services must be documented as
blockers, not replaced by unsupported claims.
