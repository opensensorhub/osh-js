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
          class="select"
      >
        <v-select
            :items=formats
            label="Formats"
            dense
            full-width
            read-only
            v-model="selected"
            @change="displaySchema"
            class="disableCaret"
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
import SweApiFetchGenericJson
  from "../../../../source/core/datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";
import DataStreamFilter from "../../../../source/core/sweapi/datastream/DataStreamFilter";
import Control from "../../../../source/core/sweapi/control/Control";
import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";
import DataStream from "../../../../source/core/sweapi/datastream/DataStream";
import {randomUUID} from "../../../../source/core/utils/Utils";

export default {
  name: "Schema",
  components: {
    VueJsonPretty,
  },
  props: [
    'objCompliantSchema', 'maxHeight'
  ],
  data() {
    return {
      headerId: randomUUID(),
      prettyJson: true,
      selected: 'application/om+json',
      formats: ['application/om+json'],
      jsonParser: new SweApiFetchGenericJson(),
      content: undefined,
      heightVar: 0
    }
  },
  mounted() {
    this.heightVar = this.heightVars();
    this.formats = this.objCompliantSchema.properties.formats;
    this.displaySchema();
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
    },
    displaySchema() {
      const that = this;
      let filter;
      //TODO: better way to do this??
      if(this.objCompliantSchema instanceof DataStream) {
        filter = new DataStreamFilter({
          obsFormat: this.selected
        });
      } else if(this.objCompliantSchema instanceof Control) {
        filter = new ControlFilter({
          obsFormat: this.selected
        });
      }
      this.objCompliantSchema.getSchema(filter).then(schema => {
        that.content = that.jsonParser.parseData(schema);
      });
    }
  }
}
</script>

<style scoped>
.v-select__selections input {
  width: 0 !important;
  min-width: 0 !important;
}

.header {
  display: flex;
  justify-content: space-between;
}

.select {
  max-width: 400px;
  display: flex;
  justify-content: end;
  vertical-align: middle;
  align-self: center;
}

.prettyjson, .noprettyjson {
  overflow: auto;
  height: var(--height);
}

.disableCaret {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}
</style>
