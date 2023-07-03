<template>
  <v-card class="inspire">
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        permanent
        dark
        floating
        right
        clipped
        width="640"
    >
      <div class="variant-title">MISB UAS</div>
      <v-divider></v-divider>
      <div class="icon-container">
        <v-btn
            icon
            dark
            title="Center on drone location"
            @click.stop="panToDrone()"
        >
          <v-icon
              :color='(this.$store.state.drone.platformLocation.connected)? "#00AF2AFF" : "#d50000"'
          >mdi-map-marker</v-icon>
        </v-btn>
        <v-btn
            icon
            right
            @click.stop="toggleUiDroneVideo()"
            dark
            title="Video"
        >
          <v-icon
              :color='getVideoIconColor()'
          >mdi-video</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show/hide Image draping"
            @click.stop="toggleUiDraping()"
        >
          <v-icon
              :color='getDrapingIconColor()'
          >mdi-video-image</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show/hide footprint"
            @click.stop="toggleUiFootprint()"
        >
          <v-icon
              :color='getFootprintIconColor()'
          >mdi-vector-rectangle</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show/hide Field of view"
            @click.stop="toggleUiFov()"
        >
          <v-icon
              :color='getFovIconColor()'
          >mdi-angle-acute mdi-rotate-135</v-icon>
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
  name: "DroneMiniPanel",
  components: {},
  props: ['videoDataSource'],
  data() {
    return {
      drawer: true,
      mini: true
    }
  },
  methods: {
    ...mapActions(['toggleUiDroneSelection', 'toggleUiFootprint', 'toggleUiDraping', 'toggleUiFov', 'toggleUiDroneVideo']),
    panToDrone() {
      this.$root.$emit('pan_to_drone');
    },
    getVideoIconColor() {
      if(!this.$store.state.drone.video.connected) {
        return DISCONNECTED_ICON_COLOR;
      } else if(this.$store.state.ui.droneVideo) {
        return CONNECTED_ICON_COLOR;
      } else {
        return DEFAULT_ICON_COLOR;
      }
    },
    getDrapingIconColor() {
      if(!this.$store.state.drone.video.connected) {
        return DISCONNECTED_ICON_COLOR;
      } else if(this.$store.state.ui.draping) {
        return CONNECTED_ICON_COLOR;
      } else {
        return DEFAULT_ICON_COLOR;
      }
    },
    getFootprintIconColor() {
      if(!this.$store.state.geoRefImage.connected) {
        return DISCONNECTED_ICON_COLOR;
      } else if(this.$store.state.ui.footprint) {
        return CONNECTED_ICON_COLOR;
      } else {
        return DEFAULT_ICON_COLOR;
      }
    },
    getFovIconColor() {
      if(!this.$store.state.drone.vFov.connected) {
        return DISCONNECTED_ICON_COLOR;
      } else if(this.$store.state.ui.fov) {
        return CONNECTED_ICON_COLOR;
      } else {
        return DEFAULT_ICON_COLOR;
      }
    }
  }
}
</script>

<style scoped>
.inspire {
  position: absolute;
  top: calc(35% + 20px);
  right: 0;
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
  min-width: 20px;
  width: unset !important;
  max-width: 66px;
  padding-right: 5px;
}

.variant-title {
  color: white;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
