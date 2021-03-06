const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/renderer/app.tsx',
    // target instructs webpack to target electron renderer,
    target: 'electron-renderer',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ttf|woff2|png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyPlugin([
            { from: './src/renderer/app.html'},
            // copy the themes to a build themes folder,
            { from: './public/themes/default-light-theme.css', to: './themes/' },
            { from: './public/themes/default-dark-theme.css', to: './themes/' },
        ]),
        ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
}