import * as React from "react";
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from 'osh/ui/view/map/LeafletView.js';
import {randomUUID} from "osh/utils/Utils.js";


class LeafletMap extends React.Component {
  constructor(props) {
    super(props);
    this.divId = randomUUID();
  }

  componentDidMount() {
    // create data source for Android phone GPS
    this.dataSource = new SweJson("android-GPS", {
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
        dataSourceIds: [this.dataSource.getId()],
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

    this.view = new LeafletView("leaflet-complex-map",
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
    this.dataSource.connect();
  }

  componentWillUnmount() {
    this.dataSource.terminate();
    this.view.destroy();
  }

  render() {
    return <div style={{height:500 +'px'}} id="leaflet-complex-map"></div>;
  }
}

export default LeafletMap;
