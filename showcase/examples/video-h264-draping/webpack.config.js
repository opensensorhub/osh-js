// webpack.config.common.js
const CopywebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');
// Cesium deps
const cesiumSource = 'node_modules/cesium/Build/Cesium';
const PROCESS_BASE_PATH = process.cwd();
const cesiumBaseUrl = "cesiumStatic";

// Now, using the cesiumConfig in your real configuration
const config = {
    context: __dirname,
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
            'osh-js': path.resolve(__dirname, '../../../source')
        },
        fallback : {
            "path": require.resolve("path-browserify"),
            "crypto": false,
            fs: false
        },
        mainFiles: ["index", "Cesium"],
    },
    devServer: {
        https: false,
        compress: false,
        hot: true
    },
    module: {
        unknownContextCritical: false,
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                type: "asset/inline",
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
            CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
        }),
        new   CopywebpackPlugin({
            patterns: [
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'ThirdParty'), to: `${cesiumBaseUrl}/ThirdParty`, force:true },
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Workers'), to: `${cesiumBaseUrl}/Workers`, force:true },
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Assets'), to: `${cesiumBaseUrl}/Assets`, force:true },
                { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Widgets'), to: `${cesiumBaseUrl}/Widgets`, force:true }
            ]
        }),
    ],
    mode: "development",
    devtool: "eval",
};

module.exports = config;
