<template>
  <div id="app">
    <div id="container"></div>
    <TimeController
        :dataSource="dataSource"
        @event='onControlEvent'
        :skipTimeStep="'10s'"
        v-if="dataSource "
    ></TimeController>
  </div>
</template>
<script>
    // @ is an alias to /src
    import TimeController from 'osh-js/vue/components/TimeController.vue';
    import SosGetResultAudio from 'osh-js/core/datasource/SosGetResultAudio.js';
    import AudioView from 'osh-js/core/ui/view/audio/AudioView';

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
        const audioDataSource = new SosGetResultAudio("alex-audio", {
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
          container: 'container',
          dataSource: audioDataSource,
          gain: 3,
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
        });

        this.dataSource = audioDataSource;
      },
      methods: {
        onControlEvent(eventName) {
          if (eventName === 'forward' || eventName === 'backward' || eventName === 'slide' || eventName === 'replaySpeed') {
            this.view.reset();
          }
        }
      }
    };
</script>
<style>

#container {
  display: flex;
}
#app > .control {
  width: 80%;
}
#app {
  padding-top: 0px;
  height: 0px;
}
</style>
