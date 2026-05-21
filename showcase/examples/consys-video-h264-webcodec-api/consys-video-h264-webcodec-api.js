import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import VideoView from "osh-js/core/ui/view/video/VideoView";
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import SweApiDatasource from "osh-js/core/datasource/sweapi/SweApi.datasource";

const REPLAY_SPEED = 1.0;

// create data source for UAV camera
let videoDataSource = new SweApiDatasource("drone-Video", {
  endpointUrl: "api.georobotix.io/ogc/t18/api",
  resource: '/datastreams/c3s2vsvv3ugic/observations',
  startTime: "2015-12-19T21:04:30Z",
  endTime: "2015-12-19T21:09:19Z",
  minTime: '2015-12-19T21:04:30Z',
  maxTime: '2055-12-19T21:09:19Z',
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  tls: true,
  protocol: "wss",
  responseFormat: 'application/swe+binary'
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
  container: 'consys-video-h264-container',
  css: "video-h264",
  name: "UAV Video",
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
//  startTime: "2015-12-19T21:04:30Z",
//  endTime: "2015-12-19T21:09:19Z",
  dataSources: [
    videoDataSource
  ]
});
dataSynchronizer.connect()
