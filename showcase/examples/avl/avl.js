import SweJson from 'osh/datareceiver/SweJson.js';
import PointMarker from "osh/ui/styler/PointMarker.js";
import Polyline from "osh/ui/styler/Polyline.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import {DATASOURCE_DATA_TOPIC} from "osh/Constants";
import OpenLayerView from "osh/ui/view/map/OpenLayerView";
import CesiumView from 'osh/ui/view/map/CesiumView.js';

import {
  Cartographic, Math
} from "cesium";
import {isDefined} from "../../../source/osh/utils/Utils";

window.CESIUM_BASE_URL = './';

const currentSelectedElt = document.getElementById("current-marker");

// setup DataSource. The datasource contains multiple ids.
let avlDataSource = new SweJson("AVL", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:mysos:avl",
  observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
  startTime: "2014-03-29T07:00:12Z",
  endTime: "2014-04-29T14:26:12Z",
  replaySpeed: 15
});

// Create a common configuration for markers. This one can be shared between stylers
const commonMarkerConf = {
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
  markerIdFunc: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      return rec['veh-id'];
    }
  },
  iconFunc: {
    dataSourceIds: [avlDataSource.getId()],
    handler: function (rec) {
      // change the icon depending on the id name contained in this record
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
  labelColor: '#00fff5'
};

// Create a common configuration for polylines. This one can be shared between stylers
const commonPolylineConf = {
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
  polylineIdFunc: {
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

// use stadia layer to display OSM base map
//Stadia_Outdoors
const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png');

function clearInfos(markerId, position, positionPixels) {
  currentSelectedElt.innerHTML = 'Current selected marker: ';
}

// method used to display information about the event reported by the Styler: onClick & onHover
function updateInfos(markerId, position, positionPixels) {
  if(!isDefined(markerId)) {
    clearInfos();
  } else {
    currentSelectedElt.innerHTML = 'Current selected marker: <strong>' + markerId + '</strong>, ' + 'pos= ' + position + ', ' + 'pixel= ' + positionPixels
  }
}

// creates leaflet Styler (PointMarker)
// Gets the common conf and add onClick & onHover callback to update infos
const leafletViewItems = [
    {styler:  new PointMarker({
        ...commonMarkerConf,
        onClick: (markerId, markerObject, event) =>  updateInfos(markerId,event.latlng, event.layerPoint),
        onHover: (markerId, markerObject, event) =>  updateInfos(markerId,event.latlng, event.layerPoint),
      }), name: "AVL"},
    {styler:  new Polyline({...commonPolylineConf}), name: "AVL"},
    ];

// creates OL Styler (PointMarker)
// Gets the common conf and add onClick & onHover callback to update infos
const olViewItems = [
  {styler:  new PointMarker({
      ...commonMarkerConf,
      onClick: (markerId, feature, event) =>  updateInfos(markerId,feature.getGeometry().getCoordinates(), event.pixel),
      onHover: (markerId, feature, event) =>  updateInfos(markerId,feature.getGeometry().getCoordinates(), event.pixel),
    }), name: "AVL"},
  {styler:  new Polyline({...commonPolylineConf}), name: "AVL"},
];

// creates Cesium Styler (PointMarker)
// Gets the common conf and add onClick & onHover callback to update infos
const cesiumViewItems = [{styler:  new PointMarker({
    ...commonMarkerConf,
    onClick: (markerId, billboard, event) =>  {
      if(isDefined(markerId) && isDefined(billboard)) {
        // transform into LonLat to display into info panel
        const cartographic = Cartographic.fromCartesian(billboard.primitive.position);
        const longitudeString = Math.toDegrees(
            cartographic.longitude
        ).toFixed(2);
        const latitudeString = Math.toDegrees(
            cartographic.latitude
        ).toFixed(2);

        updateInfos(markerId, longitudeString + ', ' + latitudeString, billboard.pixel)
      } else {
        clearInfos();
      }
    },
    onHover: (markerId, billboard, event) =>  {
      if(isDefined(markerId) && isDefined(billboard)) {
        // transform into LonLat to display into info panel
        const cartographic = Cartographic.fromCartesian(billboard.primitive.position);
        const longitudeString = Math.toDegrees(
            cartographic.longitude
        ).toFixed(2);
        const latitudeString = Math.toDegrees(
            cartographic.latitude
        ).toFixed(2);

        updateInfos(markerId, longitudeString + ', ' + latitudeString, billboard.pixel)
      } else {
        clearInfos();
      }
    },
  }), name: "AVL"}];

// create Leaflet view
new LeafletView("leafletMap",
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
new OpenLayerView("olMap",
    olViewItems,
    {
      autoZoomOnFirstMarker:true,
    }
);

new CesiumView('cesiumMap', cesiumViewItems);

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

// connect AVL datasource
avlDataSource.connect();

// connect AVL datasource manually
loadElt.onclick = () => {
  avlDataSource.connect();
  removeAllElt.removeAttribute("disabled");
  loadElt.setAttribute("disabled","");
};

// disconnect AVL datasource manually and remove Markers/polylines from the View
removeAllElt.onclick = async () => {
  avlDataSource.disconnect();
  removeAllElt.setAttribute("disabled", "");
  loadElt.removeAttribute("disabled");

  // let the time to flush the data broadcast channel
  // we need to wait a little because the disconnect() datasource function is not synchronous
  // if markers are deleted too early, the connection may continue to send data back to the views which
  // will result in the re-creation of markers. This is asynchronous because the WebSocket connector is launched from a WebWorker.
  setTimeout(() => {
    cesiumMapView.removeViewItem(cesiumViewItems[0]);
    olMapView.removeViewItem(olViewItems[0]);
    olMapView.removeViewItem(olViewItems[1]);
    leafletMapView.removeViewItem(leafletViewItems[0]);
    leafletMapView.removeViewItem(leafletViewItems[1]);
  }, 100);
};

