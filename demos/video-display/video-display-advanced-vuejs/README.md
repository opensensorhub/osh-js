# video-display
This is a VueJS client based on Cesium & OSH Toolkit. It displays 3DR Solo: orientation,location & gimbal orientation.
Moreover, it draps the video content into the Cesium Globe.
 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve 
```

### Compiles and minifies for production
```
npm run build 
```

## Dependencies

Since the client only based on leaflet and MJPEG, we do not need custom Webpack configuration. 
The one provided by VueJS is working fine.

The client uses Leaflet as base map, chartjs to display weather data and nouislider for the timeline bar:
```shell script
npm i -D chart.js leaflet nouislider wnumb
```

## Babel configuration

We add some configuration into *babel.config.js* file.
We add an alias so we can reference OSH in our app code:

```shell script
const oshPlugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ["./src/"],
            alias: {
                "osh": "../../../source/osh",
                "ext/osh": "../../../source/ext/osh",
            }
        }
    ]
];
...
```
