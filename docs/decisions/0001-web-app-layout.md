# ADR 0001: Keep the deployable web app in `apps/web`

## Context

The repository holds product specifications, plans, migration history, and a
deployable Next.js application. The product will gain content and operations
artifacts that must not be bundled with the web application.

## Decision

Keep product documentation, Supabase migrations, and cross-project decisions at
the repository root. Keep the deployable Next.js application and its runtime
environment configuration in `apps/web`.

## Consequences

- Deployment targets `apps/web`; application commands run from that directory.
- Product documentation and database migrations remain visible without entering
  the application folder.
- Future apps can be added without moving the existing web application.
