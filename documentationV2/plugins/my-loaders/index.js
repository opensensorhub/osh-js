const path = require('path');

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
                        'osh': path.resolve(__dirname, '../../../source/osh')
                    }
                }
            };
        },
    };
};
