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
  import SosGetResultVideoWithRoll from "../../../source/core/datasource/SosGetResultVideoWithRoll";

//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
  export default {
  components: {
    DroneMiniPanel,
    Globe
  },
    data: function () {
      return {
        videoDataSource: new SosGetResultVideo("MISB Drone", {
          protocol: 'wss',
          service: 'SOS',
          endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
          offeringID: 'urn:osh:sensor:uas:predator001',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2012-06-29T14:32:34.099333251Z',
          endTime: '2012-06-29T14:37:44.033333251Z',
          replaySpeed: 1,
          bufferingTime: 1000,
          timeOut: 500
        }),
        platformLocationDataSource: new SosGetResultJson('MISB UAS - Sensor Location', {
          protocol: 'wss',
          service: 'SOS',
          endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
          offeringID: 'urn:osh:sensor:uas:predator001',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorLocation',
          startTime: '2012-06-29T14:32:34.099333251Z',
          endTime: '2012-06-29T14:37:44.033333251Z',
          replaySpeed: 1,
          bufferingTime: 1000,
          timeOut: 500
        }),
        platformOrientationDataSource: new SosGetResultJson('MISB UAS - Sensor Orientation', {
          protocol: 'wss',
          service: 'SOS',
          endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
          offeringID: 'urn:osh:sensor:uas:predator001',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorOrientation',
          startTime: '2012-06-29T14:32:34.099333251Z',
          endTime: '2012-06-29T14:37:44.033333251Z',
          replaySpeed: 1,
          bufferingTime: 1000,
          timeOut: 500
        }),
        gimbalOrientationDataSource: new SosGetResultJson('MISB UAS - Platform Orientation', {
          protocol: 'wss',
          service: 'SOS',
          endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
          offeringID: 'urn:osh:sensor:uas:predator001',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
          startTime: '2012-06-29T14:32:34.099333251Z',
          endTime: '2012-06-29T14:37:44.033333251Z',
          replaySpeed: 1,
          bufferingTime: 1000,
          timeOut: 500
        })
      }
    },
    mounted() {
      const dataSynchronizer = new DataSynchronizer({
        replayFactor: 1,
        dataSources: [this.videoDataSource, this.platformLocationDataSource, this.platformOrientationDataSource, this.gimbalOrientationDataSource]
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
