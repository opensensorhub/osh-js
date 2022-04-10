<template>
  <div>
    <RightHeader
        selected1="ws"
        selected2="application/swe+json"
        :listboxValues1="protocols"
        :listboxValues2="formats"
        @change1="onChangeProtocol"
        @change2="onChangeFormat"
    >
    </RightHeader>
    <v-divider></v-divider>
    <RightContent></RightContent>
  </div>
</template>

<script>
import ObservationFilter from "../../../../source/core/sweapi/observation/ObservationFilter";
import DataStream from "../../../../source/core/sweapi/datastream/DataStream";
import RightHeader from "./common/RightHeader.vue";
import RightContent from "./common/RightContent.vue";
import { mapActions, mapState } from 'vuex'

export default {
  name: "LiveObservations",
  props: [
    'datastream'
  ],
  components: {
    RightContent,
    RightHeader
  },
  data() {
    return {
      datastreamObj: this.datastream,
      protocols: ['ws','mqtt'],
      formats: ['application/swe+json','application/swe+csv'],

    }
  },
  mounted() {
    this.connect();
  },
  async destroyed() {
    // make it async
    const that = this;
    new Promise((resolve, reject) => {
      that.reset();
    });
  },
  computed: mapState({
    mqttUrl: state => state.server.mqtt.url,
    mqttPrefix: state => state.server.mqtt.prefix,
    endpointUrl: state => state.server.url,
  }),
  methods: {
    ...mapActions(['updateRightContent']),
    buildDataStream(dataStreamProperties, networkProperties) {
      this.datastreamObj = new DataStream(dataStreamProperties, networkProperties);
    },
    connect(observationFilter = new ObservationFilter({})) {
      const that = this;
      this.datastreamObj.streamObservations(observationFilter, function (obs) {
        that.updateRightContent(obs);
      });
    },
    reset() {
      if (this.datastreamObj._network.stream.connector) {
        this.datastreamObj._network.stream.connector.disconnect();
        this.datastreamObj._network.stream.connector.reset();
      }
    },
    onChangeProtocol(value) {
      this.reset();
      this.buildDataStream(
          {
            ...this.datastreamObj.properties
          },
          {
            ...this.datastreamObj.networkProperties,
            streamProtocol: value,
            mqttPrefix: this.mqttPrefix,
            endpointUrl: (value === 'mqtt') ? this.mqttUrl : this.endpointUrl
          })
      this.connect();
    },
    onChangeFormat(value) {
      this.reset();
      this.buildDataStream(
          {
            ...this.datastreamObj.properties
          },
          {
            ...this.datastreamObj.networkProperties,
            mqttPrefix: this.mqttPrefix,
          })
      const obsFilter = new ObservationFilter({
        format: value
      });
      this.connect(obsFilter);
    }
  }
}
</script>

<style scoped>
</style>
