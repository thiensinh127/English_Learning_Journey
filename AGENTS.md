# Project Working Rules

## Product rules

- Optimize for grade 4 student self-study.
- Keep the learning loop short, clear, and encouraging.
- Keep textbook content separate from presentation code.
- Do not add AI-generated student-facing content without a review and safety boundary.
- Do not expand to parent dashboards, grades 1–5, or multiple textbooks before validating the MVP.

## Senior delivery mindset

- Work as a senior full-stack engineer with product-owner awareness: protect the learning outcome, usability, delivery scope, performance, security, and maintainability together.
- Before a non-trivial change, identify the user impact, acceptance criteria, dependencies, risks, and the smallest viable solution.
- Prefer simple, well-tested, reversible designs over premature abstraction, infrastructure, or dependencies.
- Explain material trade-offs and blockers with evidence; do not silently make scope-changing assumptions.
- Keep decisions aligned with the approved MVP, roadmap, backlog priority, and documented architecture.
- Treat repeated defects, review feedback, and production issues as opportunities to improve tests, automation, or project rules.

## Engineering rules

- Use TypeScript and small modules with one responsibility.
- Add tests for domain behavior before marking a task done.
- Keep exercise evaluation deterministic in the MVP.
- Keep secrets out of source control.
- Use database migrations for schema changes.
- Protect student-owned data with server-side authorization and RLS.
- Prefer accessible, responsive components.

## Performance standards

- Load lesson data and media on demand; never preload an entire textbook or all audio assets.
- Reserve image and media dimensions to prevent layout shifts; use optimized image formats when possible.
- Target p75 Core Web Vitals of LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 on both mobile and desktop.
- Target API p95 of ≤ 400ms for reads and ≤ 700ms for progress writes under expected MVP usage.
- Add indexes for foreign keys, common filters/sorts, and every non-primary-key column used in RLS policies.
- Avoid N+1 queries and unbounded list queries; paginate or limit collections.
- Measure before adding caches, indexes, realtime subscriptions, or background jobs.
- Record and investigate client errors, API failures, slow queries, and Core Web Vitals before a release.

## Codex workflow

1. Read the current task in `docs/backlog.md` and the latest `docs/progress.md`.
2. Move the task to `In Progress` before changing code.
3. Make the smallest coherent change.
4. Run the task-specific tests and relevant full checks.
5. Move the task to `Review` and record evidence.
6. Only after verification, move it to `Done` and update the next action.

## Execution autonomy

- Continue to the next ready task in the approved plan without waiting for routine confirmations.
- Make the smallest safe assumption when a low-impact detail is missing; record that assumption and its reason in `docs/progress.md`.
- Stop only when a required input cannot be safely inferred, including textbook content or ownership, external account access, production credentials, a payment commitment, or a decision that materially expands approved MVP scope.
- When blocked, continue independent ready tasks and document the blocker rather than pausing the entire project.

## Required checks before completion

- Typecheck
- Lint
- Unit tests
- Relevant Playwright tests
- Production build when application structure changes
- Relevant performance and accessibility checks before a release
