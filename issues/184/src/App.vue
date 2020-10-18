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
      endpointUrl: '127.0.0.1:8082/sensorhub/sos',

      // offeringID: 'realtime-android',
      // startTime: 'now',
      // endTime: '2055-01-01',
      //
      offeringID: 'replay-android',
      startTime: '2020-09-27T11:17:28.870Z',
      endTime: '2020-09-27T11:18:11.079Z',
      replaySpeed: 1,
      reconnectionTimeout: 1000
    });
    this.dataSource.connect();
    // setTimeout(()=>{
    //   this.dataSource.disconnect();
    // },2000);
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
