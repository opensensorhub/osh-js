import {BASE_WORKER_URL} from '../../source/osh/osh-Constants.js';

BASE_WORKER_URL.path = '/workers';
import VideoH264 from '../../source/osh/datareceiver/osh-DataReceiver-DataSourceVideoH264.js';
import FFMPEGView from '../../source/osh/ui/view/video/osh-UI-FFMPEGView.js';

// create data source for UAV camera
let videoDataSource = new VideoH264("drone-Video", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:mysos:solo:video2",
  observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
  startTime: "2015-12-19T21:04:30Z",
  endTime: "2015-12-19T21:09:19Z",
  replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView("video-container", {
  dataSourceId: videoDataSource.id,
  css: "video-h264",
  name: "UAV Video",
  useWorker: true,
  width: 1280,
  height: 720,
  showTime: true
});

// start streaming
videoDataSource.connect();
