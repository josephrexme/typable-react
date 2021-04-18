import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  external: ['prop-types'],
  input: 'typable.js',
  output: [
    { file: 'typable.cjs.js', format: 'cjs', exports: 'default' }
  ],
  plugins: [
    nodeResolve({ preferBuiltins: false }),
    commonjs({
      include: /node_modules/
    }),
    babel({ babelHelpers: 'runtime' }),
  ]
}
