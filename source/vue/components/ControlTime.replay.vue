<template>
  <div class="control-time">
    <span v-html=htmlCurrentTime></span>
    <span style="padding:0 10px 0 10px">/</span>
    <span v-html=htmlEndTime></span>
  </div>
</template>

<script>
export default {
  name: "ControlTimeReplay",
  props: ['htmlCurrentTime', 'htmlEndTime'],
}
</script>

<style scoped>
.control .control-time {
  display: flex;
  width: 150px;
}
</style>
