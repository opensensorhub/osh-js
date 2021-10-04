<template>
  <div id="app">
    <DroneMiniPanel
        :video-data-source="this.droneVideoDataSource"
    />
    <TargetMiniPanel
      :target-location-data-source="targetLocationDataSource"
    />
    <Globe
        :drone-camera-orientation-data-source="droneCameraOrientationDataSource"
        :drone-location-data-source="droneLocationDataSource"
        :drone-orientation-data-source="droneOrientationDataSource"
        :drone-geo-ref-image-frame-data-source="droneGeoRefImageFrameDataSource"
        :target-location-data-source="targetLocationDataSource"
    />
  </div>
</template>
<script>
// @ is an alias to /src
import Globe from './components/Globe.vue';
import DroneMiniPanel from "./components/DroneMiniPanel.vue";
import TargetMiniPanel from "./components/TargetMiniPanel.vue";
import SosGetResultVideo from "osh-js/core/datasource/SosGetResultVideo.js";
import SosGetResultJson from "osh-js/core/datasource/SosGetResultJson.js";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {EventType} from "osh-js/core/event/EventType";
import {Status} from "osh-js/core/protocol/Status";

import {DATASOURCE_DATA_TOPIC} from "osh-js/core/Constants";
import SosGetFois from "../../../source/core/datasource/SosGetFois";

//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
export default {
  components: {
    DroneMiniPanel,
    TargetMiniPanel,
    Globe
  },
  data() {
    return {
      dataSynchronizer: null
    }
  },
  beforeMount() {
    const droneVideoDataSource = new SosGetResultVideo("MISB Drone - Video", {
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
    });
    const droneLocationDataSource = new SosGetResultJson('MISB UAS - Platform Location', {
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
    });
    const droneOrientationDataSource = new SosGetResultJson('MISB UAS - Platform Orientation', {
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
    });
    const droneCameraOrientationDataSource = new SosGetResultJson('MISB UAS - Sensor Orientation', {
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
    });

    const droneGeoRefImageFrameDataSource = new SosGetResultJson('MISB UAS - Geo ref image', {
      protocol: 'wss',
      service: 'SOS',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
      offeringID: 'urn:osh:process:georef',
      observedProperty: 'http://sensorml.com/ont/misb0601/property/GeoRefImageFrame',
      startTime: '2012-06-29T14:32:34.099333251Z',
      endTime: '2012-06-29T14:37:44.033333251Z',
      replaySpeed: 1,
      bufferingTime: 1000,
      timeOut: 500
    });

    const targetLocationDataSource = new SosGetResultJson('MISB UAS - Target location', {
      protocol: 'wss',
      service: 'SOS',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
      offeringID: 'urn:osh:process:vmti',
      observedProperty: 'http://sensorml.com/ont/swe/property/TargetLocation',
      startTime: '2012-06-29T14:32:34.099333251Z',
      endTime: '2012-06-29T14:37:44.033333251Z',
      replaySpeed: 1,
      bufferingTime: 1000,
      timeOut: 500
    });

    const dataSynchronizer = new DataSynchronizer({
      replayFactor: 1,
      dataSources: [droneLocationDataSource, droneVideoDataSource, droneOrientationDataSource,
        droneCameraOrientationDataSource, droneGeoRefImageFrameDataSource, targetLocationDataSource]
    });

    // check connect/disconnect
    const videoBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + droneVideoDataSource.id);

    videoBroadcastChannel.onmessage = (message) => {
      if (message.data.type === EventType.STATUS) {
        if (message.data.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneDataSourceStatus', {
            video: {
              connected: true
            }
          });
        } else if (message.data.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneDataSourceStatus', {
            video: {
              connected: false
            }
          });
        }
      }
    }

    const locationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + droneLocationDataSource.id);

    locationBroadcastChannel.onmessage = (message) => {
      if (message.data.type === EventType.STATUS) {
        if (message.data.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneDataSourceStatus', {
            position: {
              connected: true
            }
          });
        } else if (message.data.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneDataSourceStatus', {
            video: {
              position: false
            }
          });
        }
      }
    }

    const droneGeoRefImageFrameBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + droneGeoRefImageFrameDataSource.id);

    droneGeoRefImageFrameBroadcastChannel.onmessage = (message) => {
      if (message.data.type === EventType.STATUS) {
        if (message.data.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneDataSourceStatus', {
            footprint: true
          });
        } else if (message.data.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneDataSourceStatus', {
            footprint: false
          });
        }
      }
    }

    const targetLocationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + targetLocationDataSource.id);

    targetLocationBroadcastChannel.onmessage = (message) => {
      if (message.data.type === EventType.STATUS) {
        if (message.data.status === Status.CONNECTED) {
          this.$store.dispatch('updateTargetDataSourceStatus', {
            position: {
              connected: true
            }
          });
        } else if (message.data.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateTargetDataSourceStatus', {
            video: {
              position: false
            }
          });
        }
      }
    }

    this.dataSynchronizer = dataSynchronizer;

    this.droneLocationDataSource = droneLocationDataSource;
    this.droneVideoDataSource = droneVideoDataSource;
    this.droneOrientationDataSource = droneOrientationDataSource;
    this.droneCameraOrientationDataSource = droneCameraOrientationDataSource;
    this.droneGeoRefImageFrameDataSource = droneGeoRefImageFrameDataSource;
    this.targetLocationDataSource = targetLocationDataSource;
    //

    let sosGetFois = new SosGetFois('fois', {
      protocol: 'https',
      service: 'SOS',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
      batchSize: 50,
      procedureId: 'urn:osh:sensor:isa:701149'
    });

    const sosGetFoisBc = new BroadcastChannel(DATASOURCE_DATA_TOPIC + sosGetFois.id);

    sosGetFoisBc.onmessage = (message) => {
      if (message.data.type === EventType.DATA) {
        console.log(message.data)
      }
    }
    sosGetFois.connect()

  },
  mounted() {

    // start streaming
    this.dataSynchronizer.connect();
  }
};
</script>
<style>
html, body {
  overflow: hidden !important;
  margin: 0;
  padding: 0
}
</style>
