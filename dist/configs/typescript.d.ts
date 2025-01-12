export declare const typescript: {
    recommended: {
        plugins: {
            '@typescript-eslint': {
                rules: any;
            };
        };
        languageOptions: {
            parser: any;
            parserOptions: {
                ecmaVersion: "latest";
                sourceType: "module";
            };
        };
        rules: {
            'no-unused-vars': "off";
            'no-undef': "off";
            'no-redeclare': "off";
            '@typescript-eslint/no-explicit-any': "warn";
            '@typescript-eslint/no-empty-interface': "warn";
            '@typescript-eslint/no-empty-function': "off";
            '@typescript-eslint/no-non-null-assertion': "off";
            '@typescript-eslint/explicit-module-boundary-types': "off";
            '@typescript-eslint/ban-types': "off";
            '@typescript-eslint/no-namespace': "off";
            '@typescript-eslint/ban-ts-comment': "off";
            '@typescript-eslint/no-unused-vars': ["warn", {
                argsIgnorePattern: string;
                varsIgnorePattern: string;
                caughtErrorsIgnorePattern: string;
            }];
        };
    };
    strict: {
        rules: {
            '@typescript-eslint/no-explicit-any': "error";
            '@typescript-eslint/explicit-module-boundary-types': "error";
            '@typescript-eslint/no-non-null-assertion': "error";
            'no-unused-vars': "off";
            'no-undef': "off";
            'no-redeclare': "off";
            '@typescript-eslint/no-empty-interface': "warn";
            '@typescript-eslint/no-empty-function': "off";
            '@typescript-eslint/ban-types': "off";
            '@typescript-eslint/no-namespace': "off";
            '@typescript-eslint/ban-ts-comment': "off";
            '@typescript-eslint/no-unused-vars': ["warn", {
                argsIgnorePattern: string;
                varsIgnorePattern: string;
                caughtErrorsIgnorePattern: string;
            }];
        };
        plugins: {
            '@typescript-eslint': {
                rules: any;
            };
        };
        languageOptions: {
            parser: any;
            parserOptions: {
                ecmaVersion: "latest";
                sourceType: "module";
            };
        };
    };
};
