# ADR 0002: Codex automation and integration boundaries

- Status: Accepted
- Date: 2026-09-19

## Context

The project uses Codex to implement a grade 4 learning product. The repository
needs predictable quality checks without coupling local development to provider
credentials, external MCP services, or a product-level model router.

## Decision

- Keep durable product and engineering rules in `AGENTS.md` and package-scoped
  rules in nested `AGENTS.md` files.
- Make `apps/web/package.json` the source of truth for local quality commands.
- Use Git hooks for fast local checks and GitHub Actions for the complete pull
  request and release checks once the repository is connected to GitHub.
- Add reusable repository skills only for repeated workflows with clear inputs
  and verification evidence.
- Do not add Codex tool hooks, provider credentials, model-provider settings,
  MCP dependencies, or a product model router at this stage.
- Keep account-specific model IDs and reasoning preferences in user-level
  Codex configuration, never in this repository.

## Consequences

The project remains usable offline and safe to share. Some checks, such as
live Supabase RLS verification and CI execution, still require their external
environment. Those dependencies are documented as blockers rather than
silently replaced with local claims.

Revisit this decision when a workflow is repeated often enough to justify
automation, or when the product has a reviewed AI use case after MVP
validation.
