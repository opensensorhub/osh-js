<template>
  <v-app>
    <v-navigation-drawer
        hide-overlay
        :width="showNav ? 420 : 0"
        permanent
        app>

      <v-card dark raised elevation="4" class="time-card">
      <v-card-title>Commands Ack</v-card-title>
      <TimeLine
          v-if="isInit"
          :control="control"
      ></TimeLine>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar
        elevation="4"
        dense
        app>
      <v-app-bar-nav-icon
          @click="showNav = !showNav">
        <slot v-if="showNav">
          <v-icon>mdi-chevron-left</v-icon>
        </slot>
        <slot v-if="!showNav">
          <v-icon>mdi-chevron-right</v-icon>
        </slot>
      </v-app-bar-nav-icon>
      <!-- -->
      <v-toolbar-title>Hypersonic Drone Tasking</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <Clock>
      </Clock>
    </v-app-bar>

    <v-main>
      <Map
          v-if="isInit"
          :drone-location-data-source="droneLocationDataSource"
          :control-data-source="controlDataSource"
          :control="control"
      ></Map>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
// @ is an alias to /src
import Map from './components/Map.vue';
import InfoPanel from "./components/InfoPanel.vue";
import Clock from "./components/Clock.vue";
import TimeLine from "./components/TimeLine.vue";

import SweApiFetch from "osh-js/core/datasource/sweapi/SweApiFetch";
import Systems from "osh-js/core/sweapi/system/Systems";
import Control from "../../../source/core/sweapi/control/Control";

//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
export default {
  components: {
    Map,
    InfoPanel,
    Clock,
    TimeLine
  },
  data() {
    return {
      isInit: false,
      showNav: true,
      panel: [0]
    }
  },
  async beforeMount() {
    const systemId = "1ghd3h0dea3xy";
    const posDsId = "1eots41v6kody";
    const cmdStreamId = "1rl2xoslsdldj";

    const mqttProps = {
      prefix: '/api',
      endpointUrl: 'ogct17.georobotix.io:8483'
    };

    this.droneLocationDataSource = new SweApiFetch("supersonic drone GPS", {
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/api',
      collection: `/api/datastreams/${posDsId}/observations`,
      protocol: 'mqtt',
      mqtt: mqttProps,
      tls: true,
    });

    this.systems = new Systems({
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/api',
      streamProtocol: 'mqtt',
      mqtt: mqttProps,
      tls: true
    });

    this.control = new Control({
      id: cmdStreamId,
      'system@id': systemId
    },
    {
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/api',
      streamProtocol: 'mqtt',
      mqtt: mqttProps,
      tls: true
    });

    // https://ogct17.georobotix.io:8443/sensorhub/api/systems/1ghd3h0dea3xy/controls/1rl2xoslsdldj/commands

    this.controlDataSource = new SweApiFetch("Control Status", {
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub/api',
      collection: `/api/systems/${systemId}/controls/${cmdStreamId}/status`,
      protocol: 'mqtt',
      mqtt: mqttProps,
      tls: true,
    });

    await this.controlDataSource.connect();
    await this.droneLocationDataSource.connect();

    // this.controlDataSource.subscribe(message => console.log(message), [EventType.DATA]);
    // this.droneLocationDataSource.subscribe(message => console.log(message), [EventType.DATA]);
    this.isInit = true;
  },
  mounted() {

  },
  methods: {
  }
};
</script>
<style>
html, body {
  overflow: hidden !important;
  margin: 0;
  padding: 0
}

.time-card{
  padding-left:0;
  padding-right: 10px;
}

</style>

