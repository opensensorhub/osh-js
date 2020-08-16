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
      left
      top
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          depressed
          :outlined="false"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          icon
      >
        <a class="control-btn control-btn-settings"><i class="fa fa-cog"></i></a>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click=""
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: "VideoMenuSettings",
  components: {},
  props: {
  },
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
    disabled: false,
    absolute: false,
    openOnHover: false,
    value: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true,
  }),
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
