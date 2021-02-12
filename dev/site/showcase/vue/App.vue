<template>
  <div id="app">
    <div id="container"></div>
    <TimeController
        :dataSource="dataSource"
        @event='onControlEvent'
        :backward=5000
        :forward=5000
        v-if="dataSource "
    ></TimeController>
  </div>
</template>
<script>
    // @ is an alias to /src
    import TimeController from 'osh-vue/components/TimeController.vue';
    import SosGetResultVideo from "osh/datareceiver/SosGetResultVideo.js";
    import FFMPEGView from "osh/ui/view/video/FFMPEGView";
    import DataLayer from "osh/ui/layer/DataLayer";

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
          layers: [
            new DataLayer({
              dataSourceId: ds .id
            })
          ]
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
  width: 100%;
}
</style>
