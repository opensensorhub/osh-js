# Webpack

Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser,
 yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
 
[Official Website](https://webpack.js.org/)

You can build your project that depends on OSH using Webpack. To do this, you will need to specify some properties 
for it to work.

First of all, Webpack uses loaders depending on the type of files used. Here is the list of recommended loaders to use:
- [file-loader](https://webpack.js.org/loaders/file-loader) : for images
- [style-loader](https://webpack.js.org/loaders/style-loader/), [css-loader](https://webpack.js.org/loaders/css-loader/): for the styles
- [worker-loader](https://webpack.js.org/loaders/worker-loader) : for WebWorker. Files named *.worker.*.js will be supported by this loader.

You can find the whole list [here](https://webpack.js.org/loaders/).

Depending on the framework you are going to use, you may need to use the babel-loader.

For example, if you want to integrate the Toolkit in a React or Vue.js application, you may use the babel-loader.

You can find some example into the osh-js demo: 

[React App](https://github.com/opensensorhub/osh-js/blob/master/demos/3dr-solo-uav/3dr-solo-uav-react/webpack.config.js)
[Vue.js App 1](https://github.com/opensensorhub/osh-js/blob/master/demos/3dr-solo-uav/3dr-solo-uav-vuejs/webpack.config.js)
[Vue.js App 2](https://github.com/opensensorhub/osh-js/blob/master/demos/dynamic-android/webpack.config.js)
[Vue.js App 3](https://github.com/opensensorhub/osh-js/blob/master/demos/video-display/video-display-advanced-vuejs/webpack.config.js)
[Vue.js App 4](https://github.com/opensensorhub/osh-js/blob/master/demos/video-display/video-display-vuejs/webpack.config.js)

Some dependency needs more complicated setup like Cesium. You can find the list of Showcase simple examples [here](https://github.com/opensensorhub/osh-js/tree/master/showcase/examples).

## Simple example

Setup your webpack.config.js:

***webpack.config.js***
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: path.resolve(__dirname,'myLib.js'),
    // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: 'bundle.myLib.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: 'empty'
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default but since we’re overriding
    // the property we’ll need to tell it to look there in addition to the
    // bower_components folder.
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../source') // OSH source directory
        }
    },
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader', options: { name: 'WorkerName.[hash].js' } }
            }
        ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        index: 'index.html'
    },
    devtool: 'source-map',
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
        // This plugin will generate an index.html file for us that can be used
        // by the Webpack dev server. We can give it a template file (written in EJS)
        // and it will handle injecting our bundle for us.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html')
        })
    ]
};
```

Then setup your npm configuration file:

***package.json***
```json
{
  "name": "osh-js",
  "version": "1.3.3",
  "description": "OSH javascript Toolkit",
  "main": "osh.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/opensensorhub/osh-js.git"
  },
  "keywords": [
    "OSH",
    "Sensors",
    "Toolkit",
    "Javascript",
    "GIS",
    "Spatial",
    "OGC",
    "SensorML"
  ],
  "author": "OSH community",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/opensensorhub/osh-js/issues"
  },
  "homepage": "https://github.com/opensensorhub/osh-js#readme",
  "scripts": {
    "dev": "webpack-dev-server --config webpack.config.js --host 127.0.0.1 --mode development --watch",
    "prod": "webpack --config webpack.config.js --mode production"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^5.1.1",
    "css-loader": "^3.4.2",
    "file-loader": "^5.1.0",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^1.1.3",
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3",
    "worker-loader": "^2.0.0"
  },
  "dependencies": {}
}
```

## Install 

You can now install the dependencies using yarn or npm:

```shell script
$ yarn install
or
$ npm install
```

## Start dev

Start the build command to run the webpack [dev-server](https://webpack.js.org/configuration/dev-server):

```shell script
$ yarn dev
```

## Build production

Run the production to generate static final files:

```shell script
$ yarn prod
```

