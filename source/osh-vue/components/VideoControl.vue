<template>
  <div class="video-control">
    <a id="fast-back-btn" class="control-btn">
        <slot  v-if="!expand">
          <i class="fa fa-expand" v-on="{click: toggleExpand}"></i>
        </slot>
        <slot v-else>
          <i class="fa fa-compress" v-on="{click: toggleExpand}"></i>
        </slot>
    </a>
  </div>
</template>

<script>
import {isDefined, randomUUID} from "../../osh/utils/Utils";

export default {
  name: "VideoControl",
  components: {},
  props: {
    expand: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      id: randomUUID()
    };
  },
  mounted() {
  },
  methods: {
    toggleExpand() {
      this.$emit('event', !this.expand ? 'expand': 'compress');
    },
    on(eventName) {
      this.$emit('event', 'expand');
    },
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>
  .video-control {
    position: relative;
    bottom: 0px;
  }
</style>
