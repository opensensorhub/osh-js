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
import SosGetResult from "osh-js/core/datasource/sos/SosGetResult.datasource";
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

export default {
  components: {
    Map,
    Video
  },
  data: function () {
    return {
      dataSynchronizer: undefined,
      locationDataSource: new SosGetResult("android-GPS", {
        endpointUrl: "sensiasoft.net/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/Location",
        startTime: '2015-02-16T07:58:15.447Z',
        endTime: "2015-02-16T08:09:00Z",
        timeShift: -16000,
        mode: Mode.REPLAY,
        tls: true
      }),
      videoDataSource: new SosGetResult("android-Video", {
        endpointUrl: "sensiasoft.net/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: '2015-02-16T07:58:15.447Z',
        endTime: "2015-02-16T08:09:00Z",
        mode: Mode.REPLAY,
        tls: true
      }),
    }
  },
  beforeMount() {
    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: 2,
      startTime: "2015-02-16T07:58:22Z",
      endTime: "2015-02-16T08:09:00Z",
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
