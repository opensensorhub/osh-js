<template>
  <div
      class="text-h6 grey--text text--lighten-1 font-weight-light progress"
      style="align-self: center;"
  >
    <v-progress-circular
        indeterminate
        :size="100"
        color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "ContentLoading"
}
</script>

<style scoped>

</style>
