// webpack.config.lib
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.lib'
  },
  output: {
    filename: '[name].lib',
    path: path.resolve(__dirname, 'dist'),
    // Needed to compile multiline strings in Cesium
    sourcePrefix: ''
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../../source')
    ],
    alias: {
      'osh': path.resolve(__dirname, '../../../source/osh'),
      'vue$': 'vue/dist/vue.esm.lib',
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: 'source-map',
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
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.lib` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
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
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname,'public/images'), to: 'images'},
      {from: path.resolve(__dirname,'images'), to: 'images'},
      {from: path.resolve(__dirname,'models'), to: 'models'},
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      { from: path.resolve(__dirname, 'node_modules/cesium/Source/Workers'), to: 'Workers' },
      { from: path.resolve(__dirname, 'node_modules/cesium/Source/Assets'), to: 'Assets' },
      { from: path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'), to: 'Widgets' },
    ]),
    new DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('/')
    }),
  ]
}
