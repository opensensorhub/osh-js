<template>
  <div data-app class="main-video">
    <slot v-if="!dialog">
      <div :id="id" class="video-container">
      </div>
      <Control :dataSource="dataSource" @event='onControlEvent' :showDataSourceActions="true"></Control>
    </slot>
    <slot name="modal" dark="true" max-width="1280" width="1280" v-else>
      <v-dialog
              v-model="dialog"
              persistent
      >
        <div :id="id" class="dialog-container">
        </div>
        <Control
            :dataSource="dataSource"
            @event='onControlEvent'
            expand
        ></Control>
      </v-dialog>
    </slot>
  </div>
</template>
<script>
  import FFMPEGView from "osh/ui/view/video/FFMPEGView.js";
  import {randomUUID} from "osh/utils/Utils.js";
  import Control from 'osh-vue/components/Control.vue';

  export default {
    name: "Video",
    components: {
      Control
    },
    props: {
      dataSource: {
        type: Object
      },
      codec: {
        type: String,
        default: () => 'h264'
      },
      title: {
        type: String,
        default: () => 'Video'
      },
      modal: {
        type: Boolean,
        default: () => false
      },
      showStats: {
        type: Boolean,
        default: () => true
      },
      showTime: {
        type: Boolean,
        default: () => true
      },
      frameRate: {
        type: Number,
        default: () => 25
      },
      options: {
        type: Object,
        default() {
          return {
            top: '100',
            left: '200'
          }
        }
      },
      encoding: {
        type: Object,
        default () {
          return {
            bitrate: {
              min: 100 * 8,
              max: 500 * 8,
              use: false
            },
            scale: {
              min: 0.5,
              max: 1.0,
              use: false
            },
            responseFormat: 'video/H264'
          }
        }
      }
    },
    data: function () {
      return {
        id: randomUUID(),
        view: null,
        dialog: false
      };
    },
    watch: {
      dialog(newValue) {
        this.$emit('toggle-dialog', newValue);
      }
    },
    destroyed() {
      this.view.destroy();
    },
    updated() {
      this.initView(this.id);
    },
    mounted() {
      // build video
      // show it in video view
      this.initView(this.id);
    },
    methods: {
      onControlEvent(eventName) {
        if(eventName === 'expand' || eventName === 'compress') {
          this.toggleDialog();
        }
      },
      toggleDialog() {
        this.dialog = !this.dialog;
      },
      initView(id) {
        if (this.view !== null) {
          this.view.destroy();
        }

        // check for extra properties
        let extraProps = {};
        if(this.encoding.bitrate.use) {
          if(!this.dialog) {
            extraProps['bitrate'] = this.encoding.bitrate.min;
          } else {
            extraProps['bitrate'] = this.encoding.bitrate.max;
          }
          extraProps['responseFormat'] = this.encoding.responseFormat;
        }
        if(this.encoding.scale.use) {
          if(!this.dialog) {
            extraProps['scale'] = this.encoding.scale.min;
          } else {
            extraProps['scale'] = this.encoding.scale.max;
          }
        }

        this.view = new FFMPEGView(id, {
          dataSourceId: this.dataSource.id,
          css: "video-h264",
          name: "Android Video",
          framerate: this.framerate,
          codec: this.codec,
          directPlay: true,
          showStats: this.showStats,
          showTime: this.showTime
        });

        if (!this.dataSource.connected) {
          if(Object.keys(extraProps).length > 0) {
            this.dataSource.disconnect();
            extraProps['responseFormat'] = this.encoding.responseFormat;
            this.dataSource.updateUrl({encoding: extraProps});
          }
          this.dataSource.connect();
        }
      }
    }
  }
</script>

<!-- optional dialog styles, see example -->
<style scoped>

  /** Place the control bar rigth to the bottom **/

  .video-container {
    position: relative;
  }

  .dialog-container {
    padding:12px;
    position: relative;
  }

  .dialog-container > .control {
    width: calc(100% - 24px); /* consider the above padding of 12 px */
    bottom: 12px; /* consider the above padding of 12 px */
  }

</style>

<style>
  .main-video {
    background: rgba(0,0,0,1.0);;
  }
  .v-dialog {
    width: auto !important;
    background: rgba(0,0,0,0.85);
    overflow-x: hidden ;
  }

  .video-h264 > canvas {
    width: 100%;
  }

  .container.dialog-container > div.video-h264 canvas {
    max-height: 100%;
    position: relative;
  }

  .dialog-container > .control {
    position: relative;
    z-index: 9999;
  }
</style>
