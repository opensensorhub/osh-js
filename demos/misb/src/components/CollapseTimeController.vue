<template>
  <div class="container">
    <transition
        name="slide"
    >
      <div class="sub-container"
           v-show="!mini"
      >
        <TimeController
            :dataSynchronizer="dataSynchronizer"
            @event='onControlEvent'
            trackRealtime=""
            :skipTimeStep="'5%'"
        ></TimeController>
        <v-btn
            icon
            left
            dark
            class="collapse-button right"
            @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </transition>
    <transition
        name="slide"
    >
      <v-btn
          icon
          left
          dark
          class="collapse-button mini"
          @click.stop="mini = !mini"
          v-show="mini"
          x-large
          title="Time controller"
      >
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </transition>
  </div>
</template>

<script>
import TimeController from 'osh-js/vue/components/TimeController.vue';
import {mapState, mapActions} from 'vuex'

export default {
  name: "CollapseTimeController",
  components: {
    TimeController
  },
  data() {
    return {
      mini: false,
    }
  },
  props: ['dataSynchronizer'/*,'biologicalSensorsDataSource'*/],
  methods: {
    ...mapActions(['updateUiStatus']),
    onControlEvent(props) {
      if(props.event === 'time-changed') {
        // this.biologicalSensorsDataSource.connect();
      }
    }
  }
}
</script>

<style>
.noUi-connect {
  height: 70%;
  top: 6px;
}

.control .noUi-horizontal .noUi-handle {
  width: 17px;
  height: 22px;
  right: -10px;
  top: -8px;
}

.noUi-handle:after, .noUi-handle:before {
  top: 4px;
}

.control {
  z-index: 20;
  position: absolute;
  bottom: 5px;
  width: 50%;
  margin: auto;
  right: 0;
  left: 0;
}

.noUi-value-horizontal {
  top: 6px; /* because font-size is smaller, we have to add some padding at the bottom of the ticks */
}
</style>
<style scoped>
.container {
  z-index: 20;
  bottom: 0px;
  font-size: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.control {
  width: calc(100% - 20px);
  padding: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  background-color: #363636 !important;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
}

.sub-container {
  display: flex;
  width: 50%;
  justify-content: center;
  bottom: 0px;
  margin-bottom: 5px;
  position: absolute;
  align-items: center;
  z-index: 50;
}

.collapse-button {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  width: 20px;
}

.collapse-button.mini {
  margin-right: 5px;
  position: absolute;
  right: 0;
  bottom: 10px;
}

.collapse-button.right {
  margin-left: 15px;
}

</style>
<style>
.slide-leave-active,
.slide-enter-active {
  transition: .3s;
  transition-timing-function: linear;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}
</style>
