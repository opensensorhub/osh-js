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
import {mapActions, mapState} from "vuex";
import Control from "../../../../source/core/sweapi/control/Control";
import RightHeader from "./common/RightHeader.vue";
import RightContent from "./common/RightContent.vue";

export default {
  name: "LiveControlStatus",
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
      items: {}
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
      this.controlObj.streamStatus(new ControlFilter({}), (obs) => {
        that.updateRightContent({
          content: obs,
          contentType: 'application/json'
        });
      });
    },
    disconnect() {
      if(this.controlObj._network.stream.connector) {
        this.controlObj._network.stream.connector.disconnect();
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
            mqttOpts: {
              prefix: this.mqttPrefix,
              endpointUrl: this.mqttUrl
            },
            endpointUrl: this.endpointUrl
          })
      this.connect();
    },
  }
}
</script>

<style scoped>

</style>
