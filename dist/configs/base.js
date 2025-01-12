import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
const flatConfigs = tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended);
export const base = {
    recommended: flatConfigs[0],
};
//# sourceMappingURL=base.js.map