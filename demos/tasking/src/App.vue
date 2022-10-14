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

import Systems from "osh-js/core/sweapi/system/Systems";
import Control from "osh-js/core/sweapi/control/Control";
import SweApiDatasource from "osh-js/core/datasource/sweapi/SweApi.datasource";

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
    const systemId = "jrc2e0kaj1m5a";
    const posDsId = "rbnag2hrc04mm";
    const cmdStreamId = "hf62t0dotfd5k";

    const mqttProps = {
      prefix: '/api',
      endpointUrl: 'api.georobotix.io:443/ogc/t18',
      username: 'uxs-team',
      password: 'WR6zlso9h#'
    };

    this.droneLocationDataSource = new SweApiDatasource("supersonic drone GPS", {
      endpointUrl: 'api.georobotix.io/ogc/t18/api',
      resource: `/datastreams/${posDsId}/observations`,
      protocol: 'mqtt',
      mqttOpts: mqttProps,
      tls: true,
    });

    this.systems = new Systems({
      endpointUrl: 'api.georobotix.io/ogc/t18/api',
      streamProtocol: 'mqtt',
      mqttOpts: mqttProps,
      tls: true
    });

    const username = 'uxs-team';
    const password = 'WR6zlso9h#';

    this.control = new Control({
          id: cmdStreamId,
          'system@id': systemId
        },
        {
          endpointUrl: 'api.georobotix.io/ogc/t18/api',
          streamProtocol: 'mqtt',
          mqttOpts: mqttProps,
          tls: true,
          connectorOpts: {
            username: username,
            password: password
          }
        });

    // https://api.georobotix.io/ogc/t18/api/systems/1ghd3h0dea3xy/controls/1rl2xoslsdldj/commands

    this.controlDataSource = new SweApiDatasource("Control Status", {
      endpointUrl: 'api.georobotix.io/ogc/t18/api',
      resource: `/systems/${systemId}/controls/${cmdStreamId}/status`,
      protocol: 'mqtt',
      mqttOpts: mqttProps,
      tls: true,
      responseFormat: 'application/json'
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

