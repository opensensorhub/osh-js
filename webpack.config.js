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
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default but since we’re overriding
    // the property we’ll need to tell it to look there in addition to the
    // bower_components folder.
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
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
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            }
        ]
    },
    mode: 'production',
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
        // This plugin will copy files over to ‘./dist’ without transforming them.
        // That's important because the custom-elements-es5-adapter.js MUST
        // remain in ES2015. We’ll talk about this a bit later :)
        new CopyWebpackPlugin([
            {from: 'source/ext/resources/css', to: DIR_OUTPUT + '/css'},
            {from: 'source/ext/resources/images', to: DIR_OUTPUT + '/images'},
            {from: 'source/core/resources/css', to: DIR_OUTPUT + '/css'},
            {from: 'source/core/resources/images', to: DIR_OUTPUT + '/images'},
            {from: 'source/', to: DIR_OUTPUT + '/source'},
            {from: 'libs/', to: DIR_OUTPUT+ '/libs'},
            { from: path.resolve(__dirname, 'node_modules/cesium/Source/Workers'), to: DIR_OUTPUT + '/Workers' },
            { from: path.resolve(__dirname, 'node_modules/cesium/Source/Assets'), to: DIR_OUTPUT + '/Assets' },
            { from: path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'), to: DIR_OUTPUT + '/Widgets' },
        ])
    ]
};
