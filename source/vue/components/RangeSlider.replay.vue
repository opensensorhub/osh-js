<template>
  <div :id="id" class="range"></div>
</template>

<script>
import RangeSliderReplay from "../../ext/ui/view/rangeslider/RangeSliderView.replay";
import {isDefined, randomUUID} from "../../core/utils/Utils";
import dataSynchronizer from "../../core/timesync/DataSynchronizer";

export default {
  name: "RangeSliderReplay",
  props: ['minTimestamp', 'maxTimestamp', 'startTimestamp', 'endTimestamp', 'interval', 'waitForTimeChangedEvent', 'dataSynchronizer'],
  watch: {
    minTimestamp() {
      this.rangeSlider.setTimeRange(this.minTimestamp, this.maxTimestamp);
    },
    maxTimestamp() {
      this.rangeSlider.setTimeRange(this.minTimestamp, this.maxTimestamp);
    },
    startTimestamp() {
      this.rangeSlider.setTime(this.startTimestamp, this.endTimestamp);
    },
    endTimestamp() {
      this.rangeSlider.setTime(this.startTimestamp, this.endTimestamp);
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
      startTime: new Date(this.startTimestamp).toISOString(),
      endTime: new Date(this.endTimestamp).toISOString(),
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

    if (isDefined(this.dataSynchronizer)) {
      // add listen on disabling if no datasources
      this.dataSynchronizer.onRemovedDataSource = function (dataSourceId) {
        if (this.dataSynchronizer.getDataSources().length === 0 && isDefined(this.rangeSlider)) {
          // To disable
          this.rangeSlider.disable();
        }
      }.bind(this);

      this.dataSynchronizer.onAddedDataSource = function (dataSourceId) {
        if (this.dataSynchronizer.getDataSources().length > 0 && isDefined(this.rangeSlider)) {
          // To disable
          this.rangeSlider.enable();
        }
      }.bind(this);
    }
  },
  methods: {
    setStartTime(timestamp) {
      this.rangeSlider.setStartTime(timestamp);
    }
  },
  // vuejs 3.x
  beforeUnmount() {
    if (this.rangeSlider) {
      this.rangeSlider.destroy();
    }
  },
  // vuejs 2.x
  beforeDestroy() {
    if (this.rangeSlider) {
      this.rangeSlider.destroy();
    }
  }
}
</script>

<style scoped>

</style>
