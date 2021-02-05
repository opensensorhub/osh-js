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
    </keep-alive>
  </div>
</template>
<script>
    // @ is an alias to /src
    import Video from 'osh-vue/components/video/VideoWithControl.vue';
    import SosGetResultVideo from "osh/datareceiver/SosGetResultVideo.js";

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
            this.dataSource = new SosGetResultVideo("drone-Video", {
                protocol: 'ws',
                service: 'SOS',
                endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
                offeringID: 'urn:mysos:solo:video2',
                observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
                startTime: '2015-12-19T21:04:29.231Z',
                endTime: '2015-12-19T21:09:19.675Z',
                replaySpeed: 1
            });

            this.dataSource.connect();
        }
    };
</script>
<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding:0px;
}

.video-container  {
  margin:auto;
  height: inherit;
  width: inherit;
}

.osh-view {
  margin: auto;
  display: flex;
}

.main-video {
  width: 100%;
  height: 100%;
}
#app {
  max-width: 100%;
}
</style>
