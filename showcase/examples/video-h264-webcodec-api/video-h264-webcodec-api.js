import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import VideoView from "osh-js/core/ui/view/video/VideoView";
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

const REPLAY_SPEED = 1.0;

// create data source for UAV camera
// let videoDataSource = new ConSysApi("droid-Video", {
//     endpointUrl:  'api.georobotix.io/ogc/t18/api',
//     tls: true,
//     startTime: '2023-06-06T14:26:12.031Z',
//     endTime: '2023-06-06T22:23:47Z',
//     minTime: '2023-06-06T14:26:12.031Z',
//     maxTime: '2023-06-06T22:23:47Z',
//     mode: Mode.REPLAY,
//     replaySpeed: REPLAY_SPEED,
//     prefetchBatchDuration: 10000,
//     prefetchBatchSize: 250,
//     resource: '/datastreams/s6336mmbboa7e/observations',
//     responseFormat: 'application/swe+binary',
// });


const startTime = '2023-06-06T14:33:34Z';
const endTime = '2023-06-06T22:22:50Z';

let videoDataSource = new ConSysApi("drone-Video", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    minTime: startTime,
    maxTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/19katg6mleqtc/observations',
    responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
  container: 'video-h264-container',
  css: "video-h264",
  name: "Android Video",
  framerate: 25,
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
  replaySpeed: REPLAY_SPEED,
  dataSources: [
    videoDataSource
  ]
});
dataSynchronizer.connect()
