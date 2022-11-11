// webpack.config.common.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
    new CopywebpackPlugin([ { from: 'images', to: 'images'} ])
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
      'osh-js': path.resolve(__dirname, '../../../source'),
      'cesium': path.resolve(__dirname, 'node_modules/cesium'),
    }
  },
  node: {
    fs: 'empty'
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
      },{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },{
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader', options: { name: 'Worker.[hash].js' } }
      }
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    https:true
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    ...cesiumConfig.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new DefinePlugin({
      // Define relative base path in cesium for loading assets
      BASE_URL: JSON.stringify('/')
    }),
  ],
};

module.exports = config;
