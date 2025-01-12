import { ERROR, OFF } from '../constants.js';
import { loadPlugin } from '../utils/load-plugin.js';
const lodashPlugin = loadPlugin('eslint-plugin-lodash');
const rules = lodashPlugin.rules;
export const lodash = {
    recommended: {
        plugins: {
            lodash: {
                rules: rules,
            },
        },
        rules: {
            'lodash/prefer-lodash-method': OFF,
            'lodash/prefer-lodash-typecheck': OFF,
            'lodash/import-scope': [ERROR, 'method'],
        },
    },
};
//# sourceMappingURL=lodash.js.map