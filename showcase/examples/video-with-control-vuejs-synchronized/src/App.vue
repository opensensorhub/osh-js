<template>
  <div id="app">
    <div id="container">
      <div id="container0"></div>
      <div id="container1"></div>
      <div id="container2"></div>
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'60s'"
        v-if="dataSynchronizer"
    ></TimeController>
  </div>
</template>
<script>
// @ is an alias to /src
import TimeController from 'osh-vue/components/TimeController.vue';
import SosGetResultVideo from "osh/datareceiver/SosGetResultVideo.js";
import FFMPEGView from "osh/ui/view/video/FFMPEGView";
import DataLayer from "osh/ui/layer/DataLayer";
import DataSynchronizer from 'osh/datasynchronizer/DataSynchronizer';

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
  mounted() {
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
      bufferingTime: 1000
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
      bufferingTime: 1000
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
      bufferingTime: 1000
    });

    this.views.push(new FFMPEGView({
      container: 'container0',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new DataLayer({
          dataSourceId: dataSource0 .id
        })
      ]
    }));

    this.views.push(new FFMPEGView({
      container: 'container1',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new DataLayer({
          dataSourceId: dataSource1 .id
        })
      ]
    }));

    this.views.push(new FFMPEGView({
      container: 'container2',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new DataLayer({
          dataSourceId: dataSource2 .id
        })
      ]
    }));


    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: 1,
      intervalRate: 5,
      dataSources: [dataSource0, dataSource1, dataSource2]
    });
    this.dataSynchronizer.connect();
  },
  methods: {
    onControlEvent(eventName) {
      if (eventName === 'forward' || eventName === 'backward' || eventName === 'slide' || eventName === 'replaySpeed') {
        for(let view of this.views) {
          view.reset();
        }
      }
    }
  }
};
</script>
<style>
body, html {
  overflow-x: hidden;
  margin: 0;
  padding: 0px;
  background: aliceblue;
  width: 100%;
  height: 100%;
}

#container {
  display: flex;
  flex-wrap: nowrap;
}

#container > div {
  margin: 5px;
}
#app {
  width: inherit;
  height: inherit;
}

div.video-h264 canvas {
  width: 100%;
}
</style>
