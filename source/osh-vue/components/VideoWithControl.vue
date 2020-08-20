<template>
  <div data-app class="main-video">
    <div v-if="!dialog">
      <div :id="id" class="video-container">
      </div>
      <Control
          :dataSource="dataSource"
          @event='onControlEvent'
          :showDataSourceActions="true"
          @settingsEvent="onSettingsEvent"
      ></Control>
    </div>
    <div name="modal" dark="true" max-width="1280" width="1280" v-else>
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
    </div>
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
      resolutions: {
        type: Object,
        default () {
          return {
            '1080p': {
              resolution: {
                width: 1920,
                height: 1080
              },
              bitrate: 1000 * 8
            },
            '720p' : {
              resolution: {
                width: 1280,
                height: 720
              },
              bitrate: 800 * 8
            },
            '480p': {
              resolution: {
                width: 854,
                height: 480
              },
              bitrate: 500 * 8
            },
            '360p': {
              resolution: {
                width: 640,
                height: 360
              },
              bitrate: 400 * 8
            },
            '240p': {
              resolution: {
                width: 426,
                height: 240
              },
              bitrate: 300 * 8
            },
            '144p': {
              resolution: {
                width: 196,
                height: 144
              },
              bitrate: 100 * 8
            },
            'low144p': {
              resolution: {
                width: 196,
                height: 144
              },
              bitrate: 20 * 8
            }
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
      onSettingsEvent(event) {
        if(event.type === 'resolution') {
          this.updateResolution(event.value);
        }

      },
      onControlEvent(eventName) {
        if(eventName === 'expand' || eventName === 'compress') {
          this.toggleDialog();
        }
      },
      toggleDialog() {
        this.dialog = !this.dialog;
      },
      updateResolution(resolution) {
        // check for extra properties
        let extraProps = {};
        extraProps['bitrate'] = this.resolutions[resolution].bitrate;
        //TOOD: compute scale depending on size
        extraProps['width'] = this.resolutions[resolution].resolution.width;

        if(Object.keys(extraProps).length > 0) {
          this.dataSource.updateUrl(
              {
                encoding: extraProps,
                responseFormat: 'video/' + this.codec.toUpperCase()
              });
        }
      },
      initView(id) {
        if (this.view !== null) {
          this.view.destroy();
        }

        this.view = new FFMPEGView(id, {
          dataSourceId: this.dataSource.id,
          css: "video-h264",
          name: "Android Video",
          framerate: this.framerate,
          codec: this.codec,
          directPlay: false,
          showStats: this.showStats,
          showTime: this.showTime
        });

        if (!this.dataSource.connected) {
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
