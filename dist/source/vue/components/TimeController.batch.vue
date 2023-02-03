<template>
  <div :id="'control-component-'+this.id" class="control">
    <div :id="id" class="range"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <div class="datasource-actions replay">
          <a :id="'replay-btn-'+id" class="control-btn clicked" @click="toggleReplay">
            <i class="fa fa-history"></i>
          </a>
          <div class="control-time">
            <span :id="'current-time-'+id" v-html=parseTime(startTime)></span>
            <span style="padding:0 10px 0 10px">/</span>
            <span :id="'end-time-'+id" v-html=parseTime(endTime)></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RangeSliderReplay from '../../ext/ui/view/rangeslider/RangeSliderView.replay.js';
import {randomUUID} from '../../core/utils/Utils.js';
import {isDefined} from '../../core/utils/Utils';
import {Status as STATUS} from "../../core/connector/Status";
import {assertDefined, throttle, debounce} from "../../core/utils/Utils";
import {EventType} from "../../core/event/EventType";
import {Mode} from "../../core/datasource/Mode";


/**
 * @module osh-vue/TimeController
 * @desc TimeController component to control timeline of the datasources
 * @vue-prop {DataSource}  [dataSource] - DataSource object
 * @vue-prop {DataSynchronizer} [dataSynchronizer] - DataSynchronizer object
 * @vue-prop {String} [skipTimeStep='5s'] Time to skip backward/forward. In seconds or percent of the total time
 * @vue-prop {Number} [replaySpeedStep=0.1] Time to decrease/increase replay speed value
 * @vue-prop {Number} [debounce=800] Debounce time before executing refresh while clicking on backward/forward/replaySpeed action. In millis
 * @vue-prop {Function} [parseTime] - Function used to parse the time and display next to the actions buttons. Return value can be text or HTML.
 * @vue-event {String} [event='change'/'slide'/'end'/'replaySpeed'/'toggle-replay'] - Emit event's name after time change
 */
