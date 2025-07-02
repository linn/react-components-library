import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const babelrc = {
    presets: ['@babel/preset-env', '@babel/react'],
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-optional-chaining']
};

export default [
    {
        input: 'index.js',
        plugins: [
            babel({ babelrc: false, ...babelrc, exclude: 'node_modules/**' }),
            terser({ keep_fnames: true }),
            postcss({
                extensions: ['.css']
            })
        ],
        output: {
            file: 'dist/bundle.min.js',
            format: 'cjs',
            esModule: false
        }
    }
];
