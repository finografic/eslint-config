import { development, imports, prettier, typescript } from '../configs/index.js';
import { IGNORES } from '../constants.js';
export const nodeAppPreset = (options = {}) => [
    {
        // Base config
        files: ['**/*.{js,ts}'],
        ignores: [...IGNORES],
        ...imports.recommended,
        ...prettier.config,
    },
    {
        // TypeScript files
        files: ['**/*.ts'],
        ignores: [...IGNORES],
        ...typescript.recommended,
    },
    {
        // Development files
        files: ['**/*.dev.ts', '**/*.test.ts', '**/debug/**/*'],
        ...development.relaxed,
    },
];
//# sourceMappingURL=node-app.js.map