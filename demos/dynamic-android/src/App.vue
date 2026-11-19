<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <Map ref="map"></Map>
        <VideoContainer
            :dataSources="videos"
            v-if="videos.length > 0"
        ></VideoContainer>
      </v-app>
    </v-app>
  </div>
</template>

<script>

import Map from './components/Map.vue';
import './assets/app.css';
import VideoContainer from "./components/VideoContainer";
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from "osh-js/core/datasource/Mode";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

export default {
  name: 'App',
  components: {
    VideoContainer,
    Map
  },
  data: function () {
    return {
      videos: []
    }
  },
  beforeMount() {
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

    const locationDataSource = new ConSysApi("android-GPS", {
      ...commonDatasourceOpts,
      resource: '/datastreams/ltr9mqaqrorj6/observations',
      responseFormat: 'application/swe+json',
    });

    const headingDataSource = new ConSysApi("android-Att", {
      ...commonDatasourceOpts,
      resource: '/datastreams/kegun78tu174a/observations',
      responseFormat: 'application/swe+json',
    });

    const videoDataSource = new ConSysApi("android-Video", {
      ...commonDatasourceOpts,
      resource: '/datastreams/a3if48eqn8dha/observations',
      responseFormat: 'application/swe+binary',
    });

    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: dsReplaySpeed,
      masterTimeRefreshRate: 250,
      startTime: START_TIME,
      endTime: END_TIME,
      mode: MODE,
      dataSources: [
        locationDataSource,
        headingDataSource,
        videoDataSource
      ]
    });

    // kept off the reactive data (like demos/misb) so Vue doesn't observe the datasources
    this.dataSynchronizer = dataSynchronizer;
    this.locationDataSource = locationDataSource;
    this.headingDataSource = headingDataSource;
    // frozen so Vue renders the list without deep-observing the datasource
    this.videos = Object.freeze([videoDataSource]);

    dataSynchronizer.connect();
  },
  mounted() {
    // the map ref only exists once mounted
    this.$refs['map'].add({
      name: 'Android',
      location: this.locationDataSource,
      heading: this.headingDataSource
    });
  },
  beforeDestroy() {
    this.dataSynchronizer.terminate();
  }
}
</script>

<style>

</style>
