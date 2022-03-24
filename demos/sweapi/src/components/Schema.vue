<template>
  <!--div class="white--text jsonpre" v-else>
    <v-row align="center">
      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >
        <v-switch
            v-
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
            :items=formats
            label="Formats"
            dense
            full-width
            read-only
            v-model="selected"
            @change="changeFormat"
        ></v-select>
      </v-col>
    </v-row>
    <slot v-if="details">
      <vue-json-pretty :path="'res'" :data="details" v-if="prettyJson"></vue-json-pretty>
      <div class="noprettyjson" v-else>
        <pre> {{ details }}</pre>
      </div>
    </slot>
  </div-->
  <div class="white--text jsonpre" v-else>
    <div class="footer">
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
        ></v-select>
      </v-container>
    </div>
    <v-divider></v-divider>
    <slot v-if="content">
      <v-container>
        <vue-json-pretty :path="'res'" :data="content" v-if="prettyJson"></vue-json-pretty>
        <div class="noprettyjson" v-else>
          <pre> {{ content }} </pre>
        </div>
      </v-container>
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

export default {
  name: "Schema",
  components: {
    VueJsonPretty,
  },
  props: [
    'objCompliantSchema'
  ],
  data() {
    return {
      prettyJson: true,
      selected: 'application/om+json',
      formats: ['application/om+json'],
      jsonParser: new SweApiFetchGenericJson(),
      content: undefined
    }
  },
  mounted() {
    this.formats = this.objCompliantSchema.properties.formats;
    this.displaySchema();
  },
  methods: {
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

.footer {
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

</style>
