<template>
  <div :id="'control-component-'+this.id" class="control">
    <div :id="id" class="range"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <slot v-if="history">
          <div class="datasource-actions history">
            <a :id="'history-btn-'+this.id" class="control-btn clicked" @click="toggleHistory">
              <i class="fa fa-history"></i>
            </a>
            <div class="control-speed" v-if="activateSpeedControl">
              <a :id="'speed-minus-btn-'+this.id" class="control-btn " @mouseup="stopSpeed" @mouseleave="stopSpeed"
                 @click="decSpeed" @mousedown="decSpeedDown">
                <i class="fa fa-minus"></i>
              </a>
              <span class="control-speed-content">
                <v-chip :id="speedId">{{ speed > 0 ? speed.toFixed(2) + 'x' : 'none' }}</v-chip>
              </span>
              <a :id="'speed-plus-btn-'+this.id" class="control-btn" @mouseup="stopSpeed" @mouseleave="stopSpeed"
                 @click="incSpeed" @mousedown="incSpeedDown">
                <i class="fa fa-plus"></i>
              </a>
            </div>
            <div class="control-back-for">
              <a :id="'fast-back-btn-'+this.id" class="control-btn" @mouseup="stopBackward" @mouseleave="stopBackward"
                 @mousedown="doBackward"> <i
                  class="fa fa-fast-backward"></i></a>
              <a :id="'pause-btn-'+this.id" class="control-btn control-btn-pause" v-if="connected" @click="doPause"><i
                  class="fa fa-pause"></i></a>
              <a :id="'play-btn-'+this.id" class="control-btn control-btn-play" v-else><i
                  class="fa fa-play" @click="doPlay"></i></a>
              <a :id="'fast-forward-btn-'+this.id" class="control-btn" @mouseup="stopForward" @mouseleave="stopForward"
                 @mousedown="doFastForward"> <i
                  class="fa fa-fast-forward"></i></a>
            </div>
            <div class="control-time">
              <span :id="'current-time-'+this.id" v-html=parseTime(startTime)></span>
              <span style="padding:0 10px 0 10px">/</span>
              <span :id="'end-time-'+this.id" v-html=parseTime(endTime)></span>
            </div>
          </div>
          <div class="out-of-sync" v-if="Object.entries(outOfSync).length > 0">
            <a :id="'out-of-sync-btn-'+this.id" class="control-btn out-of-sync">
              <i class="fa fa-exclamation-triangle" data-toggle="tooltip" :title="renderOutOfSync()"></i>
            </a>
          </div>
        </slot>
        <slot v-else>
          <div class="datasource-actions live">
            <a :id="'history-btn-'+this.id" class="control-btn history" @click="toggleHistory">
              <i class="fa fa-history"></i>
            </a>
          </div>
          <span :id="'current-time-'+this.id" v-if="realtime" v-html=parseTime(realtime)></span>
          <v-chip
              x-small
              class="ma-2 live"
              color="red"
              text-color="white"
          >
            LIVE
          </v-chip>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import RangeSlider from '../../ext/ui/view/rangeslider/RangeSliderView.js';
