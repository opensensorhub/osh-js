const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let config = {
    entry: ["./Showcase/samples/openlayers-location.js"],
    output: {
        path: path.resolve(__dirname, "./Showcase/dist"),
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'OSH',
            template: './Showcase/samples/openlayers-location.html'
        }),
        new CopyPlugin([
            { from: 'Toolkit/src/css/*', to: './css', flatten:true },
            { from: 'Toolkit/src/images/*', to: './images', flatten:true },
            { from: 'Showcase/images', to: './images/', flatten:false },
            { from: 'Toolkit/src/css/font-awesome-4.6.3', to: './css/font-awesome-4.6.3/', flatten:false },
        ]),
    ],
    devServer: {
        hot: true,
    },
};
module.exports = config;
