# General

The map views are a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Styler](../stylers/styler).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import LazyCesiumMap from './cesiumcomp/lazycesium.jsx';
import LazyLeafletMap from './leafletcomp/lazyleaflet.jsx';
import LazyOlMap from './olcomp/lazyol.jsx';

<Tabs
  groupId="map-viewers"
  defaultValue="Leaflet"
  values={[
    {label: 'Leaflet', value: 'Leaflet'},
    {label: 'OpenLayers', value: 'OpenLayers'},
    {label: 'Cesium', value: 'Cesium'},
  ]}>
  <TabItem value="Leaflet">
    <LazyLeafletMap/>
  </TabItem>
  <TabItem value="OpenLayers">
    <LazyOlMap/>
  </TabItem>
  <TabItem value="Cesium">
    <LazyCesiumMap/>
  </TabItem>
</Tabs>

## Example

The code is pretty similar between each view. Depending on what we want to display, we can have the same code or add
options specific to a View, for example, the ImageDraping to the Cesium one.

Here is an example of common and specific code for the View:

```jsx title="common code"
import SweJson from 'osh/datareceiver/SweJson.js';
import PointMarker from 'osh/ui/styler/PointMarker.js';

const cfg = {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:32Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: 2
};

const dataSource = new SweJson("android-GPS", cfg);

const pointMarker = new PointMarker({
    locationFunc: {
        dataSourceIds: [dataSource.getId()],
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
    icon: '/img/car-location.png',
    iconAnchor: [16, 64],
    iconSize: [32, 64],
    zoomLevel: 17
});
```

<Tabs
  groupId="map-viewers"
  defaultValue="Leaflet"
  values={[
    {label: 'Leaflet', value: 'Leaflet'},
    {label: 'OpenLayers', value: 'OpenLayers'},
    {label: 'Cesium', value: 'Cesium'},
  ]}>
  <TabItem value="Leaflet">

  ```jsx title="Leaflet specific code"
  import LeafletView from 'osh/ui/view/map/LeafletView.js';

  const view = new LeafletView("leaflet-map",
      [{
          styler: pointMarker,
          name: "Android Phone GPS"
      }],
      {
        autoZoomOnFirstMarker: true,
        follow: true
     }
  );

  dataSource.connect();
  ```

  </TabItem>
  <TabItem value="OpenLayers">

  ```jsx title="OpenLayers specific code"
  import OpenLayerView from 'osh/ui/view/map/OpenLayerView.js';

  const view = new OpenLayerView("leaflet-map",
      [{
          styler: pointMarker,
          name: "Android Phone GPS"
      }],
      {
        autoZoomOnFirstMarker: true,
        watch: true
     }
  );

  dataSource.connect();
  ```

  </TabItem>
  <TabItem value="Cesium">

  ```jsx title="Cesium specific code"
  import OpenLayerView from 'osh/ui/view/map/OpenLayerView.js';
  window.CESIUM_BASE_URL = './';

  const view = new CesiumView('cesium-map',
    [{
        styler: pointMarker,
        name: 'Android Phone GPS'
  }]);
  view.viewer.terrainProvider = new EllipsoidTerrainProvider();
  dataSource.connect();
  ```

  </TabItem>
</Tabs>

## View items

The Map views are composed by view items. ViewItems allow you to associate a name and a Styler to each marker you want
 to add to the View. Thus, to visualize your data in your view, the process is:

 [Styler](../../stylers/styler)-> ViewItem -> View

The properties of a ViewItem are:

| Name | Type | Default | Description |  Mandatory
| ---- | ---- | ------- | --------------- |  ---------
| name | String | '' | name of the viewItem | -
| styler | [Styler](../../stylers/styler) | - | styler composing the ViewItem | yes

