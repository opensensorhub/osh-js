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
import SweApiFetchStreamJsonParser
  from "../../../../source/core/datasource/swe/parser/SweApiFetchStreamJson.parser";
import ObservationFilter from "../../../../source/core/sweapi/api/observation/ObservationFilter";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: "StreamObservationsContent",
  props: [
    'datastream','datastreamNodeId'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      prettyJson: true,
      dataStreamProtocol: 'ws',
      content: undefined,
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
  methods: {
    connect() {
      const parser = new SweApiFetchStreamJsonParser();
      this.datastream.streamObservations(new ObservationFilter(), function (obs) {
        this.content = parser.parseData(obs);
      }.bind(this));
    },
    disconnect() {
      if(this.datastream._network.stream.connector) {
        this.datastream._network.stream.connector.disconnect();
      }
    },
    changeStreamProtocol(value) {
      this.dataStreamProtocol = value;
      this.disconnect();
      if(value === 'ws') {
        this.datastream.setStreamProtocol(value, 'arraybuffer');
      } else {
        // mqtt
        this.datastream.setStreamProtocol(value, 'arraybuffer', {
          endpointUrl: 'ogct17.georobotix.io:8483'
        });
      }

      this.connect();
    },
  }
}
</script>

<style scoped>

</style>
