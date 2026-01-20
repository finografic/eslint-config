# Current TODO (canonical)

This is the single source of truth for the ESLint-config refactor. Legacy notes are archived in `docs/todo/archive/`.

## Status

- Base layers scaffolded (`base`, `typescript`, `typescript-typed`, `fino v2`)
- Dependencies cleaned
- Build config set to tsdown (pending script swap from tsup)

## Next Actions

1. Switch build to `tsdown`
   - Update `package.json` build/watch scripts to use `tsdown` (matching `tsdown.config.ts`).
2. Replace root `eslint.config.ts`
   - Use layered exports; drop formatting rules (dprint owns formatting).
3. Add remaining layers (in order)
   - `react.layer.ts` (JSX-specific; no formatting)
   - `node.layer.ts` (Node globals/rules; no formatting)
4. Templates
   - Ensure `templates/` is published (already in `files`)
   - Templates should import from published package paths (not aliases)
5. Docs
   - Update README with layered usage + `defineConfig` examples
   - Document formatter boundary (ESLint never formats)
6. Peer deps (optional but recommended)
   - Consider moving `eslint`, `@typescript-eslint/*`, `@stylistic/eslint-plugin`, `@eslint/js`, `globals` to `peerDependencies`

## Reference

- Legacy/expanded notes: `docs/todo/archive/`
- Philosophy: `docs/ESLINT_PHILOSOPHY.md`
