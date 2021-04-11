import SosGetResultAudio from "osh-js/core/datasource/SosGetResultAudio";
import AudioTimeDomainCanvasView from "osh-js/core/ui/view/audio/AudioTimeDomainCanvasView";
import AudioTimeDomainChartJSView from "osh-js/core/ui/view/audio/AudioTimeDomainChartJSView";
import AudioFrequencyDomainCanvasView from "osh-js/core/ui/view/audio/AudioFrequencyDomainCanvasView";
import AudioView from "osh-js/core/ui/view/audio/AudioView";

let audioDataSource = new SosGetResultAudio("alex-audio", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
  startTime: "2021-03-24T09:56:10Z",
  endTime: "2021-03-24T09:57:11Z",
  // startTime: "2021-03-24T09:56:10Z",
  // endTime: "2021-03-24T09:56:30Z",
  replaySpeed: 1.0,
  // batchSize:500
});

let audioView = new AudioView({
  name: "Audio",
  css: 'audio-css',
  dataSourceId: audioDataSource.id
});

let audioTimeView = new AudioTimeDomainCanvasView({
  container: "audio-canvas-time-container",
  name: "Audio",
  css: 'audio-css',
  dataSourceId: audioDataSource.id
});

let audioFrequencyView = new AudioFrequencyDomainCanvasView({
  container: "audio-canvas-frequency-container",
  name: "Audio",
  css: 'audio-css',
  dataSourceId: audioDataSource.id
});

let audioChartView = new AudioTimeDomainChartJSView({
  container: "audio-chart-time-container",
  name: "Audio",
  css: 'audio-chart-css',
  dataSourceId: audioDataSource.id
});

let first = true;
document.getElementById("listen").onclick = () => {
  if(audioDataSource !== null && audioDataSource.isConnected()) {
    audioDataSource.disconnect();

  }

  // create data source for UAV camera
  if(!first) {
    audioTimeView.reset();
    audioChartView.reset();
    audioFrequencyView.reset();
  }
  audioDataSource.connect();
  first = false;
}
