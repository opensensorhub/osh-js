import Vue from "vue";
import App from "./App.vue";
import LoadScript from 'vue-plugin-load-script';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './store';

Vue.use(LoadScript);
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify: new Vuetify({
    theme: {
      dark: true,
      themes: {
        dark : {
          // primary: '#2f2f2f'
        }
      }
    },
  }),
  render: h => h(App)
}).$mount("#app");
