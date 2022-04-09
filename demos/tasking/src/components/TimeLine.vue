<template>
  <v-timeline
      dense
      clipped
      class="timeline"
  >
      <v-timeline-item
          v-for="item in items"
          :key="item.key"
          class="mb-4 timeline-item"
          :color="item.status === 'COMPLETED' ? 'green': item.status === 'EXECUTING' ? 'yellow' : 'grey'"
          icon-color="grey lighten-2"
          small
      >
        <v-row justify="space-between">
          <v-col cols="2" class="time-item-content">
            <v-progress-circular
                :rotate="360"
                :size="45"
                :width="4"
                :value="item.progress"
                color="teal"
            >
              {{  item.progress }}
            </v-progress-circular>
          </v-col>
          <v-col cols="5" class="time-item-content">
            {{  item.type }} {{ item.status }}
          </v-col>
          <v-col
              class="text-right"
              cols="4"
          >
            {{  getDate(item.time) }}
            {{  getTime(item.time) }}
          </v-col>
        </v-row>
      </v-timeline-item>
  </v-timeline>
</template>

<script>
import ControlFilter from "osh-js/core/sweapi/control/ControlFilter";

export default {
  name: "TimeLine",
  data() {
    return {
      items: [],
      maxItems: 5
    }
  },
  props: [
    'control'
  ],
  mounted() {
    this.control.streamStatus(new ControlFilter({}), async (message) => {
      const status = message;
      this.textStatus = status;

      const command = await this.control.getCommandById(status['command@id']);

      await this.$store.dispatch('setCommand', {
        ...command.properties,
        progress: status.progress || ((command.properties.status === 'COMPLETED') ? 100 : 0)
      });

      this.items = Array.from(this.$store.state.commands, ([key, value]) => (
          {
            key: key,
            type:Object.keys(value.params)[0],
            status: value.status,
            time: value.issueTime,
            progress: value.progress
          }
      ));

      while(this.items.length > this.maxItems) {
        if(this.items[0].status === 'EXECUTING') {
          // do not remove at this point
          break;
        }
        const item = this.items.shift();
        this.$store.dispatch('removeCommand', item.key);
      }
    });
  },
  methods: {
    getDate(date) {
      const cd = new Date(date);
      return this.zeroPadding(cd.getUTCFullYear(), 4) + '/' + this.zeroPadding(cd.getUTCMonth(), 2) + '/' + this.zeroPadding(cd.getUTCDay(), 2);
    },
    getTime(date) {
      const cd = new Date(date);
      return this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  }
}
</script>

<style scoped>
.timeline {
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;
}

.timeline-item{
  align-content: center;
  align-self: center;
  align-items: center;
  text-align: center;
}
</style>
