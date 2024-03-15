import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

const REPLAY_SPEED = 1.0;

function createView(videoDivId, mapDivId, startTime,endTime ) {
    const videoDataSource = new SosGetResult("drone-Video", {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:video2',
        observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
        startTime: startTime,
        endTime: endTime,
        mode: Mode.REPLAY,
        tls: true
    });
    const platformLocationDataSource = new SosGetResult('android-GPS', {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
        startTime: startTime,
        endTime: endTime,
        mode: Mode.REPLAY,
        tls: true
    });
    const platformOrientationDataSource = new SosGetResult('android-Heading', {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
        startTime: startTime,
        endTime: endTime,
        mode: Mode.REPLAY,
        tls: true
    });

    // show it in video view using FFMPEG JS decoder
    let videoView = new VideoView({
        container: videoDivId,
        css: "video-h264",
        name: "UAV Video",
        framerate: 25,
        showTime: true,
        showStats: true,
        layers: [
            new VideoDataLayer({
                dataSourceId: videoDataSource.id,
                getFrameData: (rec) => rec.videoFrame,
                getTimestamp: (rec) => rec.timestamp
            })
        ]
    });

    // #region snippet_multiple_layer_datasources
    // add 3D model marker to Cesium view
    let pointMarker = new PointMarkerLayer({
        dataSourceIds: [platformLocationDataSource.id, platformOrientationDataSource.id],
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
        iconAnchor: [70, 98]
    });

    // #endregion snippet_multiple_layer_datasources

    // create Leaflet view
    new LeafletView({
        container: mapDivId,
        layers: [pointMarker],
        autoZoomOnFirstMarker: true
    });

    const dataSynchronizer = new DataSynchronizer({
        masterTimeRefreshRate: 250,
        replaySpeed: REPLAY_SPEED,
        startTime: startTime,
        endTime: endTime,
        dataSources: [
            videoDataSource, platformLocationDataSource, platformOrientationDataSource
        ]
    });
    dataSynchronizer.connect()
}

createView("VideoLeft","leafletMapLeft", '2015-12-19T21:04:29.231Z', '2015-12-19T21:09:19.675Z');
createView("VideoRight","leafletMapRight", '2015-12-19T21:06:00.231Z', '2015-12-19T21:09:19.675Z');

