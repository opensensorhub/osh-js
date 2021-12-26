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
import ObservationFilter from "../../../../source/core/sensorwebapi/api/observation/ObservationFilter";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import SensorWebApiFetchJsonParser from "../../../../source/core/datasource/swe/parser/SweApiFetchJson.parser";

export default {
  name: "SearchObservationsContent",
  props: [
    'datastream','datastreamNodeId'
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
      collection: undefined,
      cache: {}
    }
  },
  mounted() {
    this.collection = this.datastream.searchObservations(new ObservationFilter(), 10, new SensorWebApiFetchJsonParser());
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
        let asyncCollection = async () => {
          const page = await this.collection.nextPage(value - 1);
          this.content = page;
          this.cache[value]= page;
        };
        asyncCollection();
      } else {
        this.content = this.cache[value];
      }
    },
    connect() {
      let asyncCollection = async () => {
        const page = await this.collection.nextPage();
        this.content = page;
        this.cache[1]= page;
      };
      asyncCollection();
    },
    disconnect() {
      this.active = false;
    },
  }
}
</script>

<style scoped>

</style>
