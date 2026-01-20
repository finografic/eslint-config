# ROADMAP.ESLINT_CONFIG.md

## PHILOSOPHY

This package is a **personal ESLint flat-config platform** for the finografic ecosystem.

Design goals:

- **Explicit > implicit**
- **Architecture-first**
- **Minimal abstractions**
- **No “magic flags” that look like ESLint options**
- **Stable defaults over novelty**
- **Debuggable configuration boundaries**
- ESLint is a **tool**, not a religion

This is not a community preset. Breaking changes are acceptable.

---

## SEPARATION OF CONCERNS

### Formatting is not ESLint

- This package intentionally **does not implement formatting rules**
- No `eslint-plugin-prettier`
- No formatter rules (indent/quotes/semi/max-len/spacing/etc.)

Formatting is external and recommended via:

- `dprint`
- `@finografic/dprint-config`

ESLint is responsible for:

- correctness
- safety
- code structure
- syntax choices that are not just whitespace/layout

---

## TARGET CONSUMER ENVIRONMENT

Typical use in TypeScript monorepos:

```
repo/
  apps/
    client/         # React + Vite
    server/         # Node backend
  packages/
    shared/
  eslint.config.ts
  tsconfig.base.json
```

Tooling assumptions:

- ESLint flat config
- Node ESM projects
- TypeScript strict repos
- pnpm

---

## PUBLIC API (THE GOAL)

Primary public API is **layered functions** returning flat configs:

```
export function base(): ESLintConfig[]
export function typescript(): ESLintConfig[]
export function typescriptTyped(options): ESLintConfig[]
```

Layer functions are:

- pure (return arrays, no side effects)
- explicit (no hidden branching)
- composable (`...layer()` via spreads)

`fino()` may exist as an optional wrapper during migration, but is not the primary API.

---

## TYPE MODEL

Use ESLint’s current flat config type:

```
import type { Linter } from 'eslint'
export type ESLintConfig = Linter.Config
```

- Do not invent custom config interfaces
- Do not export “array alias types” (no `FooArray`)
- Use `satisfies ESLintConfig[]` in consumer configs

---

## PROJECT STRUCTURE (MINIMUM CANONICAL)

```
src/
  index.ts
  types.ts

  constants.ts
  layers/
    base.ts
    typescript.ts
    typescript-typed.ts

  fino.ts                # optional v2 wrapper (bridge)
  legacy/                # optional old fino implementation (temporary)
```

Notes:

- `legacy/` exists only if needed during transition.
- The authoritative direction is `layers/`.

---

## MIGRATION STRATEGY (ITERATIVE)

This refactor must be **installable at checkpoints**.

### Milestone 1 — Add layered exports (additive, non-breaking)

- Add `base()`, `typescript()`, `typescriptTyped()`
- Keep legacy `fino()` working
- Publish a version that existing repos can install safely

### Milestone 2 — Migrate internal repos gradually

- Adopt layered usage in new/clean repos
- Migrate existing repos from `fino()` incrementally
- Keep `fino()` available as an optional fallback during transition

### Milestone 3 — Deprecate + remove legacy patterns

- Remove alias rule names (`ts/*`, `fino/*`) unless truly owned
- Remove “feature flag” config style (`typescript: true`, `react: true`, etc.)
- Remove plugin-centric file sprawl
- Keep only explicit layers + optional fino v2

---

## LAYER RULES (HARD BOUNDARIES)

### 1) `base()` — universal JS safety + correctness

`base()` contains:

- `@eslint/js` recommended baseline
- language options (ESM, globals)
- rules that apply to JS and TS equally

`base()` does NOT contain:

- TypeScript parser
- type-aware rules
- React rules
- formatting rules (handled by dprint)

---

### 2) `typescript()` — TypeScript WITHOUT type information

`typescript()` contains:

- `@typescript-eslint/parser` enabled
- `@typescript-eslint` plugin enabled
- only rules that DO NOT require `parserOptions.project`
- minimal non-formatting stylistic rule(s)

`typescript()` must NOT:

- set `parserOptions.project`
- include type-aware rules
- include formatting rules

**One allowed stylistic exception:**

- `@stylistic/type-annotation-spacing` (TS readability, not formatting)

---

### 3) `typescriptTyped()` — TypeScript WITH type information

`typescriptTyped()` contains:

- type-aware TS rules only
- requires:
  - `project` (tsconfig path)
- should be scoped:
  - `files` globs (recommended in monorepos)
- may accept an “escape hatch” `parserOptions` object
  - but it MUST NOT override `project` or `tsconfigRootDir`

Typed rules must NEVER appear in `typescript()`.

---

## CONVENIENCE: `fino` object (for consumer, optional only)

`fino()` may is a thin wrapper that composes layers:

- default: `base()` + `typescript()`
- optional toggles: `react`, `node` (later)
- typed linting only via explicit `typed: { project, files }`

`fino()` must remain:

- minimal
- explicit
- easy to delete later

It must NOT reintroduce a “magic options object” that looks like ESLint config.

---

## EXAMPLE CONSUMER USAGE (CANONICAL)

Layered (recommended):

```
import type { ESLintConfig } from '@finografic/eslint-config'
import { base, typescript, typescriptTyped } from '@finografic/eslint-config'

export default [
  ...base(),
  ...typescript(),
  ...typescriptTyped({
    files: ['apps/client/**/*.{ts,tsx}'],
    project: './apps/client/tsconfig.json',
    tsconfigRootDir: new URL('.', import.meta.url).pathname,
  }),
] satisfies ESLintConfig[]
```

---

## END STATE

When complete, the package should be:

- CV-quality
- cleanly layered
- explicit and debuggable
- stable across monorepos
- formatting-free (paired with dprint)

Typed and untyped TypeScript rules must remain separated via:

- `typescript()` (untyped)
- `typescriptTyped()` (typed)

This boundary is the core architectural guarantee of the package.

---

If you want, I can also generate the **second doc** you mentioned (a concise “transcript summary” designed for IDE ingestion), but this roadmap is the correct “north star” doc to drive generation first.
