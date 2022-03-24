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
        <v-select
            :items= formats
            label="Formats"
            dense
            read-only
            @change="changeFormat"
        ></v-select>
      </v-col>
    </v-row>
    <vue-json-pretty :path="'res'" :data="details" v-if="prettyJson"></vue-json-pretty>
    <div class="noprettyjson" v-else>
      <pre> {{ details }}</pre>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: "DatastreamSchema",
  components: {
    VueJsonPretty,
  },
  props: [
    'details','availableFormats'
  ],
  data() {
    return {
      prettyJson: true,
      formats: this.availableFormats
    }
  },
  mounted() {
    console.log('ici')
  },
  methods : {
    changeFormat(value) {

    }
  }
}
</script>

<style scoped>

</style>
