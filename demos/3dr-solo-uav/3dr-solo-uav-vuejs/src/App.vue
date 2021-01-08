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
import VideoH264 from "osh/datareceiver/Video.js";
import SweJson from "osh/datareceiver/SweJson.js";
import DataSynchronizer from "osh/datasynchronizer/DataSynchronizer";

  export default {
  components: {
    Globe,
    Video
  },
    data: function () {
      return {
        videoDataSource: new VideoH264("drone-Video", {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:video2',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        }),
        platformLocationDataSource: new SweJson('android-GPS', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        }),
        platformOrientationDataSource: new SweJson('android-Heading', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        }),
        gimbalOrientationDataSource: new SweJson('android-Heading', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        })
      }
    },
    mounted() {

      const dataSynchronizer = new DataSynchronizer({
        replayFactor: 1,
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
