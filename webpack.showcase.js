const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: ["./Showcase/samples/openlayers-location.js"],
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'OSH',
            template: './Showcase/samples/openlayers-location.html'
        })
    ],
    devServer: {
        hot: true,
    },
};
module.exports = config;
