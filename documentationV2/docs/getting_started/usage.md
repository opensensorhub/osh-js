---
id: usage
title: Usage
sidebar_label: Usage
---

osh-js can be used with ES6 modules, plain JavaScript and module loaders.

## Visualize GPS data

To visualize a data, we need to instantiate a `DataSource`, `View` and `Styler` classes  and a `HTML tag` to render the result.

### Create the HTML element

The HTML element is the html anchor of your View.

```html
<div id="leafletMap"></div>
```

### Create the DataSource instance

The DataSource is used to define the properties allowing connecting to a OSH server and define the data parser
to use.

```jsx
import SweJson from 'osh/datareceiver/SweJson.js';

let gpsDataSource = new SweJson('android-GPS', {
	protocol: 'ws',
	service: 'SOS',
	endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
	offeringID: 'urn:android:device:060693280a28e015-sos',
	observedProperty: 'http://sensorml.com/ont/swe/property/Location',
	startTime: '2015-02-16T07:58:32Z',
	endTime: '2015-02-16T08:09:00Z',
	replaySpeed: 2
});
```
### Create the Styler instance

The Styler is used to style dynamically your data before rendering.

```jsx
import PointMarker from 'osh/ui/styler/PointMarker.js';

// style it with a moving point marker
let pointMarker = new PointMarker({
	locationFunc: {
		dataSourceIds: [gpsDataSource.getId()],
		handler: function(rec) {
			return {
				x: rec.location.lon,
				y: rec.location.lat,
				z: rec.location.alt
			};
		}
	},
	icon: './images/car-location.png',
	iconAnchor: [16, 65]
});

```

### Create the View instance
The View defines the kind of visualization you want for your DataSource. In this example, a map render based on leaflet is used.
```javascript
import LeafletView from 'osh/ui/view/map/LeafletView.js';

// create Leaflet view
let leafletMapView = new LeafletView('leafletMap',
	[{
		styler: pointMarker,
		name: 'Android Phone GPS'
	}], {
		autoZoomOnFirstMarker: true
	}
);
```

### Start the Stream

Finally, you can start the connection by executing:

```javascript
// start streaming
gpsDataSource.connect();
```



