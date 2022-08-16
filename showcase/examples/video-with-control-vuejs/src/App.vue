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
    import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource';
    import VideoView from 'osh-js/core/ui/view/video/VideoView';
    import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';

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
        const videoDataSource = new SosGetResult("drone-Video", {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:video2',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2015-12-19T21:04:30.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          // endTime: '2015-12-19T21:04:32.00Z',
          replaySpeed: 5
        });
        this.view = new VideoView({
          container: 'container',
          css: 'video-h264',
          name: 'UAV Video',
          framerate: 25,
          showTime: true,
          showStats: true,
          layers: [
            new VideoDataLayer({
              dataSourceId: videoDataSource.id,
              getFrameData: (rec) => rec.videoFrame,
              getTimestamp: (rec) => rec.timestamp
            })
          ]
        });

        this.dataSource = videoDataSource;
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
