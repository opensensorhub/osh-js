// #region snippet_cesium_fois
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import SosGetFois from 'osh-js/core/datasource/sos/SosGetFois.datasource';
import {
    Cartesian3, Ion
} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

// create data source for Fois
let sosGetFois = new SosGetFois('fois', {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    procedureId: 'urn:usgs:water:network',
    tls: true
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
            labelBackgroundColor: 'rgba(0,0,0,0.5)',
            labelOutlineColor: 'rgba(150,150,150,1.0)'
        })
    ]
});

cesiumView.viewer.camera.flyTo({
    destination : new Cartesian3(1488411.6251324203,-5268449.4730327735, 4043539.7085447963),
    orientation: {
        direction : new  Cartesian3(-0.3390959920603357,0.8747561701406432,0.3461438298879394),
        up : new Cartesian3(0.040665571671700686, -0.3539702229711658, 0.9343721916508201),
    }
});

sosGetFois.connect();

// #endregion snippet_cesium_fois
