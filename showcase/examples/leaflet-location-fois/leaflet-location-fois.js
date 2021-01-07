//@ sourceURL=leaflet-location.html.js
// create data source for Android phone GPS
import PointMarkerLayer from "osh/ui/layer/PointMarkerLayer.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import Server from "osh/server/Server.js";

let server = new Server({
  url: "http://sensiasoft.net:8181",
  sos: "sos",
  baseUrl: "sensorhub"
});

// create Leaflet view
let leafletMapView = new LeafletView({
  container: "leafletMap"
});
leafletMapView.map.setView(new L.LatLng(42.8, -76), 8);

// show loading spinner
// retrieve list of features of interest from server (async call)
server.getFeatureOfInterestById("urn:usgs:water:network", function(resp) {

  // render each feature with a marker
  let first = true;

  resp.GetFeatureOfInterestResponse.featureMember.forEach(function (f) {

    // parse location from GML
    var pos = f.shape.pos.split(" ");

    // add marker to Leaflet map
    leafletMapView.addMarker({
          location: {
            x: parseFloat(pos[1]),
            y: parseFloat(pos[0])
          },
          icon: 'images/marker-icon.png',
          iconAnchor: [12, 41],
          name: f.name,
          description: "<hr/>" + f.description + "<br/>" +
              "Latitude: " + pos[0] + "°<br/>" +
              "Longitude: " + pos[1] + "°",
          label: f.id,
          labelOffset: [0, -14]
        }
    );
  });
});
