<template>
  <div class="documentation-load">
    <details>
      <summary>
        API Reference
      </summary>
      <iframe
          :src="$withBase(htmlPath)"
          class="iframe-class" v-if="htmlPath"/>
    </details>
  </div>
</template>

<script>
export default {
  name: 'DocumentationLoad',
  props: ['path'],
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
<style scoped>
.documentation-load {
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 500;
}
.iframe-class {
  width: 100%;
  height: 500px;
  border: solid 1px lightgrey;
}

summary {
  cursor: pointer;
  outline: none;
  display: block;
  margin-bottom: 20px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  width: 135px;
}

summary:hover {
  color: rgba(255,112,49,1.0) ;
  transition: color 0.1s ease;
}

details {
  display: block;
  position: relative;
  background-color: #eee;
  border-radius: 2px;
}

details[open] {
  color: rgba(255,112,49,1.0) ;
}

details[open] summary ~ * {
  animation: open .2s ease-in-out;
}

@keyframes open {
  0% {opacity: 0; margin-top: -10px}
  100% {opacity: 1; margin-left: 0px}
}

</style>
