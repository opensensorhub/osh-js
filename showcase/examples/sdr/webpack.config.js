/* webpack.config.js */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: path.resolve(__dirname, 'sdr.js'),
    // Tell Webpack to output our bundle to ./dist/bundle.sdr.js
    output: {
        filename: 'bundle.sdr.js',
        path: path.resolve(__dirname, 'dist'),
        // replaces clean-webpack-plugin: wipe the output directory before each build
        clean: true
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack looks in node_modules by default, but since we are overriding the
    // property we have to list it ourselves.
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            // fall back to the showcase's modules, and to the normal upward lookup, so the
            // example still builds when its own dependencies have not been installed
            path.resolve(__dirname, '../../node_modules'),
            'node_modules',
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../../../source')
        },
        // the osh-js core guards its use of 'fs', which has no browser equivalent
        fallback: {
            fs: false
        }
    },
    // These rules tell Webpack how to process different module types.
    //
    // Note that there is deliberately no rule for .js here. The osh-js core is modern ES, which
    // Webpack 5 parses natively, and its datasources load their worker with
    //     new Worker(new URL('./worker/DataSource.worker.js', import.meta.url), {type: 'module'})
    // which Webpack 5 understands and emits as its own chunk. Putting a transpiling loader
    // (esbuild-loader, babel-loader) on .js rewrites import.meta before Webpack sees it, the
    // worker URL then resolves to nothing, and the datasource silently never connects.
    // There is no .worker.js rule either, for the same reason: worker-loader is a Webpack 4
    // workaround and conflicts with the native support.
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource'
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 9000,
        hot: true,
        // Served over plain http on purpose. The example talks to a SensorHub node over ws://,
        // and a page served over https cannot open an insecure WebSocket: the browser blocks it
        // as mixed content and the spectrum never arrives. Switch this to 'https' only when the
        // node is on https/wss too (and set TLS to true in sdr.js).
        server: 'http',
        open: '/sdr.html'
    },
    devtool: 'source-map',
    plugins: [
        // This plugin generates the html page that loads our bundle, from the template below.
        new HtmlWebpackPlugin({
            filename: 'sdr.html',
            template: path.resolve(__dirname, 'sdr.html')
        })
    ]
};
