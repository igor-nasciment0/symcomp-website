# Frontend agent instructions

This file applies to work in the `symcomp/` frontend directory. Keep changes
scoped to this application unless a task explicitly requires coordinated work
with another service.

## Toolchain and dependencies

- Use Node.js 24 LTS (`.nvmrc`) and pnpm 11.3.0 (`package.json`).
- Use pnpm exclusively. Do not use npm or Yarn, and do not create a
  `package-lock.json` or `yarn.lock`.
- Install dependencies with `pnpm install --frozen-lockfile` when validating an
  existing lockfile.
- When changing dependencies, commit `package.json`, `pnpm-lock.yaml`, and
  `pnpm-workspace.yaml` together whenever they change.
- `pnpm-workspace.yaml` contains reviewed build-script permissions and security
  overrides. Do not enable all dependency scripts or remove/alter overrides
  without explaining and validating the reason.
- Run `pnpm audit` after dependency updates. Review any changes from
  `pnpm audit --fix`; do not apply broad automatic fixes without inspection.

## Validation

Run the narrowest relevant check while working. Before handing off a completed
change, run the applicable commands below and report any failure honestly:

```bash
pnpm install --frozen-lockfile --strict-peer-dependencies
pnpm audit
pnpm run format
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
```

`pnpm test` is not a test command: it runs `format:fix` and modifies files. Do
not use it as a verification check.

The repository currently has known lint and build failures. Do not hide them by
weakening lint rules, disabling checks, or claiming the checks pass; fix them
only when they are in scope and report the result.

## Change boundaries

- Preserve unrelated working-tree changes.
- Do not change Docker, deployment, infrastructure, backend code, or API
  endpoints unless the task explicitly requests it.
- Do not add secrets or commit `.env` files. Ask for the required configuration
  rather than inventing values.
- Avoid broad formatting rewrites and major dependency upgrades unless they are
  specifically requested.

## Commits

- Make focused commits using `type(frontend): concise description`, such as
  `fix(frontend): resolve certificate validation`.
- Every commit made by an AI agent must include a `Co-authored-by` trailer for
  the active agent. Use a generic agent identity rather than a personal one:
  `Co-authored-by: <agent-name> <agent@openai.com>`. Codex uses
  `Co-authored-by: Codex <codex@openai.com>`.
