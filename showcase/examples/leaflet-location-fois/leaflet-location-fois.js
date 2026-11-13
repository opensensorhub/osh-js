// create data source for Android phone GPS
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import SamplingFeatures from "osh-js/core/consysapi/samplingfeature/SamplingFeatures";

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


// create Leaflet view
let leafletView = new LeafletView({
    container: "leafletMap",
    autoZoomOnFirstMarker: false,
    layers: [
    ]
});

leafletView.map.setView(new L.LatLng(42.406025,-76.060832), 7);

async function startListening(){
    const feature = samplingFeatures.getSamplingFeatureById(featureId);

    let pointMarker = new PointMarkerLayer({
        dataSourceId: sosGetFois.id,
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
        getMarkerId:(f) => f.id,
        icon: 'images/marker-icon.png',
        iconAnchor: [12, 41],
        getLabel: (f) =>  f.id,
        labelColor: '#000000',
        labelSize: 28,
        labelOffset: [0, 10],
        iconSize: [25,41]
    });

    leafletView.addLayer(pointMarker);
}
startListening();
