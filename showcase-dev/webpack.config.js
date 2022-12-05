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
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../source')
        }
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
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
                target: 'es2015'  // Syntax to compile to (see options below for possible values)
            }
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
        port: 9000,
        hot: true,
        https:true
    },
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'lib'), to: 'lib' },
            { from: path.resolve(__dirname, 'images'), to: 'images' }
        ])
    ]
}];

let directories = [
    'datasource-audio',
    'datasource-file',
    'datasource-sweapifetch',
    'datasource-swejson',
    'datasource-video',
    'datasources-synchronized',
    'datasources-synchronized-dynamic',
    'mqtt-utility',
    'multi-datasources-synchronized',
    'switch-realtime-batch',
    'videodata-with-control-vuejs-synchronized',
    'datasynchronizer-dynamic-add-remove'
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
    currentPlugin.push(new CopyWebpackPlugin([
        { from: path.resolve(__dirname, './' + example + '/' + directories[i] + '.js'), to: 'js' }
    ]));

    if (fs.existsSync(path.resolve(__dirname, './' + example + '/src/App.vue'))) {
        currentPlugin.push(new CopyWebpackPlugin([
            { from: path.resolve(__dirname, './' + example + '/src/App.vue'), to: 'vue/App_' + example + '.vue' },
        ]));
    }

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
