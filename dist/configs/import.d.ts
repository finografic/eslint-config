export declare const imports: {
    recommended: {
        plugins: {
            import: {
                rules: any;
            };
        };
        rules: {
            'import/first': "error";
            'import/no-duplicates': "error";
            'import/no-mutable-exports': "error";
            'import/no-named-as-default': "off";
            'import/no-named-as-default-member': "off";
            'import/order': ["error", {
                groups: string[];
                'newlines-between': string;
            }];
        };
    };
};
