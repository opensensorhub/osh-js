/* webpack.config.js */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');
const WorkerPlugin = require('worker-plugin');

let common = {
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '../source')
        ],
    },
    module: {
        rules: [
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
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    plugins: [
      new WorkerPlugin( {
        globalObject: false
    })]
};

module.exports = [{
    ...common,
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new CopyWebpackPlugin([
        ])
    ]
}];

let directories = ['cesium-fois', 'cesium-location','chart', 'discovery',
    'leaflet-location', 'entity', 'leaflet-location-fois', 'leaflet-location-heading',
    'leaflet-location-path', 'openlayers-location', 'ptz-tasking', 'rangeslider','video-gps-sync',
    'video-h264','video-h264-draping', 'video-mjpeg'];

for(let i=0;i < directories.length;i++) {
    let example = 'examples/'+directories[i];
    let config = require(path.resolve(__dirname, './' + example + '/webpack.config.js'));
    //
    config.output.path = path.resolve(__dirname, 'dist');
    delete config.devServer;
    delete config.resolve;
    delete config.devtool;

    // hack for issue https://github.com/GoogleChromeLabs/worker-plugin/issues/27
    let pluginsLength = config.plugins.length;
    config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'WorkerPlugin');
    if(pluginsLength !== 0 && pluginsLength != config.plugins) {
        config.plugins.push(new WorkerPlugin());
    }
    // end hack

    module.exports.push({
        ...common,
        ...config
    });
}
