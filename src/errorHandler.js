import Vue from 'vue';

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, vm.$options.name, info);
}

Vue.config.warnHandler = (err, vm, info) => {
  console.log(err, vm.$options.name, info);
}