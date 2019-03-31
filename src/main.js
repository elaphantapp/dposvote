import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css';
import './style.scss';

Vue.use(MintUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
