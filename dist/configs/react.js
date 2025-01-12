"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.react = void 0;
const constants_1 = require("../constants");
const load_plugin_js_1 = require("../utils/load-plugin.js");
const reactPlugin = (0, load_plugin_js_1.loadPlugin)('eslint-plugin-react');
const reactHooksPlugin = (0, load_plugin_js_1.loadPlugin)('eslint-plugin-react-hooks');
exports.react = {
    recommended: {
        plugins: {
            'react': {
                rules: reactPlugin.rules,
            },
            'react-hooks': {
                rules: reactHooksPlugin.rules,
            },
        },
        settings: {
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },
        rules: {
            'react/prop-types': constants_1.OFF,
            'react/react-in-jsx-scope': constants_1.OFF,
            'react/display-name': constants_1.WARN,
            'react/jsx-no-target-blank': constants_1.ERROR,
            'react-hooks/rules-of-hooks': constants_1.ERROR,
            'react-hooks/exhaustive-deps': constants_1.WARN,
        },
    },
};
//# sourceMappingURL=react.js.map