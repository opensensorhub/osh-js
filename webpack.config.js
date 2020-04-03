/* webpack.config.js */

let CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: './source/OSH.js',
    // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: '[name].js',
        library: 'osh',
        path: path.resolve(__dirname, 'dist/build'),
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
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
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devtool: 'source-map',
    externals: [
        // Regex
        // ignore cesium
        /^(cesium|\$)/i,
        //ignore chart.js
        /^(chart.js|\$)/i,
        //ignore ol
        /^(ol|\$)/i,
        //ignore leaflet
        /^(leaflet|\$)/i
    ],
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
            {from: 'images', to: 'images'},
            {from: 'libs/tree/images/tree', to: 'images'},
            {from: 'source/ext/osh/resources/css', to: 'css'},
            {from: 'source/ext/osh/resources/images', to: 'images'},
            {from: 'source/osh/resources/css', to: 'css'},
            {from: 'source/osh/resources/images', to: 'images'},
            {from: 'source/', to: '../source'},
            {from: 'libs/', to: '../libs'},
        ]),
        new WorkerPlugin(),
    ]
};
