# video-display
This is a VueJS client based on Cesium & OSH Toolkit. It displays 3DR Solo: orientation,location & gimbal orientation.
Moreover, it draps the video content into the Cesium Globe.
 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev 
```

### Compiles and minifies for production
```
npm run prod
```

## Customize configuration
The configuration uses webpack. 
### Webpack configuration file
You need to specify the app entry point and the output:
```shell script
module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // Needed to compile multiline strings in Cesium
    sourcePrefix: ''
  },
  ...
}
```
Cesium recommends using the following setups:
See [Cesium and webpack](https://cesium.com/docs/tutorials/cesium-and-webpack/)
- output.sourcePrefix: '' overrides the webpack default for adding a \t tab character before each line. CesiumJS has some multiline strings, so we need to override this default with an empty prefix ''
- amd.toUrlUndefined: true tells CesiumJS that the version of AMD webpack uses to evaluate require statements is not compliant with the standard toUrl function
- node.fs: 'empty' resolves some third-party usage of the fs module, which is targeted for use in a Node environment rather than the browser
```shell script
amd: {
  // Enable webpack-friendly use of require in Cesium
  toUrlUndefined: true
},
node: {
  fs: 'empty'
},
```

Add a OSH  alias so we can reference it in our app code:
```shell script
 resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../../source')
    ],
    alias: {
      'core': path.resolve(__dirname, '../../../source/core'),
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.lib', '.vue', '.json']
  },
```

You can use the following loader which works very well with most of the configuration:
```shell script
module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
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
        test: /\.worker\.lib$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
```

Finally, setup the plugins to:
- copy assets from library to our APP
- define CESIUM base URL
- Use VueLoader
- Point to public/index.html template

```shell script
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
```
### package.json file

The package.json file is used by node to install required packages. Our App contains some specific parameter:

```shell script
  "scripts": {
    "postinstall": "patch-package",
    ...
  },
  "devDependencies": {
    ...
    "patch-package": "^6.2.2",
  }
```

This will patch the Cesium source after installing from NPM.

You have also to install 'cesium' as dependencies:
```shell script
  npm i -D cesium
```
To get working the Worker within OSH, we use 'worker-loader':
```shell script
 npm i -D worker-loader
```
