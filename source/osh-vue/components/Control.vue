<template>
  <div class="control">
    <div :id="id"></div>
    <div class="buttons">
      <div class="actions"> <!-- Next Page Buttons -->
        <a id="fast-back-btn" class="control-btn"> <i class="fa fa-fast-backward"></i></a>
        <a id="pause-btn" class="control-btn"><i class="fa fa-pause"></i></a>
        <a id="play-btn" class="control-btn"><i class="fa fa-play"></i></a>
        <a id="fast-forward-btn" class="control-btn"> <i class="fa fa-fast-forward"></i></a>
      </div>
      <div class="time">
        <span id="current-time"></span>
        <span>/</span>
        <span id="end-time"></span>
      </div>
    </div>
  </div>
</template>

<script>
    import RangeSlider from 'osh-ext/ui/view/rangeslider/RangeSliderView.js';
    import {randomUUID} from 'osh/utils/Utils.js';
    import * as wNumb from 'wnumb';
    import {isDefined} from "../../osh/utils/Utils";

    export default {
        name: "Control",
        components: {},
        props: {
            dataSource: {
                type: Object
            },
            backward: {
                type: Number,
                default: () => 10
            },
            forward: {
                type: Number,
                default: () => 10
            }
        },
        data() {
            return {
                id: randomUUID(),
                event: null
            };
        },
        watch: {
          event(newValue){
            this.$emit('event', newValue);
          }
        },
        mounted() {
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
            const currentTimeElement = document.getElementById("current-time");
            const endTimeElement = document.getElementById("end-time");

            currentTimeElement.innerText = this.parseDate(this.dataSource.properties.startTime);
            endTimeElement.innerText = this.parseDate(this.dataSource.properties.endTime);

            rangeSlider.slider.noUiSlider.on('set', () => {
              const date = parseInt(rangeSlider.slider.noUiSlider.get());
              currentTimeElement.innerText = that.parseDate(date);
            });

            rangeSlider.onChange = function (startTime, endTime) {
                if(that.dataSource.connected) {
                    that.dataSource.disconnect();
                    // get current parameters
                    let props = that.dataSource.properties;
                    let options = that.dataSource.options;

                    // update start/end time
                    if (isDefined(startTime)) {
                        const intValue = parseInt(startTime);
                        props.startTime = new Date(intValue).toISOString();
                        currentTimeElement.innerText = that.parseDate(intValue);
                    }
                    if (isDefined(endTime)) {
                      const intValue = parseInt(endTime);
                      props.endTime = new Date(intValue).toISOString();
                      endTimeElement.innerText = that.parseDate(intValue);
                    }

                    // reset parameters
                    that.dataSource.initDataSource(props, options);
                    that.dataSource.connect();
                }
            };

            rangeSlider.slider.noUiSlider.on('start', () => this.on('start'));
            rangeSlider.slider.noUiSlider.on('end', () => this.on('end'));

            const pauseButton = document.getElementById("pause-btn");
            const playButton = document.getElementById("play-btn");
            const fastBackwardButton = document.getElementById("fast-back-btn");
            const fastForwardButton = document.getElementById("fast-forward-btn");

            pauseButton.onclick = () => {
                if(that.dataSource.connected) {
                    that.dataSource.disconnect();
                    //save current time

                    // get current parameters
                    let props = that.dataSource.properties;
                    let options = that.dataSource.options;

                    props.startTime = new Date(parseInt(rangeSlider.slider.noUiSlider.get())).toISOString();

                    // re-init the DS from the last timestamp  played
                    that.dataSource.initDataSource(props, options);

                }
            }

            playButton.onclick = () => {
                if(!that.dataSource.connected) {
                    that.dataSource.connect();
                }
            }

            fastBackwardButton.onclick = () => {
                if(that.dataSource.connected) {
                    that.dataSource.disconnect();
                    let props = that.dataSource.properties;
                    let options = that.dataSource.options;
                    props.startTime = new Date(parseInt(new Date(props.startTime).getTime() - that.forward*1000)).toISOString();
                    currentTimeElement.innerText = that.parseDate(props.startTime);
                    // reset parameters
                    that.dataSource.initDataSource(props, options);
                    that.dataSource.connect();
                }
            }
            fastForwardButton.onclick = () => {
                if(that.dataSource.connected) {
                    that.dataSource.disconnect();
                    let props = that.dataSource.properties;
                    let options = that.dataSource.options;
                    props.startTime = new Date(parseInt(new Date(props.startTime).getTime() + that.forward*1000)).toISOString();
                    currentTimeElement.innerText = that.parseDate(props.startTime);
                    // reset parameters
                    that.dataSource.initDataSource(props, options);
                    that.dataSource.connect();
                }
            }
        },
        methods: {
            on(eventName) {
              this.event = eventName;
            },
            parseDate(intTimeStamp) {
                const date = new Date(intTimeStamp);
                return this.hoursWithLeadingZeros(date)+":"+this.minutesWithLeadingZeros(date)+":"
                    +this.secondsWithLeadingZeros(date);
            },
            minutesWithLeadingZeros(dt) {
                return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
            },
            hoursWithLeadingZeros(dt) {
                return (dt.getHours() < 10 ? '0' : '') + dt.getHours();
            },
            secondsWithLeadingZeros(dt) {
                return (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
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
  }

</style>

<style>
  /** reduce bar size **/
  .control .noUi-horizontal {
    height: 2px;
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
    float:right;
  }

  .control .buttons {
    padding: 12px 8px 8px 8px;
    color: lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .control-btn {
    padding: 0px 5px 0px 5px;
  }
  .control-btn:hover {
    cursor: pointer;
    color: #00B5B8;
  }
  .control-btn:active {
    color:#00B5B8;
  }
  .control .time {
  }

  .control .buttons .actions {
    width: 115px;
    display: inline;
  }

  .control .buttons .time {
    font-size: 16px;
  }
</style>
