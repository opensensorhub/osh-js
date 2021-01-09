import Video from 'osh/datareceiver/Video.js';
import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';
import DataLayer from "../../../source/osh/ui/layer/DataLayer";

// create data source for UAV camera
let videoDataSource = new Video("drone-Video", {
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
let videoView = new FFMPEGView({
  container: 'video-h264-container',
  css: 'video-h264',
  name: 'UAV Video',
  framerate:25,
  showTime: true,
  showStats: true,
  layers: [
      new DataLayer({
        dataSourceId: videoDataSource.id
      })
  ]
});

// start streaming
videoDataSource.connect();
