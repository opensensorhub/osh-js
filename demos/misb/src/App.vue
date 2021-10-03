<template>
  <div id="app">
    <DroneMiniPanel
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
import DroneMiniPanel from "./components/DroneMiniPanel.vue";
import SosGetResultVideo from "osh-js/core/datasource/SosGetResultVideo.js";
import SosGetResultJson from "osh-js/core/datasource/SosGetResultJson.js";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {EventType} from "osh-js/core/event/EventType";
import {Status} from "osh-js/core/protocol/Status";

import {DATASOURCE_DATA_TOPIC} from "osh-js/core/Constants";

//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
  export default {
  components: {
    DroneMiniPanel,
    Globe
  },
    data: function () {
      return {
        videoDataSource: new SosGetResultVideo("MISB Drone", {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:video2',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        }),
        platformLocationDataSource: new SosGetResultJson('MISB UAS - Sensor Location', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        }),
        platformOrientationDataSource: new SosGetResultJson('android-Heading', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        }),
        gimbalOrientationDataSource: new SosGetResultJson('android-Heading', {
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


    // check connect/disconnect
      const videoBroadcastChannel     = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.videoDataSource.id);

      videoBroadcastChannel.onmessage = (message) => {
        if(message.data.type === EventType.STATUS) {
          if(message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneDataSourceStatus', {
              video: {
                connected: true
              }
            });
          } else if(message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneDataSourceStatus', {
              video: {
                connected: false
              }
            });
          }
        }
      }

      const locationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.platformLocationDataSource.id);

      locationBroadcastChannel.onmessage = (message) => {
        if(message.data.type === EventType.STATUS) {
          if(message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneDataSourceStatus', {
              position: {
                connected: true
              }
            });
          } else if(message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneDataSourceStatus', {
              video: {
                position: false
              }
            });
          }
        }
      }

      // start streaming
      dataSynchronizer.connect();
  }
};
</script>
<style>
  html, body {
    overflow: hidden !important;
    margin:0;
    padding:0
  }
</style>
