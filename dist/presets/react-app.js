import { base, development, emotion, imports, prettier, react, typescript, } from '../configs/index.js';
import { IGNORES } from '../constants.js';
export const reactAppPreset = (options = {}) => [
    {
        // Base config for all files
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: [...IGNORES],
        ...base.recommended,
        ...imports.recommended,
        ...prettier.config,
    },
    {
        // TypeScript + React files
        files: ['**/*.{ts,tsx}'],
        ignores: [...IGNORES],
        ...typescript.recommended,
        ...react.recommended,
        ...emotion.recommended,
    },
    {
        // Development/Debug files
        files: [
            '**/*.dev.{ts,tsx}',
            '**/*.test.{ts,tsx}',
            '**/debug/**/*',
            '**/*-debug.*',
        ],
        ...development.relaxed,
    },
];
//# sourceMappingURL=react-app.js.map