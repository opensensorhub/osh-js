// webpack.config.common.js
const CopywebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');
const webpack = require("webpack");

const PROCESS_BASE_PATH = process.cwd();

// Cesium deps
const cesiumSource = 'node_modules/cesium/Build/Cesium';
const cesiumBaseUrl = "cesiumStatic";

const cesiumConfig = {
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopywebpackPlugin({
          patterns: [
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'ThirdParty'), to: `${cesiumBaseUrl}/ThirdParty`, force:true },
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Workers'), to: `${cesiumBaseUrl}/Workers`, force:true },
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Assets'), to: `${cesiumBaseUrl}/Assets`, force:true },
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Widgets'), to: `${cesiumBaseUrl}/Widgets`, force:true },
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
      '@cesium/engine': path.resolve(__dirname, 'node_modules/@cesium/engine'),
      '@cesium/widgets': path.resolve(__dirname, 'node_modules/@cesium/widgets'),
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
      },
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
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
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
    }),
],
};

module.exports = config;
