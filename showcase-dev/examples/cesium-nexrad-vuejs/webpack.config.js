/* webpack.config.js */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// ??
var CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const PROCESS_BASE_PATH = process.cwd();

// Cesium deps
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
//

const config = {
    entry: path.resolve(__dirname,'cesium-nexrad-vue.js'),
    output: {
      filename: 'bundle.cesium-nexrad-vue.js',
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
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9002,
      hot: true,
      index: 'cesium-nexrad-vue.html',
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'cesium-nexrad-vue.html'),
        filename: './cesium-nexrad-vue.html',
        favicon: path.resolve(__dirname,'favicon.ico')
      }),
      new DefinePlugin({
        // Define relative base path in cesium for loading assets
        BASE_URL: JSON.stringify('/')
      }),
      new CopyWebpackPlugin([
            { from: path.resolve(__dirname,'images'), to: 'images'},
            { from: path.resolve(__dirname,'css'), to: 'css'},
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, cesiumWorkers), to: 'Workers', force:true },
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Assets'), to: 'Assets', force:true },
            { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Widgets'), to: 'Widgets', force:true }
      ])
    ],
  };

module.exports = config;

// ???
// module.exports = {
//         // This plugin will copy files over to ‘./dist’ without transforming them.
//         // That's important because the custom-elements-es5-adapter.js MUST
//         // remain in ES2015. We’ll talk about this a bit later :)
//         new CopyWebpackPlugin([
//             { from: path.resolve(__dirname,'images'), to: 'images'},
//             { from: path.resolve(__dirname,'css'), to: 'css'},
//             { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, cesiumWorkers), to: 'Workers', force:true },
//             { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Assets'), to: 'Assets', force:true },
//             { from: path.join(PROCESS_BASE_PATH+'/'+cesiumSource, 'Widgets'), to: 'Widgets', force:true }
//         ])
//     ]
// };
