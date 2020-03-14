const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: "./Showcase/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'OSH',
            template: './Showcase/index.html'
        })
    ],
    devServer: {
        contentBase: [path.join(__dirname, "Showcase"),path.join(__dirname, "."),path.join(__dirname, "Showcase/samples")],
        publicPath: '/',
        hot: true,
    },
};
module.exports = config;
