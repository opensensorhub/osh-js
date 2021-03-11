import SweJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import Polyline from 'osh-js/core/ui/layer/PolylineLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import {DATASOURCE_DATA_TOPIC} from 'osh-js/core/Constants';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import DeckGlView from 'osh-js/core/ui/view/map/DeckGlView';

import {
    Cartographic, Math
} from "cesium";

window.CESIUM_BASE_URL = './';

const currentSelectedElt = document.getElementById("current-marker");

/**************************************************************/
/********************* DataSources ***************************/
/************************************************************/

// setup DataSource. The datasource contains multiple ids.
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

/**************************************************************/
/********************* Common functions **********************/
/************************************************************/

// use stadia layer to display OSM base map
//Stadia_Outdoors
const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png');

// method used to display information about the event reported by the Styler: onLeftClick & onHover
function updateInfos(markerId, position, positionPixels) {
    currentSelectedElt.innerHTML = 'Current selected marker: <strong>' + markerId + '</strong>, ' + 'pos= ' + position + ', ' + 'pixel= ' + positionPixels
}

const popupElt = document.getElementById("popup");

function showPopup(x, y, content) {
    const padding = 10;
    popupElt.setAttribute("style", "left:" + (x + padding) + ";top:" + (y + padding) + "; display:block !important; width:100px; height:50px");
    popupElt.innerText = content;
}

function hidePopup(x, y, content) {
    popupElt.setAttribute('style', 'display:none;');
    popupElt.innerText = '';
}

// disable contextmenu
document.body.oncontextmenu = () => false;

// hide popup if anywhere we click
document.body.onclick = () => {
    hidePopup();
};

/**************************************************************/
/********************* Layers ******************/
/************************************************************/

// Create a common configuration for markers. This one can be shared between stylers
const commonMarkerConf = {
    dataSourceId: avlDataSource.id,
    getLocation: (rec) => ({ x: rec.location.lon, y: rec.location.lat, z: rec.location.alt }),
    getLabel: (rec) => rec['veh-id'],
    getMarkerId: (rec) => rec['veh-id'],
    getIcon: (rec) => {
        // change the icon depending on the id name contained in this record
        if (rec['veh-id'] === 'FE4') {
            return './images/firemen1.png';
        } else if (rec['veh-id'] === 'FR6') {
            return './images/firemen2.png';
        } else if (rec['veh-id'] === 'FL12') {
            return './images/firemen3.png';
        } else if (rec['veh-id'] === 'FE12') {
            return './images/firemen4.png';
        } else if (rec['veh-id'] === 'FL11') {
            return './images/firemen5.png';
        } else return './images/firemen.png';
    },
    zoomLevel: 12,
    iconAnchor: [16, 0],
    labelOffset: [0, -16],
    iconSize: [32, 37],
    labelColor: '#00fff5'
};

// Create a common configuration for polylines. This one can be shared between stylers
const commonPolylineConf = {
    dataSourceId: avlDataSource.id,
    getLocation: (rec) => ({ x: rec.location.lon, y: rec.location.lat, z: rec.location.alt }),
    getPolylineId: (rec) =>  rec['veh-id'],
    color: 'rgba(0,0,255,0.5)',
    weight: 5,
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 200
};

let leafletMapView, olMapView, cesiumMapView;

/**************************************************************/
/*************************** VIEWS ***************************/
/************************************************************/

// create Leaflet view
leafletMapView = new LeafletView({
    container: 'leafletMap',
    autoZoomOnFirstMarker: true,
    follow: false,
    baseLayers: {
        "OSM Bright": layer
    },
    layers: [
        new PointMarkerLayer({
            ...commonMarkerConf,
            onLeftClick: (markerId, markerObject, event) => updateInfos(markerId, event.latlng, event.containerPoint),
            onRightClick: (markerId, billboard, event) => {
                const rect = document.getElementById('leafletMap').getBoundingClientRect();
                showPopup(event.containerPoint.x + rect.left, event.containerPoint.y + rect.top + 15, 'some content ' + markerId);
            },
            onHover: (markerId, markerObject, event) => updateInfos(markerId, event.latlng, event.containerPoint)
        }),
        new Polyline({...commonPolylineConf})
    ]
});

