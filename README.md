OpenSensorHub Web Client Toolkit Documentation
===

OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors.
It is pure javascript framework and does not require third party libraries. A set of external libraries is also available to easily build some part of your views such as
Leaflet, OpenLayer, Cesium, Chart.js etc..

It's an event based architecture suitable for real-time or playback. It allows one to make temporal synchronization or multiple data stream. It provides a styling overlay using 
configurable stylers as well as an advanced support for video (H264/MJPEG). It has been designed to integrate any map engines such as Lealfet, OpenLayer or Cesium.

Moreover, it offers support for SOS & SPS services, discovery function, uses the HTTP or WebSocket API.
Several modules already exist to allow one to setup quickly an application such as Orientation, DataSourceChart, Video, Map etc..
 
Please report all problems related to the SensorHub software including documentation errors via the [GitHub Issue Tracker](https://github.com/opensensorhub) 
of the [osh-js](https://github.com/opensensorhub/osh-js) repository.

How To Download
===


### Releases

Binary and Source distributions archives can be downloaded directly from the [Releases Section](https://github.com/opensensorhub/osh-js/releases) of our GitHub account.

The release contains a vendor directory (needed for some pre-coded views), the minified osh-js library and its corresponding stylesheet.
You can use both the all-in-one vendor minified script(vendor.js & vendor.css) or the separate ones. 


How To Use
===


Run Showcase
===


Vendors
===

##Cesium

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

Resources
===

The documentation can be found [here](http://opensensorhub.github.io/osh-js/Documentation/index.html).

The JSDoc can be found [here](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/jsdoc/)

Some demos are available [here](http://opensensorhub.github.io/osh-js/Demos/) and [here](http://opensensorhub.github.io/osh-js/Demos-old/)
