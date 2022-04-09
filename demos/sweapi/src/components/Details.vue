<template>
  <div>
    <div class="header" :id="headerId">
      <v-container>
        <v-switch
            v-model="prettyJson"
            label="Pretty JSON"
        ></v-switch>
      </v-container>
    </div>
    <v-divider></v-divider>
    <slot v-if="details">
      <vue-json-pretty :path="'res'" :data="details" v-if="prettyJson" class="prettyjson" :style="heightVar"></vue-json-pretty>
      <div class="noprettyjson" :style="heightVar" v-else>
        <pre> {{ details }} </pre>
      </div>
    </slot>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {randomUUID} from "../../../../source/core/utils/Utils";

export default {
  name: "Details",
  components: {
    VueJsonPretty,
  },
  props: [
    'details', 'maxHeight'
  ],
  data() {
    return {
      headerId: randomUUID(),
      prettyJson: true,
      heightVar:0
    }
  },
  computed: {

  },
  mounted() {
    this.heightVar = this.heightVars();
  },
  methods: {
    heightVars() {
      const headerHeight = document.getElementById(this.headerId).offsetHeight;
      this.height = this.maxHeight - headerHeight;
      // console.log(document.getElementById(this.headerId))
      // this.height = 50;
      return {
        '--height': this.height + 'px'
      }
    }
  }
}
</script>

<style scoped>
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
