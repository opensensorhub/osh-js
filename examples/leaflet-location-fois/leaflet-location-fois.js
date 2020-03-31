//@ sourceURL=leaflet-location.html.js
// create data source for Android phone GPS
import PointMarker from "../../source/osh/ui/styler/StylerPointMarker.js";
import LeafletView from "../../source/osh/ui/view/map/LeafletView.js";
import Server from "../../source/osh/server/Server.js";
import $ from 'jquery';

let server = new Server({
  url: "http://sensiasoft.net:8181",
  sos: "sos",
  baseUrl: "sensorhub"
});

// create Leaflet view
let leafletMapView = new LeafletView("leafletMap", []);
leafletMapView.first = false; // don't zoom on first item added
leafletMapView.map.setView(new L.LatLng(42.8, -76), 8);

var cc = 0;
// show loading spinner
// retrieve list of features of interest from server (async call)
server.getFeatureOfInterestById("urn:usgs:water:network", function(resp) {

  // render each feature with a marker
  resp.GetFeatureOfInterestResponse.featureMember.forEach(function (f) {

    // parse location from GML
    var pos = f.shape.pos.split(" ");
    var pointMarker = new PointMarker({
      location: {
        x: parseFloat(pos[1]),
        y: parseFloat(pos[0])
      },
      icon: 'images/marker-icon.png',
      iconAnchor: [12, 41],
      /*label: f.id,
      labelOffset: [0, -14]*/
    });

    // add marker to Leaflet map
    leafletMapView.addViewItem({
      name: f.name,
      description: "<hr/>" + f.description + "<br/>" +
          "Latitude: " + pos[0] + "°<br/>" +
          "Longitude: " + pos[1] + "°",
      styler: pointMarker
    });
  });
});
