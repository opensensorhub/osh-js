// webpack.config.common.js
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');
const webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Cesium deps
const cesiumSource = 'node_modules/cesium/Build/Cesium';
const cesiumBaseUrl = "cesiumStatic";

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'osh': path.resolve(__dirname, '../../../source'),
      '@cesium/engine': path.resolve(__dirname, 'node_modules/@cesium/engine'),
      '@cesium/widgets': path.resolve(__dirname, 'node_modules/@cesium/widgets'),
    }
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    https:true
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: {
          and: [/node_modules/], // Exclude libraries in node_modules ...
          not: [/cesium/], // Except Cesium because it uses modern syntax
        },
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults, not ie 11" }],
              ],
              plugins: ["@babel/plugin-transform-optional-chaining"],
            },
          },
          // Babel understands the import.meta syntax but doesn't transform it in any way
          // However Webpack can't parse this and throws an error for an unexpected token
          // we need to use this extra loader so Webpack can actually bundle the code
          // https://www.npmjs.com/package/@open-wc/webpack-import-meta-loader
          require.resolve("@open-wc/webpack-import-meta-loader"),
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          'file-loader',
        ],
      },{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },{
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader', options: { name: 'Worker.[hash].js' } }
      }
    ],
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname,'models'), to: 'models'},
      { from: path.join(cesiumSource, "Workers"), to: `${cesiumBaseUrl}/Workers`, },
      { from: path.join(cesiumSource, "ThirdParty"), to: `${cesiumBaseUrl}/ThirdParty`, },
      { from: path.join(cesiumSource, "Assets"), to: `${cesiumBaseUrl}/Assets`, },
      { from: path.join(cesiumSource, "Widgets"), to: `${cesiumBaseUrl}/Widgets`, },
    ]),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
    }),
],
};
