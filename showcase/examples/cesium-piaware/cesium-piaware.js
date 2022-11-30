import {
    Cartesian3, HeightReference, Ion, SceneMode
} from 'cesium';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

// create piAware data sources
let locationDataSource = new SosGetResult('piaware-location', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: '76.187.247.4:8181/sensorhub/sos',
    // endpointUrl: 'localhost:8181/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:PiAware',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    startTime: 'now',
    endTime: '2022-12-31T00:00:00Z',
    responseFormat: 'application/json',
    replaySpeed: 1
});

let trackDataSource = new SosGetResult('piaware-track', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: '76.187.247.4:8181/sensorhub/sos',
    // endpointUrl: 'localhost:8181/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:PiAware',
    observedProperty: 'http://sensorml.com/ont/swe/property/Track',
    startTime: 'now',
    endTime: '2022-12-31T00:00:00Z',
    responseFormat: 'application/json',
    replaySpeed: 1
});

function hover(markerId, flightId, billboard, event) {
    console.log(markerId + ',' + flightId + ',' + billboard + ',' + event);
}

const popupElt = document.getElementById("popup");

function showPopup(x, y, content) {
    console.log('in showPopup');
    const padding = 10;
    popupElt.setAttribute("style", "left:" + (x + padding) + ";top:" + (y + padding) + "; display:block !important; width:100px; height:50px");
    popupElt.innerText = content;
}

function hidePopup(x, y, content) {
    popupElt.setAttribute('style', 'display:none;');
    popupElt.innerText = '';
}

// hide popup if anywhere we click
document.body.onclick = () => {
    hidePopup();
};


// style it with a moving point marker
const aircrafts = new Map();
const ageoff = 60000;
let pointMarker = new PointMarkerLayer({
    dataSourceIds: [locationDataSource.id, trackDataSource.id],
    getMarkerId: (rec) =>  {
        aircrafts.set(rec.hexIdent, rec.timestamp);

        let markers = cesiumView.getMarkers();
        markers.forEach((entity) => {
             let sarr = entity.id.split('$');
             //console.log('marker, uid: ' + entity.id + ',' + sarr[1] + ','  + rec.hexIdent);
             if(rec.hexIdent !== sarr[1]) {
                 let timestamp = aircrafts.get(sarr[1]);
                 //console.log('Age check: ' + (Date.now() - timestamp)  + '>?' + ageoff);
                 if(Date.now() - timestamp > ageoff) {
                    console.log('Aging off: ' + sarr[1]);
                    aircrafts.delete(sarr[1]);
                    cesiumView.removeMarkerFromLayer(entity);
                 }
             }
        });

        return rec.hexIdent;
    },
    getLabel: (rec) => rec.flightId != null ? rec.flightId : rec.hexIdent,
    allowBillboardRotation: true,
    onHover: (markerId, billboard, event) =>  {
        hover(markerId, billboard, event);
    },
    onLeftClick: (markerId, billboard, event) => {
        console.log('onLeftClick');
        const rect = document.getElementById('cesium-container').getBoundingClientRect();
        showPopup(billboard.pixel.x + rect.left, billboard.pixel.y + rect.top, 'some content ' + markerId);
    },
    getLocation: {
        dataSourceIds: [locationDataSource.getId()],
        handler: function(rec, timestamp, options, instance) {
            // console.log(rec.hexIdent + ' , ' + rec.location.lat + "," + rec.location.lon);
            //console.log(`${rec.hexIdent} => ${rec.location.lat} ,  ${rec.location.lon}`);

            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
            };
        }
    },
    getOrientation: {
        dataSourceIds: [trackDataSource.getId()],
        handler: function(rec, timestamp, options, instance) {
            //console.log(`${rec.hexIdent} => ${360 - rec.track}`);

            return {
                heading: 360 - rec.track
            };
        }
    },
    icon: 'images/icons8-airplane-64.png',
    iconAnchor: [16, 40]
});

// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    allowBillboardRotation: true,
    sceneMode : SceneMode.SCENE2D,
    layers: [pointMarker]
});

// ABIA Airport icon
cesiumView.viewer.entities.add({
    position: Cartesian3.fromDegrees(-97.6664, 30.1975),
    billboard: {
      image: "images/icons8-airport-50.png",
      heightReference: HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });


console.log('connecting to datasources');

// start streaming
 locationDataSource.connect();
 trackDataSource.connect();
