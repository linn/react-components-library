// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
const storybook = require("eslint-plugin-storybook");
const react = require('eslint-plugin-react');
const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactHooks = require('eslint-plugin-react-hooks');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,test.js,stories.js}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'unused-imports': unusedImports,
            storybook
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.browser
            }
        },
        rules: {
            // ... any rules you want
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-unused-vars': 'error'
        }
    },
    eslintPluginPrettierRecommended
];
