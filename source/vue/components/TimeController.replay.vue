<template>
  <div :id="'control-component-'+this.id" class="control">
    <RangeSliderReplay
        :update="update"
        :interval="interval"
        @event="onRangeSliderEvent"
        :minTimestamp="minTimeStamp"
        :maxTimestamp="maxTimeStamp"
        :start-timestamp="startTimeStamp"
        :end-timestamp="endTimeStamp"
        :dataSynchronizer="dataSynchronizer"
        ref="rangeSliderRef"
        v-if="rangeSliderInit && init"
    ></RangeSliderReplay>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <div class="datasource-actions replay">
          <a :id="'replay-btn-'+id" class="control-btn clicked" @click="toggleRealtime" v-if="supportRealTime">
            <i class="fa fa-history"></i>
          </a>
          <div class="control-speed" >
            <a :id="'speed-minus-btn-'+id" class="control-btn " @mouseup="stopSpeed" @mouseleave="stopSpeed"
               @click="decSpeed" @mousedown="decSpeedDown">
              <i class="fa fa-minus"></i>
            </a>
            <span class="chip control-speed-content" :id="speedId">{{ speed > 0 ? speed.toFixed(2) + 'x' : 'none' }}</span>
            <a :id="'speed-plus-btn-'+id" class="control-btn" @mouseup="stopSpeed" @mouseleave="stopSpeed"
               @click="incSpeed" @mousedown="incSpeedDown">
              <i class="fa fa-plus"></i>
            </a>
          </div>
          <div class="control-back-for">
            <a :id="'fast-back-btn-'+id" class="control-btn" @mouseup="stopBackward" @mouseleave="stopBackward"
               @mousedown="doBackward"> <i
                class="fa fa-fast-backward"></i></a>
            <a :id="'pause-btn-'+id" class="control-btn control-btn-pause" v-if="connected" @click="doPause"><i
                class="fa fa-pause"></i></a>
            <a :id="'play-btn-'+id" class="control-btn control-btn-play" v-else><i
                class="fa fa-play" @click="doPlay"></i></a>
            <a :id="'fast-forward-btn-'+id" class="control-btn" @mouseup="stopForward" @mouseleave="stopForward"
               @mousedown="doFastForward"> <i
                class="fa fa-fast-forward"></i></a>
          </div>
          <ControlTimeReplay
              :htmlCurrentTime="htmlCurrentTime"
              :htmlEndTime="htmlEndTime"
          ></ControlTimeReplay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {randomUUID} from '../../core/utils/Utils.js';
import {isDefined} from '../../core/utils/Utils';
import {Status as STATUS} from "../../core/connector/Status";
import {assertDefined, throttle, debounce} from "../../core/utils/Utils";
import {EventType} from "../../core/event/EventType";
import RangeSliderReplay from './RangeSlider.replay.vue';
import ControlTimeReplay from "./ControlTime.replay.vue";

/**
 * @module osh-vue/TimeController
 * @desc TimeController component to control timeline of the datasources
 * @vue-prop {DataSource}  [dataSource] - DataSource object
 * @vue-prop {DataSynchronizer} [dataSynchronizer] - DataSynchronizer object
 * @vue-prop {String} [skipTimeStep='5s'] Time to skip backward/forward. In seconds or percent of the total time
 * @vue-prop {Number} [replaySpeedStep=0.1] Time to decrease/increase replay speed value
 * @vue-prop {Number} [debounce=800] Debounce time before executing refresh while clicking on backward/forward/replaySpeed action. In millis
 * @vue-prop {Function} [parseTime] - Function used to parse the time and display next to the actions buttons. Return value can be text or HTML.
 * @vue-event {String} [event='change'/'slide'/'end'/'replaySpeed'/'toggle-realtime'] - Emit event's name after time change
 */
