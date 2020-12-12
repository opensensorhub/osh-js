import CesiumView from 'osh/ui/view/map/CesiumView.js';
import {HeadingPitchRange, Math} from 'cesium';
import PointMarker from 'osh/ui/layer/PointMarker.js';
import Server from "osh/server/Server.js";

window.CESIUM_BASE_URL = './';

let server = new Server({
    url: "http://sensiasoft.net:8181",
    sos: "sos",
    baseUrl: "sensorhub"
});

// create Cesium view
let cesiumView = new CesiumView("cesium-container", []);
cesiumView.first = false; // don't zoom on first item added

// retrieve list of features of interest from server (async call)
//$loading = $("<p style='position:absolute; color:white; top:20; left:20; z-index:1000'>Loading...</p>");
server.getFeatureOfInterestById("urn:usgs:water:network", function(resp) {

    // render each feature with a marker
    resp.GetFeatureOfInterestResponse.featureMember.forEach(function(f) {

        // parse location from GML
        let pos = f.shape.pos.split(" ");
        let pointMarker = new PointMarker({
            location: {
                x: parseFloat(pos[1]),
                y: parseFloat(pos[0])
            },
            icon: 'images/marker-icon.png',
            iconAnchor: [12, 41],
            /*label: f.id,
            labelColor: '#ffffff',
            labelSize: 28,
            labelOffset: [0, 10],*/
        });

        // add marker to Leaflet map
        cesiumView.addViewItem({
            name: f.name,
            description: f.description + "<br/>" +
                "Latitude: " + pos[0] + "°<br/>" +
                "Longitude: " + pos[1] + "°",
            layer: pointMarker
        });
    });

    // zoom to all created markers
    cesiumView.viewer.zoomTo(cesiumView.viewer.entities, new HeadingPitchRange(Math.toRadians(0), Math.toRadians(-90), 5e5));
});
