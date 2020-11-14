<template>
    <iframe :src="htmlPath" id="toto" v-if="htmlPath">
    </iframe>
</template>

<script>
export default {
  name: 'LazyLoadCode',
  props: ['path'],
  data() {
    return {
      htmlPath:null,
    }
  },
  mounted() {
    this.htmlPath = this.path;
  }
}
</script>
<style scoped>
</style>
