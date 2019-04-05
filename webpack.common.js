const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "./index.html",
          inject: false,
          title: 'code-link'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
      }
};