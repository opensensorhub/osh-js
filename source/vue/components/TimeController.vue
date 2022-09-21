<template>
  <div style='width:100%'>
    <slot v-if="isRealTime">
      <TimeControllerRealtime
                              :dataSource="dataSource"
                              :dataSynchronizer="dataSynchronizer"
                              :debounce="debounce"
                              :parseTime="parseTime"
                              :supportReplay="supportReplay"
                              @event='onControlEvent'
      ></TimeControllerRealtime>
    </slot>
    <slot v-else>
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
  </div>
</template>
<script>
import {isDefined, randomUUID} from '../../core/utils/Utils.js';
import {assertDefined, throttle, debounce} from "../../core/utils/Utils";
import TimeControllerReplay from "./TimeController.replay.vue";
import TimeControllerRealtime from "./TimeController.realtime.vue";


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
      isRealTime: undefined,
      supportReplay: false,
    };
  },
  beforeMount() {
    assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
    this.dataSourceObject = this.getDataSourceObject();
  },
  mounted() {
    this.initComp();
  },
  methods: {
    initComp() {
      assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
      this.isRealTime = (this.dataSourceObject.getStartTime() === 'now');
      if(isDefined(this.dataSourceObject.getMinTime())) {
        this.supportReplay = true; // activate icon to switch between REPLAY & REAL TIME mode
      }
    },
    getDataSourceObject() {
      return (isDefined(this.dataSynchronizer)) ? this.dataSynchronizer : this.dataSource;
    },
    onControlEvent(event) {
      if(event.name === 'toggle-replay') {
        if(event.replay) {
          this.toggleReplay();
        } else {
          this.toggleRealtime();
        }
      }
    },
    toggleReplay() {
      this.isRealTime = false;
    },
    toggleRealtime() {
      this.isRealTime = true;
    }

  }
}
</script>
