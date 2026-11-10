import SosGetResult from 'osh-js/source/core/datasource/sos/SosGetResult.datasource.js';
import VideoView from 'osh-js/source/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/source/core/ui/layer/VideoDataLayer';
import {Mode} from 'osh-js/source/core/datasource/Mode';
import DataSynchronizer from 'osh-js/source/core/timesync/DataSynchronizer';
import ConSysApi from "../../../../source/core/datasource/consysapi/ConSysApi.datasource";

let startTime = "2015-02-16T07:57:59.447Z";
let endTime = "2015-02-16T08:09:00Z";

// create data source for Android phone camera
let videoDataSource =  new ConSysApi('axis-Video', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2023-05-31T21:57:33.099333251Z',
    endTime: '2026-11-10T19:05:01.033333251Z',
    minTime: '2023-05-31T21:57:33.099333251Z',
    maxTime: '2055-12-31T19:05:01.033333251Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/lm83m9jt1fd7a/observations',
    responseFormat: 'application/swe+binary',
});

// show it in video view
let videoView = new VideoView({
    container: "video-mjpeg-container",
    css: "video-mjpeg",
    name: "Android Video",
    keepRatio: true,
    showTime: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.videoFrame,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// start streaming
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: startTime,
    endTime: endTime,
    dataSources: [
        videoDataSource
    ]
});
dataSynchronizer.connect();

