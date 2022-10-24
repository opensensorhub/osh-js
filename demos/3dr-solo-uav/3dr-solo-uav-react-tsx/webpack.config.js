// webpack.config.common.js
const CopywebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');

const cesiumConfig = {
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopywebpackPlugin({
          patterns: [
            {from: path.resolve(__dirname, 'node_modules/cesium/Source/Workers'), to: 'Workers'},
            {from: path.resolve(__dirname, 'node_modules/cesium/Source/Assets'), to: 'Assets'},
            {from: path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'), to: 'Widgets'},
            {from: 'models', to: 'models'}
          ],
          options: {
            concurrency: 100,
          }
    }),
  ],
};
// Now, using the cesiumConfig in your real configuration
const config = {
  ...cesiumConfig,
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    alias: {
      'osh-js': path.resolve(__dirname, '../../../source'),
      'cesium': path.resolve(__dirname, 'node_modules/cesium'),
    },
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "crypto" : false,
      "path": false,
      "fs": false
    }
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
        use: { loader: 'worker-loader', options: { filename: 'Worker.[chunkhash].js' } }
      }
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    https:true
  },
  stats: {
    children: true,
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  plugins: [
  ...cesiumConfig.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
],
};

module.exports = config;
