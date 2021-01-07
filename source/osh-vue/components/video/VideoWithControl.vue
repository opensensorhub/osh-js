<template>
  <div data-app class="main-video">
    <slot v-if="!dialog" class="no-dialog" >
      <div :id="id" class="video-container">
      </div>
      <div class="video-control-container" >
        <Control
            :dataSource="dataSource"
            :showDataSourceActions="true"
            @event='onControlEvent'
            :backward=5
            :forward=5
        ></Control>
        <VideoControl
            :dataSource="dataSource"
            :resolutions="resolutions"
            :codec="codec"
            @expand='toggleDialog'
            :expand='false'
        ></VideoControl>
      </div>
    </slot>
    <slot name="modal" dark="true" max-width="1280" width="1280" v-else>
      <v-dialog
              v-model="dialog"
              persistent
      >
        <div :id="id" class="dialog-container video-container">
        </div>
        <div class="video-control-container">
          <Control
              :dataSource="dataSource"
              @event='onControlEvent'
          ></Control>
          <VideoControl
              :dataSource="dataSource"
              :resolutions="resolutions"
              :codec="codec"
              expand
              @expand='toggleDialog'
              :backward=5
              :forward=5
          ></VideoControl>
        </div>
      </v-dialog>
    </slot>
  </div>
</template>
<script>
  import FFMPEGView from "osh/ui/view/video/FFMPEGView.js";
  import {randomUUID} from "osh/utils/Utils.js";
  import Control from '../Control.vue';
  import VideoControl from './VideoControl.vue';
  import DataLayer from "osh/ui/layer/DataLayer";

  export default {
    name: "Video",
    components: {
      Control,
      VideoControl
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
        default: () => {}
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
      },
      toggleDialog() {
        this.dialog = !this.dialog;
      },
      initView(id) {
        if (this.view !== null) {
          this.view.destroy();
        }

        this.view = new FFMPEGView({
          container: id,
          css: "video-h264",
          name: "Android Video",
          framerate: this.framerate,
          codec: this.codec,
          directPlay: false,
          showStats: this.showStats,
          showTime: this.showTime,
          layers: [
            new DataLayer({
              dataSourceId: this.dataSource.id
            })
          ]
        });
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

  .video-control-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0px 0px 0 0px;
  }

  .video-control {
    flex: auto;
  }

  .main-video {
    background: rgba(0,0,0,1.0);;
  }
</style>

<style>
.v-dialog {
  background: rgba(0,0,0,0.85);
  height: calc(100% - 30px) !important;
  width: 90% !important;
  overflow: hidden;
}

.v-dialog>* {
  width: auto !important;
}

.v-dialog .video-container {
  height: inherit;
}
.video-container .video-h264 > canvas, .video-container .video-h264.osh-view {
  width: inherit;
  height: inherit;
}

.v-dialog .video-container .video-h264 > canvas,
.v-dialog .video-container .video-h264.osh-view {
  width: inherit;
  height: 100%;
}

.video-container .video-h264 > canvas {
  margin: auto;
}

.v-dialog > .video-control-container > .control .buttons .actions{
  padding: 0;
}
</style>
