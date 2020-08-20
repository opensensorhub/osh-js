<template>
  <div class="video-control">
    <VideoMenuSettings
        @settingsEvent="onSettingsEvent"
    ></VideoMenuSettings>
    <a class="control-btn">
        <i class="fa fa-expand" v-on="{click: toggleExpand}" v-if="!expand"></i>
        <i class="fa fa-compress" v-on="{click: toggleExpand}"  v-else></i>
    </a>
<!--    <a class="control-btn control-btn-settings"><i class="fa fa-cog"></i></a>-->
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
    onSettingsEvent(item) {
      this.$emit('settingsEvent', item);
    }
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
