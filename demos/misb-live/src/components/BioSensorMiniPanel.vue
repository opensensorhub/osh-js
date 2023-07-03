<template>
  <v-card class="inspire">
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        permanent
        dark
        floating
        left
        width="640"
    >
      <div class="variant-title">ISA Biological Sensor</div>
      <v-divider></v-divider>
      <div class="icon-container">
        <v-btn
            icon
            right
            @click.stop="mini = !mini"
            dark
            class="chevron-right"
            v-if="!mini"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import {mapState, mapActions} from 'vuex'

const DISCONNECTED_ICON_COLOR = "#d50000";
const CONNECTED_ICON_COLOR = "#00AF2AFF"
const DEFAULT_ICON_COLOR = "#FFFFFF";

export default {
  name: "BioSensorMiniPanel",
  components: {
  },
  props: ['biologicalSensorsDataSource'],
  data() {
    return {
      drawer: true,
      mini: true
    }
  },
  methods: {
    ...mapActions([]
    ),
  }
}
</script>

<style scoped>
.inspire {
  position: absolute;
  top: 500px;
  left: 0;
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  background-color: rgba(0,0,0,0.6) !important;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
}

.inspire > aside {
  min-width: 80px;
  width: unset !important;
  max-width: 640px;
  padding-right: 5px;
}

.variant-title {
  color: white;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.chevron-right {
  position: absolute;
  right: 0;
}

.icon-container {
  display: flex;
  justify-content: space-around;
}
</style>
