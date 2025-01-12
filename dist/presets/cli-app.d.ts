import type { CreateConfigOptions } from '../types';
export declare const cliAppPreset: (options?: CreateConfigOptions) => ({
    plugins: {
        prettier: {
            rules: any;
        };
    };
    rules: {
        'prettier/prettier': ["error", {
            printWidth: number;
            singleQuote: boolean;
            trailingComma: string;
            bracketSpacing: boolean;
            semi: boolean;
            useTabs: boolean;
            tabWidth: number;
            quoteProps: string;
        }];
    };
    files: (string | string[])[];
    ignores: string[];
    language?: string;
    languageOptions?: import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.LanguageOptions;
    linterOptions?: import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.LinterOptions;
    name?: string;
    processor?: string | import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.Processor;
    settings?: import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.Settings;
} | {
    rules: {
        'no-console': string;
        'no-process-exit': string;
        '@typescript-eslint/no-explicit-any': string;
        'import/no-dynamic-require': string;
        'no-process-env'?: undefined;
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
    files: string[];
    ignores: string[];
} | {
    files: string[];
    ignores: string[];
    rules: {
        'no-process-env': string;
        'no-console'?: undefined;
        'no-process-exit'?: undefined;
        '@typescript-eslint/no-explicit-any'?: undefined;
        'import/no-dynamic-require'?: undefined;
    };
} | {
    rules: {
        '@typescript-eslint/ban-ts-comment': "off";
        '@typescript-eslint/no-explicit-any': "off";
        '@typescript-eslint/no-unused-vars': "off";
        'no-console': "off";
        'no-debugger': "off";
        'no-unused-vars': "off";
        'unused-imports/no-unused-vars': "off";
        'unused-imports/no-unused-imports': "off";
        'perfectionist/sort-imports': "off";
    };
    files: string[];
    ignores?: undefined;
})[];
