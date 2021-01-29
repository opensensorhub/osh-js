<template>
  <div id="app">
    <div id="container">
      <Video
          :modal="true"
          :dataSource="dataSource0"
          :options="{top: '50', left: '50'}"
          :showStats="true"
          :showTime="true"
          :frameRate=30
          class="video-container-vue0"
      >
      </Video>
      <Video
          :modal="true"
          :dataSource="dataSource1"
          :options="{top: '50', left: '50'}"
          :showStats="true"
          :showTime="true"
          :frameRate=30
          class="video-container-vue1"
      >
      </Video>
      <Video
          :modal="true"
          :dataSource="dataSource2"
          :options="{top: '50', left: '50'}"
          :showStats="true"
          :showTime="true"
          :frameRate=30
          class="video-container-vue2"
        >
      </Video>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Video from 'osh-vue/components/video/VideoWithControl.vue';
import SosGetResultVideo from 'osh/datareceiver/SosGetResultVideo.js';
import DataSynchronizer from 'osh/datasynchronizer/DataSynchronizer.js';

export default {
  components: {
    Video
  },
  data: function () {
    return {
      dataSource0: null,
      dataSource1: null,
      dataSource2: null
    }
  },
  beforeMount() {
    // setup video
    // create data source for UAV camera
    const dataSource0 = new SosGetResultVideo("drone-Video", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1,
      timeOut: 1000,
      bufferingTime: 500
    });

    const dataSource1 = new SosGetResultVideo("drone-Video1", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1,
      timeOut: 1000,
      bufferingTime: 500
    });

    const dataSource2 = new SosGetResultVideo("drone-Video2", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1,
      timeOut: 1000,
      bufferingTime: 500
    });

    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: 1,
      intervalRate: 5,
      dataSources: [dataSource0, dataSource1, dataSource2]
    })

    dataSynchronizer.connect();
    this.dataSource0 = dataSource0;
    this.dataSource1 = dataSource1;
    this.dataSource2 = dataSource2;
  }
};
</script>
<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0px;
}

.video-container {
  margin: auto;
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

#container {
  width: 800px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex-flow: wrap;
}

.main-video {
  width: 350px;
  margin:20px;
}
</style>
