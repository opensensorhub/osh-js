<template>
  <div id="app">
    <Video />
    <Map />
  </div>
</template>
<script>
  // @ is an alias to /src
import Map from './components/Map.vue';
import Video from './components/Video.vue';

export default {
  components: {
    Map,
    Video
  }
};
</script>
<style>
  body {
    overflow-x: hidden;
    margin:0;
  }
</style>
