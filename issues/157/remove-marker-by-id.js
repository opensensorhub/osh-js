import SweJson from 'osh/datareceiver/SweJson.js';
import CesiumView from 'osh/ui/view/map/CesiumView.js';
import LeafletView from 'osh/ui/view/map/LeafletView.js';
import OpenLayerView from 'osh/ui/view/map/OpenLayerView.js';
import PointMarker from "osh/ui/styler/PointMarker.js";
import {randomUUID} from "osh/utils/Utils";

window.CESIUM_BASE_URL = './';

// create Cesium view
let cesiumView = new CesiumView("cesium-container", []);
// create Leaflet view
let leafletView = new LeafletView("leaflet-container", []);
// create OpenLayer view
let openLayerView = new OpenLayerView("openlayer-container", []);

const totalElt = document.getElementById("total");

const viewItems = [];

function addMarker() {
    let gpsDataSource = new SweJson('android-GPS', {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
        offeringID: 'urn:android:device:060693280a28e015-sos',
        observedProperty: 'http://sensorml.com/ont/swe/property/Location',
        startTime: '2015-02-16T08:00:30Z',
        endTime: '2015-02-16T08:09:00Z',
        replaySpeed: 2
    });

    let pointMarker = new PointMarker({
        label: "Marker",
        locationFunc : {
            dataSourceIds : [gpsDataSource.id],
            handler : function(rec) {
                return {
                    x : rec.location.lon,
                    y : rec.location.lat,
                    z : 0
                };
            }
        },
        icon: 'images/car-location.png',
    });

    const viewItem = {
        id: randomUUID(),
        name: 'marker',
        styler: pointMarker
    };
    viewItems.push(viewItem);

    cesiumView.addViewItem(viewItem);
    leafletView.addViewItem(viewItem);

    gpsDataSource.connect();

    updateTotal();
}

function updateTotal() {
    totalElt.innerText = viewItems.length;
}
function removeMarker() {
    const firstViewItem = viewItems.shift();
    leafletView.removeViewItem(firstViewItem);

    updateTotal();
}

const addButtonElement    = document.getElementById("add-button");
const removeButtonElement = document.getElementById("remove-button");

addButtonElement.onclick = addMarker;
removeButtonElement.onclick = removeMarker;
