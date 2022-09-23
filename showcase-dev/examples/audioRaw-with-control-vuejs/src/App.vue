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
    import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
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
        let audioDataSource = new SosGetResult("silent-echo-test-audio", {
          protocol: "ws",
          ,
          // endpointUrl: "localhost:8989/sensorhub/sos",
          endpointUrl: "35.225.185.195:8989/sensorhub/sos",
          offeringID: "urn:osh:audio:wav",
          observedProperty: "urn:osh:audio:wav:sampleArray",
          startTime: "2019-03-27T14:18:00Z",
          // endTime: "2019-03-27T14:53:00Z",
          endTime: "2019-03-27T14:18:38Z",
          replaySpeed: 1.0,
          bufferingTime: 1000
        });

        this.view = new AudioView({
          name: "Audio",
          css: 'audio-css',
          container: 'audio-chart-container',
          dataSource: audioDataSource,
          gain: 10,
          codec: 'raw',
          playSound: true
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

        this.dataSource = audioDataSource;
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
