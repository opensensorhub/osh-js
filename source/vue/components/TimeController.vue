<template>
  <div style='width:100%'>
    <slot v-if="realTime">
      <TimeControllerRealtime
          :dataSource="dataSource"
          :dataSynchronizer="dataSynchronizer"
          :debounce="debounce"
          :parseTime="parseTime"
          :support-history="historyProps !== undefined"
          @event='onControlEvent'
      ></TimeControllerRealtime>
    </slot>
    <slot v-else-if="historyProps && historyProps.mode === 'replay'">
      <TimeControllerReplay
          :dataSource="dataSource"
          :dataSynchronizer="dataSynchronizer"
          :debounce="debounce"
          :parseTime="parseTime"
          :skipTimeStep="skipTimeStep"
          :replaySpeedStep="replaySpeedStep"
          @event='onControlEvent'
      ></TimeControllerReplay>
    </slot>
    <slot v-else-if="historyProps && historyProps.mode === 'batch'">
      <TimeControllerBatch
          :dataSource="dataSource"
          :debounce="debounce"
          :parseTime="parseTime"
          @event='onControlEvent'
      ></TimeControllerBatch>
    </slot>
  </div>
</template>
<script>
import {isDefined, randomUUID} from '../../core/utils/Utils.js';
import {assertDefined, throttle, debounce} from "../../core/utils/Utils";
import TimeControllerReplay from "./TimeController.replay.vue";
import TimeControllerRealtime from "./TimeController.realtime.vue";
import {Mode} from '../../core/datasource/Mode';
import TimeControllerBatch from "./TimeController.batch.vue";

/**
 * @module osh-vue/TimeController
 * @desc TimeController component to control timeline of the datasources
 * @vue-prop {DataSource}  [dataSource] - DataSource object
 * @vue-prop {DataSynchronizer} [dataSynchronizer] - DataSynchronizer object
 * @vue-prop {String} [skipTimeStep='5s'] Time to skip backward/forward. In seconds or percent of the total time
 * @vue-prop {Number} [replaySpeedStep=0.1] Time to decrease/increase replay speed value
 * @vue-prop {Number} [debounce=800] Debounce time before executing refresh while clicking on backward/forward/replaySpeed action. In millis
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
      supportReplay: false,
      replayProps: {},
      replay: false,
      batch: false,
      realTime: false,
      historyProps: undefined // type: 'batch' | 'replay', startTime: , endTime, replaySpeed
    };
  },
  beforeMount() {
    this.dataSourceObject = this.getDataSourceObject();
  },
  mounted() {
    this.initComp();
  },
  methods: {
    initComp() {
      if (this.dataSourceObject.mode === Mode.REPLAY) {
        this.replay = true;
        this.historyProps = {
          mode: 'replay',
          startTime: this.dataSourceObject.getStartTime(),
          endTime: this.dataSourceObject.getEndTime(),
          replaySpeed: this.dataSourceObject.getReplaySpeed()
        }
      } else if (this.dataSourceObject.mode === Mode.BATCH) {
        this.batch = true;
        this.historyProps = {
          mode: 'batch',
          startTime: this.dataSourceObject.getStartTime(),
          endTime: this.dataSourceObject.getEndTime()
        }
      } else if (this.dataSourceObject.mode === Mode.REAL_TIME) {
        this.realTime = true;
      }
    },
    getDataSourceObject() {
      return (isDefined(this.dataSynchronizer)) ? this.dataSynchronizer : this.dataSource;
    },
    onControlEvent(event) {
      if (event.name === 'toggle-history') {
        if(!this.realTime) {
          this.toggleRealtime();
        } else {
          if(this.historyProps.mode === Mode.REPLAY) {
            this.toggleReplay();
          } else if(this.historyProps.mode === Mode.BATCH) {
            this.toggleBatch();
          }
        }
      } else if (event.name === 'end') {
        // this.dataSourceObject.setMinTime(new Date(event.startTime).toISOString());
        // this.dataSourceObject.setMaxTime(new Date(event.endTime).toISOString());
        // this.dataSourceObject.setReplaySpeed(event.replaySpeed);
      }
    },
    async toggleReplay() {
      await this.dataSourceObject.setTimeRange(
          this.historyProps.startTime,
          this.historyProps.endTime,
          this.historyProps.replaySpeed,
          true,
          Mode.REPLAY
      );
      this.realTime = false;
    },
    async toggleBatch() {
      await this.dataSourceObject.setTimeRange(
          this.historyProps.startTime,
          this.historyProps.endTime,
          1.0,
          true,
          Mode.BATCH
      );
      this.realTime = false;
    },
    async toggleRealtime() {
      await this.dataSourceObject.setTimeRange(
          'now',
          new Date("2055-01-01T00:00:00Z").toISOString(),
          1.0,
          true,
          Mode.REAL_TIME
      );
      this.realTime = true;
    }

  }
}
</script>
