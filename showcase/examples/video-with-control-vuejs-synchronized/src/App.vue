<template>
  <div id="app">
    <div id="container">
      <div id="container0"></div>
      <div id="container1"></div>
      <div id="container2"></div>
      <div id="container3"></div>
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'1%'"
        v-if="dataSynchronizer"
    ></TimeController>
  </div>
</template>
<script>
// @ is an alias to /src
import TimeController from 'osh-js/vue/components/TimeController.vue';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import {Mode} from 'osh-js/core/datasource/Mode';

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
    const opts = {
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      prefetchBatchDuration: 10000,
      mode: Mode.REPLAY,
      tls: true
    };

    const dataSource0 = new SosGetResult("drone-Video", {
      ...opts
    });

    const dataSource1 = new SosGetResult("drone-Video1", {
      ...opts
    });

    const dataSource2 = new SosGetResult("drone-Video2", {
      ...opts
    });

    const dataSource3 = new SosGetResult("drone-Video3", {
      ...opts
    });

    this.views.push(new VideoView({
      container: 'container0',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new VideoDataLayer({
          dataSourceId: dataSource0.id,
          getFrameData: (rec) => rec.videoFrame,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    }));

    this.views.push(new VideoView({
      container: 'container1',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new VideoDataLayer({
          dataSourceId: dataSource1.id,
          getFrameData: (rec) => rec.videoFrame,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    }));

    this.views.push(new VideoView({
      container: 'container2',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new VideoDataLayer({
          dataSourceId: dataSource2.id,
          getFrameData: (rec) => rec.videoFrame,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    }));

    this.views.push(new VideoView({
      container: 'container3',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      layers: [
        new VideoDataLayer({
          dataSourceId: dataSource3.id,
          getFrameData: (rec) => rec.videoFrame,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    }));

    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: 1.0,
      masterTimeRefreshRate: 250, // millis
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      dataSources: [dataSource0, dataSource1, dataSource2, dataSource3]
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
  flex-wrap: wrap;
  justify-content: space-around;
}

#container > div {
  width: calc(40% - 10px);
}
#app {
  width: inherit;
  height: inherit;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-direction: column;
}

div.video-h264 canvas {
  width: 100%;
}
</style>
