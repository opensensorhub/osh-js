// webpack.config.common.js
const CopywebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

// Common configs
const path = require('path');

// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const cesiumConfig = {
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  output: {
    // Needed to compile multiline strings in Cesium
    sourcePrefix: '',
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopywebpackPlugin([ { from: path.resolve(__dirname, 'node_modules/cesium/Source/Workers'), to: 'Workers' } ]),
    new CopywebpackPlugin([ { from: path.resolve(__dirname, 'node_modules/cesium/Source/Assets'), to: 'Assets' } ]),
    new CopywebpackPlugin([ { from: path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'), to: 'Widgets' } ]),
    new CopywebpackPlugin([ { from: 'images', to: 'images'} ]),
    new CopywebpackPlugin([ { from: 'models', to: 'models\''} ]),
    new DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('')
    }),
  ],
};
// Now, using the cesiumConfig in your real configuration
const config = {
  ...cesiumConfig,
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'osh': path.resolve(__dirname, '../../../source/osh'),
      'cesium': path.resolve(__dirname, 'node_modules/cesium'),
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /^((?!es2015-)[\s\S])*\.js$/,
        use: {
          loader: 'buble-loader'
        },
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, '.')
        ]
      },{
        test: /\.js$/,
        enforce: 'pre',
        include: path.resolve(__dirname, cesiumSource),
        use: [{
          loader: 'strip-pragma-loader',
          options: {
            pragmas: {
              debug: false
            }
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          'file-loader',
        ],
      },{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },

  plugins: [
  ...cesiumConfig.plugins,
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new WorkerPlugin()
],
};

module.exports = config;
