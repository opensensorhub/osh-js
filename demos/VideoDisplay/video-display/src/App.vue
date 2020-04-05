<template>
  <div id="app">
    <Map />
  </div>
</template>
<script>
  // @ is an alias to /src
import Map from '@/components/Map.vue';

export default {
  components: {
    Map
  }
};
</script>
<style>
  body {
    overflow-x: hidden;
    margin:0;
  }
</style>
