/* webpack.config.js */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');

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
    plugins: []
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
    //
    module.exports.push({
        ...common,
        ...config
    });
}
