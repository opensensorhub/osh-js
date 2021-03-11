// webpack.config.lib
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

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
        'vue$': 'vue/dist/vue.esm.js',
        'osh-js': path.resolve(__dirname, '../../source')
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true,
    },
    devtool: (env.NODE_ENV === 'production') ? 'false' :
      'source-map',
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
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
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
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
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
        {from: path.resolve(__dirname, 'public/data'), to: 'data'},
        {from: path.resolve(__dirname, 'lib/osh-js/source'), to: 'lib/osh-js/source'}
      ]),
      new Dotenv({
        path: (env.NODE_ENV === 'production') ? path.resolve(__dirname, '.env.production') :
          (env.NODE_ENV === 'public') ?   path.resolve(__dirname, '.env.public') :
            path.resolve(__dirname, '.env.development'), // load this now instead of the ones in '.env'
      })
    ]
  }
}
