import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

function createView(videoDivId, mapDivId) {
    const commonDatasourceOpts = {
        endpointUrl:  'api.georobotix.io/ogc/t18/api',
        protocol: 'mqtt',
        mqttOpts: {
            shared: true,
            prefix: '/api',
            endpointUrl: 'api.georobotix.io:443/ogc/t18'
        },
        tls: true,
        mode: Mode.REAL_TIME,
    };

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
        getLocation: {
            dataSourceIds: [droneLocationDataSource.getId()],
            handler: function (rec) {
                return {
                    x: rec.location.lon,
                    y: rec.location.lat,
                    z: rec.location.alt ?? 0.0
                };
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

