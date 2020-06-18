import VideoH264 from 'osh/datareceiver/VideoH264.js';
import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';

const warningArea = document.getElementById('console-output');

// create data source for UAV camera
let videoDataSource = new VideoH264("drone-Video", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "localhost:8080/sensorhub/sos",
  offeringID: "urn:android:device:fc845f163e6b3b90-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
  startTime: "now",
  endTime: "2055-12-19T21:09:19Z",
  replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView("video-h264-container", {
  dataSourceId: videoDataSource.id,
  css: "video-h264",
  name: "Android test",
  framerate:25,
  codec: 'vp9',
  directPlay:true
});

// start streaming
videoDataSource.connect();

const selectCodecElt = document.getElementById("select-codec");
selectCodecElt.onchange = (e) => {
  videoView.codec = selectCodecElt.value;

}
