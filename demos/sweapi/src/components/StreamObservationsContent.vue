<template>
  <div class="white--text jsonpre" v-else>
    <v-row align="center">
      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >
        <v-switch
            v-model="prettyJson"
            label="Pretty JSON"
        ></v-switch>
      </v-col>

      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >

        <v-select
            :items='["ws", "mqtt"]'
            label="Protocol"
            dense
            read-only
            v-model="dataStreamProtocol"
            @change="changeStreamProtocol"
        ></v-select>
      </v-col>
    </v-row>
    <slot v-if="content">
      <vue-json-pretty :path="'res'" :data="content" v-if="prettyJson"></vue-json-pretty>
      <div class="noprettyjson" v-else>
        <pre> {{ content }}</pre>
      </div>
    </slot>
  </div>
</template>

<script>
import ObservationFilter from "../../../../source/core/sweapi/observation/ObservationFilter";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import DataStream from "../../../../source/core/sweapi/datastream/DataStream";

export default {
  name: "StreamObservationsContent",
  props: [
    'datastreamProperties', 'datastreamNetworkProperties', 'datastreamNodeId', 'mqttPrefix', 'mqttUrl'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      prettyJson: true,
      content: undefined,
      dataStreamProtocol: 'ws',
      datastream: undefined
    }
  },
  mounted() {
    this.dataStreamProtocol = this.datastreamNetworkProperties.streamProtocol;
    this.buildDataStream(this.datastreamProperties, this.datastreamNetworkProperties);
    this.connect();
  },
  async destroyed() {
    console.log('destroyed')
    // make it async
    const that = this;
    new Promise((resolve, reject) => {
      that.reset();
    });
  },
  methods: {
    buildDataStream(dataStreamProperties, dataStreamNetworkProperties) {
      this.datastream = new DataStream(dataStreamProperties, dataStreamNetworkProperties);
    },
    connect() {
      const that = this;
      this.datastream.streamObservations(new ObservationFilter({}), function (obs) {
        that.content = obs;
      });
    },
    reset() {
      if (this.datastream._network.stream.connector) {
        this.datastream._network.stream.connector.disconnect();
        this.datastream._network.stream.connector.reset();
      }
    },
    changeStreamProtocol(value) {
      this.datastream._network.stream.connector.disconnect();
      this.datastream._network.stream.connector.reset();
      this.buildDataStream(
          {
            ...this.datastreamProperties
          },
          {
            ...this.datastreamNetworkProperties,
            streamProtocol: value,
            mqttPrefix : this.mqttPrefix,
            endpointUrl:  (value === 'mqtt') ? this.mqttUrl : this.datastreamNetworkProperties.endpointUrl
          })
      this.connect();
    },
  }
}
</script>

<style scoped>

</style>
