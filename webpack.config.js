const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: {
        index: './src/main.js'
    },
    plugins: [
        new HtmlWebPackPlugin({title: 'Longue Vue'})
    ],
    output: {
        path: path.resolve(appDirectory, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        publicPath: "auto",
        assetModuleFilename: '[path][name].[hash][ext][query]',
        library: "langQcClient"
    },
    devServer: {
        static: './dist',
        allowedHosts: 'all',
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        compress: true
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                use: 'svelte-loader'
            },
            {
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                  fullySpecified: false
                }
            },
            {
                test: /\.png$/i,
                type: "asset/resource"
            }
        ]
    }
}
