import AudioView from 'osh-js/core/ui/view/audio/AudioView.js';
import SosGetResultAudio from "osh-js/core/datasource/SosGetResultAudio";
import WaveSurfer from 'wavesurfer.js';
import {isDefined} from "osh-js/core/utils/Utils";

let audioDataSource = new SosGetResultAudio("alex-audio", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
  startTime: "2021-03-24T09:56:00Z",
  endTime: "now",
  // replaySpeed: 1.5,
  batchSize:500
});

// show it in video view
let audioView = new AudioView({
  container: "audio-container",
  name: "Audio",
  dataSourceId: audioDataSource.id
});

var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  minPxPerSec: 1
});

document.getElementById("listen").onclick = () => {
  if(audioDataSource !== null) {
    audioDataSource.disconnect();
  }
  // create data source for UAV camera

  if(audioView !== null) {
    // reset current view
    audioView.reset();
  }

  let deltaInc = 0;
  audioView.onDecodedBuffer = function (decodedBuffer) {
    if(deltaInc == 0) {
      wavesurfer.loadDecodedBuffer(decodedBuffer);
      wavesurfer.play(deltaInc, decodedBuffer.duration);
      deltaInc += decodedBuffer.duration;
      console.log(deltaInc);
    }
  }

  setInterval(() => {
    if(isDefined(audioView)) {
      // console.log(audioView.getCurrentTime());
      // wavesurfer.setCurrentTime(audioView.getCurrentTime());
    }
  }, 200, 150);
  audioDataSource.connect();
}
