import Video from "osh/datareceiver/Video.js";
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import FFMPEGView from "osh/ui/view/video/FFMPEGView";
import DataSynchronizer from "osh/datasynchronizer/DataSynchronizer";

const REPLAY_FACTOR = 1.0;

function createView(videoDivId, mapDivId, startTime,endTime ) {
    const videoDataSource = new Video("drone-Video", {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
        offeringID: 'urn:mysos:solo:video2',
        observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
        startTime: startTime,
        endTime: endTime,
        replaySpeed: REPLAY_FACTOR
    });
    const platformLocationDataSource = new SweJson('android-GPS', {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
        startTime: startTime,
        endTime: endTime,
        replaySpeed: REPLAY_FACTOR
    });
    const platformOrientationDataSource = new SweJson('android-Heading', {
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
    let videoView = new FFMPEGView(videoDivId, {
        dataSourceId: videoDataSource.id,
        css: "video-h264",
        name: "UAV Video",
        framerate: 25,
        showTime: true,
        showStats: true
    });

    // add 3D model marker to Cesium view
    let pointMarker = new PointMarker({
        label: "3DR Solo",
        locationFunc: {
            dataSourceIds: [platformLocationDataSource.getId()],
            handler: function (rec) {
                return {
                    x: rec.loc.lon,
                    y: rec.loc.lat,
                    z: rec.loc.alt - 184 // model offset
                };
            }
        },
        orientationFunc: {
            dataSourceIds: [platformOrientationDataSource.getId()],
            handler: function (rec) {
                return {
                    heading: rec.attitude.yaw
                };
            }
        },
        zoomLevel: 18,
        icon: './images/drone.png',
        iconAnchor: [64,112]
    });

    // create Leaflet view
    new LeafletView(mapDivId,
        [{
            styler: pointMarker,
            name: "3DR Drone"
        }],
        {
            autoZoomOnFirstMarker: true,
            follow:true
        }
    );

    const dataSynchronizer = new DataSynchronizer({
        replayFactor: REPLAY_FACTOR,
        intervalRate: 5,
        dataSources: [videoDataSource, platformLocationDataSource, platformOrientationDataSource]
    })
    dataSynchronizer.connectAll();

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

