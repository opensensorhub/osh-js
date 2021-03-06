import SosGetResultJson from 'core/datasource/SosGetResultJson.js';
import OpenLayerView from 'core/ui/view/map/OpenLayerView.js';
import PointMarker from "core/ui/layer/PointMarker.js";
import {randomUUID} from "core/utils/Utils";


// create Cesium view
let openLayerView = new OpenLayerView("openlayer-container", []);

const totalElt = document.getElementById("total");
const viewItems = [];

function addMarker() {
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

    openLayerView.addViewItem(viewItem);

    gpsDataSource.connect();

    updateTotal();
}

function updateTotal() {
    totalElt.innerText = viewItems.length;
}
function removeMarker() {
    if(viewItems.length > 0) {
        const firstViewItem = viewItems.shift();
        openLayerView.removeViewItem(firstViewItem);
        updateTotal();
    }
}

const addButtonElement    = document.getElementById("add-button");
const removeButtonElement = document.getElementById("remove-button");

addButtonElement.onclick = addMarker;
removeButtonElement.onclick = removeMarker;
