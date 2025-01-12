"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeAppPreset = void 0;
const configs_1 = require("../configs");
const constants_1 = require("../constants");
const nodeAppPreset = (_options = {}) => [
    {
        // Base config
        files: ['**/*.{js,ts}'],
        ignores: [...constants_1.IGNORES],
        ...configs_1.imports.recommended,
        ...configs_1.prettier.config,
    },
    {
        // TypeScript files
        files: ['**/*.ts'],
        ignores: [...constants_1.IGNORES],
        ...configs_1.typescript.recommended,
    },
    {
        // Development files
        files: ['**/*.dev.ts', '**/*.test.ts', '**/debug/**/*'],
        ...configs_1.development.relaxed,
    },
];
exports.nodeAppPreset = nodeAppPreset;
//# sourceMappingURL=node-app.js.map