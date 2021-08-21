import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';

// Global Components --------------------------------
import Navbar from './components/ui/Navbar.vue';
import Table from './components/Table.vue';
import InputGroup from './components/InputGroup.vue';
import Alert from './components/Alert.vue';

// Layouts
import DefaultLayout from './layouts/Default.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('default-layout', DefaultLayout);
Vue.component('navbar-vue', Navbar);
Vue.component('table-vue', Table);
Vue.component('alert-vue', Alert);
Vue.component('input-group-vue', InputGroup);

// Vee Validate
Vue.use(VeeValidate, {
  fieldsBagName: 'fieldsValidation',
  delay: 1000,
});
