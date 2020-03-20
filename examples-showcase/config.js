const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExampleBuilder = require('./example-builder');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const cesiumSource = '../node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..');

const examples = fs.readdirSync(src)
  .filter(name => /^(?!index).*\.html$/.test(name))
  .map(name => name.replace(/\.html$/, ''));

const entry = {};
examples.forEach(example => {
  entry[example] = `./${example}.js`;
});

module.exports = {
  context: src,
  target: 'web',
  entry: entry,
  stats: 'minimal',
  module: {
    rules: [
        {
      test: /^((?!es2015-)[\s\S])*\.js$/,
      use: {
        loader: 'buble-loader'
      },
      include: [
        path.join(__dirname, '..', '..', 'src'),
        path.join(__dirname, '..')
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: [ 'url-loader' ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        // Do not minify examples that inject code into workers
        exclude: [/(color-manipulation|region-growing|raster)\.js/]
      })
    ],
    runtimeChunk: {
      name: 'common'
    },
    splitChunks: {
      name: 'common',
      chunks: 'initial',
      minChunks: 2
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExampleBuilder({
      templates: path.join(__dirname, '..', 'templates'),
      common: 'common'
    }),
    new CopyPlugin([
      {from: '../Toolkit/src/osh/css/osh.css', to: 'css'},
      {from: 'data', to: 'data'},
      {from: 'resources', to: 'resources'},
      {from: 'Jugl.js', to: 'Jugl.js'},
      {from: 'index.html', to: 'index.html'},
      { from: path.join(cesiumSource, cesiumWorkers), to: 'cesium/Workers' },
      { from: path.join(cesiumSource, 'Assets'), to: 'cesium/Assets' },
      { from: path.join(cesiumSource, 'Widgets'), to: 'cesium/Widgets' }
    ]),
  ],
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', '..', 'build', 'examples')
  },
  node: {
    fs: 'empty' // required by ol-mapbox-stlye
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  resolve: {
    alias: {
      // allow imports from 'ol/module' instead of specifiying the source path
      osh: path.join(__dirname, '..', '..', 'src', 'osh'),
      // cesium: path.resolve(__dirname, cesiumSource)
    }
  }
};
