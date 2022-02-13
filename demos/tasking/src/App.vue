<template>
  <div id="app">
    <Map
        v-if="isInit"
        :drone-location-data-source="droneLocationDataSource"
        :control="control"
      ></Map>
    <InfoPanel
        v-if="isInit"
        :drone-location-data-source="droneLocationDataSource"
        :control="control"
    ></InfoPanel>
  </div>
</template>
<script>
// @ is an alias to /src
import Map from './components/Map.vue';
import InfoPanel from "./components/InfoPanel.vue";

import SweApiFetchJson from "osh-js/core/datasource/sweapi/SweApiFetchJson";
import Systems from "osh-js/core/sweapi/system/Systems";

//https://ogct17.georobotix.io:8443/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
export default {
  components: {
    Map,
    InfoPanel
  },
  data() {
    return {
      isInit: false
    }
  },
  async beforeMount() {
    const systemId = "1ghd3h0dea3xy";
    const posDsId = "1eots41v6kody";
    const cmdStreamId = "1rl2xoslsdldj";

    this.droneLocationDataSource = new SweApiFetchJson("supersonic drone GPS", {
      collection: `/datastreams/${posDsId}/observations`,
      endpointUrl: 'ogct17.georobotix.io:8483',
      protocol: 'mqtt',
      tls: true,
    });

    this.droneLocationDataSource.connect();
    this.systems = new Systems({
      endpointUrl:  'ogct17.georobotix.io:8443/sensorhub',
      mqttEndpointUrl: 'ogct17.georobotix.io:8483',
      streamProtocol: 'mqtt',
      tls: true
    });

    const systems = new Systems({
      endpointUrl:  'ogct17.georobotix.io:8443/sensorhub',
      mqttEndpointUrl: 'ogct17.georobotix.io:8483',
      streamProtocol: 'mqtt',
      tls: true
    });

    const system = await systems.getSystemById(systemId);
    this.control = await system.getControlById(cmdStreamId);
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

