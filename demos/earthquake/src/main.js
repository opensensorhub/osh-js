import Vue from 'vue'
import App from './App.vue'

// In index.lib
import Vuetify from 'vuetify'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

Vue.config.productionTip = false;
new Vue({
  store,
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#ffffff',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
  }),
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
  }),
  render: h => h(App)
}).$mount("#app");

