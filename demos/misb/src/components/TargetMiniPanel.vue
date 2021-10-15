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
      <div class="variant-title">Target (s)</div>
      <v-divider></v-divider>
      <div class="icon-container">
        <v-btn
            icon
            dark
            title="Center on target"
            @click.stop="panToTarget()"
        >
          <v-icon
              :color='(this.$store.state.target.location.connected)? "#00AF2AFF" : "#d50000"'
          >mdi-map-marker</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "DroneMiniPanel",
  components: {
  },
  props: ['targetLocationDataSource'],
  data() {
    return {
      drawer: true,
      mini: true
    }
  },
  methods: {
    panToTarget() {
      this.$root.$emit('pan_to_target');
    }
  }
}
</script>

<style scoped>
.inspire {
  position: absolute;
  top: 100px;
  right: 0;
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  background-color: #363636 !important;
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

.icon-container {
  display: flex;
  justify-content: space-around;
}
</style>