// create OL view
olMapView = new OpenLayerView({
    container: 'olMap',
    autoZoomOnFirstMarker: true,
    layers: [
        // creates OL Layers
        // Gets the common conf and add onLeftClick & onHover callback to update infos
        new PointMarkerLayer({
            ...commonMarkerConf,
            onLeftClick: (markerId, feature, event) => updateInfos(markerId, feature.getGeometry().getCoordinates(), event.mapBrowserEvent.pixel),
            onRightClick: (markerId, billboard, event) => {
                const rect = document.getElementById('olMap').getBoundingClientRect();
                showPopup(event.mapBrowserEvent.pixel[0] + rect.left, event.mapBrowserEvent.pixel[1] + rect.top, 'some content ' + markerId);
            },
            onHover: (markerId, feature, event) => updateInfos(markerId, feature.getGeometry().getCoordinates(), event.mapBrowserEvent.pixel),
        }),
        new Polyline({...commonPolylineConf})
    ]
});

cesiumMapView = new CesiumView({
    container: 'cesiumMap',
    layers: [
        new PointMarkerLayer({
            ...commonMarkerConf,
            onLeftClick: (markerId, billboard, event) => {
                // transform into LonLat to display into info panel
                const cartographic = Cartographic.fromCartesian(billboard.primitive.position);
                const longitudeString = Math.toDegrees(
                    cartographic.longitude
                ).toFixed(2);
                const latitudeString = Math.toDegrees(
                    cartographic.latitude
                ).toFixed(2);

                updateInfos(markerId, longitudeString + ', ' + latitudeString, billboard.pixel);
            },
            onRightClick: (markerId, billboard, event) => {
                const rect = document.getElementById('cesiumMap').getBoundingClientRect();
                showPopup(billboard.pixel.x + rect.left, billboard.pixel.y + rect.top, 'some content ' + markerId);
            },
            onHover: (markerId, billboard, event) => {
                // transform into LonLat to display into info panel
                const cartographic = Cartographic.fromCartesian(billboard.primitive.position);
                const longitudeString = Math.toDegrees(
                    cartographic.longitude
                ).toFixed(2);
                const latitudeString = Math.toDegrees(
                    cartographic.latitude
                ).toFixed(2);

                updateInfos(markerId, longitudeString + ', ' + latitudeString, billboard.pixel)
            }
        }),
        new Polyline({
            ...commonPolylineConf,
            clampToGround: true
        })
    ]
});

const deckView = new DeckGlView({
    container: 'deckMap',
    autoZoomOnFirstMarker:true,
    layers: [
        new PointMarkerLayer({
            ...commonMarkerConf,
            iconScale: 7,
            onHover: (markerId, pickingInfo, event) => updateInfos(markerId, pickingInfo.lngLat , pickingInfo.pixel),
            onLeftClick: (markerId, pickingInfo, event) => updateInfos(markerId, pickingInfo.lngLat , pickingInfo.pixel),
            onRightClick: (markerId, pickingInfo, event) => {
                const rect = document.getElementById('deckMap').getBoundingClientRect();
                showPopup(pickingInfo.pixel[0] + rect.left, pickingInfo.pixel[1] + rect.top, 'some content ' + markerId);
            }
        }),
        new Polyline({
            ...commonPolylineConf,
            color: [255, 102, 0, 127]
        })
    ]
});

/**************************************************************/
/********************* Update UI  ****************************/
/************************************************************/

// update time
const timeElt = document.getElementById("time");
const loadElt = document.getElementById("load");
const removeAllElt = document.getElementById("removeall");

const bc = new BroadcastChannel(DATASOURCE_DATA_TOPIC + avlDataSource.id)

bc.onmessage = (event) => {
    if (event.data.type === 'data') {
        for (let i = 0; i < event.data.values.length; i++) {
            timeElt.innerText = new Date(event.data.values[i].timeStamp).toISOString();
        }
    }
}

removeAllElt.setAttribute("disabled", "");

// connect AVL datasource manually
loadElt.onclick = () => {
    avlDataSource.connect();
    removeAllElt.removeAttribute("disabled");
    loadElt.setAttribute("disabled", "");
};

// disconnect AVL datasource manually and remove Markers/polylines from the View
removeAllElt.onclick = async () => {
    avlDataSource.disconnect();
    removeAllElt.setAttribute("disabled", "");
    loadElt.removeAttribute("disabled");

    // let the time to flush the data broadcast channel
    // we need to wait a little because the disconnect() datasource function is not synchronous
    // if markers are deleted too early, the connection may continue to send data back to the views which
    // will result in the re-creation of markers. This is asynchronous because the WebSocket protocol is launched from a WebWorker.
    setTimeout(() => {
        leafletMapView.removeAllFromLayers();
        olMapView.removeAllFromLayers();
        deckView.removeAllFromLayers();
        cesiumMapView.removeAllFromLayers();
    }, 100);
};