import {randomUUID} from '../../core/utils/Utils.js';
import {isDefined} from '../../core/utils/Utils';
import {Status as STATUS} from "../../core/protocol/Status";
import {assertDefined, throttle, debounce} from "../../core/utils/Utils";
import {TIME_SYNCHRONIZER_TOPIC} from "../../core/Constants";
import {EventType} from "../../core/event/EventType";

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
  name: "TimeControl",
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
      type: Function
    }
  },
  data() {
    return {
      id: randomUUID(),
      speedId: randomUUID(),
      event: null,
      history: true,
      dataSourceObject: null,
      connected: true,
      startTime: null,
      endTime: null,
      realtime: null,
      minTime: null,
      maxTime: null,
      activateSpeedControl: true,
      speed: 1.0,
      interval: false,
      rangeSlider: null,
      bcTime: null,
      skipTime: 0,
      init: false,
      lastSynchronizedTimestamp: -1,
      outOfSync: {},
      waitForTimeChangedEvent: false
    };
  },
  watch: {
    event(newValue) {
      this.$emit('event', newValue);
    }
  },
  beforeMount() {
    if (!isDefined(this.parseTime)) {
      this.parseTime = this.parseDate;
    }
    assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
    this.dataSourceObject = this.getDataSourceObject();
    this.history = this.dataSourceObject.getStartTime() !== 'now';

  },
  async updated() {
    await this.initComp();
  },
  async mounted() {
    await this.initComp();
  },
  methods: {
    async initComp() {
      assertDefined(this.getDataSourceObject(), 'either dataSource properties or dataSynchronizer must be defined');
      if (!this.init) {

        this.connected = await this.dataSourceObject.isConnected();
        let minTime = this.dataSourceObject.getMinTime();
        let maxTime = this.dataSourceObject.getMaxTime();

        if (((isDefined(minTime) && isDefined(maxTime)) || this.dataSourceObject.getStartTime() !== 'now')) {
          if (isDefined(this.dataSourceObject.properties.replaySpeed)) {
            this.speed = this.dataSourceObject.properties.replaySpeed;
          } else {
            this.speed = 0.0;
            this.activateSpeedControl = false;
          }

          if (this.dataSourceObject.getStartTime() === 'now') {
            this.startTime = 'now';
            this.endTime = this.dataSourceObject.getEndTime();
            this.minTime = new Date(minTime).getTime();
            this.maxTime = new Date(maxTime).getTime();
          } else {
            if (isDefined(minTime)) {
              this.startTime = new Date(minTime).getTime();
            } else {
              this.startTime = this.dataSourceObject.getStartTime() === 'now' ?
                  new Date(Date.now()).getTime() : new Date(this.dataSourceObject.getStartTime()).getTime();
            }
            this.minTime = this.startTime;

            if (isDefined(maxTime)) {
              this.endTime = new Date(maxTime).getTime();
            } else {
              this.endTime = this.dataSourceObject.getEndTime() === 'now' ?
                  new Date(Date.now()).getTime() : new Date(this.dataSourceObject.getEndTime()).getTime();
            }
            this.maxTime = this.endTime;
          }
          // save the times after creating the component
          this.history = this.startTime !== 'now';
        } else {
          this.history = false;
        }

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
        const bc = new BroadcastChannel(this.dataSourceObject.getTopicId());
        bc.onmessage = (event) => {
          if (event.data.type === "status") {
            if (event.data.status === STATUS.DISCONNECTED) {
              this.connected = false;
            } else if (event.data.status === STATUS.CONNECTED) {
              this.connected = true;
            }
          }
        }

        this.createRangeSlider();

        this.updateTimeDebounce = debounce(this.updateTime.bind(this), this.debounce);
        this.setRangeSliderStartTimeThrottle = throttle(this.setRangeSliderStartTime.bind(this), this.debounce);
        this.displayConsoleWarningIncompatibleVersionThrottle =  throttle(this.displayConsoleWarningIncompatibleVersion.bind(this), this.debounce);
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
      this.bcTime = new BroadcastChannel(this.dataSourceObject.getTimeTopicId());
      this.bcTime.onmessage =  (message) => {
        if (this.history) {
          if(this.waitForTimeChangedEvent) {
            if(message.data.type ===  EventType.DATA) {
              this.displayConsoleWarningIncompatibleVersionThrottle();
            } else if(message.data.type ===  EventType.TIME_CHANGED) {
              this.waitForTimeChangedEvent = false;
            }
            return;
          }

          if (!this.interval && this.speed > 0.0 && !this.update) {
            // consider here datasynchronizer sends data in time order
            if (isDefined(this.dataSynchronizer)) {
              const contains = message.data.dataSourceId in this.outOfSync;
              if (message.data.timestamp < this.lastSynchronizedTimestamp) {
                if (!contains) {
                  if(isDefined(this.dataSynchronizer)) {
                    this.dataSynchronizer.dataSources.forEach(datasource => {
                      if(datasource.id === message.data.dataSourceId) {
                        this.outOfSync[datasource.id] = datasource;
                      }
                    });
                  } else {
                    this.outOfSync[message.data.dataSourceId] = this.dataSourceObject;
                  }
                }
                return;
              } else if (contains) {
                // check that the datasource is not out of sync anymore
                delete this.outOfSync[message.data.dataSourceId];
              }
            }
            this.lastSynchronizedTimestamp = message.data.timestamp;
            // }
            // check data if out of sync
            this.setStartTime(message.data.timestamp);
          }
        } else {
          this.realtime = message.data.timestamp;
        }
      }
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

        this.rangeSlider = new RangeSlider({
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
            if (this.history) {
              this.endTime = endTime;
            }

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
          const backwardTime = parseInt(this.startTime - this.skipTime);
          if (backwardTime > this.minTime) {
            this.startTime = backwardTime;
            this.setRangeSliderStartTimeThrottle(backwardTime);
          }
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
    }
    ,
    async updateTime(event) {
      // reset master time
      this.lastSynchronizedTimestamp = -1;
      this.outOfSync = {};
      this.waitForTimeChangedEvent = true;
      this.on('time-changed');
      this.update = false;
      this.dataSourceObject.setTimeRange(
          new Date(this.startTime).toISOString(),
          new Date(this.endTime).toISOString(),
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
      this.rangeSlider.setStartTime(timestamp);
    }
    ,

    setRangeSliderStartTimeThrottle() {
    }
    ,
    stopForward() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = false;
        this.update = true;
        this.updateTimeDebounce('forward');
      }
    }
    ,

    doFastForward() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          const forwardTime = parseInt(this.startTime + this.skipTime);
          if (forwardTime < this.maxTime) {
            this.startTime = new Date(forwardTime).getTime();
            this.setRangeSliderStartTimeThrottle(forwardTime);
          }
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
    async toggleHistory() {
      this.history = !this.history;

      if (!this.history) {
        this.dataSourceObject.setTimeRange(
            'now',
            new Date("2055-01-01T00:00:00Z").toISOString(),
            this.speed,
            true);
        document.getElementById(this.id).style.display = 'none';
      } else {
        this.dataSourceObject.setTimeRange(
            new Date(this.startTime).toISOString(),
            new Date(this.endTime).toISOString(),
            this.speed,
            false);
        document.getElementById(this.id).style.display = 'block';
      }
      this.$emit('event', 'end');
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
    on(eventName) {
      this.$emit('event', eventName);
    }
    ,
    parseDate(timestamp) {
      const date = new Date(timestamp);
      const smallDate = this.withLeadingZeros(date.getUTCFullYear()) + '-' + this.withLeadingZeros(date.getUTCMonth())
          + '-' + this.withLeadingZeros(date.getUTCDay());

      const smallTime = this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
          + this.withLeadingZeros(date.getUTCSeconds());

      return '<div class="box-time"><div><strong>' + smallTime + '</strong></div><div><i><small>(' + smallDate + ')</small></i></div></div>';
    },
    withLeadingZeros(dt) {
      return (dt < 10 ? '0' : '') + dt;
    },
    renderOutOfSync() {
      let content = '';
      for(let key in this.outOfSync) {
        content += this.outOfSync[key].name + ' is out of sync\n';
      }
      return content;
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
  align-items: center;
  justify-content: center;
  line-height: 15px;
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
