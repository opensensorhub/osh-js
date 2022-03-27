import Vue from "vue";
import App from "./App.vue";
import LoadScript from 'vue-plugin-load-script';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './store';

Vue.use(LoadScript);
Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.directive('resize', {
  inserted: function(el, binding) {
    const onResizeCallback = binding.value;
    // window.addEventListener('resize', () => {
    //   console.log('onResize')
    //   const width = document.documentElement.clientWidth;
    //   const height = document.documentElement.clientHeight;
    //   onResizeCallback({ width, height });
    // })
    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        console.log(entry)
        console.log('Element:', entry.target);
        console.log(`Element size: ${cr.width}px x ${cr.height}px`);
        console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
      }
    });

    // Observe one or multiple elements
    ro.observe(el);
  }
});

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
