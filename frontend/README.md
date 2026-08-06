# Symcomp frontend

## Development environment

This project uses Node.js 24 LTS and pnpm 11.3.0. The required Node version is
recorded in [`.nvmrc`](.nvmrc), and the pnpm version is recorded in
[`package.json`](package.json).

### Prerequisites

- [Node.js 24 LTS](https://nodejs.org/), preferably through
  [nvm](https://github.com/nvm-sh/nvm)
- Corepack (bundled with Node.js) to provide pnpm

Check the active versions:

```bash
node --version
pnpm --version
```

They should report Node `v24.x` and pnpm `11.3.0`.

### Install

With nvm:

```bash
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
```

If you do not use nvm, install a Node 24 LTS release before running the last
two commands. Do not use npm or Yarn in this repository: pnpm and
[`pnpm-lock.yaml`](pnpm-lock.yaml) are the source of truth for dependencies.

### Run locally

```bash
pnpm run dev
```

Open <http://localhost:3000> in a browser.

## Source layout

`src/app` is reserved for Next.js routes, layouts, and route-specific metadata.
Feature implementation belongs in `src/features`:

```text
src/
  app/              # routes only
  components/ui/    # neutral shared primitives
  components/layout/ # shared site layout
  features/
    symcomp/        # root presentation site
    semana/         # current Semana components
    bytecafe/       # ByteCafé components
```

Keep API calls, hooks, types, and components with their feature. Promote code
to `components/ui` only when it is design-neutral and reused across features.
The 2025 Semana implementation has been retired from this working frontend;
recover it from the archived release tag if it is ever needed.

## Verification

Run these checks after changing dependencies or before opening a pull request:

```bash
# Confirm that the committed lockfile installs without changes and has no
# unsatisfied dependency peers.
pnpm install --frozen-lockfile --strict-peer-dependencies

# Check the dependency graph against npm security advisories.
pnpm audit

# Check formatting and lint rules.
pnpm run format
pnpm run lint

# Create a production build.
pnpm run build
```

`pnpm audit` requires access to the npm registry. Do not use `pnpm audit --fix`
without reviewing its changes: a fix may add overrides to
[`pnpm-workspace.yaml`](pnpm-workspace.yaml).

## Dependency maintenance

Use the following workflow for dependency updates:

```bash
pnpm update
pnpm audit
pnpm install --frozen-lockfile --strict-peer-dependencies
pnpm run lint
pnpm run build
```

Commit `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` together
whenever an update changes them. `package-lock.json` is intentionally not used
by this project.

## Formatting

Install the **Prettier - Code formatter** VS Code extension and enable format
on save. The project also provides:

```bash
# Check formatting without changing files.
pnpm run format

# Apply formatting changes.
pnpm run format:fix
```
