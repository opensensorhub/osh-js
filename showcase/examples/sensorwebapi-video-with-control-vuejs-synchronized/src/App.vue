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
import SweApiFetchVideo from 'osh-js/core/datasource/swe/SweApiFetchVideo';

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
    const REPLAY_SPEED = 1.2;
    // setup video
    // create data source for UAV camera
    const opts = {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/uxzna8pldpiv/observations',
      tls: true,
      startTime: '2012-06-29T14:32:34.099333251Z',
      endTime: '2012-06-29T14:37:44.033333251Z',
      replaySpeed: REPLAY_SPEED,
      timeOut: 3000,
      bufferingTime: 800
    };

    const dataSource0 = new SensorWebApiFetchVideo("drone-Video", {
      ...opts
    });

    const dataSource1 = new SensorWebApiFetchVideo("drone-Video1", {
      ...opts
    });

    const dataSource2 = new SensorWebApiFetchVideo("drone-Video2", {
      ...opts
    });

    const dataSource3 = new SensorWebApiFetchVideo("drone-Video3", {
      ...opts
    });

    this.views.push(new FFMPEGView({
      container: 'container0',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      dataSourceId: dataSource0.id
    }));

    this.views.push(new FFMPEGView({
      container: 'container1',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      dataSourceId: dataSource1.id
    }));

    this.views.push(new FFMPEGView({
      container: 'container2',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      dataSourceId: dataSource2.id
    }));

    this.views.push(new FFMPEGView({
      container: 'container3',
      css: 'video-h264',
      name: 'UAV Video',
      framerate: 25,
      showTime: true,
      showStats: true,
      dataSourceId: dataSource3.id
    }));

    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: REPLAY_SPEED,
      timerResolution: 5,
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
