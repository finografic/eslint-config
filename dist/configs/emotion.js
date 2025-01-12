"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emotion = void 0;
const constants_1 = require("../constants");
const load_plugin_js_1 = require("../utils/load-plugin.js");
const emotionPlugin = (0, load_plugin_js_1.loadPlugin)('@emotion/eslint-plugin');
const rules = emotionPlugin.rules;
exports.emotion = {
    recommended: {
        plugins: {
            '@emotion': {
                // ESLint flat config requires the actual plugin object
                rules: rules,
            },
        },
        rules: {
            // '@emotion/jsx-import': ERROR,
            '@emotion/jsx-import': constants_1.OFF,
            '@emotion/no-vanilla': constants_1.ERROR,
            '@emotion/import-from-emotion': constants_1.ERROR,
            '@emotion/styled-import': constants_1.ERROR,
        },
    },
};
//# sourceMappingURL=emotion.js.map