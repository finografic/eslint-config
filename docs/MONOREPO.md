# Monorepo Usage Guide

This guide covers best practices for using `@finografic/eslint-config` in monorepos.

---

## Core Principles

- **Scope typed linting** to specific packages/apps
- **Use `typescriptTypedWorkspace()`** for multiple projects
- **Performance matters** - don't lint everything with typed rules
- **Explicit is better than magic**

---

## Recommended Patterns

### Pattern 1: Root Config with Scoped Typed Linting

**Best for:** Monorepos where you want typed linting only in specific packages.

```ts
// eslint.config.ts (root)
import { base, node, typescript, typescriptTypedWorkspace } from '@finografic/eslint-config';

export default [
  ...base(),
  ...node(),
  ...typescript(),

  // Typed linting only for apps and shared packages
  ...typescriptTypedWorkspace({
    projects: [
      './apps/client/tsconfig.json',
      './apps/server/tsconfig.json',
      './packages/shared/tsconfig.json',
    ],
    files: [
      'apps/client/**/*.ts',
      'apps/server/**/*.ts',
      'packages/shared/**/*.ts',
    ],
  }),
];
```

**Why this works:**

- Untyped TS rules apply everywhere (fast, no tsconfig needed)
- Typed rules only run where they matter (performance)
- Clear boundaries between typed and untyped code

---

### Pattern 2: Per-Package Configs

**Best for:** Monorepos where each package has different needs.

```ts
// packages/shared/eslint.config.ts
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

**Why this works:**

- Each package controls its own linting
- No root-level coordination needed
- Works well with package-specific overrides

---

### Pattern 3: Hybrid (Root + Package Overrides)

**Best for:** Monorepos with shared base rules but package-specific needs.

```ts
// eslint.config.ts (root)
import { base, typescript } from '@finografic/eslint-config';

export default [
  ...base(),
  ...typescript(),
  // No typed rules at root - let packages add their own
];
```

```ts
// apps/client/eslint.config.ts
import { typescriptTyped } from '@finografic/eslint-config';

export default [
  // Inherits from root
  ...typescriptTyped({
    project: './tsconfig.json',
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  }),
];
```

---

## Performance Guidelines

### ✅ DO

- **Scope typed rules** to specific file patterns
- **Use `typescriptTypedWorkspace()`** instead of multiple `typescriptTyped()` calls
- **Lint only source files** (not `dist/`, `node_modules/`, etc.)
- **Consider per-package configs** for very large monorepos

### ❌ DON'T

- Don't run typed linting on test files unless necessary
- Don't include `node_modules` or build outputs in typed linting
- Don't use typed rules globally in monorepos (too slow)
- Don't skip scoping (performance + correctness)

---

## Common Patterns

### Multiple Apps, Shared Packages

```ts
...typescriptTypedWorkspace({
  projects: [
    './apps/*/tsconfig.json',        // All apps
    './packages/*/tsconfig.json',   // All packages
  ],
  files: ['apps/**/*.ts', 'packages/**/*.ts'],
});
```

### Specific Apps Only

```ts
...typescriptTypedWorkspace({
  projects: [
    './apps/client/tsconfig.json',
    './apps/admin/tsconfig.json',
  ],
  files: ['apps/client/**/*.ts', 'apps/admin/**/*.ts'],
});
```

### Exclude Test Files

```ts
...typescriptTypedWorkspace({
  projects: ['./apps/*/tsconfig.json'],
  files: [
    'apps/**/*.ts',
    '!apps/**/*.test.ts',
    '!apps/**/*.spec.ts',
  ],
});
```

---

## Troubleshooting

### "TypeScript project not found"

**Cause:** tsconfig path is incorrect or doesn't exist.

**Fix:** Use absolute paths or ensure `tsconfigRootDir` is set correctly.

```ts
...typescriptTypedWorkspace({
  projects: ['./apps/client/tsconfig.json'],
  tsconfigRootDir: import.meta.dirname, // or process.cwd()
  files: ['apps/client/**/*.ts'],
});
```

### "Typed linting is too slow"

**Cause:** Typed rules are running on too many files.

**Fix:** Scope more aggressively:

```ts
// Before (slow)
files: ['**/*.ts'];

// After (fast)
files: ['apps/**/*.ts', 'packages/**/*.ts', '!**/*.test.ts'];
```

### "Rules not applying to my package"

**Cause:** File patterns don't match your package structure.

**Fix:** Check your file patterns match your actual file locations:

```ts
// If your structure is:
// packages/my-pkg/src/index.ts

// Then use:
files: ['packages/my-pkg/**/*.ts'];
```

---

## Migration from Single Package

If you're migrating a single-package config to a monorepo:

1. **Keep untyped rules global** (they're fast)
2. **Move typed rules to workspace helper**
3. **Scope typed rules to specific packages**
4. **Test performance** - should be similar or better

```ts
// Before (single package)
...typescriptTyped({
  project: './tsconfig.json',
  files: ['src/**/*.ts'],
})

// After (monorepo)
...typescriptTypedWorkspace({
  projects: ['./apps/*/tsconfig.json'],
  files: ['apps/**/*.ts'],
})
```

---

## Best Practices Summary

1. ✅ **Always scope typed rules** in monorepos
2. ✅ **Use workspace helper** for multiple projects
3. ✅ **Keep untyped rules global** (they're fast)
4. ✅ **Exclude test files** from typed linting if not needed
5. ✅ **Use per-package configs** if packages have very different needs
6. ✅ **Test performance** - typed linting should complete in reasonable time
