<template>
  <div class="control">
    <div :id="id"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <div class="datasource-actions">
          <a :id="'fast-back-btn-'+this.id" class="control-btn" v-if="showDataSourceActions"> <i
              class="fa fa-fast-backward"></i></a>
          <a :id="'pause-btn-'+this.id" class="control-btn control-btn-pause" v-if="showDataSourceActions"><i
              class="fa fa-pause"></i></a>
          <a :id="'fast-forward-btn-'+this.id" class="control-btn" v-if="showDataSourceActions"> <i
              class="fa fa-fast-forward"></i></a>
        </div>
        <div class="time">
          <span :id="'current-time-'+this.id"></span>
          <span v-if="showDataSourceActions">/</span>
          <span :id="'end-time-'+this.id" v-if="showDataSourceActions"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RangeSlider from 'osh-ext/ui/view/rangeslider/RangeSliderView.js';
import {randomUUID} from 'osh-js/utils/Utils.js';
import * as wNumb from 'wnumb';
import {isDefined} from "../../osh-js/utils/Utils";
import VideoControl from "./video/VideoControl.vue";

export default {
  name: "Control",
  components: {VideoControl},
  props: {
    dataSource: {
      type: Object
    },
    backward: {
      type: Number,
      default: () => 5
    },
    forward: {
      type: Number,
      default: () => 5
    }
  },
  data() {
    return {
      id: randomUUID(),
      event: null,
      showDataSourceActions: true
    };
  },
  watch: {
    event(newValue) {
      this.$emit('event', newValue);
    }
  },
  beforeMount() {
    this.showDataSourceActions = this.dataSource.properties.startTime !== 'now';
  },
  mounted() {
    const dataSourceObject = this.getDataSourceObject();

    if (this.showDataSourceActions) {
      let rangeSlider = new RangeSlider(this.id, {
        dataSourceId: this.dataSource.id,
        startTime: this.dataSource.properties.startTime,
        endTime: this.dataSource.properties.endTime,
        refreshRate: 1,
        options: {
          start: [this.dataSource.properties.startTime],
          behaviour: "none",
          tooltips: [
            wNumb({
              decimals: 1,
              edit: function (value) {
                let date = new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
                return date.split("T")[1].split("Z")[0].split(".")[0];
              }
            })
          ],
          connect: 'lower'
        }
      });

      rangeSlider.activate();

      const that = this;
      const currentTimeElement = document.getElementById("current-time-" + this.id);
      const endTimeElement = document.getElementById("end-time-" + this.id);

      currentTimeElement.innerText = this.parseDate(this.dataSource.properties.startTime);
      if (isDefined(endTimeElement)) {
        endTimeElement.innerText = this.parseDate(this.dataSource.properties.endTime);
      }

      rangeSlider.slider.noUiSlider.on('set', () => {
        const date = parseInt(rangeSlider.slider.noUiSlider.get());
        currentTimeElement.innerText = that.parseDate(date);
      });

      rangeSlider.onChange = function (startTime, endTime) {
        const stTime = isDefined(startTime)? new Date(parseInt(startTime)).toISOString(): dataSourceObject.getStartTime();
        const ndTime = isDefined(endTime)? new Date(parseInt(endTime)).toISOString(): dataSourceObject.getEndTime();

        dataSourceObject.setTimeRange(stTime,ndTime,dataSourceObject.getReplaySpeed());
      };

      rangeSlider.slider.noUiSlider.on('start', () => this.on('start'));
      rangeSlider.slider.noUiSlider.on('end', () => this.on('end'));

      const pauseButton = document.getElementById("pause-btn-" + this.id);
      // const playButton = document.getElementById("play-btn");
      const fastBackwardButton = document.getElementById("fast-back-btn-" + this.id);
      const fastForwardButton = document.getElementById("fast-forward-btn-" + this.id);
      let pause = false;


      fastBackwardButton.onclick = () => {
        currentTimeElement.innerText = that.parseDate(dataSourceObject.getStartTime());
        // reset parameters
        dataSourceObject.getCurrentTime().then(time => {
          dataSourceObject.setTimeRange(
              new Date(parseInt(time - that.backward * 1000)).toISOString(),
              dataSourceObject.getEndTime(),
              dataSourceObject.getReplaySpeed()
          );
          this.on('backward');
          this.on('play');
        });

      }
      fastForwardButton.onclick = () => {
        currentTimeElement.innerText = that.parseDate(dataSourceObject.getStartTime());
        // reset parameters
        dataSourceObject.getCurrentTime().then(time => {
          dataSourceObject.setTimeRange(
              new Date(parseInt(time + that.forward * 1000)).toISOString(),
              dataSourceObject.getEndTime(),
              dataSourceObject.getReplaySpeed()
          );
          this.on('forward');
          this.on('play');
        });
      }

      pauseButton.onclick = async () => {
          if (!pause) {
            pause = true;
            dataSourceObject.disconnect();
            //save current time
            this.on('pause');
          } else {
            pause = false;
            dataSourceObject.getCurrentTime().then(time => {
              dataSourceObject.setTimeRange(
                  new Date(parseInt(time)).toISOString(),
                  dataSourceObject.getEndTime(),
                  dataSourceObject.getReplaySpeed()
              );
              dataSourceObject.connect();
              this.on('play');
            });
        }
      }
    } else {
      // REAL TIME
      // get time from DS
      const currentTimeElement = document.getElementById("current-time-" + this.id);
      setInterval(() => {
        dataSourceObject.getCurrentTime().then(timestamp => {
          let date = new Date(timestamp);
          currentTimeElement.innerText =
              this.withLeadingZeros(date.getHours()) + ":" + this.withLeadingZeros(date.getMinutes())
              + ":" + this.withLeadingZeros(date.getSeconds()) + " " +
              date.getFullYear() + "/" + this.withLeadingZeros(date.getMonth()) + "/" + this.withLeadingZeros(date.getDay())
        })
      }, 500);
    }
  },
  methods: {
    getDataSourceObject() {
      return (isDefined(this.dataSource.dataSynchronizer)) ? this.dataSource.dataSynchronizer :
          this.dataSource;
    },
    on(eventName) {
      this.$emit('event', eventName);
      if (eventName === 'pause') {
        const currentTemplate = document.getElementById(this.id).nextElementSibling;
        const elt = currentTemplate.querySelector(".control-btn-pause > i");
        elt.classList.remove("fa-pause");
        elt.classList.add("fa-play");
      } else if (eventName === 'play') {
        const currentTemplate = document.getElementById(this.id).nextElementSibling;
        const elt = currentTemplate.querySelector(".control-btn-pause > i");
        elt.classList.remove("fa-play");
        elt.classList.add("fa-pause");
      }
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

.control .noUi-horizontal .noUi-handle-lower .noUi-tooltip {
  display: none;
}

.control button svg, .control a svg {
  width: 30px;
}

.control .ytp-time-display {
  width: 150px;
  float: right;
}

.control .buttons {
  color: lightgray;
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
