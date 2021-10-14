<template>
  <v-card class="inspire">
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        permanent
        dark
        floating
        right
        width="640"
    >
      <div class="variant-title">MISB UAS</div>
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
        <v-btn
            icon
            dark
            title="Center on target location"
            @click.stop="panToDrone()"
        >
          <v-icon
              :color='(this.$store.state.drone.position.connected)? "#00AF2AFF" : "#d50000"'
          >mdi-map-marker</v-icon>
        </v-btn>
        <v-btn
            icon
            right
            @click.stop="mini = !mini"
            dark
            title="Video"
        >
          <v-icon
              :color='(this.$store.state.drone.video.connected)? "#00AF2AFF" : "#d50000"'
          >mdi-video</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show/hide Image draping"
            @click.stop="toggleDroneDraping()"
        >
          <v-icon
              :color='(this.$store.state.drone.draping)? "#00AF2AFF" : "#d50000"'
          >mdi-video-image</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show/hide footprint"
            @click.stop="toggleDroneFootprint()"
        >
          <v-icon
              :color='(this.$store.state.drone.footprint)? "#00AF2AFF" : "#d50000"'
          >mdi-vector-rectangle</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show/hide Field of view"
            @click.stop="toggleDroneFov()"
        >
          <v-icon
              :color='(this.$store.state.drone.fov)? "#00AF2AFF" : "#d50000"'
          >mdi-angle-acute mdi-rotate-135</v-icon>
        </v-btn>
      </div>
      <Video
          :video-data-source="videoDataSource"
          :show=!mini
      />
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import Video from './Video.vue';
import {mapState, mapActions} from 'vuex'

export default {
  name: "DroneMiniPanel",
  components: {
    Video
  },
  props: ['videoDataSource'],
  data() {
    return {
      drawer: true,
      mini: true
    }
  },
  methods: {
    ...mapActions(['toggleDroneSelection', 'toggleDroneFootprint', 'toggleDroneDraping', 'toggleDroneFov']
    ),
    panToDrone() {
      this.$root.$emit('pan_to_drone');
    }
  }
}
</script>

<style scoped>
.inspire {
  position: absolute;
  top: 220px;
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
