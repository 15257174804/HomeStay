// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VantUI from 'vant'
import iView from 'iview'
import 'vant/lib/index.css'
import 'iview/dist/styles/iview.css'
// import Carousel from './components/layout/details/zujian/carousel.vue'
// import Reserve from './components/layout/details/zujian/reserve.vue'
// import Details from './components/layout/details/zujian/details.vue'
// import Evaluate from './components/layout/details/zujian/evaluate.vue'
// import Furniture from './components/layout/details/zujian/furniture.vue'
// import Fade from './components/layout/details/zujian/fade.vue'
// import Recommend from './components/layout/details/zujian/recommend.vue'
// import Header from './components/layout/details/zujian/header.vue'
// import Footer from './components/layout/details/zujian/footer.vue'
import store from './components/store'
import * as filters from './filters'
// 引入第三方axios
import axios from 'axios'
//配置服务器基础地址
axios.defaults.baseURL="http://127.0.0.1:5050/"
//配置发送请求保存session信息
axios.defaults.withCredentials=true;
//将axios注册vue
Vue.prototype.axios=axios;
// lmd:引入vant重写的样式
import './assets/lmd/resetInfro.scss'
import './assets/lmd/my-mint.scss'
//1.将mint_ui组件库中所有组件引入当前项目
import MintUI from "mint-ui"
//2.单独引入mint_ui组件库中的样式文件
import "mint-ui/lib/style.css"
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
//3.注册
Vue.use(MintUI)

 Vue.use(Vuex)
Vue.use(VantUI)
Vue.use(iView)

Vue.config.productionTip = false
// Vue.component("my-carousel", Carousel)
// Vue.component("my-reserve", Reserve)
// Vue.component("my-details", Details)
// Vue.component("my-evaluate", Evaluate)
// Vue.component("my-furniture", Furniture)
// Vue.component("my-fade", Fade)
// Vue.component("my-recommend", Recommend)
// Vue.component("my-header", Header)
// Vue.component("my-footer", Footer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
