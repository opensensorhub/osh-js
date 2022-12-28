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
import {Status} from "osh-js/core/connector/Status";

import VideoPanel from "./components/VideoPanel.vue";
import SweApiDatasource from "osh-js/core/datasource/sweapi/SweApi.datasource";
import {Mode} from "osh-js/core/datasource/Mode";


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
    const END_TIME = '2012-06-29T14:36:54.033333251Z';
    const MODE = Mode.REPLAY;
    //

    // const START_TIME = 'now';
    // const END_TIME = '2055-01-01'
    // const MODE = Mode.REAL_TIME;

    const MIN_TIME = '2012-06-29T14:32:34.099333251Z';
    const MAX_TIME = '2012-06-29T14:36:54.033333251Z';
    const tls = true;

    const dsReplaySpeed = 2.6;

    const commonDatasourceOpts = {
      endpointUrl:  'api.georobotix.io/ogc/t18/api',
      protocol: 'mqtt',
      mqttOpts: {
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

    const droneVideoDataSource = new SweApiDatasource('MISB Drone - Video', {
      ...commonDatasourceOpts,
      resource: '/datastreams/8ni90dbu4uf0g/observations',
      responseFormat: 'application/swe+binary',
    });

    /*Not working, waiting for the correct sign to pass instead of swe+binary into MQTT protocol
    */

    const droneLocationDataSource = new SweApiDatasource('MISB UAS - Platform Location', {
      ...commonDatasourceOpts,
      resource: '/datastreams/fled6eics1cl4/observations',
      responseFormat: 'application/swe+json',
    });

    const droneOrientationDataSource = new SweApiDatasource('MISB UAS - Platform Attitude', {
      ...commonDatasourceOpts,
      resource: '/datastreams/adheadf9nghts/observations',
      responseFormat: 'application/swe+json',
    });

    const droneCameraOrientationDataSource = new SweApiDatasource('MISB UAS - Gimbal Attitude', {
      ...commonDatasourceOpts,
      resource: '/datastreams/hrpo1u6r5096i/observations',
      responseFormat: 'application/swe+binary',
    });

    const droneHFovDataSource = new SweApiDatasource('MISB UAS - Horizontal FoV', {
      ...commonDatasourceOpts,
      resource: '/datastreams/d962edate9okm/observations',
      responseFormat: 'application/swe+binary',
    });

    const droneVFovDataSource = new SweApiDatasource('MISB UAS - Vertical FoV', {
      ...commonDatasourceOpts,
      resource: '/datastreams/d962edate9okm/observations',
      responseFormat: 'application/swe+binary',
    });

    const geoRefImageFrameDataSource = new SweApiDatasource('MISB UAS - GeoReferenced Image Frame', {
      ...commonDatasourceOpts,
      resource: '/datastreams/p3mp2peibksl4/observations',
      responseFormat: 'application/swe+csv',
    });

    const targetLocationDataSource = new SweApiDatasource('MISB UAS - Video Moving Target Geo-Referencing - Target Location', {
      ...commonDatasourceOpts,
      resource: '/datastreams/p3mp2peibksl4/observations',
      responseFormat: 'application/swe+binary',
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
      masterTimeRefreshRate: 250,
      startTime: START_TIME,
      endTime: END_TIME,
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
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            platformLocation: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneVideoDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            video: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneOrientationDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            platformOrientation: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneCameraOrientationDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED ) {
          this.$store.dispatch('updateDroneStatus', {
            cameraOrientation: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      this.droneHFovDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            hFov: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);


      this.droneVFovDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateDroneStatus', {
            vFov: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
            }
          });
        }
      }, [EventType.STATUS]);

      // Update GeoRef status
      this.geoRefImageFrameDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateGeoRefStatus', {
            connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
          });
        }
      }, [EventType.STATUS]);

      // Update Target status
      this.targetLocationDataSource.subscribe((message) => {
        if (message.status === Status.FETCH_STARTED || message.status === Status.FETCH_ENDED || message.status === Status.CONNECTED) {
          this.$store.dispatch('updateTargetStatus', {
            location: {
              connected: (message.status === Status.FETCH_STARTED || message.status === Status.CONNECTED)
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

