import SosGetResultJson from 'core/datasource/SosGetResultJson.js';
import CesiumView from 'core/ui/view/map/CesiumView.js';
import LeafletView from 'core/ui/view/map/LeafletView.js';
import OpenLayerView from 'core/ui/view/map/OpenLayerView.js';
import PointMarker from "core/ui/layer/PointMarker.js";
import {randomUUID} from "core/utils/Utils";

window.CESIUM_BASE_URL = './';

// create Cesium view
let cesiumView = new CesiumView("cesium-container", []);
// create Leaflet view
let leafletView = new LeafletView("leaflet-container", []);
// create OpenLayer view
let openLayerView = new OpenLayerView("openlayer-container", []);

const totalElt = document.getElementById("total");

const viewItems = [];

function createViewItem() {
    let gpsDataSource = new SosGetResultJson('android-GPS', {
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
        getLocation : {
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
        layer: pointMarker
    };
    viewItems.push(viewItem);

    gpsDataSource.connect();

    updateTotal();

    return viewItem;
}

function addMarker() {
    cesiumView.addViewItem(createViewItem());
    leafletView.addViewItem(createViewItem());
    openLayerView.addViewItem(createViewItem());
}

function updateTotal() {
    totalElt.innerText = viewItems.length;
}
function removeMarker() {
    cesiumView.removeViewItem(viewItems.shift());
    leafletView.removeViewItem(viewItems.shift());
    openLayerView.removeViewItem(viewItems.shift());

    updateTotal();
}

const addButtonElement    = document.getElementById("add-button");
const removeButtonElement = document.getElementById("remove-button");

addButtonElement.onclick = addMarker;
removeButtonElement.onclick = removeMarker;