export default {
  name: "TimeControllerReplay",
  components: {
    ControlTimeReplay,
    RangeSliderReplay
  },
  props: {
    supportRealTime: {
      type: Boolean,
      default: () => true
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
    startTimeAsTimestamp: {
      type: Number,
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
    },
  },
  data() {
    return {
      id: randomUUID(),
      speedId: randomUUID(),
      event: null,
      dataSourceObject: null,
      connected: true,
      startTimestamp: null,
      endTimestamp: null,
      minTimestamp: null,
      maxTimestamp: null,
      speed: 1.0,
      interval: false,
      rangeSlider: null,
      skipTime: 0,
      init: false,
      update: false,
      lastSynchronizedTimestamp: -1,
      waitForTimeChangedEvent: false,
      rangeSliderInit: false,
    };
  },
  watch: {
    event(newValue) {
      this.$emit('event', {
        event: newValue,
        startTimestamp: this.startTimestamp,
        endTimestamp: this.endTimestamp
      });
    },
  },
  computed: {
    minTimeStamp() {
      return this.minTimestamp;
    },
    maxTimeStamp() {
      return this.maxTimestamp;
    },
    startTimeStamp() {
      return this.startTimestamp;
    },
    endTimeStamp() {
      return this.endTimestamp;
    },
    htmlCurrentTime() {
       return this.parseTime(this.startTimestamp);
    },
    htmlEndTime() {
      return this.parseTime(this.endTimestamp);
    }
  },
  beforeMount() {
    assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
    this.dataSourceObject = this.getDataSourceObject();
  },
  updated() {
    // this.initComp();
  },
  mounted() {
    this.initComp();
  },
  methods: {
    initComp() {
      assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
      this.checkInit();
      this.createTimeBc();

      // listen for datasource status
      this.dataSourceObject.subscribe(async message => {
        if (message.status === STATUS.DISCONNECTED || message.status === STATUS.FETCH_ENDED || message.status === STATUS.FETCH_STARTED) {
          this.connected = await this.dataSourceObject.isConnected();
        }
      }, [EventType.STATUS]);

      this.updateTimeDebounce = debounce(this.updateTime.bind(this), this.debounce);
      this.setRangeSliderStartTimeThrottle = throttle(this.setRangeSliderStartTime.bind(this), this.debounce);
      this.displayConsoleWarningIncompatibleVersionThrottle = throttle(this.displayConsoleWarningIncompatibleVersion.bind(this), this.debounce);

      if(isDefined(this.dataSynchronizer)) {
        this.dataSynchronizer.onAddedDataSource = async () => {
          this.checkInit();
        };
      }

    },
    checkInit() {
      if (!this.init && this.dataSourceObject.getDataSources().length > 0) {
        try {
          this.dataSourceObject.isConnected().then(value => this.connected = value);
          this.minTimestamp = this.dataSourceObject.getMinTimeAsTimestamp();
          this.maxTimestamp = this.dataSourceObject.getMaxTimeAsTimestamp();
          this.speed = this.dataSourceObject.getReplaySpeed();
          this.startTimestamp = this.dataSourceObject.getStartTimeAsTimestamp() ? this.dataSourceObject.getStartTimeAsTimestamp() : this.minTimestamp;
          this.endTimestamp = this.dataSourceObject.getEndTimeAsTimestamp() ? this.dataSourceObject.getEndTimeAsTimestamp() : this.maxTimestamp;

          // compute skip time
          this.computeSkipTime();
          this.init = true;
          this.createRangeSlider();
        }catch (ex) {
          console.error(ex);
        }
      }
    },
    computeSkipTime() {
      if ((this.skipTimeStep.endsWith('s'))) {
        // time in second
        this.skipTime = parseFloat(this.skipTimeStep.substring(0, this.skipTimeStep.length - 1)) * 1000;
      } else if (this.skipTimeStep.endsWith('%')) {
        // compute percent on the whole period
        const totalTime = this.maxTimestamp - this.minTimestamp;
        const percent = parseFloat(this.skipTimeStep.substring(0, this.skipTimeStep.length - 1));
        this.skipTime = percent * totalTime / 100;
      }
    },
    displayConsoleWarningIncompatibleVersionThrottle() {

    },
    displayConsoleWarningIncompatibleVersion() {
      console.warn('Incompatible data version');
    },
    createTimeBc() {
      // listen for BC
      this.dataSourceObject.subscribe(message => {
        if(message.type === EventType.CLOSED) {
          this.connected = false;
        }

        if(this.waitForTimeChangedEvent) {
          if(message.type ===  EventType.MASTER_TIME) {
            this.displayConsoleWarningIncompatibleVersionThrottle();
          }
          if(message.type ===  EventType.TIME_CHANGED) {
            this.waitForTimeChangedEvent = false;
            return;
          }
        }

        if(this.waitForTimeChangedEvent) {
          return;
        }
        if(message.type === EventType.MASTER_TIME) {
          if(!this.connected) {
            this.connected = true;
          }
          // consider here datasynchronizer sends data in time order
          if (!this.interval && this.speed > 0.0 && !this.update) {
            // }
            this.setStartTimestamp(message.timestamp);
          }
        }

        if(message.type === EventType.MASTER_TIME) {
          // consider here datasynchronizer sends data in time order
          this.lastSynchronizedTimestamp = message.timestamp;
        }
      }, [EventType.TIME_CHANGED, EventType.MASTER_TIME, EventType.CLOSED]);
    },
    setStartTimestamp(timestamp) {
      this.startTimestamp = timestamp;
      const ref = this.$refs.rangeSliderRef;
      if(ref) {
        ref.setStartTime(timestamp);
      }

    },
    createRangeSlider() {
      if (!this.rangeSliderInit) {
        let dataSourceObj = {};

        if (isDefined(this.dataSynchronizer)) {
          dataSourceObj.dataSynchronizer = this.dataSynchronizer;
          this.dataSynchronizer.onTimeChanged = (minTimestamp, maxTimestamp,startTimestamp, endTimestamp) => {
            if(!this.update) {
              this.minTimestamp = minTimestamp;
              this.maxTimestamp = maxTimestamp;
              this.startTimestamp = startTimestamp ? startTimestamp : minTimestamp;
              this.endTimestamp = endTimestamp ? endTimestamp : maxTimestamp;
              this.computeSkipTime();
            }
          }
        } else {
          dataSourceObj.dataSource = this.dataSource;
        }

        this.rangeSliderInit = true;
        // HAS BEEN REPLACED
      }
    },
    doBackward() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          let backwardTime = parseInt(this.startTimestamp - this.skipTime);
          if (backwardTime > this.minTimestamp) {
            this.startTimestamp = backwardTime;
          } else {
            this.startTimestamp = this.minTimestamp;
            backwardTime = this.minTimestamp;
          }
          this.setRangeSliderStartTime(backwardTime);
        }, 70);
      }
    }
    ,
    stopBackward() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = false;
        this.update = true;
        this.updateTimeDebounce('backward');
      }
    },

    onRangeSliderEvent(props) {
      if('startTimestamp' in props) {
        this.startTimestamp = props.startTimestamp;
        this.waitForTimeChangedEvent = true;
      }
      if('endTimestamp' in props) {
        this.endTimestamp = props.endTimestamp;
        this.waitForTimeChangedEvent = true;
      }

      if('update' in props) {
        this.update = props.update;
        this.waitForTimeChangedEvent = true;
      }
      if('waitForTimeChangedEvent' in props) {
        this.waitForTimeChangedEvent = props.waitForTimeChangedEvent;
      }
      if(props.name === 'doPlay') {
        this.doPlay();
      }
    },
    resetMasterTime() {
      // reset master time
      this.waitForTimeChangedEvent = this.lastSynchronizedTimestamp !== -1;
      this.lastSynchronizedTimestamp = -1;
      this.on('time-changed');
      this.update = false;
    },

    async updateTime(event) {
      this.resetMasterTime();
      await this.dataSourceObject.setTimeRange(
          new Date(this.startTimestamp).toISOString(),
          new Date(this.endTimestamp).toISOString(),
          this.speed,
          true
      );
      this.on(event);
    }
    ,
    updateTimeDebounce() {

    }
    ,

    setRangeSliderStartTime(timestamp) {
      const ref = this.$refs.rangeSliderRef;
      if(ref) {
        ref.setStartTime(timestamp);
      }
    }
    ,

    setRangeSliderStartTimeThrottle() {
    }
    ,
    stopForward() {
      if (this.interval) {
        this.update = true;
        this.updateTimeDebounce('forward');
        clearInterval(this.interval);
        this.interval = false;
      }
    }
    ,

    doFastForward() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          let forwardTime = parseInt(this.startTimestamp +  this.skipTime);
          if (forwardTime < this.maxTimestamp) {
            this.startTimestamp = forwardTime;
          } else {
            this.startTimestamp = this.maxTimestamp;
            forwardTime = this.maxTimestamp ;
          }
          this.setRangeSliderStartTime(forwardTime);
        }, 70);
      }
    }
    ,
    doPause() {
      // this.connected = false;
      this.waitForTimeChangedEvent = true;
      this.dataSourceObject.disconnect();
      //save current time
      this.on('pause');
      this.on('time-changed');
    }
    ,
    doPlay() {
      this.updateTime('play');
    }
    ,
    getDataSourceObject() {
      return (isDefined(this.dataSynchronizer)) ? this.dataSynchronizer : this.dataSource;
    }
    ,
    async toggleRealtime() {
      this.on('toggle-realtime');
    }
    ,
    incSpeed() {
      if (this.speed > 10.0) {
        this.speed += this.replaySpeedStep * 10.0;
      } else {
        this.speed += this.replaySpeedStep;
      }
    }
    ,
    incSpeedDown() {
      if (!this.interval) {
        this.incSpeedTimeout = setTimeout(() => {
          this.interval = setInterval(this.incSpeed, 70);
        }, 200);
      }
    }
    ,
    decSpeed() {
      let laterSpeed;
      if (this.speed > 10.0) {
        laterSpeed = this.speed - this.replaySpeedStep * 10.0;
      } else {
        laterSpeed = this.speed - this.replaySpeedStep;
      }
      if (laterSpeed >= 0.1) {
        this.speed = laterSpeed;
      } else if (this.speed !== 0.1) {
        this.speed = 0.1
      }
    }
    ,
    decSpeedDown() {
      if (this.speed > 0.1) {
        if (!this.interval) {
          this.incSpeedTimeout = setTimeout(() => {
            this.interval = setInterval(this.decSpeed, 70);
          }, 200);
        }
      }
    },
    stopSpeed() {
      if (this.interval || isDefined(this.incSpeedTimeout)) {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = false;
        } else {
          clearTimeout(this.incSpeedTimeout);
          this.incSpeedTimeout = null;
        }
        this.updateTimeDebounce('end');
      }
    },
    on(eventName, props={}) {
      this.$emit('event', {
        name: eventName,
        ...props
      });
    },
    withLeadingZeros(dt) {
      return (dt < 10 ? '0' : '') + dt;
    },
    // vuejs 3.x
    beforeUnmount() {
      const ref = this.$refs.rangeSliderRef;
      if(ref) {
        ref.destroy();
      }
    },
    // vuejs 2.x
    beforeDestroy() {
      const ref = this.$refs.rangeSliderRef;
      if(ref) {
        ref.destroy();
      }
    }
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
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  width: 450px;
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

.control .control-back-for {
  width: 80px;
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

.control .control-back-for {
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

.control-btn.out-of-sync {
  cursor: pointer;
  color: #d97100;
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

.control .live {
  margin-left: 10px;
  top: -1px;
}

.control .live > span {
  font-size: 12px;
  font-weight: 700;
  color: #00B5B8;
}

.control .buttons .actions {
  display: flex;
  align-items: center;
  padding: 45px 5px 5px 0px;
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

.control .datasource-actions.live {
  justify-content: unset;
  align-items: unset;
  width: unset;
}

.chip{
  border: solid 1px black;
  background: #e0e0e0;
  height: 18px;
  top: -2px;
  font-size: 13px;
  padding-top: 1px;
  align-items: center;
  cursor: default;
  display: inline-flex;
  line-height: 20px;
  max-width: 100%;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-decoration: none;
  transition-duration: .28s;
  transition-property: box-shadow,opacity;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  vertical-align: middle;
  white-space: nowrap;
  border-color: rgba(0,0,0,.12);
  color: rgba(0,0,0,.87);
  border-radius: 16px;
  vertical-align: middle;
  align-items: baseline;
}
</style>
