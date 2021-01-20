module.exports = {
    stories: ['../src/**/*.stories.@(js|mdx)'],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-jest',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null
            }
        }
    ]
};
