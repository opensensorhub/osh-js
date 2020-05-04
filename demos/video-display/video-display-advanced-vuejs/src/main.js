import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

Vue.config.productionTip = false;
new Vue({
  vuetify: new Vuetify({
    theme: { dark: true },
  }),
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
  }),
  render: h => h(App)
}).$mount("#app");

