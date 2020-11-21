# Leaflet

The LeafletView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Styler](../stylers/styler).

The View is based on [LeafletJs](https://leafletjs.com/) framework.

## Properties configuration

| Name | Type | Default | Description |  Mandatory
| ---- | ---- | ------- | --------------- |  ---------
| - | String | '' | the id of the div used to render the map | yes
| - | [[ViewItem]](./index#view-items)  | [ ] | the list of view items associated to the view | -
| - | [Object](#object-configuration) | { } | the properties object | -

## Object configuration

The object configuration defines the properties of the view.

| Name | Type | Default | Description |  Mandatory
| ---- | ---- | ------- | --------------- |  ---------
| maxZoom | Number  | 19 | the default max level zoom | -
| autoZoomOnFirstMarker | Boolean | false | zoom onto the first created marker | -
| initialView | [Object](#initial-view) | { } | defines some properties for the creation of the inner [View](https://leafletjs.com/reference-1.7.1.html#map-setview) | -
| overlayLayers | [Object](#overlay-layer) | { } | object to use as overlay layer, [reference](https://leafletjs.com/reference-1.7.1.html#control-layers-l-control-layers) | -
| baseLayers |  [Object](#base-layer) | { "OSM bright" : [OSM](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html) }  | Leaflet objects to use as base layer, [reference](https://leafletjs.com/reference-1.7.1.html#control-layers-l-control-layers) | -
| defaultLayer | [[L.tileLayer]](https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer) | [OSM](https://www.openstreetmap.org/#map=6/46.449/2.210) | The default layer | -

## BaseLayer

| Key | Value
| ---- | ----
| String |  [L.tileLayer](https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer)

## OverlayLayer

| Key | Value
| ---- | ----
| String |  [L.tileLayer](https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer)

## Initial View

The initial View can be passed to override the default [View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html).

| Name | Type | Default | Description |  Mandatory
| ---- | ---- | ------- | --------------- |  ---------
| lon | Number | - | the corresponding longitude in [*EPSG:4326*](http://epsg.io/4326) | yes
| lat | Number | - | the corresponding longitude in [*EPSG:4326*](http://epsg.io/4326) | yes
| zoom | Number | - | the default level zoom  | yes


## Examples

### Simple Example

import LazyLeafletMap from './leafletcomp/lazyleaflet.jsx';

<LazyLeafletMap/>

#### Code

```jsx title="GPS data using 1 viewItem"
// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from 'osh/ui/view/map/LeafletView.js';

// create data source for Android phone GPS
let gpsDataSource = new SweJson("android-GPS", {
	protocol: "ws",
	service: "SOS",
	endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
	offeringID: "urn:android:device:060693280a28e015-sos",
	observedProperty: "http://sensorml.com/ont/swe/property/Location",
	startTime: "2015-02-16T07:58:32Z",
	endTime: "2015-02-16T08:09:00Z",
	replaySpeed: 2
});

// style it with a moving point marker
let pointMarker = new PointMarker({
	locationFunc: {
		dataSourceIds: [gpsDataSource.getId()],
		handler: function(rec) {
			return {
				x: rec.location.lon,
				y: rec.location.lat
			};
		}
	},
	orientation: {
		heading: 0
	},
	icon: 'images/car-location.png',
	iconAnchor: [16, 64],
	iconSize: [32, 64]
});

// create Leaflet view
const view = new LeafletView("leaflet-single-map",
    [{
        styler: pointMarker,
        name: "Android Phone GPS"
    }],
    {
        autoZoomOnFirstMarker:true
    }
);

// start streaming
gpsDataSource.connect();
```

### Example using custom BaseLayer, Overlay & InitialView
import LazyLeafletMapComplex from './leafletcomp/lazyleafletcomplex.jsx';

<LazyLeafletMapComplex/>

#### Code

```jsx title="GPS data using 1 viewItem using custom baseLayer & overlay"
// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from 'osh/ui/view/map/LeafletView.js';

// create data source for Android phone GPS
let gpsDataSource = new SweJson("android-GPS", {
	protocol: "ws",
	service: "SOS",
	endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
	offeringID: "urn:android:device:060693280a28e015-sos",
	observedProperty: "http://sensorml.com/ont/swe/property/Location",
	startTime: "2015-02-16T07:58:32Z",
	endTime: "2015-02-16T08:09:00Z",
	replaySpeed: 2
});

// style it with a moving point marker
let pointMarker = new PointMarker({
	locationFunc: {
		dataSourceIds: [gpsDataSource.getId()],
		handler: function(rec) {
			return {
				x: rec.location.lon,
				y: rec.location.lat
			};
		}
	},
	orientation: {
		heading: 0
	},
	icon: 'images/car-location.png',
	iconAnchor: [16, 64],
	iconSize: [32, 64]
});

// CUSTOM base layer based on stadiamaps
const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
     maxZoom: 20,
     attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
      '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
 });

 const baseLayers = {
    "OSM Bright" : layer
 };

const view = new LeafletView("leaflet-single-baselayer-map",
    [{
        styler: pointMarker,
        name: "Android Phone GPS"
    }],
     {
        autoZoomOnFirstMarker: false,
        initialView: {
            lon: 1.42376344,
            lat: 43.61759948,
            zoom: 15
        },
        follow: true,
        baseLayers: baseLayers,
        defaultLayer: layer
    }
);

// start streaming
gpsDataSource.connect();
```
