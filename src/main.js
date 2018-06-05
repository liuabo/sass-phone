// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/common/reset.css' //重置样式
import './assets/common/changemintui.css' //重置样式


import Vue from 'vue'
import App from './App'
import router from './router'



Vue.config.productionTip = false

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

//注册全局过滤器
import vFilter from './filters'
for (let key in vFilter) {
    Vue.filter(key, vFilter[key])
}


//下拉/上拉刷新
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})



/*图片懒加载*/
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    error: './static/error.png',
    loading: './static/loading.png'
})