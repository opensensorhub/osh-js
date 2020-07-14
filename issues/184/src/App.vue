<template>
  <div id="app">
    <keep-alive>
      <Video
              :draggable="true"
              :modal="true"
              :dataSource="dataSource"
              :options="{top: '50', left: '50'}"
              :showStats="true"
              :showTime="true"
              :frameRate=25
              class="video"
      >
      </Video>
    </keep-alive>
  </div>
</template>
<script>
    // @ is an alias to /src
    import Video from 'osh-vue/components/Video.vue';
    import VideoOsh from "osh/datareceiver/Video.js";

    export default {
        components: {
            Video
        },
        data: function () {
            return {
                dataSource: null
            }
        },
        beforeMount() {
            // setup video
            // create data source for UAV camera
            this.dataSource = new VideoOsh("drone-Video", {
                protocol: 'ws',
                service: 'SOS',
                // endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
                // offeringID: 'urn:mysos:solo:video2',
                observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
                // startTime: '2015-12-19T21:04:29.231Z',
                // endTime: '2015-12-19T21:09:19.675Z',
                endpointUrl: 'localhost:8082/sensorhub/sos',
                offeringID: 'replay-android',
                startTime: '2020-06-06T15:07:15.359Z',
                endTime: '2020-06-06T15:07:57.016Z',
                replaySpeed: 1
            });
        }
    };
</script>
<style>
  body {
    overflow-x: hidden;
    margin: 0;
    padding:50px;
  }

  .video {
    width: 500px;
  }
</style>
