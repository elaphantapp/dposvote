import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import VueI18n from 'vue-i18n'
import language from './i18n';

import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css';

import './assets/index.css';
import './style.scss';

Vue.use(VueI18n)
Vue.use(MintUI);
Vue.config.productionTip = false;

const dl = navigator.language === 'zh-CN' ? 'zh' : 'en';

const i18n = new VueI18n({
  locale: dl,
  messages : language
})

// temp change language method
window.changeLanguage = (lang='en')=>{
  i18n.locale = lang;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