export default {
  name: "TimeControllerBatch",
  components: {},
  props: {
    dataSource: {
      type: Object
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
      speedId: randomUUID(),
      event: null,
      connected: true,
      startTime: null,
      endTime: null,
      minTime: null,
      maxTime: null,
      interval: false,
      rangeSlider: null,
      bcTime: null,
      init: false,
      waitForTimeChangedEvent: false
    };
  },
  watch: {
    event(newValue) {
      this.$emit('event', {
        event: newValue,
        startTime: this.startTime,
        endTime: this.endTime
      });
    }
  },
  mounted() {
    this.initComp();
  },
  methods: {
    async initComp() {
      if (!this.init) {
        this.dataSource.isConnected().then(value => this.connected = value);
        let stCurrentRefresh = this.dataSource.getStartTime() === 'now';

        let minTime = this.dataSource.getMinTime();
        let maxTime = this.dataSource.getMaxTime();

        if (isDefined(minTime)) {
          this.startTime = new Date(minTime).getTime();
        } else {
          this.startTime = new Date(this.dataSource.getStartTime()).getTime();
        }
        this.minTime = this.startTime;

        if (isDefined(maxTime)) {
          this.endTime = new Date(maxTime).getTime();
        } else {
          this.endTime = new Date(this.dataSource.getEndTime()).getTime();
        }
        this.maxTime = this.endTime;

        if (stCurrentRefresh) {
          await this.dataSource.setTimeRange(
              new Date(this.minTime).toISOString(),
              new Date(this.maxTime).toISOString(),
              this.speed,
              true,
              Mode.BATCH
          );
        }

        this.createTimeBc();
        // listen for datasource status
        this.dataSource.subscribe(message => {
          if (message.status === STATUS.DISCONNECTED || message.status === STATUS.FETCH_ENDED) {
            this.connected = false;
          } else if (message.status === STATUS.FETCH_STARTED) {
            this.connected = true;
          }
        }, [EventType.STATUS]);

        this.createRangeSlider();

        this.updateTimeDebounce = debounce(this.updateTime.bind(this), this.debounce);
        this.setRangeSliderStartTimeThrottle = throttle(this.setRangeSliderStartTime.bind(this), this.debounce);
        this.init = true;
      }
    },
    destroyBc() {
      if (isDefined(this.bcTime)) {
        this.bcTime.close();
      }
    },
    destroyTimeBc() {
      this.bcTime.close();
    },
    createTimeBc() {
      // listen for BC
      this.dataSource.subscribe(message => {
        if (this.waitForTimeChangedEvent) {
          console.log('Waiting for TIME CHANGED EVENT');
        }

        if (this.waitForTimeChangedEvent) {
          if (message.type === EventType.MASTER_TIME) {
            this.displayConsoleWarningIncompatibleVersionThrottle();
          } else if (message.type === EventType.TIME_CHANGED) {
            this.waitForTimeChangedEvent = false;
          }
          return;
        }

        if (message.type === EventType.MASTER_TIME) {
          // consider here datasynchronizer sends data in time order
          this.lastSynchronizedTimestamp = message.timestamp;
          if (!this.interval && this.speed > 0.0 && !this.update) {
            // }
            this.setStartTime(message.timestamp);
          }
        }
      }, [EventType.TIME_CHANGED, EventType.MASTER_TIME]);
    },
    setStartTime(timestamp) {
      this.startTime = timestamp;
      this.rangeSlider.setStartTime(this.startTime, this.endTime);
    },
    createRangeSlider() {
      if (!this.rangeSlider) {
        this.rangeSlider = new RangeSliderReplay({
          container: this.id,
          startTime: this.minTime,
          endTime: this.maxTime,
          debounce: 200,
          options: {}
        });

        this.update = false;
        this.rangeSlider.onChange = (startTime, endTime, event) => {
          if (event === 'slide') {
            this.waitForTimeChanged = true;
            this.update = true;
          } else if (event === 'end') {
            this.update = false;
          }

          if (!this.interval) {
            this.startTime = startTime;
            this.endTime = endTime;

            this.on(event);
          }
          if (event === 'end') {
            this.doPlay();
          }
        }
      }
    },
    doPlay() {
      this.updateTime('play');
      this.connected = true;
    },
    resetMasterTime() {
      // reset master time
      this.lastSynchronizedTimestamp = -1;
      this.waitForTimeChangedEvent = true;
      this.on('time-changed');
      this.update = false;
    },

    async updateTime(event) {
      this.resetMasterTime();
      this.dataSource.setTimeRange(
          new Date(this.startTime).toISOString(),
          new Date(this.endTime).toISOString(),
          this.speed,
          true
      );

      this.on(event, {
        replaySpeed: this.speed,
        startTime: this.startTime,
        endTime: this.endTime
      });
    }
    ,
    updateTimeDebounce() {},

    setRangeSliderStartTime(timestamp) {
      this.rangeSlider.setStartTime(timestamp);
    },

    setRangeSliderStartTimeThrottle() {},

    async toggleReplay() {
      this.on('toggle-history');
    },
    on(eventName, props = {}) {
      this.$emit('event', {
        name: eventName,
        ...props
      });
    }
    ,
    withLeadingZeros(dt) {
      return (dt < 10 ? '0' : '') + dt;
    },
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>
.control {
  width: 100%;
  position: relative;
  bottom: 0px;
  font-family: Sans-Serif;
  background: linear-gradient(to bottom, rgba(116, 117, 119, .8) 0, rgba(58, 68, 82, .8) 11%, rgba(46, 50, 56, .8) 46%, rgba(53, 53, 53, .8) 81%, rgba(53, 53, 53, .8) 100%);
}

.control a {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}

.control .datasource-actions {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 100%;
}

.control .control-btn {
  padding: 0px 10px 0px 0;
}
</style>

<style>
/** reduce bar size **/
.control .noUi-horizontal {
  height: 3px;
}

.control .box-time small {
  font-size: 60%;
}

.control .box-time {
  display: flex;
  flex-direction: column;
  height: 20px;
  line-height: 12px;
  min-width: 65px;
  margin-bottom: 5px;
}

.control .control-time {
  display: flex;
}

.control a[disabled] {
  color: gray;
  pointer-events: none;
}

.control .noUi-target {
  background: #FAFAFA;
  border-radius: unset;
  border: unset;
  box-shadow: unset;
}

/** reduce handles **/

.noUi-horizontal {
  width: 100%;
}

.control .fa-exclamation-triangle {
  font-size: 19px;
  margin-left: 10px;
  animation: blinker 500ms cubic-bezier(.5, 0, 1, 1) infinite alternate;
}

@keyframes blinker {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.control .fa-history {
  font-size: 19px;
}

.control button svg, .control a svg {
  width: 30px;
}

.control .buttons {
  color: lightgray;
}

.control-btn.clicked {
  cursor: pointer;
  color: #00B5B8;
}

.control-btn:hover {
  cursor: pointer;
  color: #00B5B8;
}

.control {
  background-color: #3d3d3d !important;
  margin: 15px 0 0 0;
  padding: 0 0 5px 0;
}

.control-btn:active {
  color: #00B5B8;
}

.control .noUi-pips-horizontal {
  padding: 0px 0;
}

.noUi-value-horizontal {
  -webkit-transform: translate(-50%, 80%);
  transform: translate(-50%, 80%);
}

.control .buttons .time {
  font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
  line-height: 20px;
}

.control {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.control .noUi-handle:after, .noUi-handle:before {
  background: #989898;
}

.control .v-chip.v-size--default {
  height: 18px;
  top: -2px;
  font-size: 13px; /* according to font-family: sans-serif */
  padding-top: 1px; /* according to font-family: sans-serif */
}

.control .control-speed-content {
  margin-right: 10px;
  font-weight: 700;
}

.control .noUi-horizontal .noUi-handle {
  width: 20px;
  height: 25px;
  right: -10px;
  top: -12px;
}

.control .noUi-handle:after, .noUi-handle:before {
  left: 5px;
}

.control .noUi-handle:after, .noUi-handle:after {
  left: 10px;
}

.control .noUi-connect {
  background: rgba(0, 0, 0, 0.25);
}

.control .noUi-connects {
  height: 34px;
  top: -15px;
}

.control .noUi-horizontal {
  height: 0px;
}

.control .control-time {
  width: 150px;
}

</style>
