"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lodash = void 0;
const constants_1 = require("../constants");
const load_plugin_js_1 = require("../utils/load-plugin.js");
const lodashPlugin = (0, load_plugin_js_1.loadPlugin)('eslint-plugin-lodash');
const rules = lodashPlugin.rules;
exports.lodash = {
    recommended: {
        plugins: {
            lodash: {
                rules: rules,
            },
        },
        rules: {
            'lodash/prefer-lodash-method': constants_1.OFF,
            'lodash/prefer-lodash-typecheck': constants_1.OFF,
            'lodash/import-scope': [constants_1.ERROR, 'method'],
        },
    },
};
//# sourceMappingURL=lodash.js.map