
import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from "osh-js/core/datasource/Mode";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

const REPLAY_SPEED = 5.0;

// create data source for UAV camera
let videoDataSource =  new ConSysApi('DJI Video', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: {
        shared: true,
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    tls: true,
    startTime: "2023-06-06T14:33:34.043Z",
    endTime: "2023-06-06T22:22:50Z",
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    resource: '/datastreams/19katg6mleqtc/observations',
    responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
    container: "video-container",
    css: "video-h264",
    name: "DJI Drone Video",
    framerate:25,
    showTime: true,
    showStats: true,
    useWebCodecApi: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.img,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// start streaming
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    startTime: "2023-06-06T14:33:34.043Z",
    endTime: "2023-06-06T22:22:50Z",
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    dataSources: [
        videoDataSource
    ]
});
dataSynchronizer.connect();