<template>
  <div id="app">
    <div class="container-osh" >
      <div id="container-audio" class="container-audio"></div>
      <div id="container-video" class="container-video"></div>
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'10s'"
        v-if="dataSynchronizer "
    ></TimeController>
  </div>
</template>
<script>
    // @ is an alias to /src
    import TimeController from 'osh-js/vue/components/TimeController.vue';
    import SosGetResultAudio from 'osh-js/core/datasource/SosGetResultAudio.js';
    import AudioView from 'osh-js/core/ui/view/audio/AudioView';
    import SosGetResultVideo from "osh-js/core/datasource/SosGetResultVideo";
    import FFMPEGView from "osh-js/core/ui/view/video/FFMPEGView";
    import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
    import SosGetResultVideoWithRoll from "osh-js/core/datasource/SosGetResultVideoWithRoll";

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

        this.views.push(new AudioView({
          name: "Audio",
          css: 'audio-css',
          container: 'container-audio',
          dataSource: audioDataSource,
          gain: 5,
          timeDomainVisualization: {
            type: 'chart',
            fftSize: 1024,
            props: {
              css: 'audio-css-time',
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
                  }
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
        }));
        this.dataSynchronizer = new DataSynchronizer({
          replaySpeed: 1,
          timerResolution: 5,
          dataSources: [videoDataSource, audioDataSource]
        });
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
  #app {
    padding: 20px;
  }

  .container-osh {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .container-osh > .container-audio {
    width: 40%;
  }

  .container-osh > .container-video {
    width: 55%;
  }

  div.video-h264 {
    max-height: 600px;
  }

  div.video-h264 canvas {
    width: auto;
    margin-top:50px;
    border: solid 1px lightgrey;
    background-color: green;
    height: 60%;
  }
</style>
