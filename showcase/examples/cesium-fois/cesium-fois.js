// #region snippet_cesium_fois
import CesiumView from 'osh/ui/view/map/CesiumView.js';
import SosGetFois from 'osh/datareceiver/SosGetFois';
import {
    Rectangle
} from 'cesium';
import PointMarkerLayer from 'osh/ui/layer/PointMarkerLayer';

window.CESIUM_BASE_URL = './';

// create data source for Fois
let sosGetFois = new SosGetFois('fois', {
    protocol: 'http',
    service: 'SOS',
    endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
    batchSize: 50,
    foiURN: 'urn:usgs:water:network'
});

// create Cesium view
let cesiumView = new CesiumView({
    container: "cesium-container",
    autoZoomOnFirstMarker: true,
    layers: [
        new PointMarkerLayer({
            dataSourceId: sosGetFois.id,
            getLocation: (f) => {
                let pos = f.shape.pos.split(" ");
                return {
                    x: parseFloat(pos[1]),
                    y: parseFloat(pos[0])
                }
            },
            getDescription:(f) => {
                let pos = f.shape.pos.split(" ");
                return  f.description + "<br/>" +
                "Latitude: " + pos[0] + "°<br/>" +
                "Longitude: " + pos[1] + "°"
            },
            getMarkerId:(f) => f.id,
            icon: 'images/marker-icon.png',
            iconAnchor: [12, 41],
            getLabel: (f) =>  f.id,
            labelColor: '#ffffff',
            labelSize: 28,
            labelOffset: [0, 10],
        })
    ]
});

cesiumView.viewer.camera.flyTo({
    destination : Rectangle.fromDegrees(-84.299417,38.967509,-64.194437,46.731941)
});

sosGetFois.connect();

// #endregion snippet_cesium_fois
