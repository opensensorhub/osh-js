import Vue from "vue";
import App from "./src/App.vue";
import LoadScript from 'vue-plugin-load-script';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(LoadScript);
Vue.config.productionTip = false;
new Vue({
  vuetify: new Vuetify({
    theme: { dark: true },
  }),
  render: h => h(App)
}).$mount("#app");

