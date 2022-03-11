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
    </v-row>
    <slot v-if="content">
      <v-pagination
          v-model="pagination.page"
          :length="pagination.total / 5"
          :total-visible="pagination.visible"
          @input="setPage"
      ></v-pagination>
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
import SensorWebApiFetchJsonParser from "../../../../source/core/datasource/sweapi/parser/json/SweApiFetchJson.parser";
import SweApiFetchGenericJson
  from "../../../../source/core/datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";

export default {
  name: "SearchContent",
  props: [
    'collection','nodeId'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      prettyJson: true,
      dataStreamProtocol: 'http',
      content: undefined,
      active: true,
      pagination: {
        page: 1,
        total: 100,
        perPage: 5,
        visible: 6,
        current: 1
      },
      cache: {}
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
    setPage(value) {
      if(!(value in this.cache)) {
       this.collection.nextPage(value - 1).then(page => {
          this.content = page;
          this.cache[value]= page;
       });
      } else {
        this.content = this.cache[value];
      }
    },
    connect() {
      this.collection.nextPage().then(page => {
        this.content = page;
        this.cache[1]= page;
      });
    },
    disconnect() {
      this.active = false;
    },
  }
}
</script>

<style scoped>

</style>
