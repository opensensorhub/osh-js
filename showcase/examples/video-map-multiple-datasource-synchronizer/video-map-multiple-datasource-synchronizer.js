import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';

const REPLAY_FACTOR = 1.0;

function createView(videoDivId, mapDivId, startTime,endTime ) {
    const videoDataSource = new SosGetResultVideo("drone-Video", {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
        offeringID: 'urn:mysos:solo:video2',
        observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
        startTime: startTime,
        endTime: endTime,
        replaySpeed: REPLAY_FACTOR
    });
    const platformLocationDataSource = new SosGetResultJson('android-GPS', {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
        startTime: startTime,
        endTime: endTime,
        replaySpeed: REPLAY_FACTOR
    });
    const platformOrientationDataSource = new SosGetResultJson('android-Heading', {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
        startTime: startTime,
        endTime: endTime,
        replaySpeed: REPLAY_FACTOR
    });

    // show it in video view using FFMPEG JS decoder
    let videoView = new FFMPEGView({
        container: videoDivId,
        css: "video-h264",
        name: "UAV Video",
        framerate: 25,
        showTime: true,
        showStats: true,
        dataSourceId: videoDataSource.id
    });

    // add 3D model marker to Cesium view
    let pointMarker = new PointMarkerLayer({
        name: "3DR Drone",
        label: "3DR Solo",
        getLocation: {
            dataSourceIds: [platformLocationDataSource.getId()],
            handler: function (rec) {
                return {
                    x: rec.loc.lon,
                    y: rec.loc.lat,
                    z: rec.loc.alt - 184 // model offset
                };
            }
        },
        getOrientation: {
            dataSourceIds: [platformOrientationDataSource.getId()],
            handler: function (rec) {
                return {
                    heading: rec.attitude.yaw
                };
            }
        },
        zoomLevel: 18,
        icon: './images/drone.png',
        iconSize: [128,128],
        iconAnchor: [64,112]
    });

    // create Leaflet view
    new LeafletView({
        container: mapDivId,
        layers: [pointMarker],
        autoZoomOnFirstMarker: true,
        follow:true
    });

    const dataSynchronizer = new DataSynchronizer({
        replaySpeed: REPLAY_FACTOR,
        timerResolution: 5,
        dataSources: [videoDataSource, platformLocationDataSource, platformOrientationDataSource]
    })
    dataSynchronizer.connect();

    return dataSynchronizer;
}

const dataSynchronzerLeft = createView("VideoLeft","leafletMapLeft",
    '2015-12-19T21:04:29.231Z', '2015-12-19T21:09:19.675Z');
const dataSynchronzerRight = createView("VideoRight","leafletMapRight",
    '2015-12-19T21:06:00.231Z', '2015-12-19T21:09:19.675Z');

// display current time
const currentTimeLeftElt = document.getElementById("current-time-left");
const currentTimeRightElt = document.getElementById("current-time-right");

setInterval(async ()=> {
    dataSynchronzerLeft.getCurrentTime().then(time => {
        currentTimeLeftElt.innerText = 'Current time: '+new Date(time).toISOString();
    });
    dataSynchronzerRight.getCurrentTime().then(time => {
        currentTimeRightElt.innerText = 'Current time: '+new Date(time).toISOString();
    });
},100);

