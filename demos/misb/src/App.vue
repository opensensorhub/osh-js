<template>
  <div id="app">
    <v-app-bar class="bar-icon" floating>
      <v-img src="images/OSH-Logo-min.svg"
             height="80px"
             width="50px"
             contain
             position="top 15px right 0px">
      </v-img>
      <v-toolbar-title color="#FFF">OpenSensorHub</v-toolbar-title>
    </v-app-bar>
    <DroneMiniPanel :video-data-source="this.droneVideoDataSource"/>
    <TargetMiniPanel :target-location-data-source="targetLocationDataSource"/>
    <Globe
        :drone-camera-orientation-data-source="droneCameraOrientationDataSource"
        :drone-location-data-source="droneLocationDataSource"
        :drone-orientation-data-source="droneOrientationDataSource"
        :drone-geo-ref-image-frame-data-source="droneGeoRefImageFrameDataSource"
        :target-location-data-source="targetLocationDataSource"
        :drone-h-fov-data-source="droneHFovDataSource"
        :drone-v-fov-data-source="droneVFovDataSource"
        :lastDroneLocation="lastDroneLocation"/>
    <CollapseTimeController
        :dataSynchronizer="dataSynchronizer"
        v-if="dataSynchronizer">
    </CollapseTimeController>
  </div>
</template>
<script>
// @ is an alias to /src
import Globe from './components/Globe.vue';
import DroneMiniPanel from "./components/DroneMiniPanel.vue";
import TargetMiniPanel from "./components/TargetMiniPanel.vue";
import CollapseTimeController from "./components/CollapseTimeController.vue";

import SosGetResultVideo from "osh-js/core/datasource/SosGetResultVideo.js";
import SosGetResultJson from "osh-js/core/datasource/SosGetResultJson.js";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {EventType} from "osh-js/core/event/EventType";
import {Status} from "osh-js/core/protocol/Status";

import {DATASOURCE_DATA_TOPIC} from "osh-js/core/Constants";
import SosGetFois from "osh-js/core/datasource/SosGetFois";

//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
export default {
  components: {
    DroneMiniPanel,
    TargetMiniPanel,
    Globe,
    CollapseTimeController
  },
  data() {
    return {
      dataSynchronizer: null,
      lastDroneLocation: null
    }
  },
  beforeMount() {
    const START_TIME = '2012-06-29T14:32:34.099333251Z';
    const END_TIME = '2012-06-29T14:37:44.033333251Z';
    // const END_TIME = '2012-06-29T14:32:44.099333251Z'

    const tls = true;
    const sosEndpoint = 'ogct17.georobotix.io:8443/sensorhub/sos';    
    //const tls = false;
    //const sosEndpoint = 'localhost:8181/sensorhub/sos';
    
    const dsReplaySpeed = 1.5;
    const timeOut = 3000;
    const bufferingTime = 500;
    
    const droneVideoDataSource = new SosGetResultVideo("MISB Drone - Video", {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });
    
    const droneLocationDataSource = new SosGetResultJson('MISB UAS - Platform Location', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorLocation',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });
    
    const droneOrientationDataSource = new SosGetResultJson('MISB UAS - Platform Orientation', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });
    
    const droneCameraOrientationDataSource = new SosGetResultJson('MISB UAS - Sensor Orientation', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorOrientation',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneHFovDataSource = new SosGetResultJson('MISB UAS - Horizontal FoV', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://sensorml.com/ont/misb0601/property/HorizontalFov',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: 1,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneVFovDataSource = new SosGetResultJson('MISB UAS - Vertical FoV', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://sensorml.com/ont/misb0601/property/VerticalFov',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneGeoRefImageFrameDataSource = new SosGetResultJson('MISB UAS - Geo ref image', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:process:georef',
      observedProperty: 'http://sensorml.com/ont/misb0601/property/GeoRefImageFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const targetLocationDataSource = new SosGetResultJson('MISB UAS - Target location', {
      protocol: tls ? 'wss' : 'ws',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      offeringID: 'urn:osh:process:vmti',
      observedProperty: 'http://sensorml.com/ont/swe/property/TargetLocation',
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const dataSynchronizer = new DataSynchronizer({
      replayFactor: 1,
      dataSources: [droneLocationDataSource, droneVideoDataSource, droneOrientationDataSource,
        droneCameraOrientationDataSource, droneGeoRefImageFrameDataSource, targetLocationDataSource, droneVFovDataSource,droneHFovDataSource]
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
      } else if(message.data.type === EventType.DATA) {
        this.lastDroneLocation = message.data.values[message.data.values.length-1].data;
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
    // start streaming
    dataSynchronizer.connect();
    this.dataSynchronizer = dataSynchronizer;

    this.droneLocationDataSource = droneLocationDataSource;
    this.droneVideoDataSource = droneVideoDataSource;
    this.droneOrientationDataSource = droneOrientationDataSource;
    this.droneCameraOrientationDataSource = droneCameraOrientationDataSource;
    this.droneGeoRefImageFrameDataSource = droneGeoRefImageFrameDataSource;
    this.targetLocationDataSource = targetLocationDataSource;
    this.droneHFovDataSource = droneHFovDataSource;
    this.droneVFovDataSource = droneVFovDataSource;
    //

    let sosGetFois = new SosGetFois('fois', {
      protocol: tls ? 'https' : 'http',
      service: 'SOS',
      endpointUrl: sosEndpoint,
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

  }
};
</script>
<style>
html, body {
  overflow: hidden !important;
  margin: 0;
  padding: 0
}

.bar-icon {
  z-index: 30;
  background-color: rgba(0,0,0,0.5) !important;
  position: absolute;
  border-radius: 0 0 8px 0 !important;
  color: #c1c1c1 !important;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
}

.v-toolbar__content, .v-toolbar__extension {
  padding: 4px 4px;
  font-family: sans-serif;
}

.v-toolbar__title {
  margin-left: 10px;
}
</style>

