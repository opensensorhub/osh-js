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
    import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
    import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView';

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
        const ds = new SosGetResultVideo("drone-Video", {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:video2',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        });
        this.view = new FFMPEGView({
          container: 'container',
          css: 'video-h264',
          name: 'UAV Video',
          framerate: 25,
          showTime: true,
          showStats: true,
          dataSourceId: ds.id
        });

        this.dataSource = ds;
        this.dataSource.connect();
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
div.video-h264 canvas {
  height: 80%;
  width: 80%;
}
#app > .control {
  width: 80%;
}
#app {
  padding-top: 0px;
  height: 0px;
}
</style>
