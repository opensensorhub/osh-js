import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

const REPLAY_SPEED = 1.0;

// create data source for Android phone camera
let videoDataSource =  new ConSysApi('axis-Video', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2023-06-06T13:58:35Z',
    endTime: '2023-06-06T22:24:41Z',
    minTime: '2023-06-06T13:58:35Z',
    maxTime: '2023-06-06T22:24:41Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/g92fogmdhonki/observations',
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
            getFrameData: (rec) => rec.img,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// start streaming
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: '2023-06-06T13:58:35Z',
    endTime: '2023-06-06T22:24:41Z',
    dataSources: [
        videoDataSource
    ]
});
dataSynchronizer.connect();

