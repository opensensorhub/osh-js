import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

function createView(videoDivId, mapDivId) {
    const START_TIME = '2012-06-29T14:32:34.099333251Z';
    const END_TIME = '2012-06-29T14:36:54.033333251Z';

    const MIN_TIME = '2012-06-29T14:32:34.099333251Z';
    const MAX_TIME = '2055-06-29T14:36:54.033333251Z';

    const REPLAY_SPEED = 1.0;

    const commonDatasourceOpts = {
        endpointUrl:  'api.georobotix.io/ogc/t18/api',
        protocol: 'mqtt',
        mqttOpts: {
            shared: true,
            prefix: '/api',
            endpointUrl: 'api.georobotix.io:443/ogc/t18'
        },
        tls: true,
        startTime: START_TIME,
        endTime: END_TIME,
        minTime: MIN_TIME,
        maxTime: MAX_TIME,
        mode: Mode.REAL_TIME,
        replaySpeed: REPLAY_SPEED,
        prefetchBatchDuration: 10000,
        prefetchBatchSize: 250,
    }

    let droneVideoSource = new ConSysApi("MISB Drone - Video", {
        ...commonDatasourceOpts,
        resource: '/datastreams/h225hesual08g/observations',
        responseFormat: 'application/swe+binary',
    });

    let droneLocationDataSource = new ConSysApi('MISB UAS - Platform Location', {
        ...commonDatasourceOpts,
        resource: '/datastreams/o7pce3e60s0ie/observations',
        responseFormat: 'application/swe+json',
    });

    let droneOrientationDataSource = new ConSysApi('MISB UAS - Platform Attitude', {
        ...commonDatasourceOpts,
        resource: '/datastreams/mlme3gtdfepvc/observations',
        responseFormat: 'application/swe+json',
    });


    // show it in video view using FFMPEG JS decoder
    let videoView = new VideoView({
        container: videoDivId,
        css: "video-h264",
        name: "UAV Video",
        framerate:30,
        showTime: true,
        showStats: true,
        useWebCodecApi:false,
        layers: [
            new VideoDataLayer({
                dataSourceId: droneVideoSource.id,
                getFrameData: (rec) => rec.img,
                getTimestamp: (rec) => rec.timestamp
            })
        ]
    });

    // #region snippet_multiple_layer_datasources
    let pointMarker = new PointMarkerLayer({
        label: "MISB UAS",
        labelColor: "#FFFFFF",
        labelOffset: [0, -20],
        getLocation : {
            dataSourceIds : [droneLocationDataSource.id],
            handler : function(rec) {
                const pos = {
                    x : rec.location.lon,
                    y : rec.location.lat,
                    z : 0
                };

                return pos;
            }
        },
        getOrientation : {
            dataSourceIds : [droneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.attitude.heading
                };
            }
        },
        icon: "./images/drone.png",
        iconScale: 0.1
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
        startTime: START_TIME,
        endTime: END_TIME,
        dataSources: [
            droneVideoSource,
            droneLocationDataSource,
            droneOrientationDataSource
        ],
        mode: Mode.REAL_TIME
    });
    dataSynchronizer.connect();
}

createView("VideoLeft","leafletMapLeft");
createView("VideoRight","leafletMapRight");

