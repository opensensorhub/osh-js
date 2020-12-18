import SweJson from 'osh/datareceiver/SweJson.js';
import PointMarker from "osh/ui/layer/PointMarker.js";
import Polyline from "osh/ui/layer/Polyline.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import {DATASOURCE_DATA_TOPIC} from "osh/Constants";
import OpenLayerView from "osh/ui/view/map/OpenLayerView";
import DeckGlView from "osh/ui/view/map/DeckGlView";
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
  replaySpeed: 200
});

const commonMarkerConf = {
  getLocation: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return {
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
      };
    }
  },
  getLabel: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return rec['veh-id'];
    }
  },
  getMarkerId: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return rec['veh-id'];
    }
  },
  getIcon: {
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
  labelOffset: [0,-16],
  iconSize: [32, 37],
  labelColor: '#00fff5'
};

const commonPolylineConf = {
  getLocation: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return {
        x: rec.location.lon,
        y: rec.location.lat,
        z: 0
      };
    }
  },
  getPolylineId: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return rec['veh-id'];
    }
  },
  color: 'rgba(0,0,255,0.5)',
  weight: 5,
  opacity: .5,
  smoothFactor: 1,
  maxPoints: 200
};

//Stadia_Outdoors
const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png');

const leafletViewItems = [
  {
    layer:  new PointMarker({...commonMarkerConf}),
    name: "AVL"
  },
  {
    layer:  new Polyline({...commonPolylineConf}),
    name: "AVL"
  },
];
const olViewItems = [
  {
    layer:  new PointMarker({...commonMarkerConf}),
    name: "AVL"
  },
  {
    layer:  new Polyline({...commonPolylineConf}),
    name: "AVL"
  },
];
const cesiumViewItems = [
    {
      layer:  new PointMarker({...commonMarkerConf}),
      name: "AVL"
    }
];

const deckViewItems = [
  {
    layer:  new PointMarker({
      ...commonMarkerConf,
      iconScale: 15
    }),
    name: "AVL"
  },
  {
    layer: new Polyline({
      ...commonPolylineConf,
      color: [255, 102, 0, 127]
    }),
    name: "AVL"
  },
];

// create Leaflet view
const leafletMapView = new LeafletView("leafletMap",
    leafletViewItems,
    {
      autoZoomOnFirstMarker:true,
      follow:false,
      baseLayers: {
        "OSM Bright" : layer
      }
    }
);

// create OL view
const olMapView = new OpenLayerView("olMap",
    olViewItems,
    {
      autoZoomOnFirstMarker:true,
    }
);

const cesiumMapView = new CesiumView('cesiumMap', cesiumViewItems);

const deckView = new DeckGlView('deckMap',
    deckViewItems,
    {
      autoZoomOnFirstMarker:true,
    }
);

// update time
const timeElt = document.getElementById("time");
const loadElt = document.getElementById("load");
const removeAllElt = document.getElementById("removeall");

const bc = new BroadcastChannel(DATASOURCE_DATA_TOPIC + avlDataSource.id)

bc.onmessage = (event) => {
  if(event.data.type === 'data' ) {
    for (let i = 0; i < event.data.values.length; i++) {
      timeElt.innerText = new Date(event.data.values[i].timeStamp).toISOString();
    }
  }
}

avlDataSource.connect();

// start streaming
loadElt.onclick = () => {
  avlDataSource.connect();
  removeAllElt.removeAttribute("disabled");
  loadElt.setAttribute("disabled","");
};

removeAllElt.onclick = async () => {
  avlDataSource.disconnect();
  removeAllElt.setAttribute("disabled", "");
  loadElt.removeAttribute("disabled");

  // let some delay to flush the data broadcast channel
  setTimeout(() => {
    cesiumMapView.removeViewItem(cesiumViewItems[0]);

    olMapView.removeViewItem(olViewItems[0]);
    olMapView.removeViewItem(olViewItems[1]);

    leafletMapView.removeViewItem(leafletViewItems[0]);
    leafletMapView.removeViewItem(leafletViewItems[1]);

    deckView.removeViewItem(deckViewItems[0]);
    deckView.removeViewItem(deckViewItems[1]);
  }, 100);
};

