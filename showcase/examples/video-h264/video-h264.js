import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import FFMPEGView from '../../../source/core/ui/view/video/FFMPEGView.js';
import WebCodecView from "../../../source/core/ui/view/video/WebCodecView";
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";

const containerElt = document.getElementById("container");
const dataSynchronizer = new DataSynchronizer({
  replaySpeed: 1,
  timerResolution: 5,
  dataSources: []
})


let codecList = RTCRtpSender.getCapabilities("video").codecs;
codecList.forEach(rtcrtpCodec => {
  console.log(rtcrtpCodec)
});
for(let i=0;i < 16;i++) {
  const child = document.createElement("div");
  child.setAttribute("id", i);

  containerElt.appendChild(child);
// create data source for UAV camera
  let videoDataSource = new SosGetResultVideo("drone-Video", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "localhost:8082/sensorhub/sos",
    offeringID: "urn:android:device:9d31c07640c760a7-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: "2021-09-07T21:38:59.163Z",
    endTime: "2021-09-07T21:39:49.579Z",
    replaySpeed: 1,
  });

  // dataSynchronizer.addDataSource(videoDataSource);
// show it in video view using FFMPEG JS decoder
  if (i % 2 === 0) {
    let videoView = new FFMPEGView({
      container: '' + i,
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 30,
      showTime: true,
      showStats: true,
      dataSourceId: videoDataSource.id
    });
  } else {
    // let videoView = new FFMPEGView({
    //   container: '' + i,
    //   css: 'video-h264',
    //   name: 'UAV Video',
    //   framerate: 30,
    //   showTime: true,
    //   showStats: true,
    //   dataSourceId: videoDataSource.id
    // });
  }
// start streaming
  videoDataSource.connect();
}
// dataSynchronizer.connect();

