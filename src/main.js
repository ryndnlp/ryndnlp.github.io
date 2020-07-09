import Vue from 'vue'
import App from './App'
import '../src/fontawesome/css/all.css'
import Routes from './routes'
import VueRouter from 'vue-router'
import "@/assets/main.css"
 
Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
}).$mount('#app')
