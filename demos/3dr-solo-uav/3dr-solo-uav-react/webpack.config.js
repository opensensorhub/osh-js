// webpack.config.common.js
const CopywebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');

const cesiumConfig = {
  // Tell Webpack which file kicks off our app.
  entry: path.resolve(__dirname,'src/index.js'),
  // Tell Weback to output our bundle to ./dist/bundle.js
  output: {
    filename: 'bundle.3dr.js',
    path: path.resolve(__dirname, 'dist'),
    // Needed to compile multiline strings in Cesium
    sourcePrefix: ''
  },
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
    new CopywebpackPlugin([ { from: 'models', to: 'models'} ]),
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
      'osh': path.resolve(__dirname, '../../../source'),
      'cesium': path.resolve(__dirname, 'node_modules/cesium'),
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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
