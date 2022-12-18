import cesium, {
    Cartesian3, Color, ColorGeometryInstanceAttribute, HeightReference, Ion, GeometryInstance, GroundPrimitive, EllipseGeometry
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
    // endpointUrl: 'botts-piaware.simple-url.com:8181/sensorhub/sos',
    // endpointUrl: 'localhost:8686/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:piaware',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    // mode: Mode.REAL_TIME,
    // startTime: 'now',
    // endTime: '2022-12-31T00:00:00Z',
    responseFormat: 'application/json',
    replaySpeed: 1
});

let trackDataSource = new SosGetResult('piaware-track', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: '76.187.247.4:8181/sensorhub/sos',
    // endpointUrl: 'botts-piaware.simple-url.com:8181/sensorhub/sos',
    // endpointUrl: 'localhost:8686/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:piaware',
    observedProperty: 'http://sensorml.com/ont/swe/property/Track',
    // mode: Mode.REAL_TIME,
    // startTime: 'now',
    // endTime: '2022-12-31T00:00:00Z',
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

function checkAge() {
    let markers = cesiumView.getMarkers();
    markers.forEach((entity) => {
        let sarr = entity.id.split('$');
        let timestamp = aircrafts.get(sarr[0]);
        if(Date.now() - timestamp > ageoff) {
            const now = new Date();
            console.log('Aging off:  ' + sarr[0] + ' : ' + now.toISOString() + ' : ac = ' + aircrafts.size + ' : cv = ' + cesiumView.getMarkers().length);
            aircrafts.delete(sarr[0]);
            //cesiumView.removeMarkerFromLayer(entity);
            cesiumView.removeMarkerFromLayer(entity, sarr[0]);
            // cesiumView.listMarkers();

            // console.log('---- Aircraft ----');
            // aircrafts.forEach((key, value, map) => {
            //      console.log('ac:' + value);
            // })
        }
    })
}

setInterval(checkAge, 1000);

// style it with a moving point marker
const aircrafts = new Map();
const ageoff = 60000;
let pointMarker = new PointMarkerLayer({
    dataSourceIds: [locationDataSource.id, trackDataSource.id],
    getMarkerId: (rec) =>  {
        aircrafts.set(rec.hexIdent, rec.timestamp);
        return rec.hexIdent;
    },
    getLabel: (rec) => rec.flightId != null ? rec.flightId : rec.hexIdent,
    labelSize: 22,
    allowBillboardRotation: true,
    // onHover: (markerId, billboard, event) =>  {
    //     hover(markerId, billboard, event);
    // },
    onLeftClick: (markerId, billboard, event) => {
        console.log('onLeftClick.. markerId = ' + markerId);
        const rect = document.getElementById('cesium-container').getBoundingClientRect();
        //showPopup(billboard.pixel.x + rect.left, billboard.pixel.y + rect.top, 'some content ' + markerId);
    },
    getLocation: {
        dataSourceIds: [locationDataSource.getId()],
        handler: function(rec, timestamp, options, instance) {
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
            return {
                heading: 360 - rec.track
            };
        }
    },
    getIcon: (rec) => {
        switch (rec.category) {
            case 'A7':
                return 'images/heli2.png';
            default:
                return 'images/icons8-airplane-64.png';
        }
    },
    //iconAnchor: [16, 40],
    // getIconColor: (rec) => {
    //     return "#ffaa33F";
    // },
    getIconColor: {
        dataSourceIds: [locationDataSource.id],
        handler: function(rec) {
            //return "#FFAA33";

            if(rec.location.alt < 500.) 
                return Color.RED.toCssColorString();
            if(rec.location.alt < 3000.) 
                return Color.DARKORANGE.toCssColorString();
            if(rec.location.alt < 6000.) 
                return Color.GOLD.toCssColorString();
            if(rec.location.alt < 10000.) 
                return Color.MEDIUMSEAGREEN.toCssColorString();
            if(rec.location.alt < 15000.) 
                return Color.DEEPSKYBLUE.toCssColorString();
            if(rec.location.alt < 25000.) 
                return Color.DODGERBLUE.toCssColorString();
            if(rec.location.alt < 30000.) 
                return Color.VIOLET.toCssColorString();
            if(rec.location.alt < 40000.) 
                return Color.FIREBRICK.toCssColorString();
            return Color.MAGENTA.toCssColorString();
        }
    },
    getIconScale: (rec) => {
        if(!rec.category)
            return 3.0;
        switch (rec.category) {
            case 'A1':
                return 1.75;
                break;
            case 'A2':
                return 2.25;
            case 'A3':
                return 3.0;
            case 'A4':
            case 'A5':
            case 'A6':
                return 4.0;
            case 'A7':
                return 3.0;
            default:
                return 3.0;
            }
    }
});

// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    allowBillboardRotation: true,
    // sceneMode : SceneMode.SCENE2D,
    // scene3DOnly: false,
    // autoZoomOnFirstMarker: false,
    layers: [pointMarker]
});

// ABIA Airport icon
cesiumView.viewer.entities.add({
    position: Cartesian3.fromDegrees(-97.6664, 30.1975),
    billboard: {
      image: "images/icons8-airport-50.png",
    //   color: Color.GRAY,
      heightReference: HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    }
});

cesiumView.viewer.entities.add({
    position: Cartesian3.fromDegrees(-97.6664, 30.197),
    // position: Cartesian3.fromDegrees(-86.7758, 34.6405, 10000.),
    name : '50 mile range ring',
    ellipse : {
        semiMinorAxis : 80467.2,
        semiMajorAxis : 80467.2,
        height: 100000,
        fill: false,
        outline: true,
        outlineColor: Color.BLACK,
        outerWidth: 10
      }    
});

cesiumView.viewer.entities.add({
    position: Cartesian3.fromDegrees(-97.6664, 30.1975, 10000.),
    // position: Cartesian3.fromDegrees(-86.7758, 34.6405, 10000.),
    name : '100 mile range ring',
    ellipse : {
        semiMinorAxis : 80467.2 * 2.,
        semiMajorAxis : 80467.2 * 2.,
        height: 100000,
        fill: false,
        outline: true,
        outlineColor: Color.BLACK,
      }    
});

cesiumView.viewer.entities.add({
    position: Cartesian3.fromDegrees(-97.6664, 30.1975, 10000.),
    // position: Cartesian3.fromDegrees(-86.7758, 34.6405, 10000.),
    name : '150 mile range ring',
    ellipse : {
        semiMinorAxis : 80467.2 * 3.,
        semiMajorAxis : 80467.2 * 3.,
        height: 100000,
        fill: false,
        outline: true,
        outlineColor: Color.BLACK,
      }    
});

//cesiumView.viewer.camera.lookAt(Cartesian3.fromDegrees(-97.6664, 30.1975), new Cartesian3(0.0, 0.0, 2//00.0));
console.log('connecting to datasources');

// start streaming
locationDataSource.connect();
trackDataSource.connect();
