<template>
  <div id="app">
    <Video
      :video-data-source="videoDataSource"
    />
    <Globe
      :platform-location-data-source="platformLocationDataSource"
      :platform-orientation-data-source="platformOrientationDataSource"
      :gimbal-orientation-data-source="gimbalOrientationDataSource"
    />
  </div>
</template>
<script>
  // @ is an alias to /src
import Globe from './components/Globe.vue';
import Video from './components/Video.vue';
import SosGetResult from "osh-js/core/datasource/sos/SosGetResult.datasource.js";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from 'osh-js/core/datasource/Mode';

  export default {
  components: {
    Globe,
    Video
  },
    data: function () {
      return {
        videoDataSource: new SosGetResult("drone-Video", {
          endpointUrl: 'sensiasoft.net/sensorhub/sos',
          offeringID: 'urn:mysos:solo:video2',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          mode: Mode.REPLAY,
          tls: true
        }),
        platformLocationDataSource: new SosGetResult('android-GPS', {
          endpointUrl: 'sensiasoft.net/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          mode: Mode.REPLAY,
          tls: true
        }),
        platformOrientationDataSource: new SosGetResult('android-Heading', {
          endpointUrl: 'sensiasoft.net/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          mode: Mode.REPLAY,
          tls: true
        }),
        gimbalOrientationDataSource: new SosGetResult('android-Heading', {
          endpointUrl: 'sensiasoft.net/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          mode: Mode.REPLAY,
          tls: true
        })
      }
    },
    mounted() {

      const dataSynchronizer = new DataSynchronizer({
        replaySpeed: 1.5,
        startTime: '2015-12-19T21:04:29.231Z',
        endTime: '2015-12-19T21:09:19.675Z',
        dataSources: [this.videoDataSource, this.platformLocationDataSource, this.platformOrientationDataSource,
          this.gimbalOrientationDataSource]
      });

    // start streaming
    dataSynchronizer.connect();
  }
};
</script>
<style>
  body {
    overflow-x: hidden;
    margin:0;
  }
</style>
