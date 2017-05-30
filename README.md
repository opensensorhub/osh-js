OpenSensorHub Web Client Toolkit Documentation
===

OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors.
It is pure javascript framework and does not require third party libraries. A set of external libraries is also available to easily build some part of your views such as
Leaflet, OpenLayer, Cesium, NVD3 etc..

It's an event based architecture suitable for real-time or playback. It allows one to make temporal synchronization or multiple data stream. It provides a styling overlay using 
configurable stylers as well as an advanced support for video (H264/MJPEG). It has been designed to integrate any map engines such as Lealfet, OpenLayer or Cesium.

Moreover, it offers support for SOS & SPS services, discovery function, uses the HTTP or WebSocket API.
Several modules already exist to allow one to setup quickly an application such as Orientation, Chart, Video, Map etc..
 
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

All you need to use the toolkit is to include the vendor dist file (the all-in-one or the separate ones) and the minified osh javascript and stylesheet:
```javascript
<!-- VENDOR -->
<link rel="stylesheet" href="vendor/vendor.min.css"/>
<script type="text/javascript" src="vendor/vendor.min.js"></script>

<!-- OSH Toolkit -->
<link rel="stylesheet" href="css/osh.min.css"/>
<script src="js/osh.min.js"></script>
```

Don't forget to include the {css,images,js} directories.

Resources
===

The documentation can be found [here](http://opensensorhub.github.io/osh-js/Documentation/index.html).

The JSDoc can be found [here](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/jsdoc/)

Some demos are available [here](http://opensensorhub.github.io/osh-js/Demos/) and [here](http://opensensorhub.github.io/osh-js/Demos-old/)
