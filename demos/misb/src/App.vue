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
    <BioSensorMiniPanel :biological-sensors-data-source="biologicalSensorsDataSource"/>
    <Globe
        :drone-camera-orientation-data-source="droneCameraOrientationDataSource"
        :drone-location-data-source="droneLocationDataSource"
        :drone-orientation-data-source="droneOrientationDataSource"
        :drone-geo-ref-image-frame-data-source="geoRefImageFrameDataSource"
        :target-location-data-source="targetLocationDataSource"
        :drone-h-fov-data-source="droneHFovDataSource"
        :drone-v-fov-data-source="droneVFovDataSource"
        :biological-sensors-data-source="biologicalSensorsDataSource"
    />
    <CollapseTimeController
        :dataSynchronizer="dataSynchronizer"
        :biological-sensors-data-source="biologicalSensorsDataSource"
        v-if="dataSynchronizer">
    </CollapseTimeController>
  </div>
</template>
<script>
// @ is an alias to /src
import Globe from './components/Globe.vue';
import DroneMiniPanel from "./components/DroneMiniPanel.vue";
import TargetMiniPanel from "./components/TargetMiniPanel.vue";
import BioSensorMiniPanel from "./components/BioSensorMiniPanel.vue";
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
    BioSensorMiniPanel,
    DroneMiniPanel,
    TargetMiniPanel,
    Globe,
    CollapseTimeController,
  },
  data() {
    return {
      dataSynchronizer: null
    }
  },
  beforeMount() {
    const START_TIME = '2012-06-29T14:32:34.099333251Z';
    const END_TIME = '2012-06-29T14:37:44.033333251Z';
    // const END_TIME = '2012-06-29T14:32:37.099333251Z'

    const tls = true;
    const sosEndpoint = 'ogct17.georobotix.io:8443/sensorhub/sos';
    //const tls = false;
    //const sosEndpoint = 'localhost:8181/sensorhub/sos';

    const dsReplaySpeed = 1.5;
    const timeOut = 3000;
    const bufferingTime = 800;

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
      replaySpeed: dsReplaySpeed,
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

    const geoRefImageFrameDataSource = new SosGetResultJson('MISB UAS - Geo ref image', {
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

    let biologicalSensorsDataSource = new SosGetFois('Biological Sensors', {
      protocol: tls ? 'https' : 'http',
      service: 'SOS',
      endpointUrl: sosEndpoint,
      batchSize: 50,
      procedureId: 'urn:osh:sensor:isa:701149'
    });

    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: dsReplaySpeed,
      dataSources: [
        droneLocationDataSource,
        droneVideoDataSource,
        droneOrientationDataSource,
        droneCameraOrientationDataSource,
        geoRefImageFrameDataSource,
        targetLocationDataSource,
        droneVFovDataSource,
        droneHFovDataSource
      ]
    });

    this.dataSynchronizer = dataSynchronizer;

    this.droneLocationDataSource = droneLocationDataSource;
    this.droneVideoDataSource = droneVideoDataSource;
    this.droneOrientationDataSource = droneOrientationDataSource;
    this.droneCameraOrientationDataSource = droneCameraOrientationDataSource;
    this.droneHFovDataSource = droneHFovDataSource;
    this.droneVFovDataSource = droneVFovDataSource;

    this.geoRefImageFrameDataSource = geoRefImageFrameDataSource;
    this.targetLocationDataSource = targetLocationDataSource;
    //
    this.biologicalSensorsDataSource = biologicalSensorsDataSource;

    this.initEvents();

    dataSynchronizer.connect();
    biologicalSensorsDataSource.connect()

    // setup default UI options
    this.$store.dispatch('updateUiStatus', {
      fov: true,
      footprint: true
    });
  },
  mounted() {

  },
  methods: {
    initEvents() {

      // Link DataSources connected/disconnected Status to state
      // update drone status
      const droneLocationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.droneLocationDataSource.id);
      droneLocationBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              platformLocation: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              platformLocation: {
                connected: false
              }
            });
          }
        }
      }

      const droneVideoBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.droneVideoDataSource.id);
      droneVideoBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              video: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              video: {
                connected: false
              }
            });
          }
        }
      }

      const droneOrientationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.droneOrientationDataSource.id);
      droneOrientationBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              platformOrientation: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              platformOrientation: {
                connected: false
              }
            });
          }
        }
      }

      const droneCameraOrientationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.droneCameraOrientationDataSource.id);
      droneCameraOrientationBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              cameraOrientation: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              cameraOrientation: {
                connected: false
              }
            });
          }
        }
      }

      const droneHFovBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.droneHFovDataSource.id);
      droneHFovBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              hFov: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              hFov: {
                connected: false
              }
            });
          }
        }
      }

      const droneVFovBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.droneVFovDataSource.id);
      droneVFovBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              vFov: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateDroneStatus', {
              vFov: {
                connected: false
              }
            });
          }
        }
      }

      // Update GeoRef status
      const droneGeoRefImageFrameBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.geoRefImageFrameDataSource.id);
      droneGeoRefImageFrameBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateGeoRefStatus', {
              connected: true
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateGeoRefStatus', {
              connected: false
            });
          }
        }
      }

      // Update Target status
      const targetLocationBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC +this. targetLocationDataSource.id);
      targetLocationBroadcastChannel.onmessage = (message) => {
        if (message.data.type === EventType.STATUS) {
          if (message.data.status === Status.CONNECTED) {
            this.$store.dispatch('updateTargetStatus', {
              location: {
                connected: true
              }
            });
          } else if (message.data.status === Status.DISCONNECTED) {
            this.$store.dispatch('updateTargetStatus', {
              location: {
                connected: false
              }
            });
          }
        }
      }
    }
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

