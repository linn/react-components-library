module.exports = {
    presets: [
        '@babel/preset-env',
        [
            '@babel/preset-react',
            {
                runtime: 'automatic' // React 17+ automatic JSX transform
            }
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining'
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'] // For test environment
        }
    }
};
