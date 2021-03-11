<template>
  <div class="container">
    <infinite-loading spinner="spiral" v-if="data.length === 0"></infinite-loading>
    <HistogramSlider
        :bar-height="100"
        :data="data"
        :prettify="prettify"
        :drag-interval="true"
        :force-edges="false"
        :handleSize="12"
        :barRadius="0"
        :barGap="5"
        :barWidth="4"
        :histSliderGap="5"
        primaryColor='#21afca'
        holderColor='#6a7485'
        :min="min"
        :max="max"
        class="time-range-slider"
        :key="componentKey"
        @finish="finish"
        @change="finish"
        v-else
    />
  </div>
</template>

<script>
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';
import InfiniteLoading from 'vue-infinite-loading';
import {isDefined} from "osh-js/core/utils/Utils";

export default {
  name: "TimeRangeSlider",
  components: {
    HistogramSlider,
    InfiniteLoading
  },
  props: ['loaded'],
  data() {
    return {
      // data: data.map(d => new Date(d)),
      data: [],
      componentKey: 0,
      min: new Date('1970-01-01T00:00:00.000Z').valueOf(),
      max: Date.now(),
      prettify: function (ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
        });
      }
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    finish(event) {
      this.$store.dispatch('setTimeRange',
          {
            startTime: event.from,
            endTime: event.to
          });
    }
  },
  watch: {
    loaded() {
      const nv = this.$store.state.all;
      const d = [];
      for(let idx in nv) {
        for(let value of nv[idx].values) {
          if(isDefined(value)) {
            d.push(new Date(value).valueOf());
          }
        }
      }
      d.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      if(d.length > 2) {
        this.min = new Date(d[0]).getTime();
        this.max = new Date(d[d.length-1]).getTime();
      }
      this.data = d;
      this.componentKey = this.componentKey+1;
    }
  }
}
</script>

<style scoped>
.time-range-slider {
  position: absolute;
  margin:10px;
  background-color: rgb(41, 50, 60);
}
.container{
  width: 700px;
  background-color: rgb(41, 50, 60);
  height: 160px;
  margin:auto;
  left: 0;
  right: 0;
  bottom:10px;
}
</style>
<style>
</style>
