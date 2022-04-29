import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
// import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView.js';
import SosGetResultVideo from "../../../source/core/datasource/sos/SosGetResultVideo.js";
// create data source for UAV camera
let videoDataSource = new SosGetResult("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView({
  container: 'video-h264-container',
  css: 'video-h264',
  name: 'UAV Video',
  framerate:25,
  showTime: true,
  showStats: true,
  dataSourceId: videoDataSource.id,
  dataMapping: {
    getFrameData: (rec) => rec.videoFrame.binaryBlock,
    getCompression: (rec) => rec.videoFrame.compression,
    getTimestamp: (rec) => rec.timestamp
  }
});

// start streaming
videoDataSource.connect();
