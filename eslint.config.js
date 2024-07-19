import eslintPluginSvelte from 'eslint-plugin-svelte';

export default [
    // add more generic rule sets here, such as:
    // js.configs.recommended,
    ...eslintPluginSvelte.configs['flat/recommended'],
    {
        "files": [ "**/*.svelte" ],
        "parser": "svelte-eslint-parser",
        "extends": [ "eslint:recommended", "plugin:svelte/recommended" ],
        "rules": {
            "svelte/no-at-html-tags": "off",
            "svelte/no-target-blank": "off",
            "svelte/valid-compile": [
                "error",
                {
                        "ignoreWarnings": true
                }
            ],
            "no-undef": "off",
            "no-fallthrough": "off",
            "no-mixed-spaces-and-tabs": "off",
            "no-redeclare": "off",
            "no-with": "off",
            "no-prototype-builtins": "off",
            "no-misleading-character-class": "off",
            "no-async-promise-executor": "off",
            "no-import-assign": "off",
            "no-sparse-arrays": "off",
            "no-useless-escape": "off",
            "no-empty": [
                "error",
                { "allowEmptyCatch": true }
            ],
            "no-unused-vars": [
                "warn",
                {
                        "vars": "none",
                        "args": "after-used",
                        "ignoreRestSiblings": false
                }
            ]
        }
    }
];
