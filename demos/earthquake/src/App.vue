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
import TimeRangeSlider from './components/TimeRangeSlider';
import File from 'osh-js/core/datasource/File';

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

    const NB_FILES = 250;
    const files = [];

    for(let i=1;i <= NB_FILES;i++) {
      files.push('./data/earthquakes.' + i + '.csv');
    }

    this.datasource = new File('EQ data',{
      paths: files,
      batchSize: 5000
    });

    this.datasource.connect();

    this.datasource.onDisconnect().then(() => this.loaded = true);

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
