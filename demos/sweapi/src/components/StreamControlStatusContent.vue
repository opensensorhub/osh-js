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
            v-model="streamProtocol"
            @change="changeStreamProtocol"
        ></v-select>
      </v-col>
    </v-row>
    <slot v-if="contents.length > 0">
      <vue-json-pretty :path="'res'" :data="contents" v-if="prettyJson"></vue-json-pretty>
      <div class="noprettyjson" v-else>
        <pre v-for="content in contents" :key="content">
          {{ content }}
        </pre>
      </div>
    </slot>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";

export default {
  name: "StreamControlStatusContent",
  props: [
    'control','nodeId','url'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      prettyJson: true,
      streamProtocol: 'ws',
      contents: [],
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
  methods: {
    connect() {
      const that = this;
      this.control.streamStatus(new ControlFilter({}), function (obs) {
        that.items[obs.command] = obs;
        that.contents = [];
        for(let key in that.items) {
          that.contents.push(that.items[key]);
        }
      });
    },
    disconnect() {
      if(this.control._network.stream.connector) {
        this.control._network.stream.connector.disconnect();
      }
    },
    changeStreamProtocol(value) {
      this.streamProtocol = value;
      this.disconnect();
      if(value === 'ws') {
        this.control.setStreamProtocol(value, 'arraybuffer');
      } else {
        // mqtt
        this.control.setStreamProtocol(value, 'arraybuffer', {
          endpointUrl: this.url
        });
      }

      this.connect();
    },
  }
}
</script>

<style scoped>

</style>
