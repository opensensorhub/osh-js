<template>
  <div class="dropup">
    <v-btn
        depressed
        :outlined="false"
        color="primary"
        dark
        @click="on"
        icon
    >
      <a class="control-btn control-btn-settings"><i class="fa fa-cog"></i></a>
    </v-btn>
    <div class="dropup-content" id="dropup-content" v-show="show">
      <v-list
          dense
          dark
      >
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="onClick(item)"
        >
          <v-list-item-title>{{ index }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>

/*

item = {
  title: 'title'
}
 */
/**
 * @module osh-vue/MenuSettings
 * @desc MenuSettings component to control video scaling options
 */
export default {
  name: "VideoMenuSettings",
  components: {},
  props: ['items'],
  data: () => ({
    show: false
  }),
  destroyed () {
    document.body.removeEventListener('click', this.closeMenu)
  },
  mounted() {
    // Close the dropdown menu if the user clicks outside of it
    if(typeof document === "object") {
      document.body.addEventListener('click', this.closeMenu);
    }
  },
  methods: {
    onLeftClick(item) {
      this.$emit('settingsEvent', item);
      this.show = false;
    },
    closeMenu($event) {
      if (!this.$el.contains($event.target)) {
        this.show = false;
      }
    },
    on() {
      this.show = !this.show;
    }
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>
.v-btn:before {
  background-color: unset;
}

.v-sheet.v-list {
  border-radius: 2px!important;
}
.v-list-item {
  min-height: 32px !important;
}
.v-btn--icon.v-size--default {
  width: unset;
  height: unset;
}

/* Dropup Button */
.dropbtn {
  background-color: #3498DB;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropup content */
.dropup {
  position: relative;
  display: inline-block;
}

/* Dropup content (Hidden by Default) */
.dropup-content {
  display: block;
  position: absolute;
  bottom: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0px;
}

/* Links inside the dropup */
.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropup links on hover */
.dropup-content a:active {background-color: #000}

/* Show the dropup menu on hover */
.dropup:active .dropup-content {
  display: block;
}

/* Change the background color of the dropup button when the dropup content is shown */
.dropup:active .dropbtn {
  background-color: #2980B9;
}

.show {display:block;}
</style>
