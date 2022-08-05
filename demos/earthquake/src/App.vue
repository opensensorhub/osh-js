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
import File from 'osh-js/ext/datasource/file/File.datasource';
import {EventType} from "../../../source/core/event/EventType";
import {Status} from "../../../source/core/connector/Status";

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

    const NB_FILES = 100;
    const files = [];

    for(let i=1;i <= NB_FILES;i++) {
      files.push('./data/earthquakes.' + i + '.csv');
    }

    this.datasource = new File('EQ data',{
      paths: files,
      batchSize: 50
    });

    this.datasource.connect();

    // this.datasource.onDisconnect().then(() => this.loaded = true);
    this.datasource.subscribe(message => {
      if(message.status === Status.DISCONNECTED) {
        this.loaded = true;
      }
    }, [EventType.STATUS]);

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
