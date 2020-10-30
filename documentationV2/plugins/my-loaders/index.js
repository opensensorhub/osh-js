const path = require('path');
const CopywebpackPlugin = require('copy-webpack-plugin');

module.exports = function(context, options) {
    return {
        name: 'loaders',
        configureWebpack(config, isServer) {
            return {
                module: {
                    rules: [
                        {
                            test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]'
                            }
                        },
                        {
                            test: /\.worker\.js$/,
                            use: {loader: 'worker-loader'}
                        }
                    ]
                },
                resolve: {
                    alias: {
                        'osh': path.resolve(__dirname, '../../../source/osh'),
                        'cesium': path.resolve(__dirname, '../../node_modules/cesium'),
                    }
                },
                amd: {
                    // Enable webpack-friendly use of require in Cesium
                    toUrlUndefined: true
                },
                node: {
                    // Resolve node module use of fs
                    fs: 'empty'
                },
                plugins: [
                    // Copy Cesium Assets, Widgets, and Workers to a static directory
                    new CopywebpackPlugin([ { from:  'node_modules/cesium/Source/Workers', to: 'Workers' } ]),
                    new CopywebpackPlugin([ { from:  'node_modules/cesium/Source/Assets', to: 'Assets' } ]),
                    new CopywebpackPlugin([ { from:  'node_modules/cesium/Source/Widgets', to: 'Widgets' } ])
                ]
            };
        },
    };
};
