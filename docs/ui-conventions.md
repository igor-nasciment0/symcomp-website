# Frontend conventions

This guide is for small, safe frontend changes. Start feature-local; share code
only after it has a clear reuse case.

## Where code goes

```text
src/app/                 Next.js routes, layouts, metadata
src/features/<feature>/  Feature UI, hooks, API calls, feature types
src/components/ui/       Reusable, design-neutral primitives
src/components/layout/   Shared site frame: headers, navigation, footers
src/lib/                 Small framework-agnostic helpers
src/types/               Types shared by multiple features
```

Example: a Semana schedule route lives in `src/app/semana/programacao/page.tsx`.
Its cards and mock data live in `src/features/semana`. A generic `Card` belongs
in `src/components/ui` only after another feature needs it.

## UI rules

- Use semantic Tailwind tokens: `bg-background`, `text-foreground`,
  `bg-primary`, `text-muted-foreground`, `border-border`.
- Do not add raw hex colors, old event assets, or `symcomp-*` classes to shared
  primitives.
- Keep event-specific branding inside its feature or layout.
- Prefer existing primitives before adding a new one.
- Add `'use client'` only when component needs browser APIs, state, effects, or
  event handlers.
- Build mobile-first. Interactive controls need visible focus and disabled
  states; forms need error and loading states.

## Adding a component

1. Build it in feature folder first.
2. Use real content and responsive layout.
3. Move it to `components/ui` only when it is generic and reused.
4. Keep `components/ui` free of API calls and feature/business logic.

## Before opening a PR

```bash
pnpm run format
pnpm run lint
pnpm exec tsc --noEmit
```

Use Node 24 and pnpm. CI is final gate; local checks catch problems earlier.
