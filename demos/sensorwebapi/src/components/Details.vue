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
  name: "Details",
  components: {
    VueJsonPretty,
  },
  props: [
    'details',
  ],
  data() {
    return {
      prettyJson: true
    }
  },
}
</script>

<style scoped>

</style>
