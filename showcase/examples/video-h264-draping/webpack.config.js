// webpack.config.common.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopywebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');
const webpack = require('webpack');
const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
// Cesium deps
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const PROCESS_BASE_PATH = process.cwd();

// Now, using the cesiumConfig in your real configuration
const config = {
    entry: {
        entry: path.resolve(__dirname,'video-h264-draping.js'),
    },
    output: {
        filename: 'bundle.[name].video.h264.draping.js',
        path: path.resolve(__dirname, 'dist'),
        sourcePrefix: ''
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../../../source'),
            'cesium': path.resolve(__dirname, 'node_modules/cesium'),
        },
        fallback : {
            "path": require.resolve("path-browserify"),
            "crypto": false,
            fs: false
        }
    },
    module: {
        unknownContextCritical : false,
    },
    node: {
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    devServer: {
        https: true,
        compress: false,
        hot: true
    },
    module: {
        unknownContextCritical: false,
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'video-h264-draping.html'),
            filename: 'video-h264-draping.html'
        }),
        new DefinePlugin({
            // Define relative base path in cesium for loading assets
            BASE_URL: JSON.stringify('/')
        }),
        new   CopywebpackPlugin({
            patterns: [
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'ThirdParty'), to: 'ThirdParty', force:true },
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Assets'), to: 'Assets', force:true },
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Widgets'), to: 'Widgets', force:true }
            ]
        }),
        new nodePolyfillWebpackPlugin(), // fix Webpack Buffer not defined
    ],
};

module.exports = config;
