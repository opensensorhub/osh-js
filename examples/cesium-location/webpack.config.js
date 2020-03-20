/* webpack.config.js */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Cesium deps
const TerserPlugin = require('terser-webpack-plugin');
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
//

var path = require('path');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: './cesium-location.js',
    // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
                test: /^((?!es2015-)[\s\S])*\.js$/,
                use: {
                    loader: 'buble-loader'
                },
                include: [
                    path.join(__dirname, '..', '..', 'src'),
                    path.join(__dirname, '..')
                ]
            },{
                test: /\.js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, cesiumSource),
                use: [{
                    loader: 'strip-pragma-loader',
                    options: {
                        pragmas: {
                            debug: false
                        }
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                // Do not minify examples that inject code into workers
                exclude: [/(color-manipulation|region-growing|raster)\.js/]
            })
        ],
        runtimeChunk: {
            name: 'common'
        },
        splitChunks: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2
        }
    },
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
        // This plugin will generate an index.html file for us that can be used
        // by the Webpack dev server. We can give it a template file (written in EJS)
        // and it will handle injecting our bundle for us.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'cesium-location.html')
        }),
        // This plugin will copy files over to ‘./dist’ without transforming them.
        // That's important because the custom-elements-es5-adapter.js MUST
        // remain in ES2015. We’ll talk about this a bit later :)
        new CopyWebpackPlugin([
        {from: '../../Toolkit/src/osh/css/osh.css', to: 'css'},
        {from: 'images', to: 'images'},
        { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
        { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
        { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
        ])
    ]
};
