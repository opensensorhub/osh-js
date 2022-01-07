# MISB
This is a VueJS client based OSH Toolkit. It demonstrates SensorWebAPI.
 
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
