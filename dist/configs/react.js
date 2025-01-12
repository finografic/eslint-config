import { ERROR, OFF, WARN } from '../constants.js';
import { loadPlugin } from '../utils/load-plugin.js';
const reactPlugin = loadPlugin('eslint-plugin-react');
const reactHooksPlugin = loadPlugin('eslint-plugin-react-hooks');
export const react = {
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
            'react/prop-types': OFF,
            'react/react-in-jsx-scope': OFF,
            'react/display-name': WARN,
            'react/jsx-no-target-blank': ERROR,
            'react-hooks/rules-of-hooks': ERROR,
            'react-hooks/exhaustive-deps': WARN,
        },
    },
};
//# sourceMappingURL=react.js.map