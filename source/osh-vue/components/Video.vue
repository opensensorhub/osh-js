<template>
  <div data-app>
    <slot v-if="!dialog">
      <slot v-if="draggable">
        <dialog-drag
                id="drag-window-1"
                :title="title"
                class="resizable"
                :options="options">
          <div :id="id" v-on="modal ? {click: toggleDialog } : {}" class="video-container"></div>
        </dialog-drag>
      </slot>
      <slot v-else>
        <div :id="id" v-on="modal ? {click: toggleDialog } : {}" class="video-container"></div>
      </slot>
    </slot>
    <slot name="modal" dark="true" max-width="1280" width="1280" v-else>
      <v-dialog
              v-model="dialog"
              v-on="modal ? {click: toggleDialog } : {}"
      >
        <v-container :id="id" v-on="modal ? {click: toggleDialog } : {}" class="dialog-container"></v-container>
      </v-dialog>
    </slot>
  </div>
</template>

<script>
    import DialogDrag from 'vue-dialog-drag';
    import FFMPEGView from "osh/ui/view/video/FFMPEGView.js";
    import {randomUUID} from "osh/utils/Utils.js";

    export default {
        name: "Video",
        components: {
            DialogDrag
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

                if(!this.dataSource.isConnected) {
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
<style src="../../../issues/184/node_modules/vue-dialog-drag/dist/vue-dialog-drag.css"></style>

<!-- optional dialog styles, see example -->
<style scoped>
  .dialog-drag {
    z-index: 10;
  }

  .resizable {
    resize: both; /* Options: horizontal, vertical, both */
    width:550px;
  }

</style>

<style>
  .dialog-drag .dialog-header button.close{
    margin-right: 2px;
  }

  .dialog-drag .dialog-header button.pin {
    margin-bottom: 2px;
    margin-right: 5px;
  }

  .dialog-drag .dialog-body {
    padding: 0;
  }

  .dialog-drag {
    overflow-y: hidden;
    border: 1px solid #5a5a5acc;
    border-radius: 4px;
    box-shadow: 0 0 7px #000000;
    background: #232323cc;
  }

  .dialog-drag .dialog-header {
    background: none;
    color: #fff;
    font-size: 1em;
    padding: .25em 3em .25em 1em;
    position: relative;
    text-align: left;
    width: auto;
    font-family: 'Lucida Grande', 'Lucida Sans Unicode', arial, sans-serif;
  }

  .video-h264 > canvas {
    width: 100%;
  }

  .v-dialog {
    width: auto !important;
    cursor: pointer;
  }

  .container.dialog-container > div.video-h264 canvas {
    max-height: 100%;
  }

  @media (min-width: 1264px) {
    .container {
      max-width: unset!important;;
    }
  }

  @media (min-width: 960px) {
    .container {
      max-width: unset!important;
    }
  }
</style>
