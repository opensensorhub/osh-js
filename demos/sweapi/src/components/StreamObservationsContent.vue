<template>
  <div>
    <div class="header" :id="headerId">
      <v-container>
        <v-switch
            v-model="prettyJson"
            label="Pretty JSON"
        ></v-switch>
      </v-container>
      <v-container
        class="protocol-container"
      >
        <v-select
            :items='["ws", "mqtt"]'
            label="Protocol"
            dense
            read-only
            v-model="dataStreamProtocol"
            @change="changeStreamProtocol"
            class="protocol-select"
        ></v-select>
      </v-container>
    </div>
    <v-divider></v-divider>
    <slot v-if="content">
      <vue-json-pretty :path="'res'" :data="content" v-if="prettyJson" class="prettyjson" :style="heightVar"></vue-json-pretty>
      <div class="noprettyjson" :style="heightVar" v-else>
        <pre> {{ content }} </pre>
      </div>
    </slot>
  </div>
</template>

<script>
import ObservationFilter from "../../../../source/core/sweapi/observation/ObservationFilter";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import DataStream from "../../../../source/core/sweapi/datastream/DataStream";
import {randomUUID} from "../../../../source/core/utils/Utils";

export default {
  name: "StreamObservationsContent",
  props: [
    'datastreamProperties', 'datastreamNetworkProperties', 'datastreamNodeId', 'mqttPrefix', 'mqttUrl', 'maxHeight'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      headerId: randomUUID(),
      prettyJson: true,
      content: undefined,
      dataStreamProtocol: 'ws',
      datastream: undefined,
      heightVar: 0
    }
  },
  mounted() {
    this.heightVar = this.heightVars();
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
    heightVars() {
      const headerHeight = document.getElementById(this.headerId).offsetHeight;
      this.height = this.maxHeight - headerHeight;
      return {
        '--height': this.height + 'px'
      }
    },
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
            mqttPrefix: this.mqttPrefix,
            endpointUrl: (value === 'mqtt') ? this.mqttUrl : this.datastreamNetworkProperties.endpointUrl
          })
      this.connect();
    },
  }
}
</script>

<style scoped>
.protocol-select {
  max-width: 200px;
}

.protocol-container {
  display: flex;
  align-self: center;
  justify-content: end;
}

.header {
  display: flex;
  justify-content: space-between;
}

.header > div {
  margin-left: 0;
}

.prettyjson, .noprettyjson {
  overflow: auto;
  height: var(--height);
}
</style>
