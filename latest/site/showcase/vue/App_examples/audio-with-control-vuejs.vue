<template>
  <div id="app">
    <div class="visualizer">
      <div id="chart-frequency"></div>
      <div id="chart-time" ></div>
      <div id="spectrogram"></div>
    </div>
    <div class="footer">
      <TimeController
          :dataSource="dataSource"
          @event='onControlEvent'
          :skipTimeStep="'10s'"
          v-if="dataSource "
      ></TimeController>
    </div>
  </div>
</template>
<script>
    // @ is an alias to /src
    import TimeController from 'osh-js/vue/components/TimeController.vue';
    import SosGetResultAudio from 'osh-js/core/datasource/SosGetResultAudio.js';
    import AudioView from "osh-js/core/ui/view/audio/AudioView";
    import AudioSpectrogramVisualizer from "osh-js/core/ui/view/audio/visualizer/spectrogram/AudioSpectrogramVisualizer";
    import AudioFrequencyChartJsVisualizer
      from "osh-js/core/ui/view/audio/visualizer/frequency/AudioFrequencyChartJsVisualizer";
    import AudioTimeChartJsVisualizer from "osh-js/core/ui/view/audio/visualizer/time/AudioTimeChartJsVisualizer";
    export default {
        components: {
          TimeController
        },
        data: function () {
            return {
                dataSource: null
            }
        },
        beforeMount() {
        },
      mounted() {
        // setup video
        // create data source for UAV camera
        let audioDataSource = new SosGetResultAudio("alex-audio", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
          startTime: "2021-04-12T10:48:45Z",
          endTime: "2021-04-12T10:49:45Z",
          replaySpeed: 1.0,
          bufferingTime: 1000
        });

        this.view = new AudioView({
          name: "Audio",
          css: 'audio-css',
          container: 'audio-chart-container',
          dataSource: audioDataSource,
          gain: 1,
          playSound: true
        });

        const audioChartFrequencyVisualizer = new AudioFrequencyChartJsVisualizer({
          css: 'audio-canvas',
          fftSize: 32,
          container: 'chart-frequency',
          chartjsProps: {
            datasetsProps: {
              borderColor: 'rgba(0,0,0,0.5)',
              backgroundColor: 'rgba(210,210,210,0.8)',
              barThickness: 20,
              borderWidth: 1
            },
          }
        });

        const audioChartTimeVisualizer = new AudioTimeChartJsVisualizer({
          css: 'audio-canvas',
          fftSize: 1024,
          container: 'chart-time',
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
        });
        const audioSpectrogramVisualizer = new AudioSpectrogramVisualizer({
          fftSize: 2048,
          container: 'spectrogram'
        });
        this.view.addVisualizer(audioChartFrequencyVisualizer);
        this.view.addVisualizer(audioChartTimeVisualizer);
        this.view.addVisualizer(audioSpectrogramVisualizer);

        this.dataSource = audioDataSource;
      },

      methods: {
        onControlEvent(eventName) {
          if (eventName === 'forward' || eventName === 'backward' || eventName === 'end' || eventName === 'replaySpeed') {
            this.view.reset()
          }
        },
      }
    };
</script>
<style>

.visualizer {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-around ;
}
#chart-frequency, #chart-time{
  width: 45%;
  height: 35%;
}
canvas.audio-canvas {
  width: 100%;
  height: 100%;
}

#app > .control {
  width: 100%;
  margin-top:70px;
}

#app {
  padding: 20px;
  height: 0px;
}
#spectrogram {
  width: 100%;
  height: 35%;
}
.audio-canvas, #spectrogram > canvas{
  border: solid 1px #535353;
}
.footer {
  position: absolute;
  width: 95%;
  bottom: 20px;
}
</style>
