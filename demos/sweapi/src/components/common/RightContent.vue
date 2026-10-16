<template>
    <div v-if="content">
      <slot v-if="isJson">
        <vue-json-pretty v-if="prettyJson"
                         :path="'res'"
                         :data="content"
                         class="prettyjson"
                         :style="heightVars">
        </vue-json-pretty>
        <div
            class="noprettyjson"
            :style="heightVars"
            v-else>
          <pre>{{content}}</pre>
        </div>
      </slot>
      <slot v-else>
          <div v-if="!Array.isArray(content)"
               class="noprettyjson"
               :style="heightVars" >
            <pre>{{content}}</pre>
          </div>
          <div
              class="noprettyjson"
              :style="heightVars"
              v-else>
              <pre v-for="(item, index) in content" :key="index">{{item}}</pre>
          </div>
      </slot>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { mapState } from 'vuex'

const beautifiedXmlText = new XmlBeautify();
export default {
  name: "RightContent",
  components: {
    VueJsonPretty
  },
  computed: mapState({
    prettyJson: state => state.right.header.prettyJson,
    content: state => {
      if(state.right.contentType === 'application/swe+xml') {
        return beautifiedXmlText.beautify(state.right.content,
            {
              indent: "  ",  //indent pattern like white spaces
              useSelfClosingElement: true //true:use self-closing element when empty element.
            });
      } else {
        return state.right.content;
      }
    },
    contentType: state => state.right.contentType,
    isJson: state => {
      return true
    },
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
