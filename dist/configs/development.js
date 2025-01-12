"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
const constants_1 = require("../constants");
exports.development = {
    relaxed: {
        rules: {
            // TypeScript
            '@typescript-eslint/ban-ts-comment': constants_1.OFF,
            '@typescript-eslint/no-explicit-any': constants_1.OFF,
            '@typescript-eslint/no-unused-vars': constants_1.OFF,
            // General
            'no-console': constants_1.OFF,
            'no-debugger': constants_1.OFF,
            'no-unused-vars': constants_1.OFF,
            // Import/Export
            'unused-imports/no-unused-vars': constants_1.OFF,
            'unused-imports/no-unused-imports': constants_1.OFF,
            // Other
            'perfectionist/sort-imports': constants_1.OFF,
        },
    },
};
//# sourceMappingURL=development.js.map