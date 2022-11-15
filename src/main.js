import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './errorHandler'
import ResizeDirective from './directives/ResizeDirective';
import BTCFilter from './filters/BTСFilter';

Vue.config.productionTip = false;

Vue.directive('resize', ResizeDirective);
Vue.filter('BTC', BTCFilter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


