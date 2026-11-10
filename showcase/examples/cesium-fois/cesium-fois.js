// #region snippet_cesium_fois
import CesiumView from 'osh-js/source/core/ui/view/map/CesiumView.js';
import {
    Cartesian3, Ion
} from '@cesium/engine';
import PointMarkerLayer from 'osh-js/source/core/ui/layer/PointMarkerLayer';
import Systems from "osh-js/source/core/consysapi/system/Systems";
import SamplingFeatures from "osh-js/source/core/consysapi/samplingfeature/SamplingFeatures";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

const featureId = "n17r5jqeav6v8";

const mqttProps = {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
};

const samplingFeatures = new SamplingFeatures({
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    streamProtocol: 'mqtt',
    mqttOpts: mqttProps,
    tls: true,
});

const cesiumView = new CesiumView({
    container: "cesium-container",
    autoZoomOnFirstMarker: true,
    layers: []
});

cesiumView.viewer.camera.flyTo({
    destination : new Cartesian3(
        1488411.6251324203,
        -5268449.4730327735,
        4043539.7085447963
    ),
    orientation: {
        direction : new Cartesian3(
            -0.3390959920603357,
            0.8747561701406432,
            0.3461438298879394
        ),
        up : new Cartesian3(
            0.040665571671700686,
            -0.3539702229711658,
            0.9343721916508201
        )
    }
});

async function startListening(){
    const feature = samplingFeatures.getSamplingFeatureById(featureId);

    let pointMarker = new PointMarkerLayer({
        getLocation: () => {
            let pos = feature.shape.pos.split(" ");
            return {
                x: parseFloat(pos[1]),
                y: parseFloat(pos[0])
            };
        },
        getDescription:(f) => {
            let pos = feature.shape.pos.split(" ");
            return  feature.description + "<br/>" +
                "Latitude: " + pos[0] + "°<br/>" +
                "Longitude: " + pos[1] + "°";
        },
        defaultToTerrainElevation: true,
        icon: 'images/marker-icon.png',
        iconAnchor: [16, 40],
        iconSize: [32, 65],
        allowBillboardRotation: false
    });

    cesiumView.addLayer(pointMarker);
}
startListening();
