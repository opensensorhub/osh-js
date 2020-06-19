import Video from 'osh/datareceiver/Video.js';
import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';
import MjpegView from  'osh/ui/view/video/MjpegView.js';


// create data source for UAV camera
let videoH264DataSource = new Video("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1
});

let videoMjpegDataSource = new Video("android-Video", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
  startTime: "2015-02-16T07:58:35Z",
  endTime: "2015-02-16T08:09:00Z",
  syncMasterTime: true,
  bufferingTime: 0,
  replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
new FFMPEGView("video-h264-container", {
  dataSourceId: videoH264DataSource.id,
  css: "video-h264",
  name: "Android test",
  framerate:25,
  codec: 'h264',
  directPlay:true,
  showTime: true,
  showStats: true
});

// show it in video view
new MjpegView("video-mjpeg-container", {
  dataSourceId: videoMjpegDataSource.id,
  css: "video-mjpeg",
  name: "Android Video",
  keepRatio: true,
  showTime: true
});

// start streaming
videoH264DataSource.connect();
videoMjpegDataSource.connect();

