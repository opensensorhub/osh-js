<template>
  <div class="control-time">
    <span v-html=currentTime></span>
    <span style="padding:0 10px 0 10px">/</span>
    <span v-html=endTime></span>
  </div>
</template>

<script>
export default {
  name: "ControleTimeReplay",
  props: ['currentTime', 'endTime'],
}
</script>

<style scoped>
.control .control-time {
  display: flex;
  width: 150px;
}
</style>
