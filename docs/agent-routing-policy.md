# Development Agent Routing Policy

## Scope

This policy applies only to Codex agents used to develop and review this repository. It is not an AI/model router inside the student-learning product; the product MVP has no student-facing model router.

## Routing policy

| Agent role | Typical work | Model and reasoning policy | Concurrency |
|---|---|---|---|
| Coordinator | Clarify task, update plan, integrate results, make final implementation decisions | Use the main session model; use high reasoning for architecture, security, migrations, and ambiguous tasks | One |
| Explorer | Read-only codebase exploration, documentation review, backlog analysis | Use the fast/balanced model at medium reasoning | Up to one parallel agent |
| Implementer | One bounded feature or bugfix with tests | Use the stronger coding model at high reasoning | One write scope at a time |
| Reviewer | Correctness, security, RLS, testing, and regression review | Use the stronger coding model at high reasoning | One, after implementation |
| Test triage | Classify a focused failure and gather evidence | Use the fast/balanced model at low or medium reasoning | One, read-only unless explicitly assigned a fix |

## Default operating rules

- Start with one main agent. Spawn an agent only for an independent, bounded side task; do not parallelize edits to the same files.
- Limit the session to two concurrent subagents. This keeps review and integration manageable while the project is small.
- Use the stronger model for implementation, architecture, migrations, RLS/security, and final review. Use the faster model for exploration, document scanning, and narrow test triage.
- An explicit model selected for a specific agent takes precedence over the user-level default. Confirm currently available model names with `/model` before setting a persistent user preference.
- Each agent must state its task ID, write scope, expected verification, and final changed-file list.
- The coordinator owns backlog state transitions, integration, and final verification evidence.

## User-level configuration

Keep account- and availability-dependent model IDs in `~/.codex/config.toml`, not in this repository. The following is a starting pattern; select only model names offered by the current Codex account:

```toml
[agents]
enabled = true
max_concurrent_threads_per_session = 2
default_subagent_model = "gpt-5.6-terra"
default_subagent_reasoning_effort = "medium"
```

For demanding implementer and reviewer work, explicitly select the stronger available coding model with `high` reasoning when spawning that agent. The current official Codex guidance recommends the stronger `gpt-5.6` family for demanding multi-step work and `gpt-5.6-terra` for faster, lower-cost exploration; availability can differ by account.

## Project configuration boundary

- Repository `.codex/config.toml` may define safe project discovery settings only.
- It must not contain API keys, provider credentials, custom provider endpoints, or fixed account-specific model settings.
- Any student-facing AI capability requires a separate post-pilot architecture decision record.

