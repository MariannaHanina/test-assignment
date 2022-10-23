import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ResizeDirective from './directives/ResizeDirective';

Vue.config.productionTip = false;

Vue.directive('resize', ResizeDirective);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


