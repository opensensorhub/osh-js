OpenSensorHub Web Client Toolkit Documentation
===

OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors.
It is pure javascript framework and does not require third party libraries. A set of external libraries is also available to easily build some part of your views such as
Leaflet, OpenLayer, Cesium, Chart.js etc..

It's an event based architecture suitable for real-time or playback. It allows one to make temporal synchronization or multiple data stream. It provides a styling overlay using 
configurable layers as well as an advanced support for video (H264/MJPEG). It has been designed to integrate any map engines such as Lealfet, OpenLayer or Cesium.

Moreover, it offers support for SOS & SPS services, discovery function, uses the HTTP or WebSocket API.
Several modules already exist to allow one to setup quickly an application such as Orientation, DataSourceChart, Video, Map etc..

Please report all problems related to the SensorHub software including documentation errors via the [GitHub Issue Tracker](https://github.com/opensensorhub)
of the [osh-js](https://github.com/opensensorhub/osh-js) repository.

## Features
- Supports for data parsing:
  - Video (with roll) data with codecs H265, H264, VP9, VP8
  - Any Swe generic JSON such as GPS, Quaternion etc.
  - Spectrogram, ImageDraping, Nexrad
- Supports for data Synchronization
- Supports WebSocket and HttpRequest Connector
- Supports SWE JSON generic requests:
  - GetCapabilities
  - GetFeatureOfInterest
  - GetResultTemplate
  - DescribeSensor
- Supports some dedicated visualizer:
  - OpenLayer, Leaflet or Cesium for Map data
  - FFMPeg for Video
  - Chart
  - Spectrogram
- Supports for Vue.js components
## Installation
### Releases

Binary and Source distributions archives can be downloaded directly from the [Releases Section](https://github.com/opensensorhub/osh-js/releases) of our GitHub account.

The release contains a vendor directory (needed for some pre-coded views), the minified osh-js library and its corresponding stylesheet.
You can use both the all-in-one vendor minified script(vendor.js & vendor.css) or the separate ones.

You can import the source directory directly into your APP application and refer to it. The Toolkit is ES6 compliant.

### Showcase

The showcase can be run using npm and webpack configuration:

```shell script
$ cd ./showcase
$ yarn install
$ yarn dev
```
or
```shell script
$ cd ./showcase
$ npm install
$ npm run dev
```

### Production
```shell script
$ yarn install
$ yarn prod
```
or
```shell script
$ npm install
$ npm run prod
```


## Dependencies
### Cesium

If you use the CesiumView, don't forget to install the corresponding npm package 'cesium'.
Moreover, you can apply a path to fix texture issue while using image draping. The patch is
located into the patches directory. To apply the patch,you can use *patch-package*:

```sh
$ npm i -D patch-package
```
Add the corresponding patch into your source folder and apply the patch using *npm i*.

package.json:
```shell script

"scripts": {
    "postinstall": "patch-package",
    ...
  },
```

You can add any external dependencies using *npm*. For example, if you attempt to use
some OpenLayer features, don't forget to install OpenLayer as node module dependency.

## Build site

Because there are 2 environments, you must pass the ENV variable to build the corresponding target: 'dev' | 'latest'
```shell
$ ENV=dev yarn vuepress
```

or

```shell
$ ENV=latest yarn vuepress
```


The official website (latest): [http://opensensorhub.github.io/osh-js/latest/site/](http://opensensorhub.github.io/osh-js/latest/site/)

The official website (development): [http://opensensorhub.github.io/osh-js/dev/site/](http://opensensorhub.github.io/osh-js/dev/site/)

## License

OpenSensorHub is licensed under the Mozilla Public License version 2.0.
