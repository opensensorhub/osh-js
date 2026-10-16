<template>
  <div style='width:100%'>
    <TimeControllerRealtime
        :dataSource="dataSource"
        :dataSynchronizer="dataSynchronizer"
        :debounce="debounce"
        :parseTime="parseTime"
        @event='onControlEvent'
        v-if="realTime"
    ></TimeControllerRealtime>
      <TimeControllerReplay
          :dataSource="dataSource"
          :dataSynchronizer="dataSynchronizer"
          :debounce="debounce"
          :parseTime="parseTime"
          :skipTimeStep="skipTimeStep"
          :replaySpeedStep="replaySpeedStep"
          @event='onControlEvent'
          :support-realtime="supportRealTime"
          v-if="replay"
      ></TimeControllerReplay>
      <TimeControllerBatch
          :dataSource="dataSource"
          :debounce="debounce"
          :parseTime="parseTime"
          @event='onControlEvent'
          v-if="batch"
      ></TimeControllerBatch>
  </div>
</template>
<script>
import {isDefined, randomUUID} from '../../core/utils/Utils.js';
import TimeControllerReplay from "./TimeController.replay.vue";
import TimeControllerRealtime from "./TimeController.realtime.vue";
import {Mode} from '../../core/datasource/Mode';
import TimeControllerBatch from "./TimeController.batch.vue";

/**
 * @module osh-vue/TimeController
 * @desc TimeController component to control timeline of the datasources
 * @vue-prop {DataSource}  [dataSource] - DataSource object
 * @vue-prop {DataSynchronizer} [dataSynchronizer] - DataSynchronizer object
 * @vue-prop {Number} [replaySpeedStep=0.1] - Time to decrease/increase replay speed value
 * @vue-prop {Boolean} trackRealtime - Track real time
 * @vue-prop {Number} [debounce=800] - Debounce time before executing refresh while clicking on backward/forward/replaySpeed action. In millis
 * @vue-prop {Function} [parseTime] - Function used to parse the time and display next to the actions buttons. Return value can be text or HTML.
 * @vue-event {String} [event='change'/'slide'/'end'/'replaySpeed'] - Emit event's name after time change
 */
export default {
  name: "TimeController",
  components: {
    TimeControllerBatch,
    TimeControllerReplay,
    TimeControllerRealtime,
  },
  props: {
    supportRealTime: {
      type: Boolean,
      default:() => true
    },
    onControlEventFn: {
      type: Function,
    },
    dataSource: {
      type: Object
    },
    dataSynchronizer: {
      type: Object
    },
    skipTimeStep: {
      type: String,
      default: () => '5s' // 5sec
    },
    replaySpeedStep: {
      type: Number,
      default: () => 0.1
    },
    debounce: {
      type: Number,
      default: () => 800 // 800ms
    },
    trackRealtime: {
      type: Boolean,
      default: () => false
    },
    parseTime: {
      type: Function,
      default: function parseDate(timestamp) {
        const date = new Date(timestamp);
        const isoDate = date.toISOString();

        const smallDate = isoDate.substr(0, 10);
        const smallTime = isoDate.substr(11, 8);

        return '<div class="box-time"><div><strong>' + smallTime + '</strong></div><div><i><small>(' + smallDate + ')</small></i></div></div>';
      }
    }
  },
  data() {
    return {
      id: randomUUID(),
      init: false,
      replayProps: {},
      replay: false,
      batch: false,
      realTime: false,
      mode: Mode.REPLAY,
      timeNow: -1
    };
  },
  async beforeMount() {
    this.dataSourceObject = this.getDataSourceObject();
    this.mode = this.dataSourceObject.getMode();
    this.checkMode();
  },
  watch: {
    trackRealtime:  {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        // do your stuff
        if(isDefined(oldVal) && val !== oldVal) {
          this.getDataSourceObject().autoUpdateTime(val);
        }
      }
    }
  },
  methods: {
    getDataSourceObject() {
      return (isDefined(this.dataSynchronizer)) ? this.dataSynchronizer : this.dataSource;
    },
    checkMode() {
      this.batch = false;
      this.replay = false;
      this.realTime = false;
      // find the dataSource mode
      if(this.dataSourceObject.getMode() === Mode.REPLAY)  {
        this.replay = true;
      } else if(this.dataSourceObject.getMode() === Mode.BATCH) {
        this.batch = true;
      } else if(this.dataSourceObject.getMode() === Mode.REAL_TIME) {
        this.realTime = true;
      }
    },

    async onControlEvent(event) {
      if (event.name === 'toggle-replay') {
        this.timeNow = event.lastTimestamp;
        await this.dataSourceObject.disconnect();
        if(this.mode === Mode.BATCH) {
          this.dataSourceObject.setMode(Mode.BATCH).then(() => {
            this.checkMode();
            this.dataSourceObject.connect().then(() => {
              if (this.onControlEventFn) {
                this.onControlEventFn('play'); // backward compatibility
                this.onControlEventFn('mode', 'replay');
              }
              this.$emit('event', 'play'); // backward compatibility
              this.$emit('mode', 'replay');
            });
          });
        } else if(this.mode === Mode.REPLAY || this.mode === Mode.REAL_TIME) {
          if(isDefined(this.trackRealtime)) {
            this.dataSourceObject.setMode(Mode.REPLAY).then(() => {
              this.checkMode();
              this.getDataSourceObject().autoUpdateTime(true).then(() => {
                this.dataSourceObject.connect().then(() => {
                  if (this.onControlEventFn) {
                    this.onControlEventFn('play'); // backward compatibility
                    this.onControlEventFn('mode', 'replay');
                  }
                  this.$emit('event', 'play'); // backward compatibility
                  this.$emit('mode', 'replay');
                });
              });
            });
          } else {
            this.dataSourceObject.setMode(Mode.REPLAY).then(() => {
              this.checkMode();
              this.dataSourceObject.connect().then(() => {
                if (this.onControlEventFn) {
                  this.onControlEventFn('play'); // backward compatibility
                  this.onControlEventFn('mode', 'replay');
                }
                this.$emit('event', 'play'); // backward compatibility
                this.$emit('mode', 'replay');
              });
            });
          }
        }
      } else if(event.name === 'toggle-realtime') {
        await this.dataSourceObject.disconnect();
        await this.dataSourceObject.setMode(Mode.REAL_TIME);
        this.checkMode();
        this.dataSourceObject.connect(); // connect by default in realtime mode

        if(this.onControlEventFn) {
          this.onControlEventFn('play'); // backward compatibility
          this.onControlEventFn('mode', 'realtime' );
        }
        this.$emit('event','play'); // backward compatibility
        this.$emit('mode','realtime');
      }
    },
  }
}
</script>
