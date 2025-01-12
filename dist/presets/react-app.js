"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactAppPreset = void 0;
const configs_1 = require("../configs");
const constants_1 = require("../constants");
const reactAppPreset = (_options = {}) => [
    {
        // Base config for all files
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: [...constants_1.IGNORES],
        ...configs_1.base.recommended,
        ...configs_1.imports.recommended,
        ...configs_1.prettier.config,
    },
    {
        // TypeScript + React files
        files: ['**/*.{ts,tsx}'],
        ignores: [...constants_1.IGNORES],
        ...configs_1.typescript.recommended,
        ...configs_1.react.recommended,
        ...configs_1.emotion.recommended,
    },
    {
        // Development/Debug files
        files: ['**/*.dev.{ts,tsx}', '**/*.test.{ts,tsx}', '**/debug/**/*', '**/*-debug.*'],
        ...configs_1.development.relaxed,
    },
];
exports.reactAppPreset = reactAppPreset;
//# sourceMappingURL=react-app.js.map