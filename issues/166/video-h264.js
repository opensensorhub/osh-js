import Video from 'osh/datareceiver/Video.js';
import VideoWithRoll from 'osh/datareceiver/VideoWithRoll.js';
import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';


// create data source for UAV camera
let videoDataSource = new Video("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1
});

let videoDataSourceWithRoll = new VideoWithRoll("live-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'localhost:8080/sensorhub/sos',
  offeringID: 'urn:android:device:fc845f163e6b3b90-sos',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: 'now',
  endTime: '2055-12-19T21:09:19.675Z',
  replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView("video-h264-container", {
  dataSourceId: videoDataSource.id,
  css: "video-h264",
  name: "Android test",
  framerate:25,
  codec: 'h264',
  directPlay:true,
  showTime: true,
  showStats: true
});


// show it in video view using FFMPEG JS decoder
let videoViewWithRoll = new FFMPEGView("video-h264-roll-container", {
  dataSourceId: videoDataSourceWithRoll.id,
  css: "video-h264",
  name: "Android test",
  framerate:25,
  codec: 'h264',
  directPlay:true
});
// start streaming
videoDataSource.connect();
videoDataSourceWithRoll.connect();

