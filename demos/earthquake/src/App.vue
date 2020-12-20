<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <Map
            :datasource="datasource"></Map>
      </v-app>
    </v-app>
  </div>
</template>

<script>

import './assets/app.css';
import Map from './components/MapColumn.vue';
import Worker from './workers/csvloader.worker.js';
import EQDataSource from "./js/EQDataSource";

export default {
  name: 'App',
  components: {
    Map
  },
  props: {
    source: String,
  },
  data: function () {
    return {
      datasource: null
    }
  },
  mounted() {
    const TOPIC_NAME = 'eq-topic-data';

    this.datasource = new EQDataSource('EQ data',{
      name: 'EQ',
      protocol: 'topic',
      topicName: TOPIC_NAME,
      batchSize: 5000
    });

    let worker = new Worker();
    worker.postMessage({
      message: 'load',
      topic: TOPIC_NAME
    });

    this.datasource.connect();
  },
}
</script>

<style>
</style>
