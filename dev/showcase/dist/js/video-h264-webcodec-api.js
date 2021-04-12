import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import WebCodecView from 'osh-js/core/ui/view/video/WebCodecView.js';

// create data source for UAV camera
let videoDataSource = new SosGetResultVideo("drone-Video", {
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
let videoView = new WebCodecView({
  container: 'video-h264-container',
  css: "video-h264",
  name: "UAV Video",
  showTime: true,
  showStats: true,
  dataSourceId: videoDataSource.id
});

// start streaming
videoDataSource.connect();
