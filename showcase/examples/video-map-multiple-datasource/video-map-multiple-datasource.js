import PointMarkerLayer from 'osh-js/source/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/source/core/ui/view/map/LeafletView.js';
import VideoView from 'osh-js/source/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/source/core/ui/layer/VideoDataLayer';
import {Mode} from "osh-js/source/core/datasource/Mode";
import DataSynchronizer from "osh-js/source/core/timesync/DataSynchronizer";
import ConSysApi from "osh-js/source/core/datasource/consysapi/ConSysApi.datasource";

const REPLAY_SPEED = 1.0;

function createView(videoDivId, mapDivId, startTime,endTime ) {
    let videoDataSource =  new ConSysApi('drone-Video', {
        endpointUrl:  'api.georobotix.io/ogc/t18/api',
        tls: true,
        startTime: startTime,
        endTime: endTime,
        mode: Mode.REPLAY,
        replaySpeed: REPLAY_SPEED,
        prefetchBatchDuration: 10000,
        prefetchBatchSize: 250,
        resource: '/datastreams/h225hesual08g/observations',
        responseFormat: 'application/swe+binary',
    });

    let platformLocationDataSource = new ConSysApi('drone-GPS', {
        endpointUrl:  'api.georobotix.io/ogc/t18/api',
        tls: true,
        startTime: startTime,
        endTime: endTime,
        mode: Mode.REPLAY,
        replaySpeed: REPLAY_SPEED,
        prefetchBatchDuration: 10000,
        prefetchBatchSize: 250,
        resource: '/datastreams/o7pce3e60s0ie/observations',
        responseFormat: 'application/swe+json',
    });

    let platformOrientationDataSource = new ConSysApi('drone-Heading', {
        endpointUrl:  'api.georobotix.io/ogc/t18/api',
        tls: true,
        startTime: startTime,
        endTime: endTime,
        mode: Mode.REPLAY,
        replaySpeed: REPLAY_SPEED,
        prefetchBatchDuration: 10000,
        prefetchBatchSize: 250,
        resource: '/datastreams/h75dmug8e3sae/observations',
        responseFormat: 'application/swe+json',
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
        name: "MISB UAV",
        label: "MISB UAV",
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
    dataSynchronizer.connect();
}

createView("VideoLeft","leafletMapLeft", '2026-11-10T18:32:58.000Z', '2026-11-10T18:43:22.675Z');
createView("VideoRight","leafletMapRight", '2026-11-10T18:32:58.000Z', '2026-11-10T18:43:22.675Z');

