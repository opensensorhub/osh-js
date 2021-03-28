import AudioView from 'osh-js/core/ui/view/audio/AudioView.js';
import SosGetResultAudio from "osh-js/core/datasource/SosGetResultAudio";

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

document.getElementById("listen").onclick = () => {
  if(audioDataSource !== null) {
    audioDataSource.disconnect();
  }
  // create data source for UAV camera

  if(audioView !== null) {
    // reset current view
    audioView.reset();
  }

  audioDataSource.connect();
}
