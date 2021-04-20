import SosGetResultAudio from "osh-js/core/datasource/SosGetResultAudio";
import AudioView from "osh-js/core/ui/view/audio/AudioView";


let audioDataSource = new SosGetResultAudio("alex-audio", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  // endpointUrl: 'localhost:8181/sensorhub/sos',
  offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
  // offeringID: 'urn:android:device:9d31c07640c760a7-sos',
  observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
  startTime: "2021-04-12T10:48:45Z",
  endTime: "2021-04-12T10:49:45Z",
  // startTime: "2021-03-24T09:56:10Z",
  // endTime: "2021-03-24T09:56:30Z",
  // startTime: 'now',
  // endTime: "2055-03-24T09:56:30Z",
  replaySpeed: 1.0,
  bufferingTime: 1000
});

let audioView = new AudioView({
  name: "Audio",
  css: 'audio-css',
  container: 'audio-chart-container',
  dataSourceId: audioDataSource.id,
  gain: 1,
  flush: 3,
  timeDomainVisualization: {
    type: 'chart',
    fftSize: 1024,
    props: {
      chartjsProps: {
        chartProps: {
          scales: {
            yAxes: [{
              scaleLabel: {
                labelString: "Amplitude"
              },
              ticks: {
                maxTicksLimit: 5
              }
            }],
            xAxes: [{
              scaleLabel: {
                labelString: "Time"
              },
              ticks: {
                maxTicksLimit: 130,
                beginAtZero: true
              }
            }],
          },
          maintainAspectRatio: false
        },
        datasetsProps: {
          pointRadius: 0.1,
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(255,195,100,0.2)',
          barThickness: 2,
          borderWidth: 1
        },
        datasetsMinMaxProps: {
          pointRadius: 0.0,
          backgroundColor: 'rgba(0,139,141,1.0)',
          barThickness: 2,
          borderWidth: 1
        }
      }
    }
  },
  frequencyDomainVisualization: {
    type: 'chart',
    fftSize: 32,
    props: {
      css: 'audio-css-frequency',
      chartjsProps: {
        datasetsProps: {
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(210,210,210,0.8)',
          barThickness: 20,
          borderWidth: 1
        },
      }
    }
  }
});

let audioCanvasView = new AudioView({
  name: "Audio",
  css: 'audio-css',
  container: 'audio-canvas-container',
  dataSourceId: audioDataSource.id,
  gain: 3,
  output:false,
  timeDomainVisualization: {
    type: 'canvas',
    fftSize: 1024,
    props: {
      css: 'audio-time-canvas'
    }
  },
  frequencyDomainVisualization: {
    type: 'canvas',
    fftSize: 32,
    props: {
      barWidth:20,
      css: 'audio-freq-canvas'
    }
  }
});

document.getElementById("listen").onclick = () => {
  audioDataSource.connect();
}

const inputChartElt = document.getElementById("input-range-chart");
inputChartElt.onchange = (event) => {
  document.getElementById("range-value-chart").innerText = inputChartElt.value;
  audioView.setGain(parseInt(inputChartElt.value));
  // audioCanvasView.setGain(parseInt(inputChartElt.value));
}
