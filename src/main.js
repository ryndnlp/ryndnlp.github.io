import Vue from 'vue'
import App from './App'
import '../src/fontawesome/css/all.css'
import Routes from './routes'
import VueRouter from 'vue-router'
import "@/assets/main.css"
import VueSweetalert2 from 'vue-sweetalert2';
import AOS from 'aos';
import "aos/dist/aos.css"

Vue.config.productionTip = false

const options = {
    background: '#f2f2f2',
    width: '75%'
};

Vue.use(VueRouter);
Vue.use(VueSweetalert2, options);

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
});

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    created(){
        AOS.init({
            easing: 'ease-in-out',
            once: true,
        });
    }
}).$mount('#app')
