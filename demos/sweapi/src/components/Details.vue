<template>
  <div>
    <RightHeader></RightHeader>
    <v-divider></v-divider>
    <RightContent
    ></RightContent>
  </div>
</template>

<script>
import RightHeader from "./common/RightHeader.vue";
import RightContent from "./common/RightContent.vue";

export default {
  name: "Details",
  components: {
    RightHeader,
    RightContent
  },
  props: [
  ],
}
</script>

<style scoped>
</style>
