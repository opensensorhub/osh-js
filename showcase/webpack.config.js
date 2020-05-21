/* webpack.config.lib */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');
var fs = require('fs');

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
        new CleanWebpackPlugin()
    ]
};

module.exports = [{
    ...common,
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8081,
        hot: true
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
      new CopyWebpackPlugin([
          { from: path.resolve(__dirname, 'lib'), to:'lib'},
          { from: path.resolve(__dirname, 'images'), to:'images'}
      ])
    ]
}];

let directories = ['cesium-fois', 'cesium-location','chart', 'discovery',
    'leaflet-location', 'leaflet-location-fois', 'leaflet-location-heading',
    'leaflet-location-path', 'openlayers-location', 'range-slider','video-gps-sync',
    'video-h264','video-h264-draping', 'video-h264-transferable','video-mjpeg'];

const plug= {};

for(let i=0;i < directories.length;i++) {
    let example = 'examples/'+directories[i];
    let config = require(path.resolve(__dirname, './' + example + '/webpack.config.js'));

    //
    config.output.path = path.resolve(__dirname, 'dist');

    // removes clean webpack plugin because it is causing issues while copying files/dir
    let currentPlugin = [];
    for(let j=0;j < config.plugins.length;j++) {
        if(config.plugins[j].constructor.name !== 'CleanWebpackPlugin') {
            currentPlugin.push(config.plugins[j]);
        }
    }
    currentPlugin.push(new CopyWebpackPlugin([
        {from: path.resolve(__dirname, './' + example + '/'+directories[i]+'.js'), to: 'js'},
    ]));

    delete config.devServer;
    delete config.resolve;
    delete config.devtool;
    config.plugins = currentPlugin;

    //
    module.exports.push({
        ...common,
        ...config
    });
}
