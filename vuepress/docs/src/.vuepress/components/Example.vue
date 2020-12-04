<template>
    <iframe
        :src="$withBase(htmlPath)"
        :style="style"
        v-if="htmlPath"/>
</template>

<script>
export default {
  name: 'Example',
  props: ['path','style'],
  data() {
    return {
      htmlPath: null
    }
  },
  mounted() {
    this.htmlPath = this.path;
  }
}
</script>
