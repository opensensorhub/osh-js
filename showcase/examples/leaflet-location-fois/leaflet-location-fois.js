// create data source for Android phone GPS
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import SosGetFois from 'osh-js/core/datasource/sos/SosGetFois.datasource.js';

// create data source for Fois
let sosGetFois = new SosGetFois('fois', {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    procedureId: 'urn:usgs:water:network',
    tls: true
});

// create Leaflet view
let leafletView = new LeafletView({
    container: "leafletMap",
    autoZoomOnFirstMarker: false,
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
            labelColor: '#000000',
            labelSize: 28,
            labelOffset: [0, 10],
            iconSize: [25,41]
        })
    ]
});

leafletView.map.setView(new L.LatLng(42.406025,-76.060832), 7);

sosGetFois.connect();
