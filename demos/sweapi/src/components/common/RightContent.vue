<template>
    <div v-if="content">
      <vue-json-pretty v-if="prettyJson"
          :path="'res'"
          :data="content"
          class="prettyjson"
          :style="heightVars">
      </vue-json-pretty>

      <div v-else-if="!Array.isArray(content)"
           class="noprettyjson"
           :style="heightVars" >
        <pre> {{ content }} </pre>
      </div>

      <div
          class="noprettyjson"
          :style="heightVars"
          v-else>
        <pre v-for="c in content" :key="content">
          {{ c }}
        </pre>
      </div>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { mapState } from 'vuex'

export default {
  name: "RightContent",
  components: {
    VueJsonPretty
  },
  computed: mapState({
    prettyJson: state => state.right.header.prettyJson,
    content: state => state.right.content,
    heightVars(state) {
      return {
        '--height': state.maxHeight - state.right.header.height + 'px'
      }
    }
  })
}
</script>

<style scoped>
.prettyjson, .noprettyjson {
  overflow: auto;
  height: var(--height);
}
</style>
