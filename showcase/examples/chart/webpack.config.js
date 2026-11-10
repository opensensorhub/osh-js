/* webpack.config.js */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: path.resolve(__dirname,'chart.js'),
    // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: 'bundle.chart.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default but since we’re overriding
    // the property we’ll need to tell it to look there in addition to the
    // bower_components folder.
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../../../source')
        },
        fallback: {
            fs: false,
        }
    },
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
            },{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        server: 'https',
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: "chart.html",
            template: path.resolve(__dirname, 'chart.html')
        })
    ]
};
