import SweJson from 'osh/datareceiver/SweJson.js';
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import {DATASOURCE_DATA_TOPIC} from "osh/Constants";
import OpenLayerView from "osh/ui/view/map/OpenLayerView";
import CesiumView from 'osh/ui/view/map/CesiumView.js';

window.CESIUM_BASE_URL = './';

let avlDataSource = new SweJson("AVL", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:mysos:avl",
  observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
  startTime: "2014-03-29T07:00:12Z",
  endTime: "2014-04-29T14:26:12Z",
  replaySpeed: 2000
});


// style it with a moving point marker
let pointMarker = new PointMarker({
  locationFunc: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return {
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
      };
    }
  },
  labelFunc: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return rec['veh-id'];
    }
  },
  idFunc: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return rec['veh-id'];
    }
  },
  iconFunc: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      if(rec['veh-id'] === 'FE4') {
        return './images/firemen1.png';
      } else if(rec['veh-id'] === 'FR6') {
        return './images/firemen2.png';
      } else if(rec['veh-id'] === 'FL12') {
        return './images/firemen3.png';
      } else if(rec['veh-id'] === 'FE12') {
        return './images/firemen4.png';
      } else if(rec['veh-id'] === 'FL11') {
        return './images/firemen5.png';
      }
      else return './images/firemen.png';
    }
  },
  zoomLevel: 12,
  iconAnchor: [16, 0],
  labelOffset: [0,0]
});


//Stadia_Outdoors
const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png');

// create Leaflet view
let leafletMapView = new LeafletView("leafletMap",
    [{
      styler: pointMarker,
      name: "AVL"
    }],
    {
      autoZoomOnFirstMarker:true,
      follow:false,
      baseLayers: {
        "OSM Bright" : layer
      }
    }
);

// create OL view
new OpenLayerView("olMap",
    [{
      styler: pointMarker,
      name: "AVL"
    }],
    {
      autoZoomOnFirstMarker:true,
    }
);

new CesiumView('cesiumMap',
    [{
      styler: pointMarker,
      name: 'AVL'
    }]
);

// update time
const timeElt = document.getElementById("time");
const bc = new BroadcastChannel(DATASOURCE_DATA_TOPIC + avlDataSource.id)

bc.onmessage = (event) => {
  if(event.data.type === 'data' ) {
    for (let i = 0; i < event.data.values.length; i++) {
      timeElt.innerText = new Date(event.data.values[i].timeStamp).toISOString();
    }
  }
}
// start streaming
avlDataSource.connect();
