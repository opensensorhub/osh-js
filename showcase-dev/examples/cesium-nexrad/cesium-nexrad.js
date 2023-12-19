import cesium, {
    Cartesian2, Cartesian3, Ion, Color, LabelStyle, HorizontalOrigin, SceneMode
} from 'cesium';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import NexradLayer from "./NexradLayer";
import NexradView from "./NexradView";
import NexradSites from "./NexradSites";
import './cesium-nexrad.css';

// Compile errors when including TimeController
//import TimeController from 'osh-js/vue/components/TimeController.vue';


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

function createDataSource() {
    // return new SosGetResult('piaware-location', {
    return new SosGetResult('nexrad-data', {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: '76.187.247.4:8282/sensorhub/sos',
        // endpointUrl: 'localhost:8282/sensorhub/sos',
        offeringID: 'urn:osh:sensor:weather:nexrad',
        observedProperty: 'http://sensorml.com/ont/swe/propertyx/NexradRadial',
        mode: 'realTime', // default is REAL_TIME
        reconnectTimeout: 1000 * 120,  // 2 mimutes
        replaySpeed: 1
    })
}

// create  data source
let prevElevation;
let prevElevationNumber;
let nexradSource = createDataSource();

// sites
console.log('Initializing NexradSites...');
let nexradSites = new NexradSites();

let nexradLayer = new NexradLayer({
    dataSourceIds: [nexradSource.id],
    getSiteId: (rec) => {
        return rec.siteId;
    },
    getElevationNumber: (rec) => {
        return rec.elevationNumber;
    },
    getLocation: (rec) => {  
        return {
            x: rec.location.lon,
            y: rec.location.lat,
            z: rec.location.alt
        };
    },
    getAzimuth: (rec) => {
        return rec.azimuth;
    },
    getElevation: (rec) => {
        // Check to see if radar has completed a sweep and changed elevation
        if(rec.elevationNumber != prevElevationNumber) {
            console.log('cesium-nexrad: ' + new Date(rec.timestamp).toISOString() + ', ' + 
                rec.siteId + ', ' + rec.elevationNumber + ', ' + rec.elevation + ', ' + rec.azimuth );
            prevElevation = rec.elevation;
            prevElevationNumber = rec.elevationNumber;
        }
        return rec.elevation;
    },
    getRangeToCenterOfFirstRefGate: (rec) => {
        return rec.rangeToCenterOfFirstRefGate;
    },
    getRefGateSize: (rec) => {
        return rec.refGateSize;
    },
    getReflectivity: (rec) => {
        return rec.Reflectivity;
    },
    getProductTime: (rec, timestamp) => {
        let isoTime =  new Date(rec.timestamp).toISOString(); // rec.timestamp == timestamp
        return isoTime;
    },
  
    allowBillboardRotation: true,
});

// create Cesium view
let cesiumView = new NexradView({
    container: 'cesium-container',
    options: {
        layers: ['Bing Maps Aerial', 'Bing Maps Aerial with Labels', 'Bing Maps Roads'],
        viewerProps: {
            homeButton: true,
            sceneMode : SceneMode.SCENE2D,
            scene3DOnly: false, // for draw layer,
        }
    },
    allowBillboardRotation: true,
    width: '50%',
    height: '50%',
    layers: [nexradLayer],
  
});

// Default to Bing Maps Roads
const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[2];

//  TODO  update to show initial radar location
// Cannot call nexradSites until it's init() method finishes and all sites are loaded
// let siteLocation = nexradSites.getSite(currentSiteId);
// console.log('CURRENT SITE: ' + siteLocation);
//  For now, show approximate CONUS view
cesiumView.viewer.camera.setView({
    destination : Cartesian3.fromDegrees(-95.86789455,37.04455315,3750000)
});

// Set initial menu options and change events
let siteMenu = document.getElementById('sites');

let currentLabel;
siteMenu.onchange = (event) => {
    cesiumView.setActiveSite(event.target.value);
    let siteLoc = nexradSites.getSiteLocation(event.target.value);
    console.log(siteLoc);
    if(!currentLabel) {
        let label = getSiteLabel(siteLoc, event.target.value);
        currentLabel = cesiumView.viewer.entities.add(label);
    } else {
        currentLabel.position = Cartesian3.fromDegrees(siteLoc.x, siteLoc.y);
    }
    cesiumView.viewer.camera.flyTo({
        destination : Cartesian3.fromDegrees(siteLoc.x, siteLoc.y, 600000),
        duration : 1.0
    });   
}

function getSiteLabel(position, siteId) {
    let label = {
        position: Cartesian3.fromDegrees(position.x, position.y),
        point: {
          pixelSize: 8,
          color: Color.RED,
        },
        label: {
          text: siteId,
          font: "20px monospace",
          fillColor: Color.RED,
          outlineColor: Color.BLACK,
          style: LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 3,
          HorizontalOrigin: HorizontalOrigin.RIGHT,
          pixelOffset: new Cartesian2(32, 8),
        },
      };
      return label;
}

let elevationMenu = document.getElementById('elevations');
elevations.onchange = (event) => {
    cesiumView.setElevationNumber(event.target.value);
}

//  Start WS connection to driver
console.log('Establishing connection to Nexrad OSH node...');
nexradSource.connect();
