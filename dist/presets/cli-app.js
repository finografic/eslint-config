"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliAppPreset = void 0;
const configs_1 = require("../configs");
const constants_1 = require("../constants");
const cliAppPreset = (_options = {}) => [
    {
        // Base config for all files
        files: ['**/*.{js,ts}'],
        ignores: [...constants_1.IGNORES],
        ...configs_1.base.recommended,
        ...configs_1.imports.recommended,
        ...configs_1.prettier.config,
    },
    {
        // TypeScript files
        files: ['**/*.ts'],
        ignores: [...constants_1.IGNORES],
        ...configs_1.typescript.recommended,
        rules: {
            // CLI-specific rules
            'no-console': constants_1.OFF, // CLIs need console output
            'no-process-exit': constants_1.OFF, // Allow process.exit()
            '@typescript-eslint/no-explicit-any': constants_1.WARN, // More lenient for CLI args
            'import/no-dynamic-require': constants_1.OFF, // Allow dynamic requires
        },
    },
    {
        // Bin/Entry files
        files: ['**/bin/**/*.ts', '**/cli.ts', '**/index.ts'],
        ignores: [...constants_1.IGNORES],
        rules: {
            'no-process-env': constants_1.OFF, // Allow process.env in entry points
        },
    },
    {
        // Test and Debug files
        files: ['**/*.test.ts', '**/*.spec.ts', '**/debug/**/*', '**/*-debug.*'],
        ...configs_1.development.relaxed,
    },
];
exports.cliAppPreset = cliAppPreset;
//# sourceMappingURL=cli-app.js.map