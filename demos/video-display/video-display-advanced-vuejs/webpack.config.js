// webpack.config.lib
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      app: './src/main.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      splitChunks: {
        maxSize: 1024*1024,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          },
          osh: {
            test: /[\\/]source[\\/]/,
            name: 'osh',
            enforce: true,
            chunks: 'all'
          }
        }
      },
      runtimeChunk: true
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
      ],
      alias: {
        'osh-js': path.resolve(__dirname, '../../../source'),
        'vue$': 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true,
      https: true
    },
    devtool:  'eval-source-map',
    node: {
      fs: 'empty'
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
          test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
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
          use: {loader: 'worker-loader'}
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
        {from: path.resolve(__dirname, 'public/images'), to: 'images'},
        {from: path.resolve(__dirname, 'lib'), to: 'lib'}
      ])
    ]
  }
}
