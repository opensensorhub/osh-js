<template>
  <div data-app class="main-video">
    <slot v-if="!dialog">
      <slot v-if="draggable">
        <dialog-drag
                id="drag-window-1"
                :title="title"
                class="resizable"
                :options="options">
          <div :id="id" v-on="modal ? {click: toggleDialog } : {}" class="video-container">
          </div>
          <Control :dataSource="dataSource"></Control>
        </dialog-drag>
      </slot>
      <slot v-else>
        <div :id="id" v-on="modal ? {click: toggleDialog } : {}" class="video-container">
        </div>
        <Control :dataSource="dataSource"></Control>
      </slot>
    </slot>
    <slot name="modal" dark="true" max-width="1280" width="1280" v-else>
      <v-dialog
              v-model="dialog"
              v-on="modal ? {click: toggleDialog } : {}"
      >
        <div :id="id" v-on="modal ? {click: toggleDialog } : {}" class="dialog-container">
        </div>
        <Control :dataSource="dataSource"></Control>
      </v-dialog>
    </slot>
  </div>
</template>
<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<script>
  import DialogDrag from 'vue-dialog-drag';
  import FFMPEGView from "osh/ui/view/video/FFMPEGView.js";
  import {randomUUID} from "osh/utils/Utils.js";
  import Control from 'osh-vue/components/Control.vue';

  export default {
    name: "Video",
    components: {
      DialogDrag,
      Control
    },
    // props: ['dataSource', 'codec', 'draggable', 'title', 'modal'],
    props: {
      dataSource: {
        type: Object
      },
      codec: {
        type: String,
        default: () => 'h264'
      },
      draggable: {
        type: Boolean,
        default: () => false
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
              use: true
            },
            scale: {
              min: 0.5,
              max: 1.0,
              use: true
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

        if(Object.keys(extraProps).length > 0) {
          this.dataSource.disconnect();
          extraProps['responseFormat'] = this.encoding.responseFormat;
          this.dataSource.rebuildUrl(extraProps);
        }

        if (!this.dataSource.connected) {
          this.dataSource.connect();
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
      }
    }
  }
</script>

<!-- optional dialog styles, see example -->
<style scoped>
  .dialog-drag {
    overflow-y: hidden;
    border: 1px solid #5a5a5acc;
    border-radius: 4px;
    box-shadow: 0 0 7px #000000;
    background: #232323cc;
    width:500px;
  }

  .dialog-drag {
    z-index: 10;
  }

  .resizable {
    resize: both; /* Options: horizontal, vertical, both */
    overflow: hidden;
  }

  .dialog-drag {
    background: rgba(0,0,0,0.85);
  }

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
  .dialog-drag .dialog-header {
    padding: .45em 3.25em .45em 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: #fff;
    font-size: 1em;
    position: relative;
    text-align: left;
    width: auto;
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', arial, sans-serif;
  }

  .dialog-drag .dialog-header button.close {
    margin-right: 2px;
  }

  .dialog-drag .dialog-header button.pin {
    margin-bottom: 2px;
    margin-right: 5px;
  }
  .dialog-drag .dialog-body {
    padding: 0;
  }

  .v-dialog {
    width: auto !important;
    cursor: pointer;
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
