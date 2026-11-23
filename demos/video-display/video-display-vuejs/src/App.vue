<template>
  <div id="app">
    <Video :video-data-source="videoDataSource"/>
    <Map :locationDataSource="locationDataSource"/>
  </div>
</template>
<script>
  // @ is an alias to /src
import Map from './components/Map.vue';
import Video from './components/Video.vue';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

export default {
  components: {
    Map,
    Video
  },
  data: function () {
    const START_TIME = '2023-06-06T14:29:17Z';
    const END_TIME = '2023-06-06T22:29:13Z';
    const MODE = Mode.REPLAY;
    const MIN_TIME = '2023-06-06T14:29:17Z';
    const MAX_TIME = '2023-06-06T22:29:13Z';
    const tls = true;
    const dsReplaySpeed = 1;
    const commonDatasourceOpts = {
      endpointUrl:  'api.georobotix.io/ogc/t18/api',
      protocol: 'mqtt',
      mqttOpts: {
        shared: true,
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
      },
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: MIN_TIME,
      maxTime: MAX_TIME,
      mode: MODE,
      replaySpeed: dsReplaySpeed,
      prefetchBatchDuration: 10000,
      prefetchBatchSize: 250
    };
    return {
      dataSynchronizer: undefined,
      locationDataSource: new ConSysApi("android-GPS", {
        ...commonDatasourceOpts,
        resource: '/datastreams/ltr9mqaqrorj6/observations',
        responseFormat: 'application/swe+json',
      }),
      videoDataSource: new ConSysApi("android-Video", {
        ...commonDatasourceOpts,
        resource: '/datastreams/a3if48eqn8dha/observations',
        responseFormat: 'application/swe+binary',
      }),
    }
  },
  beforeMount() {
    const START_TIME = '2023-06-06T14:29:17Z';
    const END_TIME = '2023-06-06T22:29:13Z';
    const MODE = Mode.REPLAY;
    const dsReplaySpeed = 1;

    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: dsReplaySpeed,
      masterTimeRefreshRate: 250,
      startTime: START_TIME,
      endTime: END_TIME,
      mode: MODE,
      dataSources: [this.locationDataSource, this.videoDataSource]
    });
  },
  mounted() {
    this.dataSynchronizer.connect();
  }
};
</script>
<style>
  body {
    overflow-x: hidden;
    margin:0;
  }
</style>
