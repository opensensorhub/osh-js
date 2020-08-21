<template>
  <v-menu
      v-model="value"
      :disabled="disabled"
      :absolute="absolute"
      :open-on-hover="openOnHover"
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY"
      :rounded="false"
      content-class="settings"
      left
      top
  >

    <template v-slot:activator="{ on, attrs }">
      <v-btn
          depressed
          :outlined="false"
          color="primary"
          dark
          v-on="on"
          icon
      >
        <a class="control-btn control-btn-settings"><i class="fa fa-cog"></i></a>
      </v-btn>
    </template>
    <v-list
        dense
    >
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="onClick(item)"
      >
        <v-list-item-title>{{ index }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

/*

item = {
  title: 'title'
}
 */
export default {
  name: "VideoMenuSettings",
  components: {},
  props: ['items'],
  data: () => ({
    disabled: false,
    absolute: false,
    openOnHover: false,
    value: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true,
  }),
  methods: {
    onClick(item) {
      this.$emit('settingsEvent', item);
    }
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>
.v-btn:before {
  background-color: unset;
}

.v-btn--icon.v-size--default {
  width: unset;
  height: unset;
}
</style>
