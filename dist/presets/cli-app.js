import { base, development, imports, 
// lodash,
prettier, typescript, } from '../configs/index.js';
import { OFF, WARN, IGNORES } from '../constants.js';
export const cliAppPreset = (options = {}) => [
    {
        // Base config for all files
        files: ['**/*.{js,ts}'],
        ignores: [...IGNORES],
        ...base.recommended,
        ...imports.recommended,
        ...prettier.config,
    },
    {
        // TypeScript files
        files: ['**/*.ts'],
        ignores: [...IGNORES],
        ...typescript.recommended,
        rules: {
            // CLI-specific rules
            'no-console': OFF, // CLIs need console output
            'no-process-exit': OFF, // Allow process.exit()
            '@typescript-eslint/no-explicit-any': WARN, // More lenient for CLI args
            'import/no-dynamic-require': OFF, // Allow dynamic requires
        },
    },
    {
        // Bin/Entry files
        files: ['**/bin/**/*.ts', '**/cli.ts', '**/index.ts'],
        ignores: [...IGNORES],
        rules: {
            'no-process-env': OFF, // Allow process.env in entry points
        },
    },
    {
        // Test and Debug files
        files: ['**/*.test.ts', '**/*.spec.ts', '**/debug/**/*', '**/*-debug.*'],
        ...development.relaxed,
    },
];
//# sourceMappingURL=cli-app.js.map