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
import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import SweApiFetch from 'osh-js/core/datasource/sweapi/SweApi.datasource.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';

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
    const REPLAY_SPEED = 2.6;
    // setup video
    // create data source for UAV camera
    const opts = {
      endpointUrl: 'api.georobotix.io/ogc/t18/api',
      resource: '/datastreams/8ni90dbu4uf0g/observations',
      tls: true,
      startTime: '2012-06-29T14:22:00.099333251Z',
      endTime: '2012-06-29T14:37:44.033333251Z',
      mode: Mode.REPLAY,
      responseFormat: 'application/swe+binary',
      prefetchBatchSize: 250
    };

    const dataSource0 = new SweApiFetch("drone-Video", {
      ...opts
    });

    const dataSource1 = new SweApiFetch("drone-Video1", {
      ...opts
    });

    const dataSource2 = new SweApiFetch("drone-Video2", {
      ...opts
    });

    const dataSource3 = new SweApiFetch("drone-Video3", {
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
          getFrameData: (rec) => rec.img,
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
          getFrameData: (rec) => rec.img,
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
          getFrameData: (rec) => rec.img,
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
          getFrameData: (rec) => rec.img,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    }));

    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: REPLAY_SPEED,
      startTime: '2012-06-29T14:22:00.099333251Z',
      endTime: '2012-06-29T14:37:44.033333251Z',
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
