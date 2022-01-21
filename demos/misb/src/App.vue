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
    <VideoPanel
      :drone-video-data-source="this.droneVideoDataSource"
      v-show="this.$store.state.ui.droneVideo"
    ></VideoPanel>
    <!--BioSensorMiniPanel
        :biological-sensors-data-source="biologicalSensorsDataSource"
        v-show="false"
    /-->
    <Globe
        :drone-camera-orientation-data-source="droneCameraOrientationDataSource"
        :drone-location-data-source="droneLocationDataSource"
        :drone-orientation-data-source="droneOrientationDataSource"
        :drone-geo-ref-image-frame-data-source="geoRefImageFrameDataSource"
        :target-location-data-source="targetLocationDataSource"
        :drone-h-fov-data-source="droneHFovDataSource"
        :drone-v-fov-data-source="droneVFovDataSource"
        ></Globe>
<!--        :biological-sensors-data-source="biologicalSensorsDataSource"-->
    />
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
import BioSensorMiniPanel from "./components/BioSensorMiniPanel.vue";
import CollapseTimeController from "./components/CollapseTimeController.vue";

import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {EventType} from "osh-js/core/event/EventType";
import {Status} from "osh-js/core/protocol/Status";

import VideoPanel from "./components/VideoPanel.vue";
import SweApiFetchJson from "osh-js/core/datasource/sweapi/SweApiFetchJson";
// import SweApiFetchVideo from "osh-js/core/datasource/sweapi/SweApiFetchVideo";
import SosGetResultVideo from "osh-js/core/datasource/sos/SosGetResultVideo";


//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
export default {
  components: {
    VideoPanel,
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

    const dsReplaySpeed = 1.5;
    const timeOut = 3000;
    const bufferingTime = 800;

    const droneVideoDataSource = new SosGetResultVideo('MISB Drone - Video',{
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/sos',
      offeringID: 'urn:osh:sensor:uas:predator001',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      // endpointUrl: 'ogct17.georobotix.io:8483',
      // collection: '/datastreams/uxzna8pldpiv/observations',
      // responseFormat: 'application/swe+binary',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneLocationDataSource = new SweApiFetchJson('MISB UAS - Platform Location', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/gal7w6j6v7n9/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneOrientationDataSource = new SweApiFetchJson('MISB UAS - Platform Attitude', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/ei5nsp8guy5y/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneCameraOrientationDataSource = new SweApiFetchJson('MISB UAS - Gimbal Attitude', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/7rsjo1e6pq45/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneHFovDataSource = new SweApiFetchJson('MISB UAS - Horizontal FoV', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/1fle3d5b29shh/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const droneVFovDataSource = new SweApiFetchJson('MISB UAS - Vertical FoV', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/1fle3d5b29shh/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const geoRefImageFrameDataSource = new SweApiFetchJson('MISB UAS - GeoReferenced Image Frame', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/1b6j89nistu9h/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    const targetLocationDataSource = new SweApiFetchJson('MISB UAS - Video Moving Target Geo-Referencing - Target Location', {
      protocol: 'ws',
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub',
      collection: '/datastreams/tmi5mitvl8c7/observations',
      tls: tls,
      startTime: START_TIME,
      endTime: END_TIME,
      minTime: START_TIME,
      maxTime: END_TIME,
      replaySpeed: dsReplaySpeed,
      timeOut: timeOut,
      bufferingTime: bufferingTime
    });

    // let biologicalSensorsDataSource = new SosGetFois('Biological Sensors', {
    //   protocol: tls ? 'https' : 'http',
    //   service: 'SOS',
    //   endpointUrl: sosEndpoint,
    //   batchSize: 50,
    //   procedureId: 'urn:osh:sensor:isa:701149'
    // });

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
    // this.biologicalSensorsDataSource = biologicalSensorsDataSource;

    this.initEvents();

    dataSynchronizer.connect();
    // biologicalSensorsDataSource.connect()

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
      this.droneLocationDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            platformLocation: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneVideoDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            video: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneOrientationDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            platformOrientation: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneCameraOrientationDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            cameraOrientation: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneHFovDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            hFov: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);


      this.droneVFovDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            vFov: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      // Update GeoRef status
      this.geoRefImageFrameDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateGeoRefStatus', {
            connected: (message.status === Status.CONNECTED)
          });
        }
      }, [EventType.STATUS]);

      // Update Target status
      this.targetLocationDataSource.subscribe((message) => {
        if (message.status === Status.CONNECTED || message.status === Status.DISCONNECTED) {
          this.$store.dispatch('updateTargetStatus', {
            location: {
              connected: (message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);
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

