module.exports = {
    core: {
        builder: 'webpack5',
      },
    stories: ['../src/**/*.stories.@(js|mdx)'],
    addons: [
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null
            }
        },
        '@storybook/addon-essentials',
        '@storybook/addon-actions'
    ]
};
