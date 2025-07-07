import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import pkg from './package.json' assert { type: 'json' };

export default {
    input: './index.js',
    output: [
        { file: pkg.main, format: 'cjs', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true }
    ],
    external: id =>
        ['react', 'react-dom', 'react/jsx-runtime', 'react-is'].some(
            pkg => id === pkg || id.startsWith(pkg + '/')
        ),
    plugins: [
        peerDepsExternal(),
        json(),
        postcss(),
        resolve({ extensions: ['.js', '.jsx'] }),
        babel({ babelHelpers: 'bundled', exclude: 'node_modules/**', extensions: ['.js', '.jsx'] }),
        commonjs(),
        terser()
    ]
};
