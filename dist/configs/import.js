"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const constants_1 = require("../constants");
const load_plugin_js_1 = require("../utils/load-plugin.js");
const importPlugin = (0, load_plugin_js_1.loadPlugin)('eslint-plugin-import');
const rules = importPlugin.rules;
exports.imports = {
    recommended: {
        plugins: {
            import: {
                rules: rules,
            },
        },
        rules: {
            'import/first': constants_1.ERROR,
            'import/no-duplicates': constants_1.ERROR,
            'import/no-mutable-exports': constants_1.ERROR,
            'import/no-named-as-default': constants_1.OFF,
            'import/no-named-as-default-member': constants_1.OFF,
            'import/order': [
                constants_1.ERROR,
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                    'newlines-between': 'always',
                },
            ],
        },
    },
};
//# sourceMappingURL=import.js.map