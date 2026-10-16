import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from "osh-js/core/datasource/Mode";
//import SweApiDatasource from "osh-js/core/datasource/sweapi/SweApi.datasource";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

const REPLAY_SPEED = 1.0;

// create data source for UAV camera
let videoDataSource =  new ConSysApi('Dahua Office - Video', {
  endpointUrl:  'api.georobotix.io/ogc/t18/api',
  tls: true,
  startTime: '2023-06-06T14:01:15.637Z',
  endTime: '2023-06-06T22:53:15Z',
  minTime: '2023-06-06T14:01:15.637Z',
  maxTime: '2055-06-06T22:53:15Z ',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/khv081o7hpma2/observations',
  responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
  container: 'video-dahua-container',
  css: 'video-dahua',
  name: 'Dahua Office - Video',
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