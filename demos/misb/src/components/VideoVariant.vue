<template>
  <v-card id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        permanent
        dark
        floating
        right
        width="640"
    >
      <div class="variant-title">{{ videoDataSource.name }}</div>
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
            right
            @click.stop="mini = !mini"
            dark
            v-else
        >
          <v-icon>mdi-video</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Center on target"
        >
          <v-icon>mdi-target</v-icon>
        </v-btn>
        <v-btn
            icon
            dark
            title="Show footprint/draping"
        >
          <v-icon>mdi-vector-rectangle</v-icon>
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

export default {
  name: "VideoVariant",
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
}
</script>

<style scoped>
#inspire {
  position: absolute;
  top: 100px;
  right: 0;
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  background-color: #363636;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
}

#inspire > aside {
  min-width: 80px;
  width: unset !important;
  max-width: 640px;
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
