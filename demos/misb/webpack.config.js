// webpack.config.common.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopywebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');

const cesiumConfig = {
  // Tell Weback to output our bundle to ./dist/bundle.js
  output: {
    filename: 'bundle.misb.js',
    // Needed to compile multiline strings in Cesium
    sourcePrefix: ''
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new   CopywebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'node_modules/cesium/Source/Workers'), to: 'Workers' },
        { from: path.resolve(__dirname, 'node_modules/cesium/Source/Assets'), to: 'Assets' },
        { from: path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'), to: 'Widgets' },
        { from: 'images', to: 'images'},
        { from: 'public', to: 'public'}
      ]
    })
  ],
};
// Now, using the cesiumConfig in your real configuration
const config = {
  ...cesiumConfig,
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'osh-js': path.resolve(__dirname, '../../source'),
      'cesium': path.resolve(__dirname, 'node_modules/cesium'),
    },
    fallback : {
      "path": require.resolve("path-browserify"),
      "crypto": false,
      fs: false
    }
  },
  node: {
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true // optional
            },
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    ...cesiumConfig.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico'
    }),
    new DefinePlugin({
      // Define relative base path in cesium for loading assets
      BASE_URL: JSON.stringify('/')
    }),
  ],
};

module.exports = config;
