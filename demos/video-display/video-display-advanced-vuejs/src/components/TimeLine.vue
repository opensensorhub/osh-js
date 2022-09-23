<template>
  <v-container id="timeline-container"></v-container>
</template>

<script>
  import RangeSliderViewReplay from "osh-js/ext/ui/view/rangeslider/RangeSliderView.replay.js";

  export default {
    name: "TimeLine",
    props: ['dataSynchronizer'],
    data() {
      return {
        rangeSlider: null
      }
    },
    mounted() {
      this.rangeSlider = new RangeSliderViewReplay({
        container: "timeline-container",
        startTime: "2015-02-16T07:58:35Z",
        endTime: "2015-02-16T08:09:00Z",
        dataSynchronizer: this.dataSynchronizer
      });
    },
    destroyed() {
      this.rangeSlider.destroy();
    }
  }
</script>

<style scoped>
  .container {
    margin-right: 0;
    max-width: 100%;
    margin-left: 12px;
    margin-top: 12px;
    padding:0;
  }
</style>

<style>
  .noUi-value-horizontal {
    -webkit-transform: translate(-50%,50%);
    transform: translate(-76%,50%) rotate(-45deg);
    top: 50px;
  }

  .noUi-base, .noUi-connects {
    background: linear-gradient(to bottom,rgba(116,117,119,.8) 0,rgba(58,68,82,.8) 11%,rgba(46,50,56,.8) 46%,rgba(53,53,53,.8) 81%,rgba(53,53,53,.8) 100%);
    font-family: sans-serif;
    font-size: 13px;
    height: 100%;
    z-index: 0;
  }

  .noUi-connect {
    background: rgba(5,107,166,0.6);
  }

  [disabled] .noUi-connect {
    background: #FFF;
    opacity: 0.1;
  }
  .noUi-horizontal {
    height: 45px;
  }

  .noUi-horizontal .noUi-handle {
    top: 16px;
    visibility: hidden;
  }

  .noUi-pips-horizontal {
    height: 80px;
    top: 0;
    left: 0;
    width: 100%;
    position: unset;
    margin-top: -55px;
  }

  .noUi-marker-horizontal.noUi-marker {
    margin-left: -1px;
    width: 1px;
    height: 30%;
    bottom: 1px;
    background: #c3c3c3;
  }

  .osh-rangeslider-control {
    margin-left:8px;
  }

  .noUi-horizontal .noUi-handle {
    width: 10px;
    height: 28px;
    right: -5px;
  }

  .noUi-handle:after {
    left: 3px;
  }

  .noUi-handle:after, .noUi-handle:before {
    left: 5px;
  }

  .noUi-marker-horizontal.noUi-marker-large {
    height: 50%;
  }

  .noUi-value-horizontal {
    -webkit-transform: translate(-50%,50%);
    top: 2px;
    transform: translate(-35px, 0px);
    color: #fff;
  }

  .osh-rangeslider-control-select {
    margin-left: 8px;
  }
  .noUi-tooltip {
    width: 60px;
    height: 20px;
  }

  .noUi-tooltip {
    visibility: hidden;
  }

  .noUi-tooltip:after {
    visibility: visible;
    margin-left: -10px;
  }
</style>
