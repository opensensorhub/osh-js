/* webpack.config.lib */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var path = require('path');
var fs = require('fs');

let common = {
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../source')
        },
        fallback: {
            fs: false
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)$/,
            use: [
                'file-loader',
            ],
        }, {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.js$/,
            loader: 'esbuild-loader',
            options: {
                loader: 'js',  // Remove this if you're not using JSX
                target: 'es2020'  // Syntax to compile to (see options below for possible values)
            }
        }
        ]
    },
    node: {
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

module.exports = [{
    ...common,
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    optimization: {
        minimize: false
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        server: 'https'
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'lib'), to: 'lib' },
                { from: path.resolve(__dirname, 'images'), to: 'images' }
            ]
        })
    ]
}];

let directories = [
    'audio',
    'audio-with-control-vuejs',
    'audio-video-synchronized-with-control-vuejs',
    'avl',
    'avl-with-control-vuejs',
    'cesium-fois',
    'cesium-frustum',
    'cesium-location',
    'cesium-location-opts',
    'cesium-location-path',
    'chart',
    'chart-archive-realtime',
    'chart-archive-realtime-batch',
    'chart-archive-realtime-synchronized',
    'deckgl-location',
    'leaflet-location',
    'leaflet-location-fois',
    'leaflet-location-heading',
    'leaflet-location-path',
    'leaflet-location-timerange',
    'mapbox-location-path-heading',
    'mqtt',
    'openlayers-location',
    'openlayers-location-heading',
    'ptz-tasking',
    'tasking',
    'video-h264',
    'video-h264-draping',
    'video-h264-webcodec-api',
    'video-map-multiple-datasource',
    'video-mjpeg',
    'video-with-control-vuejs-synchronized',
    'zIndex-location-path',
];

const plug = {};

for (let i = 0; i < directories.length; i++) {
    let example = 'examples/' + directories[i];
    let config = require(path.resolve(__dirname, './' + example + '/webpack.config.js'));

    //
    config.output.path = path.resolve(__dirname, 'dist');

    // removes clean webpack plugin because it is causing issues while copying files/dir
    let currentPlugin = [];
    for (let j = 0; j < config.plugins.length; j++) {
        if (config.plugins[j].constructor.name !== 'CleanWebpackPlugin') {
            currentPlugin.push(config.plugins[j]);
        }
    }
    currentPlugin.push(new CopyWebpackPlugin({
        patterns: [
            { from: path.resolve(__dirname, './' + example + '/' + directories[i] + '.js'), to: 'js' }
        ]
    }));

    if (fs.existsSync(path.resolve(__dirname, './' + example + '/src/App.vue'))) {
        currentPlugin.push(new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, './' + example + '/src/App.vue'), to: 'vue/App_' + example + '.vue'}
            ]
        }));
    }

    delete config.devServer;
    delete config.resolve;
    delete config.devtool;
    delete config.module;
    config.plugins = currentPlugin;

    //
    module.exports.push({
        ...common,
        ...config
    });
}
