<template>
  <div class="video-control">
    <a class="control-btn">
        <slot  v-if="!expand">
          <i class="fa fa-expand" v-on="{click: toggleExpand}"></i>
        </slot>
        <slot v-else>
          <i class="fa fa-compress" v-on="{click: toggleExpand}"></i>
        </slot>
    </a>
<!--    <a class="control-btn control-btn-settings"><i class="fa fa-cog"></i></a>-->
    <VideoMenuSettings></VideoMenuSettings>
  </div>
</template>

<script>
import {isDefined, randomUUID} from "../../osh/utils/Utils";
import VideoMenuSettings from "./VideoMenuSettings.vue";

export default {
  name: "VideoControl",
  components: {VideoMenuSettings},
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

  .control-btn-settings {
    float: left;
  }

  .video-control .control-btn {
    padding: 0px 15px 0px 5px
  }
</style>
