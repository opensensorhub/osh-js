<template>
  <div id="app">
    <keep-alive>
      <Video
              :modal="true"
              :dataSource="dataSource"
              :options="{top: '50', left: '50'}"
              :showStats="true"
              :showTime="true"
              :frameRate=30
              class="video-container-vue"
      >
      </Video>
      <div id="toto">0</div>
    </keep-alive>
  </div>
</template>
<script>
    // @ is an alias to /src
    import Video from 'osh-vue/components/video/VideoWithControl.vue';
    import VideoOsh from "osh/datareceiver/VideoWithRoll.js";

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
              observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
              // endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
              // offeringID: 'urn:mysos:solo:video2',
              // startTime: '2015-12-19T21:04:29.231Z',
              // endTime: '2015-12-19T21:09:19.675Z',
              endpointUrl: 'localhost:8082/sensorhub/sos',
              offeringID: 'replay-android',
              startTime: '2020-08-16T11:31:11.444Z',
              endTime: '2020-08-16T11:32:06.773Z',
              replaySpeed: 1
            });
        },
      mounted() {
        // test
      }
    };
</script>
<style>
  body {
    overflow-x: hidden;
    margin: 0;
    padding:50px;
  }

  .video-container  {
    margin:auto;
    height: 337px;
    width: auto;
  }

  .osh-view {
    margin: auto;
    display: flex;
  }

  #app {
    max-width: 600px;
  }
</style>
