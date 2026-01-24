# Code Comments, Annotations & Documentation

## Comment Style Rules

### JSDoc (`/** ... */`) - Use for exported APIs

Use JSDoc for:

- Exported functions
- Exported interfaces and options objects
- Tricky boundaries ("typed vs untyped", "escape hatch rules")
- Anything you want IntelliSense to surface

**Example:**

```ts
/**
 * Type-aware TypeScript rules (requires type information).
 *
 * This layer requires `project` and should be scoped in monorepos.
 * Only includes rules that need type checking.
 */
export function typescriptTyped(options: TypescriptTypedOptions): ESLintConfig[] {
  // ...
}
```

### Single-line (`//`) - Use only for tactical clarifiers

Use `//` for:

- "Why" comments that aren't obvious from code
- Quick notes inside a rules block
- Temporary TODOs (but ideally track TODOs in docs/issues)

**Good:**

```ts
// Disable base rule to avoid duplicate reporting in TS files
'no-unused-vars': OFF,

// This rule stays in ESLint because dprint cannot express it
'@stylistic/type-annotation-spacing': ...
```

**Bad (too obvious):**

```ts
// TypeScript rules
'@typescript-eslint/no-unused-vars': ERROR,
```

### Avoid banner blocks

**Don't use:**

```ts
/*
 * ─────────────────────────────────────────────
 * Styles
 * ─────────────────────────────────────────────
 */
```

**Instead:** Remove entirely, or use minimal JSDoc if genuinely needed:

```ts
/**
 * Stylistic rules (non-formatting).
 */
```

## Comment Guidelines

### Keep comments that explain

- **Boundaries** (typed vs untyped, layer separation)
- **Design decisions** (why this rule exists, why it's here not there)
- **Non-obvious behavior** (escape hatches, workarounds)

### Remove comments that

- Just label the next block ("// TypeScript rules")
- Restate what the code already says
- Add noise without value

## Code Comments vs. Documentation Files

- **Code comments (JSDoc)**: For inline function/class documentation
- **Markdown files**: For higher-level explanations, architecture, refactoring notes, and system documentation

Both are important, but serve different purposes.

## TypeScript-Specific

- Prefer `interface` over `type` for object shapes
- Use `import type` statements (not inline `, type Foo`)
- Keep JSDoc on exported interfaces for IntelliSense
