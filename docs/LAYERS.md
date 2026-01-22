# Layer Architecture

This document describes each layer in `@finografic/eslint-config` and their responsibilities.

---

## Core Principles

- **Each layer has a single, clear responsibility**
- **Layers are composable and explicit**
- **No magic flags or implicit behavior**
- **Typed and untyped TypeScript rules are strictly separated**

---

## Available Layers

### `base()`

**Responsibility:** Universal JavaScript safety and correctness.

**What it does:**

- Provides ESLint recommended rules
- Sets modern ESM/Node globals
- Enforces basic correctness (`no-debugger`, `prefer-const`, etc.)
- Handles unused variables (JS-only)

**What it does NOT do:**

- ❌ No TypeScript parser
- ❌ No type-aware rules
- ❌ No React/JSX rules
- ❌ No formatting rules (handled by dprint)

**When to use:** Always. This is the foundation layer.

---

### `node()`

**Responsibility:** Node.js-specific correctness rules.

**What it does:**

- Prevents accidental `process.exit()` in application code
- Applies to all Node.js files (`.js`, `.mjs`, `.cjs`, `.ts`)

**What it does NOT do:**

- ❌ Does not set Node globals (already in `base()`)
- ❌ Does not enforce ESM-only (TypeScript handles this)
- ❌ No opinionated I/O rules

**When to use:** For Node.js applications and scripts.

---

### `typescript()`

**Responsibility:** TypeScript rules that do NOT require type information.

**What it does:**

- Enables TypeScript parser
- Enforces TypeScript syntax correctness
- Handles type definition consistency
- Includes `@stylistic/type-annotation-spacing` (the only stylistic rule)

**What it does NOT do:**

- ❌ No `parserOptions.project` (no type checking)
- ❌ No type-aware rules (those are in `typescriptTyped()`)
- ❌ No formatting rules

**When to use:** For all TypeScript projects. Works immediately without tsconfig.

---

### `typescriptTyped()`

**Responsibility:** Type-aware TypeScript rules (requires type information).

**What it does:**

- Requires `project` (tsconfig path)
- Enforces type-aware rules (`no-floating-promises`, `no-unsafe-*`, etc.)
- Must be scoped via `files` (especially in monorepos)

**What it does NOT do:**

- ❌ Cannot run without a tsconfig
- ❌ Does not include untyped TS rules (those are in `typescript()`)
- ❌ Does not work globally (must be scoped)

**When to use:** When you want type-aware linting. Always scope it to specific files/packages.

---

### `typescriptTypedWorkspace()`

**Responsibility:** Monorepo-friendly typed linting helper.

**What it does:**

- Accepts multiple tsconfig projects
- Creates typed configs for monorepo packages
- More ergonomic than calling `typescriptTyped()` multiple times

**What it does NOT do:**

- ❌ Does not change the typed boundary rules
- ❌ Does not add new rule categories
- ❌ Does not auto-discover projects (explicit is better)

**When to use:** In monorepos with multiple packages/apps that need typed linting.

---

## Layer Composition Rules

### ✅ DO

- Compose layers explicitly: `[...base(), ...typescript(), ...typescriptTyped({...})]`
- Scope typed rules with `files` in monorepos
- Use `typescriptTypedWorkspace()` for multiple projects
- Keep layers in logical order (base → node → typescript → typed)

### ❌ DON'T

- Don't mix typed and untyped TS rules in the same layer
- Don't add `parserOptions.project` to `typescript()` layer
- Don't use typed rules without scoping in monorepos
- Don't add formatting rules to any layer

---

## Typed vs Untyped Boundary

This is the **most important architectural guarantee**:

| Rule Category               | Layer               | Requires Type Info? |
| --------------------------- | ------------------- | ------------------- |
| TS syntax correctness       | `typescript()`      | ❌ No               |
| Type definition consistency | `typescript()`      | ❌ No               |
| Type-aware correctness      | `typescriptTyped()` | ✅ Yes              |
| Promise/async safety        | `typescriptTyped()` | ✅ Yes              |
| Unsafe type operations      | `typescriptTyped()` | ✅ Yes              |

**Rule of thumb:** If a rule needs to answer "is this value nullable?" or "does this type match?", it belongs in `typescriptTyped()`.

---

## Examples

### Single Package (Simple)

```ts
import { base, typescript, typescriptTyped } from '@finografic/eslint-config';

export default [
  ...base(),
  ...typescript(),
  ...typescriptTyped({
    project: './tsconfig.json',
    files: ['src/**/*.ts'],
  }),
];
```

### Monorepo (Multiple Packages)

```ts
import { base, typescript, typescriptTypedWorkspace } from '@finografic/eslint-config';

export default [
  ...base(),
  ...typescript(),
  ...typescriptTypedWorkspace({
    projects: [
      './apps/client/tsconfig.json',
      './apps/server/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
    files: ['apps/**/*.ts', 'packages/**/*.ts'],
  }),
];
```

---

## Adding New Layers

When adding a new layer:

1. **Define clear responsibility** (one sentence)
2. **Use `interface` for options** (not `type`)
3. **Return `ESLintConfig[]`**
4. **Export from `src/index.ts`**
5. **Add to templates** (if commonly used)
6. **Document here** (what it does and does NOT do)
