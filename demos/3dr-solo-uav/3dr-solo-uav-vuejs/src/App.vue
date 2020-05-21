<template>
  <div id="app">
    <Video />
    <Globe />
  </div>
</template>
<script>
  // @ is an alias to /src
import Globe from './components/Globe.vue';
import Video from './components/Video.vue';

export default {
  components: {
    Globe,
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
