/* webpack.config.js */

let CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var path = require('path');

const DIR_OUTPUT = path.resolve(__dirname, 'issues/umd/lib');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: './source/core/OSH.js',
    // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: 'main.js',
        library: 'OSH',
        // libraryTarget: 'umd',
        // globalObject: 'this',
        path: DIR_OUTPUT,
        // Needed to compile multiline strings in Cesium
        sourcePrefix: '',
    },
    // externals: ['leaflet','cesium','chart.js', 'ol', 'ol-layerswitcher','nouislider','wnumb'],
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ],
        fallback: {
            fs: false,
            path: false
        }
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]?[hash]'
                }
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'source/ext/resources/css', to: path.join(DIR_OUTPUT, 'css')},
                {from: 'source/ext/resources/images', to: path.join(DIR_OUTPUT, 'images')},
                {from: 'source/core/resources/css', to: path.join(DIR_OUTPUT, 'css')},
                {from: 'source/core/resources/images', to: path.join(DIR_OUTPUT, 'images')},
                {from: 'source/', to: path.join(DIR_OUTPUT, 'source')},
                {from: 'libs/', to: path.join(DIR_OUTPUT, 'libs')},
                { from: path.resolve(__dirname, 'node_modules/cesium/Source/Workers'), to: path.join(DIR_OUTPUT, 'Workers') },
                { from: path.resolve(__dirname, 'node_modules/cesium/Source/Assets'), to: path.join(DIR_OUTPUT, 'Assets') },
                { from: path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'), to: path.join(DIR_OUTPUT, 'Widgets') },
            ]
        })
    ]
};
