<template>
  <div :id="'control-component-'+this.id" class="control">
    <div :id="id" class="range"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <div class="datasource-actions replay">
          <a :id="'replay-btn-'+id" class="control-btn clicked" @click="toggleReplay">
            <i class="fa fa-history"></i>
          </a>
          <div class="control-speed" >
            <a :id="'speed-minus-btn-'+id" class="control-btn " @mouseup="stopSpeed" @mouseleave="stopSpeed"
               @click="decSpeed" @mousedown="decSpeedDown">
              <i class="fa fa-minus"></i>
            </a>
            <span class="control-speed-content">
              <v-chip :id="speedId">{{ speed > 0 ? speed.toFixed(2) + 'x' : 'none' }}</v-chip>
            </span>
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
import dataSynchronizer from "../../core/timesync/DataSynchronizer";


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
  name: "TimeControllerReplay",
  components: {},
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
      speedId: randomUUID(),
      event: null,
      dataSourceObject: null,
      connected: true,
      startTime: null,
      endTime: null,
      minTime: null,
      maxTime: null,
      speed: 1.0,
      interval: false,
      rangeSlider: null,
      bcTime: null,
      skipTime: 0,
      init: false,
      lastSynchronizedTimestamp: -1,
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
    async initComp() {
      assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
      if (!this.init) {
        this.dataSourceObject.isConnected().then(value => this.connected = value);
        let minTime = this.dataSourceObject.getMinTime();
        let maxTime = this.dataSourceObject.getMaxTime();

        if (isDefined(this.dataSourceObject.properties.replaySpeed)) {
          this.speed = this.dataSourceObject.properties.replaySpeed;
        } else {
          this.speed = 0.0;
        }

        if (isDefined(minTime)) {
          this.startTime = new Date(minTime).getTime();
        } else {
          this.startTime = new Date(this.dataSourceObject.getStartTime()).getTime();
        }
        this.minTime = this.startTime;

        if (isDefined(maxTime)) {
          this.endTime = new Date(maxTime).getTime();
        } else {
          this.endTime = new Date(this.dataSourceObject.getEndTime()).getTime();
        }
        this.maxTime = this.endTime;

        // await this.dataSourceObject.setTimeRange(
        //     new Date(this.minTime).toISOString(),
        //     new Date(this.maxTime).toISOString(),
        //     this.speed,
        //     true,
        //     Mode.REPLAY
        // );


        // compute skip time
        if ((this.skipTimeStep.endsWith('s'))) {
          // time in second
          this.skipTime = parseFloat(this.skipTimeStep.substring(0, this.skipTimeStep.length - 1)) * 1000;
        } else if (this.skipTimeStep.endsWith('%')) {
          // compute percent on the whole period
          const totalTime = this.maxTime - this.minTime;
          const percent = parseFloat(this.skipTimeStep.substring(0, this.skipTimeStep.length - 1));
          this.skipTime = percent * totalTime / 100;
        }

        this.createTimeBc();
        // listen for datasource status
        this.dataSourceObject.subscribe(message => {
          if (message.status === STATUS.DISCONNECTED || message.status === STATUS.FETCH_ENDED) {
            this.connected = false;
          } else if (message.status === STATUS.FETCH_STARTED) {
            this.connected = true;
          }
        }, [EventType.STATUS]);

        this.createRangeSlider();

        this.updateTimeDebounce = debounce(this.updateTime.bind(this), this.debounce);
        this.setRangeSliderStartTimeThrottle = throttle(this.setRangeSliderStartTime.bind(this), this.debounce);
        this.displayConsoleWarningIncompatibleVersionThrottle = throttle(this.displayConsoleWarningIncompatibleVersion.bind(this), this.debounce);
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
    displayConsoleWarningIncompatibleVersionThrottle() {

    },
    displayConsoleWarningIncompatibleVersion() {
      console.warn('Incompatible data version');
    },
    createTimeBc() {
      // listen for BC
      this.dataSourceObject.subscribe(message => {
        if(this.waitForTimeChangedEvent) {
          console.log('Waiting for TIME CHANGED EVENT');
        }

        if(this.waitForTimeChangedEvent) {
          if(message.type ===  EventType.MASTER_TIME) {
            this.displayConsoleWarningIncompatibleVersionThrottle();
          } else if(message.type ===  EventType.TIME_CHANGED) {
            this.waitForTimeChangedEvent = false;
          }
          return;
        }

        if(message.type === EventType.MASTER_TIME) {
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
        let dataSourceObj = {};

        if (isDefined(this.dataSynchronizer)) {
          dataSourceObj.dataSynchronizer = this.dataSynchronizer;
        } else {
          dataSourceObj.dataSource = this.dataSource;
        }

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
    }
    ,
    doBackward() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          let backwardTime = parseInt(this.startTime - this.skipTime);
          if (backwardTime > this.minTime) {
            this.startTime = backwardTime;
          } else {
            this.startTime = this.minTime;
            backwardTime = this.minTime;
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

    resetMasterTime() {
      // reset master time
      this.lastSynchronizedTimestamp = -1;
      this.waitForTimeChangedEvent = true;
      this.on('time-changed');
      this.update = false;
    },

    async updateTime(event) {
      this.resetMasterTime();
      this.dataSourceObject.setTimeRange(
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
    updateTimeDebounce() {

    }
    ,

    setRangeSliderStartTime(timestamp) {
      this.rangeSlider.setStartTime(timestamp);
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
          let forwardTime = parseInt(this.startTime +  this.skipTime);
          if (forwardTime < this.maxTime) {
            this.startTime = forwardTime;
          } else {
            this.startTime = this.maxTime;
            forwardTime = this.maxTime ;
          }
          this.setRangeSliderStartTime(forwardTime);
        }, 70);
      }
    }
    ,
    doPause() {
      this.connected = false;
      this.waitForTimeChangedEvent = true;
      this.dataSourceObject.disconnect();
      //save current time
      this.on('pause');
      this.on('time-changed');
    }
    ,
    doPlay() {
      this.updateTime('play');
      this.connected = true;
    }
    ,
    getDataSourceObject() {
      return (isDefined(this.dataSynchronizer)) ? this.dataSynchronizer : this.dataSource;
    }
    ,
    async toggleReplay() {
      this.on('toggle-history', {
        replay: false,
        startTime: this.startTime,
        endTime: this.endTime,
        replaySpeed: this.speed
      });
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
    }
    ,
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
    }
    ,
    on(eventName, props={}) {
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

.control .datasource-actions.live {
  justify-content: unset;
  align-items: unset;
  width: unset;
}

</style>
