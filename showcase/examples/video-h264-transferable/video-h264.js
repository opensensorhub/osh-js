import VideoH264 from 'osh/datareceiver/VideoH264.js';
import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';
//
// // create data source for UAV camera
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
  framerate:25,
  showTime: true
});

// start streaming
videoDataSource.connect();

// class TestLog {
//   constructor(div) {
//     this.div = div;
//     this.count = 0;
//     this.worker = new Worker('./MultiplyWorker.js',{ type: 'module' });
//   }
//
//   displayLog() {
//     let base64Str = btoa("Mul: "+this.count++);
//     let arrayBuffer = this.str2ab(base64Str);
//     console.log(arrayBuffer);
//     this.worker.postMessage({
//       arrayBuffer : arrayBuffer
//     }, [arrayBuffer]);
//     let that = this;
//     this.worker.onmessage = (e) => {
//       document.getElementById(that.div).innerHTML = atob(e.data);
//     };
//   }
//
//   str2ab(str) {
//     let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
//     let bufView = new Uint16Array(buf);
//     for (let i=0, strLen=str.length; i < strLen; i++) {
//       bufView[i] = str.charCodeAt(i);
//     }
//     return buf;
//   }
// }
//
// let button = document.getElementById("destroy-button");
// let testLog = new TestLog("video-container");
//
// setInterval(function(){
//   testLog.displayLog();
// },1000);
// button.onclick = () => {
//   testLog = new TestLog("video-container");
// };

let button = document.getElementById("destroy-button");
button.onclick = () => {
  const myDivView = document.getElementById("video-container");
  videoView.destroy();
  videoView = null;
  myDivView.innerHTML = '';

  videoView = new FFMPEGView("video-container", {
    dataSourceId: videoDataSource.id,
    css: "video-h264",
    name: "UAV Video",
    useWorker: true,
    width: 1280,
    height: 720,
    framerate: 25,
    showTime: true
  });
};
