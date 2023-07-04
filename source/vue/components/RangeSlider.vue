<template>
  <div :id="id" class="range"></div>
</template>

<script>
import RangeSliderReplay from "../../ext/ui/view/rangeslider/RangeSliderView.replay";
import {randomUUID} from "../../core/utils/Utils";

export default {
  name: "RangeSlider",
  props: ['minTimestamp', 'maxTimestamp', 'interval', 'waitForTimeChangedEvent', 'currentTime'],
  watch: {
    minTimestamp() {
      this.rangeSlider.setTime(this.minTimestamp, this.maxTimestamp);
    },
    maxTimestamp() {
      this.rangeSlider.setTime(this.minTimestamp, this.maxTimestamp);
    }
  },
  data() {
    return {
      id: randomUUID(),
      rangeSlider: undefined
    }
  },
  mounted() {
    this.rangeSlider = new RangeSliderReplay({
      container: this.id,
      minTimeRange: new Date(this.minTimestamp).toISOString(),
      maxTimeRange: new Date(this.maxTimestamp).toISOString(),
      startTime: new Date(this.currentTime).toISOString(),
      debounce: 200,
      options: {}
    });

    let update = this.update;
    this.rangeSlider.onChange = (startTimestamp, endTimestamp, event) => {
      if (event === 'slide') {
        update = true;
        this.$emit('event', {
          name: 'model',
          update: true
        });
      } else if (event === 'end') {
        update = false;
        this.$emit('event', {
          name: 'model',
          update: false
        });
      }

      if (!this.interval) {
        this.$emit('event', {
          name: event,
          startTimestamp: startTimestamp,
          endTimestamp: endTimestamp
        });
      }
      if (event === 'end') {
        this.$emit('event', {
          name: 'doPlay'
        });
      }
    }
  },
  methods: {
    setStartTime(timestamp) {
      this.rangeSlider.setStartTime(timestamp);
    }
  },
  // vuejs 3.x
  beforeUnmount() {
    this.rangeSlider.destroy();
  },
  // vuejs 2.x
  beforeDestroy() {
    this.rangeSlider.destroy();
  }
}
</script>

<style scoped>

</style>
