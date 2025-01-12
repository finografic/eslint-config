export declare const prettier: {
    config: {
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
    };
};
