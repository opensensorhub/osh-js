<template>
  <!--v-menu
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
  </v-menu-->
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
    <div class="dropup-content" id="dropup-content">
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
    </div>
  </div>
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
  mounted() {
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            document.getElementById("dropup-content").classList.remove("show");
          }
        }
    }
  },
  methods: {
    onClick(item) {
      this.$emit('settingsEvent', item);
    },
    on() {
      document.getElementById("dropup-content").classList.toggle("show");
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
  display: none;
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
.dropup-content a:active {background-color: #ddd}

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
