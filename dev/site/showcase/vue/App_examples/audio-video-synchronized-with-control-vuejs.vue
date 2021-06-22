<template>
  <div id="app">
    <div class="visualizer">
      <div id="chart-frequency"></div>
      <div id="chart-time" ></div>
      <div id="spectrogram"></div>
      <div id="container-video"></div>
    </div>
    <div class="footer">
      <TimeController
          :dataSynchronizer="dataSynchronizer"
          @event='onControlEvent'
          :skipTimeStep="'10s'"
          v-if="dataSynchronizer"
      ></TimeController>
    </div>
  </div>
</template>
<script>
    // @ is an alias to /src
    import TimeController from 'osh-js/vue/components/TimeController.vue';
    import SosGetResultAudio from 'osh-js/core/datasource/SosGetResultAudio.js';
    import FFMPEGView from "osh-js/core/ui/view/video/FFMPEGView";
    import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
    import SosGetResultVideoWithRoll from "osh-js/core/datasource/SosGetResultVideoWithRoll";
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
              dataSynchronizer: null,
              views: []
            }
        },
        beforeMount() {
        },
      mounted() {

        const opts = {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
          startTime: "2021-04-12T10:48:45Z",
          endTime: "2021-04-12T10:49:45Z",
          replaySpeed: 1.0,
          bufferingTime: 1000
        };

        // setup video
        const videoDataSource = new SosGetResultVideoWithRoll("Live and archive data from Android Sensors [Nexus5X]", {
          ...opts,
          observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame"
        });

        // setup audio
        const audioDataSource = new SosGetResultAudio("Live and archive data from Android Sensors [Nexus5X]", {
          ...opts,
          observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame"
        });

        this.views.push(new FFMPEGView({
          container: 'container-video',
          css: 'video-h264',
          name: 'UAV Video',
          framerate: 25,
          showTime: true,
          showStats: true,
          width:800,
          height:600,
          dataSourceId: videoDataSource.id
        }));

        const audioView = new AudioView({
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
        audioView.addVisualizer(audioChartFrequencyVisualizer);
        audioView.addVisualizer(audioChartTimeVisualizer);
        audioView.addVisualizer(audioSpectrogramVisualizer);

        this.dataSynchronizer = new DataSynchronizer({
          replaySpeed: 1,
          timerResolution: 5,
          dataSources: [videoDataSource, audioDataSource]
        });

        this.views.push(audioView);
      },
      methods: {
        onControlEvent(eventName) {
          if (eventName === 'time-changed') {
            for(let view of this.views) {
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

#chart-frequency, #chart-time, #spectrogram, #container-video{
  width: 45%;
  height: 35%;
  border: solid 1px #797979;
  text-align: center;
}

div.video-h264 canvas {
  width: auto;
  background-color: green;
  height: 100%;
}

.footer {
  position: absolute;
  width: 95%;
  bottom: 20px;
  left: 20px;
}
</style>
