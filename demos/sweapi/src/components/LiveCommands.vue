<template>
  <div>
    <RightHeader
        selected1="ws"
        :listboxValues1="protocols"
        @change1="onChangeProtocol"
    >
    </RightHeader>
    <v-divider></v-divider>
    <RightContent></RightContent>
  </div>
</template>
<script>

import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";
import RightHeader from "./common/RightHeader.vue";
import RightContent from "./common/RightContent.vue";
import {mapActions, mapState} from "vuex";
import Control from "../../../../source/core/sweapi/control/Control";

export default {
  name: "LiveCommands",
  props: [
    'control'
  ],
  components: {
    RightHeader,
    RightContent
  },
  data() {
    return {
      controlObj: this.control,
      protocols: ['ws','mqtt'],
    }
  },
  mounted() {
    this.connect();
  },
  async destroyed(){
    // make it async
    const that = this;
    new Promise((resolve, reject) => {
      that.disconnect();
    });
  },
  computed: mapState({
    mqttUrl: state => state.server.mqtt.url,
    mqttPrefix: state => state.server.mqtt.prefix,
    endpointUrl: state => state.server.url,
  }),
  methods: {
    ...mapActions(['updateRightContent']),
    buildControl(controlProperties, networkProperties) {
      this.controlObj = new Control(controlProperties, networkProperties);
    },
    connect() {
      const that = this;
      this.controlObj.streamCommands(new ControlFilter({}), function (obs) {
        that.updateRightContent(obs);
      });
    },
    disconnect() {
      if(this.control._network.stream.connector) {
        this.control._network.stream.connector.disconnect();
      }
    },
    onChangeProtocol(value) {
      this.disconnect();
      this.buildControl(
          {
            ...this.controlObj.properties
          },
          {
            ...this.controlObj.networkProperties,
            streamProtocol: value,
            mqttPrefix: this.mqttPrefix,
            endpointUrl: (value === 'mqtt') ? this.mqttUrl : this.endpointUrl
          })
      this.connect();
    },
  }
}
</script>

<style scoped>
</style>
