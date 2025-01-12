"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = createConfig;
function createConfig(options) {
    const config = {
        files: options.typescript
            ? ['**/*.ts', '**/*.tsx']
            : ['**/*.js', '**/*.jsx'],
        ignores: ['**/node_modules/**', '**/dist/**'],
        extends: options.extends || [],
        rules: options.rules || {},
    };
    return config;
}
//# sourceMappingURL=create-config.js.map