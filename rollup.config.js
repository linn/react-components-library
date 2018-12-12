import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ babel({ exclude: "node_modules/**" }), uglify() ]
};
