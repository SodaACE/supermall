import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from'./store/index'
import toast from './components/common/toast/index'
import  FastClick  from 'fastclick'

FastClick.attach(document.body)
const emitter = mitt();
export default emitter;
Vue.config.productionTip = false
Vue.use(toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
