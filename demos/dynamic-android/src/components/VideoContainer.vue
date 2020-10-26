<template>
  <div id="video-container" class="video-container-vue">
    <video-card
        v-for="dataSource in dataSources"
        :key="dataSource.id"
        :dataSource="dataSource"
    >
    </video-card>
  </div>
</template>

<script>
import VideoCard from "./VideoCard";
export default {
  name: "VideoContainer",
  components: {VideoCard},
  props: ['dataSources']
}
</script>

<style scoped>
  .video-container-vue {
    z-index: 10 !important;
    border-radius: 4px !important;
    padding:10px;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: rgba(0,0,0,0.5) !important;
    bottom: 0px;
    left: 270px;
    transform: translate(-50%, -20px);
  }


</style>
<style>
  div.v-overlay+div.v-application--wrap .video-container-vue {
    opacity: 1.0;
  }
</style>
