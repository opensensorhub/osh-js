<template>
  <div :id="id" class="range"></div>
</template>

<script>
import {randomUUID} from "../../core/utils/Utils";
import RangeSliderViewRealtime from "../../ext/ui/view/rangeslider/RangeSliderView.realtime";

export default {
  name: "RangeSliderRealtime",
  props: ['startTimestamp','dataSynchronizer'],
  data() {
    return {
      id: randomUUID(),
      rangeSlider: undefined
    }
  },
  mounted() {
    this.rangeSlider = new RangeSliderViewRealtime({
      container: this.id,
      debounce: 200,
      dataSynchronizer: this.dataSynchronizer,
      startTimestamp: Date.now(),
      options: {}
    });
  },
  methods: {
    setStartTime(timestamp) {
      this.rangeSlider.setStartTime(timestamp);
    },
    destroy() {
      if(this.rangeSlider) {
        this.rangeSlider.destroy();
      }
    }
  },
  // vuejs 3.x
  beforeUnmount() {
    this.destroy();
  },
  // vuejs 2.x
  beforeDestroy() {
    this.destroy();
  }
}
</script>

<style scoped>

</style>
