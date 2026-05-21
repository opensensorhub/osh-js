import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from "osh-js/core/datasource/Mode";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

const REPLAY_SPEED = 1.0;

// create data source for UAV camera
let videoDataSource =  new ConSysApi('Predator UAV (MISB simulated RT) - UAS Video ', {
  endpointUrl:  'api.georobotix.io/ogc/demo1/api',
  tls: true,
  startTime: '2023-05-14T15:22:00Z ',
  endTime: '2025-03-24T20:28:56.820333496Z',
  minTime: '2023-05-14T15:22:00Z',
  maxTime: '2025-03-24T20:28:56.820333496Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/5lkdq857dt2l6/observations',
  responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
  container: 'uav-sim-container',
  css: 'uav-sim',
  name: 'UAV Video',
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
  mode: Mode.REPLAY,
  dataSources: [
    videoDataSource
  ]
});
dataSynchronizer.connect()