# 🦋 @finografic/eslint-config

Personal, opinionated **ESLint flat config** for the finografic ecosystem.

This package is designed for:

- TypeScript-first monorepos
- React + Vite apps
- Node.js backends
- strict-but-practical linting
- explicit, layered configuration (no magic)

> **Formatting is intentionally excluded.**
> Use a formatter (recommended: `dprint`) alongside ESLint.

---

## Status

This package is actively evolving toward a fully explicit, layered ESLint flat config.

- ✅ Layered exports (`base()`, `typescript()`, `typescriptTyped()`, etc.) are the primary direction
- ⚠️ `fino()` remains as a transitional / convenience wrapper (migration support)

---

## Installation

```sh
pnpm add -D eslint @finografic/eslint-config
```

> ESLint plugins are declared as peer dependencies and must be installed by the consumer.

---

## Usage (recommended: layered config)

### Minimal (TypeScript)

```typescript
// eslint.config.ts
import type { ESLintConfig } from '@finografic/eslint-config';
import { base, typescript } from '@finografic/eslint-config';

export default [
  ...base(),
  ...typescript(),
] satisfies ESLintConfig[];
```

### With typed TypeScript rules (type-aware)

```typescript
// eslint.config.ts
import type { ESLintConfig } from '@finografic/eslint-config';
import { base, typescript, typescriptTyped } from '@finografic/eslint-config';

export default [
  ...base(),
  ...typescript(),

  ...typescriptTyped({
    files: ['apps/client/**/*.{ts,tsx}'],
    project: './apps/client/tsconfig.json', // required for type-aware rules
    tsconfigRootDir: new URL('.', import.meta.url).pathname,
  }),
] satisfies ESLintConfig[];
```

---

## Usage (optional: `defineConfig`)

Some repos prefer using ESLint’s `defineConfig()` helper when composing many config fragments:

```typescript
// eslint.config.ts
import { defineConfig } from 'eslint/config';
import { base, typescript } from '@finografic/eslint-config';

export default defineConfig(
  ...base(),
  ...typescript(),
);
```

Local overrides can be appended at the end:

```typescript
// eslint.config.ts
import { defineConfig } from 'eslint/config';
import { base, typescript } from '@finografic/eslint-config';

export default defineConfig(
  ...base(),
  ...typescript(),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
```

---

## Transitional API: `fino()` (migration / convenience)

`fino()` exists as an optional wrapper for near-zero config setup and migration from older versions.

It is intentionally thin and composes the same layered exports internally.

```typescript
// eslint.config.ts
import { fino } from '@finografic/eslint-config';

export default fino({
  react: true,
  node: true,
});
```

Typed linting is explicit and scoped:

```typescript
import { fino } from '@finografic/eslint-config';

export default fino({
  typed: {
    files: ['apps/client/**/*.{ts,tsx}'],
    project: './apps/client/tsconfig.json',
    tsconfigRootDir: new URL('.', import.meta.url).pathname,
  },
});
```

> `fino()` will remain available until all internal repos complete migration to the layered API.

---

## Layer overview

This package is designed around explicit layers:

- `base()` — universal JS defaults + correctness rules
- `typescript()` — TypeScript rules **without** type information
- `typescriptTyped()` — TypeScript rules **with** type information (`parserOptions.project` required)
- (additional layers may be added later: `react()`, `node()`, etc.)

Typed and untyped TypeScript rules are intentionally separated to avoid brittle configuration and unexpected type-aware behavior.

---

## Formatting (external)

This package does not enforce formatting rules.

Recommended formatter:

- `dprint`
- `@finografic/dprint-config`

---

## License

MIT
