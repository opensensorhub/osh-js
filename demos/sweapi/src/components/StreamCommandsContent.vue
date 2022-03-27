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
            v-model="streamProtocol"
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

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";
import {randomUUID} from "../../../../source/core/utils/Utils";

export default {
  name: "StreamCommandsContent",
  props: [
    'control','nodeId','url','maxHeight'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      headerId: randomUUID(),
      prettyJson: true,
      streamProtocol: 'ws',
      content: undefined,
      heightVar: 0
    }
  },
  mounted() {
    this.heightVar = this.heightVars();
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
    heightVars() {
      const headerHeight = document.getElementById(this.headerId).offsetHeight;
      this.height = this.maxHeight - headerHeight;
      return {
        '--height': this.height + 'px'
      }
    },
    connect() {
      const that = this;
      this.control.streamCommands(new ControlFilter({}), function (obs) {
        that.content = obs;
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
