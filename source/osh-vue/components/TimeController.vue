<template>
  <div class="control">
    <div :id="id"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <slot v-if="history">
          <div class="datasource-actions" >
            <a :id="'history-btn-'+this.id" class="control-btn clicked history" @click="toggleHistory">
              <i class="fa fa-history"></i>
            </a>
            <div class="control-speed">
              <a :id="'speed-minus-btn-'+this.id" class="control-btn " @mouseleave="stopSpeed" @mouseup="stopSpeed" @mousedown="decSpeed">
                <i class="fa fa-minus"></i>
              </a>
              <span class="control-speed-content"><v-chip :id="speedId">{{speed.toFixed(2)}}x</v-chip></span>
              <a :id="'speed-plus-btn-'+this.id" class="control-btn"  @mouseleave="stopSpeed" @mouseup="stopSpeed" @mousedown="incSpeed">
                <i class="fa fa-plus"></i>
              </a>
            </div>
            <div class="control-back-for">
              <a :id="'fast-back-btn-'+this.id" class="control-btn"  @mouseleave="stopBackward" @mouseup="stopBackward" @mousedown="doBackward"> <i
                  class="fa fa-fast-backward"></i></a>
              <a :id="'pause-btn-'+this.id" class="control-btn control-btn-pause"  v-if="connected" @click="doPause"><i
                  class="fa fa-pause"></i></a>
              <a :id="'play-btn-'+this.id" class="control-btn control-btn-play"  v-else><i
                  class="fa fa-play" @click="doPlay"></i></a>
              <a :id="'fast-forward-btn-'+this.id" class="control-btn" @mouseleave="stopForward" @mouseup="stopForward" @mousedown="doFastForward"> <i
                  class="fa fa-fast-forward"></i></a>
            </div>
            <div class="control-time">
              <span :id="'current-time-'+this.id"></span>
              <span style="padding:0 10px 0 10px">/</span>
              <span :id="'end-time-'+this.id"></span>
            </div>
          </div>
        </slot>
        <slot v-else>
          <div class="datasource-actions" >
            <a :id="'history-btn-'+this.id" class="control-btn history" @click="toggleHistory">
              <i class="fa fa-history"></i>
            </a>
          </div>
          <span :id="'current-time-'+this.id"></span>
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
import RangeSlider from 'osh-ext/ui/view/rangeslider/RangeSliderView.js';
import {randomUUID} from 'osh/utils/Utils.js';
import {isDefined} from "osh/utils/Utils";
import {Status as STATUS} from "../../osh/dataconnector/Status";
import {assertBoolean, assertDefined, assertTrue} from "../../osh/utils/Utils";

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
    backward: {
      type: Number,
      default: () => 5000 // 5sec
    },
    forward: {
      type: Number,
      default: () => 5000 // 5sec
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
      lastStartTime: null,
      lastEndTime: null,
      dataSourceObject: null,
      connected: true,
      startTime: null,
      endTime: null,
      minTime: null,
      maxTime: null,
      speed: 1.0,
      interval:false,
      rangeSlider:null
    };
  },
  watch: {
    event(newValue) {
      this.$emit('event', newValue);
    },
    startTime() {
      const currentTimeElement = document.getElementById("current-time-" + this.id);
      currentTimeElement.innerHTML = this.parseTime(this.startTime);
    },
    endTime() {
      const endTimeElement = document.getElementById("end-time-" + this.id);
      if(isDefined(endTimeElement)) {
        endTimeElement.innerHTML = this.parseTime(this.endTime);
      }
    }
  },
  beforeMount() {
    this.dataSourceObject = this.getDataSourceObject();
    assertDefined(this.dataSourceObject, 'either dataSource properties or dataSynchronizer must be defined');

    this.history = this.dataSourceObject.getStartTime() !== 'now';
    if(!isDefined(this.parseTime)) {
      this.parseTime = this.parseDate;
    }
  },
  updated() {
    const currentTimeElement = document.getElementById("current-time-" + this.id);
    currentTimeElement.innerHTML = this.parseTime(this.startTime);

    const endTimeElement = document.getElementById("end-time-" + this.id);
    if(isDefined(endTimeElement)) {
      endTimeElement.innerHTML = this.parseTime(this.endTime);
    }
  },
  async mounted() {
    this.connected = await this.dataSourceObject.isConnected();
    let minTime = this.dataSourceObject.getMinTime();
    let maxTime = this.dataSourceObject.getMaxTime();

    if(((isDefined(minTime)  && isDefined(maxTime)) || this.dataSourceObject.getStartTime() !== 'now' )) {
      this.speed = this.dataSourceObject.getReplaySpeed();
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

      let dataSourceObj = {};

      if (isDefined(this.dataSynchronizer)) {
        dataSourceObj.dataSynchronizer = this.dataSynchronizer;
      } else {
        dataSourceObj.dataSource = this.dataSource;
      }

      this.rangeSlider = new RangeSlider({
        container: this.id,
        startTime: this.startTime,
        endTime: this.endTime,
        ...dataSourceObj,
        options: {}
      });

      this.rangeSlider.activate();

      this.rangeSlider.onChange = (startTime, endTime, type) => {
        if(!this.interval) {
          this.startTime = startTime;
          if (this.history) {
            this.lastStartTime = startTime;
            this.lastEndTime = endTime;
            this.endTime = endTime;
          }

          this.$emit('event', type);
        }
      }

      // save the times after creating the component
      this.history = this.startTime !== 'now';
    } else {
      this.history = false;

      // disabled the history button
      const historyButton = document.getElementById("history-btn-"+this.id);
      historyButton.setAttribute('disabled','');
      // listen for BC
      const bc = new BroadcastChannel(this.dataSourceObject.getTimeTopicId());
      bc.onmessage = (message) => {
        if(!this.interval) {
          this.startTime = message.data.timestamp;
        }
      }
    }

    // listen for datasource status
    const bc = new BroadcastChannel(this.dataSourceObject.getTopicId());
    bc.onmessage = (event) => {
      if (event.data.type === "status") {
        if(event.data.status === STATUS.DISCONNECTED) {
          this.connected = false;
        }
      } else if(event.data.type === 'data') {
        this.connected = true;
      }
    }
  },
  methods: {
    doBackward() {
      if(!this.interval) {
        this.interval = setInterval(() => {
          const backwardTime = parseInt(this.startTime - this.backward);
          if (backwardTime > this.minTime) {
            this.startTime = backwardTime;
          }
        }, 70);
      }
    },
    stopBackward(){
      clearInterval(this.interval)
      this.interval = false;

      this.updateTime();
      this.on('backward');
    },
    updateTime() {
      this.dataSourceObject.setTimeRange(
          new Date(this.startTime).toISOString(),
          new Date(this.endTime).toISOString(),
          this.speed,
          true
      );
    },
    stopForward(){
      clearInterval(this.interval)
      this.interval = false;

      this.updateTime();
      this.on('forward');
    },
    doFastForward() {
      if(!this.interval) {
        this.interval = setInterval(() => {
          const forwardTime = parseInt(this.startTime + this.forward);
          if(forwardTime < this.maxTime) {
            this.startTime = new Date(forwardTime).getTime();
          }
        }, 70);
      }
    },
    doPause() {
      this.connected = false;
      this.dataSourceObject.disconnect();
      //save current time
      this.on('pause');
    },
    doPlay() {
      this.connected = true;
      this.updateTime();
      this.on('play');
    },
    getDataSourceObject() {
      return (isDefined(this.dataSynchronizer)) ? this.dataSynchronizer : this.dataSource;
    },
    async toggleHistory() {
      if(!isDefined(this.rangeSlider)){
        return;
      }
      this.history = !this.history;

      if(this.history) {
        this.startTime = this.lastStartTime;
        this.endTime = this.lastEndTime;

        // reset slider position at the last history position
        this.rangeSlider.setTime(this.startTime, this.endTime);
      } else {
        this.lastStartTime = this.startTime;
        this.lastEndTime = this.endTime;

        this.startTime = 'now';
        this.endTime = new Date("2055-01-01T00:00:00Z").getTime();
      }

      if(!this.history) {
        this.dataSourceObject.setTimeRange(
            'now',
            new Date("2055-01-01T00:00:00Z").toISOString(),
            this.speed,
            true);
        this.rangeSlider.deactivate();
      } else {
        this.dataSourceObject.setTimeRange(
            new Date(this.startTime).toISOString(),
            new Date(this.endTime).toISOString(),
            this.speed,
            false);
        this.rangeSlider.activate();
      }

      this.$emit('event', 'slide');
    },
    incSpeed() {
      if(!this.interval){
        this.interval = setInterval(() => {
          if(this.speed > 10.0) {
            this.speed += 1.0;
          } else {
            this.speed += 0.1;
          }
        }, 70);
      }
      // this.speed += 0.2;
    },
    decSpeed() {
      if(this.speed >= 0.0) {
        if(!this.interval){
          this.interval = setInterval(() => {
            if(this.speed <= 0.1) {
              this.stopSpeed();
            } else {
              if(this.speed > 10.0) {
                this.speed -= 1.0;
              } else {
                this.speed -= 0.1;
              }
            }
          }, 70)
        }
      }
    },
    stopSpeed(){
      clearInterval(this.interval)
      this.interval = false;

      this.updateTime();
      this.on('replaySpeed');
    },
    on(eventName) {
      this.$emit('event', eventName);
    },
    parseDate(timestamp) {
      const date = new Date(timestamp);
      const smallDate =  this.withLeadingZeros(date.getUTCFullYear()) + '-' + this.withLeadingZeros(date.getUTCMonth())
          + '-' + this.withLeadingZeros(date.getUTCDay());

      const smallTime =  this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
          + this.withLeadingZeros(date.getUTCSeconds());

      return '<div class="box-time"><div><strong>' + smallTime + '</strong></div><div><i><small>(' + smallDate+ ')</small></i></div></div>';
    },
    withLeadingZeros(dt) {
      return (dt < 10 ? '0' : '') + dt;
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
  background: linear-gradient(to bottom,rgba(116,117,119,.8) 0,rgba(58,68,82,.8) 11%,rgba(46,50,56,.8) 46%,rgba(53,53,53,.8) 81%,rgba(53,53,53,.8) 100%);
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
  width: 50%;
  max-width: 450px;
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

.control .box-time  small {
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
}
.control-btn:active {
  color: #00B5B8;
}

.control .live {
  margin-left:10px;
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
  -webkit-transform: translate(-50%,80%);
  transform: translate(-50%,80%);
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
  background: rgba(0,0,0,0.25);
}
.control .noUi-connects {
  height: 34px;
  top: -15px;
}
</style>
