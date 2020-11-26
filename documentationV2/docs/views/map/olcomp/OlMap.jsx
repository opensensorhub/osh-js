import * as React from "react";
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import OpenLayerView from 'osh/ui/view/map/OpenLayerView.js';
import {randomUUID} from "osh/utils/Utils.js";


class OlMap extends React.Component {
  constructor(props) {
    super(props);
    this.divId = randomUUID();
  }

  componentDidMount() {
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
    const pointMarker = new PointMarker({
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
      icon: this.props.base+'img/car-location.png',
      iconAnchor: [16, 64],
      iconSize: [32, 64]
    });
    this.view = new OpenLayerView("ol-single-map",
        [{
          styler: pointMarker,
          name: "Android Phone GPS"
        }]
    );
    this.dataSource.connect();
  }

  componentWillUnmount() {
    this.dataSource.terminate();
    this.view.destroy();
  }

  render() {
    return <div style={{height:500 +'px'}} id="ol-single-map"></div>;
  }
}

export default OlMap;
