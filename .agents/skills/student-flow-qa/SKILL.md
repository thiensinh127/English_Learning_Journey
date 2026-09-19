---
name: student-flow-qa
description: Use when changing lesson navigation, lesson cards, learning content, exercises, results, progress, or review behavior in the child-facing web app.
---

# Student Flow QA

Use this workflow to verify that a Grade 4 student can complete the intended
short learning loop on mobile and desktop.

## Before testing

Read `docs/backlog.md`, `docs/progress.md`, and the scoped `AGENTS.md` files.
Identify the primary student action and the smallest acceptance path. Inspect
existing unit and Playwright tests before adding coverage.

## Required checks

- Run focused unit tests for changed domain behavior.
- Run relevant Playwright tests at mobile and desktop viewports when the flow
  is user-facing; keep tests deterministic and use approved or clearly marked
  demo fixtures only.
- Use the available browser agent to inspect the rendered UI at mobile,
  tablet, and desktop viewports against the approved mockup. Record visual
  mismatches separately from deterministic Playwright failures.
- Verify the primary action, visible progress/state feedback, keyboard order,
  accessible names, responsive layout, and focus behavior.
- Verify missing lesson and missing media states remain safe and useful.
- Check that loading is bounded and media/content is requested on demand;
  avoid broad textbook preloads.

## Evidence

Run `npm run check` before Review and `npm run test:e2e` for navigation,
learning, exercise, progress, or auth changes. Record commands, viewport
coverage, results, screenshots or traces when useful, and unresolved issues in
`docs/progress.md`. Do not mark a flow Done while a required external fixture,
content-rights decision, or authenticated RLS environment is missing.
