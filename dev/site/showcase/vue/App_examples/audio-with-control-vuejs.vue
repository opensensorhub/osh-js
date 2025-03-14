<template>
  <div id="app">
    <div class="visualizer">
      <div id="chart-frequency"></div>
      <div id="chart-time" ></div>
      <div id="spectrogram"></div>
    </div>
    <div class="footer">
      <TimeController
          :dataSynchronizer="dataSynchronizer"
          @event='onControlEvent'
          :skipTimeStep="'10s'"
          v-if="dataSynchronizer "
      ></TimeController>
    </div>
  </div>
</template>
<script>
    // @ is an alias to /src
    import TimeController from 'osh-js/vue/components/TimeController.vue';
    import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
    import AudioView from "osh-js/core/ui/view/audio/AudioView";
    import AudioSpectrogramVisualizer from "osh-js/core/ui/view/audio/visualizer/spectrogram/AudioSpectrogramVisualizer";
    import AudioFrequencyChartJsVisualizer
      from "osh-js/core/ui/view/audio/visualizer/frequency/AudioFrequencyChartJsVisualizer";
    import AudioTimeChartJsVisualizer from "osh-js/core/ui/view/audio/visualizer/time/AudioTimeChartJsVisualizer";
    import AudioDataLayer from 'osh-js/core/ui/layer/AudioDataLayer';
    import {Mode} from "osh-js/core/datasource/Mode";
    import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

    export default {
        components: {
          TimeController
        },
        data: function () {
            return {
              dataSynchronizer: null
            }
        },
        beforeMount() {
        },
      mounted() {
        // setup video
        // create data source for UAV camera
        let audioDataSource = new SosGetResult("alex-audio", {
          endpointUrl: "sensiasoft.net/sensorhub/sos",
          offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
          startTime: "2021-04-12T10:48:45Z",
          endTime: "2021-04-12T10:49:45Z",
          mode: Mode.REPLAY,
          tls: true
        });

        this.dataSynchronizer = new DataSynchronizer({
          replaySpeed: 1,
          startTime: "2021-04-12T10:48:45Z",
          endTime: "2021-04-12T10:49:45Z",
          dataSources: [audioDataSource]
        });

        this.view = new AudioView({
          name: "Audio",
          css: 'audio-css',
          container: 'audio-chart-container',
          gain: 10,
          playSound: true,
          layers: [
            new AudioDataLayer({
              dataSourceId: audioDataSource.id,
              getSampleRate: (rec) => rec.sampleRate,
              getFrameData: (rec) => rec.samples,
              getTimestamp: (rec) => rec.timestamp
            })
          ]
        });

        const audioChartFrequencyVisualizer = new AudioFrequencyChartJsVisualizer({
          css: 'audio-canvas',
          fftSize: 32,
          container: 'chart-frequency',
          datasetOptions: {
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(210,210,210,0.8)',
            barThickness: 20,
            borderWidth: 1
          },
        });

        const audioChartTimeVisualizer = new AudioTimeChartJsVisualizer({
          css: 'audio-canvas',
          fftSize: 1024,
          container: 'chart-time',
          datasetOptions: {
            pointRadius: 0.1,
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(255,195,100,0.2)',
            barThickness: 2,
            borderWidth: 1
          },
          colorReadData: 'rgb(22,255,0)'
        });
        const audioSpectrogramVisualizer = new AudioSpectrogramVisualizer({
          fftSize: 2048,
          container: 'spectrogram'
        });
        this.view.addVisualizer(audioChartFrequencyVisualizer);
        this.view.addVisualizer(audioChartTimeVisualizer);
        this.view.addVisualizer(audioSpectrogramVisualizer);
      },

      methods: {
        onControlEvent(eventName) {
          if (eventName === 'time-changed') {
            for (let view of this.views) {
              view.reset();
            }
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
