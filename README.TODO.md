# to AVOID dirty-fix `fix-imports.sh` post-build script (see bottom)

#### For cleaner approaches to handle ESM imports, here are a few ideas for the future

1. **Build-time Solutions**:

- Use a bundler like Rollup or esbuild that handles ESM outputs more cleanly
- Try `tsc-alias` or similar tools that can rewrite imports during TypeScript compilation
- Investigate TypeScript's `moduleResolution: "bundler"` or `moduleResolution: "node16"` options

2. **Source-level Solutions**:

- Use `.js` extensions in source code (TypeScript 5.0+ supports this)
- Use path aliases and a module resolver
- Structure code to minimize the need for complex imports

---

#### For GitHub repos to study, I'd recommend

1. **eslint-plugin-import**: They handle ESM/CJS interop well
   <https://github.com/import-js/eslint-plugin-import>

2. **typescript-eslint**: Good example of a modern TypeScript tooling setup
   <https://github.com/typescript-eslint/typescript-eslint>

3. **eslint-config-airbnb**: One of the most popular ESLint configs
   <https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>

4. **@antfu/eslint-config**: Modern ESM-first approach
   <https://github.com/antfu/eslint-config>

These projects have likely solved similar problems and might offer cleaner approaches than our current solution.

---

## try using Vite + library mode to compile

```ts
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        presets: resolve(__dirname, 'src/presets/index.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        // External dependencies from package.json
        '@eslint/js',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-plugin-emotion',
        'eslint-plugin-import',
        'eslint-plugin-lodash',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
      ],
      output: {
        // Preserve directory structure
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // Ensure proper extensions in imports
        format: 'es',
      },
    },
  },
  plugins: [
    // Generate .d.ts files
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      // Ensure .d.ts files match our export structure
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    // Handle TypeScript paths
    alias: {
      '@/': resolve(__dirname, 'src/'),
    },
  },
});
```

---

#### `fix-imports.sh`

```sh
#!/bin/bash

# Process all JavaScript files in dist
for file in $(find dist -name "*.js"); do
  # Handle directory imports first (add /index.js)
  sed -i '' "s/from '\.\.\/types'/from '\.\.\/types\/index.js'/g" "$file"
  sed -i '' "s/from '\.\/types'/from '\.\/types\/index.js'/g" "$file"
  sed -i '' "s/from '\.\.\/constants'/from '\.\.\/constants.js'/g" "$file"
  sed -i '' "s/from '\.\/constants'/from '\.\/constants.js'/g" "$file"
  sed -i '' "s/from '\.\.\/configs'/from '\.\.\/configs\/index.js'/g" "$file"
  sed -i '' "s/from '\.\/configs'/from '\.\/configs\/index.js'/g" "$file"
  sed -i '' "s/from '\.\.\/presets'/from '\.\.\/presets\/index.js'/g" "$file"
  sed -i '' "s/from '\.\/presets'/from '\.\/presets\/index.js'/g" "$file"

  # Add .js to local imports
  sed -i '' "s/from '\.\([^']*\)'/from '\.\1.js'/g" "$file"
  sed -i '' "s/from '\.\.\([^']*\)'/from '\.\.\1.js'/g" "$file"

  # Final pass: Clean up any double .js extensions
  sed -i '' "s/\.js\.js/\.js/g" "$file"

  echo "Processed $file"
done

# Wait for file operations to complete
sleep 1

# Clean up any double .js extensions in all files at once
find dist -name "*.js" -exec sed -i '' 's/\.js\.js/\.js/g' {} \;
```
