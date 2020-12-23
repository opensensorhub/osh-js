<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <Map
            :datasource="datasource">
        </Map>
        <TimeRangeSlider
          class="time-range-slider"
          :loaded="loaded"
        />
      </v-app>
    </v-app>
  </div>
</template>

<script>

import './assets/app.css';
import Map from './components/MapColumn.vue';
import Worker from './workers/csvloader.worker.js';
import EQDataSource from "./js/EQDataSource";
import TimeRangeSlider from './components/TimeRangeSlider';

export default {
  name: 'App',
  components: {
    Map, TimeRangeSlider
  },
  props: {
    source: String,
  },
  data: function () {
    return {
      datasource: null,
      loaded: false
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

    const that = this;
    worker.onmessage = (event) => {
      if(event.data.message === 'done'){
        that.loaded = true;
      }
    }
    this.datasource.connect();
  },
}
</script>

<style>
.time-range-slider {
  z-index: 99999;
  position: absolute;
  bottom: 0;
}
</style>
