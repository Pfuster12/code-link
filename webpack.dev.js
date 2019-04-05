const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { spawn } = require('child_process')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    devServer: {
        contentBase: './dist',
        before() {
            spawn(
              'electron',
              ['.'],
              { shell: true, env: process.env, stdio: 'inherit' }
            )
            .on('close', code => process.exit(0))
            .on('error', spawnError => console.error(spawnError))
          }
    }
});