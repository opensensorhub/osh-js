# Cesium


The CesiumView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Styler](../stylers/styler).

The View is based on [CesiumJS](https://cesium.com/cesiumjs/) framework.

## Properties configuration

| Name | Type | Default | Description |  Mandatory
| ---- | ---- | ------- | --------------- |  ---------
| - | String | '' | the id of the div used to render the map | yes
| - | [[ViewItem]](./index#view-items)  | [ ] | the list of view items associated to the view | -

## Examples

### Simple Example

import LazyCesiumMap from './cesiumcomp/lazycesium.jsx';

<LazyCesiumMap/>

#### Code

```jsx title="GPS data using 1 viewItem"
// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import CesiumView from 'osh/ui/view/map/CesiumView.js';
import {
	EllipsoidTerrainProvider
} from 'cesium';

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
const view = new CesiumView("cesium-single-map",
    [{
        styler: pointMarker,
        name: "Android Phone GPS"
    }]
);
this.view.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
gpsDataSource.connect();
```
