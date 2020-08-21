<template>
  <div class="video-control">
    <MenuSettings
        @settingsEvent="onSettingsEvent"
        :items="resolutions"
    ></MenuSettings>
    <a class="control-btn">
        <i class="fa fa-expand" v-on="{click: toggleExpand}" v-if="!expand"></i>
        <i class="fa fa-compress" v-on="{click: toggleExpand}"  v-else></i>
    </a>
  </div>
</template>

<script>
import {isDefined, randomUUID} from "../../../osh/utils/Utils";
import MenuSettings from "../MenuSettings.vue";

export default {
  name: "VideoControl",
  components: {MenuSettings},
  props: {
    dataSource: {
      type: Object
    },
    codec: {
      type: String,
      default: () => 'H264'
    },
    expand: {
      type: Boolean,
      default: () => false
    },
    resolutions: {
      type: Object,
      default() {
        return {
          '1080p': {
            resolution: {
              width: 1920,
              height: 1080
            },
            bitrate: 1000 * 8
          },
          '720p': {
            resolution: {
              width: 1280,
              height: 720
            },
            bitrate: 800 * 8
          },
          '360p': {
            resolution: {
              width: 640,
              height: 360
            },
            bitrate: 400 * 8
          },
          '288p': {
            resolution: {
              width: 512,
              height: 288
            },
            bitrate: 200 * 8
          },
          '72p': {
            resolution: {
              width: 128,
              height: 72
            },
            bitrate: 100 * 8
          },
          'low': {
            resolution: {
              width: 128,
              height: 72
            },
            bitrate: 30 * 8
          }
        }
      }
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
      this.$emit('expand');
    },
    onSettingsEvent(item) {
      this.updateResolution(item);
    },
    updateResolution(item) {
      // check for extra properties
      let extraProps = {};
      extraProps['bitrate'] = item.bitrate;
      //TOOD: compute scale depending on size
      extraProps['width'] = item.resolution.width;
      extraProps['height'] = item.resolution.height;

      if(Object.keys(extraProps).length > 0) {
        this.dataSource.updateUrl(
            {
              encoding: extraProps,
              responseFormat: 'video/' + this.codec.toUpperCase()
            });
      }
    }
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>
  .video-control {
    position: relative;
    bottom: 0px;
    display:flex;
    align-items: baseline;
    padding: 5px 0 0 0;
    color: #fff;
  }

  .control-btn-settings {
    float: left;
  }

  .video-control .control-btn {
    padding: 0px 15px 0px 5px
  }
</style>

<style>
.video-control .v-btn.v-size--default {
  font-size: 1.0rem!important;
}
</style>
