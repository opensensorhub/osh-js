// webpack.config.common.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Common configs
const path = require('path');

// Now, using the cesiumConfig in your real configuration
const config = {
  entry: path.resolve(__dirname,'chart-archive-realtime.js'),
  output: {
    filename: 'bundle.chart-archive-realtime.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'osh-js': path.resolve(__dirname, '../../../source')
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
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    index: 'chart-archive-realtime.html',
    https:true
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'chart-archive-realtime.html'),
      filename: './chart-archive-realtime.html',
      favicon: path.resolve(__dirname,'favicon.ico')
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('/')
    }),
  ],
};

module.exports = config;
