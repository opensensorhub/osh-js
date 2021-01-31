<template>
  <div class="control">
    <div :id="id"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <slot v-if="history">
          <div class="datasource-actions" >
            <a :id="'history-btn-'+this.id" class="control-btn clicked" @click="toggleHistory">
              <i class="fa fa-history"></i>
            </a>
            <a :id="'fast-back-btn-'+this.id" class="control-btn" @click="doFastBackward"> <i
                class="fa fa-fast-backward"></i></a>
            <a :id="'pause-btn-'+this.id" class="control-btn control-btn-pause"  v-if="connected" @click="doPause"><i
                class="fa fa-pause"></i></a>
            <a :id="'play-btn-'+this.id" class="control-btn control-btn-play"  v-else><i
                class="fa fa-play" @click="doPlay"></i></a>
            <a :id="'fast-forward-btn-'+this.id" class="control-btn" @click="doFastForward"> <i
                class="fa fa-fast-forward"></i></a>
          </div>
          <div class="time">
            <span :id="'current-time-'+this.id"></span>
            <span>/</span>
            <span :id="'end-time-'+this.id"></span>
          </div>
        </slot>
        <slot v-else>
          <div class="datasource-actions" >
            <a :id="'history-btn-'+this.id" class="control-btn" @click="toggleHistory">
              <i class="fa fa-history"></i>
            </a>
          </div>
          <div class="time">
            <span :id="'current-time-'+this.id"></span>
            <v-chip
                x-small
                class="ma-2"
                color="red"
                text-color="white"
            >
              LIVE
            </v-chip>
          </div>
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

export default {
  name: "TimeControl",
  components: {},
  props: {
    dataSource: {
      type: Object
    },
    backward: {
      type: Number,
      default: () => 5000 // 5sec
    },
    forward: {
      type: Number,
      default: () => 5000 // 5sec
    }
  },
  data() {
    return {
      id: randomUUID(),
      event: null,
      history: true,
      lastStartTime: null,
      lastEndTime: null,
      dataSourceObject: null,
      connected: true,
      startTime: null,
      endTime: null
    };
  },
  watch: {
    event(newValue) {
      this.$emit('event', newValue);
    },
    startTime() {
      const currentTimeElement = document.getElementById("current-time-" + this.id);
      currentTimeElement.innerText = this.parseDate(this.startTime);
    },
    endTime(){
      const endTimeElement = document.getElementById("end-time-" + this.id);
      console.log(endTimeElement, this.endTime);
      endTimeElement.innerText = this.parseDate(this.endTime);
    }
  },
  beforeMount() {
    this.history = this.dataSource.properties.startTime !== 'now';
  },
  async mounted() {
    this.dataSourceObject = this.getDataSourceObject();
    this.connected = await this.dataSourceObject.isConnected();
    this.startTime = new Date(await this.dataSourceObject.getStartTime()).getTime();
    this.endTime = new Date(await this.dataSourceObject.getEndTime()).getTime();

    let dataSourceObj = {};

    if(isDefined(this.dataSource.dataSynchronizer)) {
      dataSourceObj.dataSynchronizer = this.dataSource.dataSynchronizer;
    } else {
      dataSourceObj.dataSource = this.dataSource;
    }

    let rangeSlider = new RangeSlider({
      container: this.id,
      startTime: this.startTime,
      endTime: this.endTime,
      ...dataSourceObj,
      options: {
      }
    });

    rangeSlider.activate();

    rangeSlider.onChange = (startTime, endTime, type) => {
      this.startTime = startTime;
      if(this.history) {
        this.endTime = endTime;
      }
      this.$emit('event', type);
    }

    // save the times after creating the component
    this.history = this.startTime !== 'now';

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
    doFastBackward() {
      // reset parameters
      const that = this;
      this.dataSourceObject.setTimeRange(
          new Date(parseInt(this.startTime - that.backward * 1000)).toISOString(),
          that.dataSourceObject.getEndTime(),
          that.dataSourceObject.getReplaySpeed(),
          true
      );
      this.on('backward');
    },
    doFastForward() {
      // reset parameters
      const that = this;
      this.dataSourceObject.setTimeRange(
          new Date(parseInt(this.startTime + that.forward * 1000)).toISOString(),
          this.dataSourceObject.getEndTime(),
          this.dataSourceObject.getReplaySpeed(),
          true);
      this.on('forward');
    },
    doPause() {
      this.dataSourceObject.disconnect();
      //save current time
      this.on('pause');
    },
    doPlay() {
      this.dataSourceObject.setTimeRange(
          new Date(this.startTime).toISOString(),
          new Date(this.endTime).toISOString(),
          this.dataSourceObject.getReplaySpeed(),
          true
      );
      this.on('play');
    },
    getDataSourceObject() {
      return (isDefined(this.dataSource.dataSynchronizer)) ? this.dataSource.dataSynchronizer :
          this.dataSource;
    },
    async toggleHistory() {
      this.history = !this.history;

      if(this.history) {
        this.startTime = this.lastStartTime;
        this.endTime = this.lastEndTime;
      } else {
        this.lastStartTime = this.startTime;
        this.lastEndTime = this.endTime;

        this.startTime = 'now';
        this.endTime = new Date("2055-01-01T00:00:00Z").getTime();
      }

      this.dataSourceObject.setTimeRange(
          new Date(this.startTime).toISOString(),
          new Date(this.endTime).toISOString(),
          this.dataSourceObject.getReplaySpeed(),
          !this.history);
      this.$emit('event', 'slide');
    },

    on(eventName) {
      this.$emit('event', eventName);
    },
    parseDate(intTimeStamp) {
      const date = new Date(intTimeStamp);
      return this.withLeadingZeros(date.getHours()) + ":" + this.withLeadingZeros(date.getMinutes()) + ":"
          + this.withLeadingZeros(date.getSeconds());
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

.noUi-connects {
  border-radius: 0px;
}

.control .noUi-target {
  background: #FAFAFA;
  border-radius: unset;
  border: unset;
  box-shadow: unset;
}

/** remove pips **/
.control .noUi-pips {
  display: none;
}

/** reduce handles **/
.control .noUi-horizontal .noUi-handle {
  height: 10px;
  width: 10px;
  top: -4px;
  right: -4px;
}

.control .noUi-active {
  box-shadow: unset;
}

.control .noUi-handle {
  border-radius: 50%;
  background: #FFF;
  border: 2px solid #00B5B8;
}

.control .noUi-handle:active {
  box-shadow: none;
  background-color: rgba(5, 107, 166, 0.6);
  border-radius: 50%;
  border: 2px solid #00B5B8;
}

.control .noUi-handle:after, .noUi-handle:before {
  display: none;
}

.noUi-horizontal {
  width: 100%;
}

/*.control .noUi-horizontal .noUi-handle-lower .noUi-tooltip {*/
/*  display: none;*/
/*}*/

.control button svg, .control a svg {
  width: 30px;
}

/*.control .ytp-time-display {*/
/*  width: 150px;*/
/*  float: right;*/
/*}*/

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

.control-btn:active {
  color: #00B5B8;
}

.control .time {
  float: right;
  margin-left:10px;
}

.control .buttons .actions {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
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
</style>
