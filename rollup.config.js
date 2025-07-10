import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

const externalPackages = [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-is',
    '@mui/material',
    '@mui/icons-material',
    '@mui/lab'
];

export default {
    input: './index.js',
    output: [
        { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true },
        { file: 'dist/index.esm.js', format: 'es', sourcemap: true }
    ],
    external: id => externalPackages.some(pkg => id === pkg || id.startsWith(pkg + '/')),
    plugins: [
        peerDepsExternal(),
        json(),
        postcss(),
        resolve({ extensions: ['.js', '.jsx'] }),
        babel({ babelHelpers: 'bundled', exclude: 'node_modules/**', extensions: ['.js', '.jsx'] }),
        commonjs(),
        terser({
            keep_classnames: true,
            keep_fnames: true,
            mangle: {
                keep_classnames: true,
                keep_fnames: true
            }
        })
    ]
};
