import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import store from './store/index';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import { dataset } from './api/url.js';
// 导入全部组件和echarts图表
import IEcharts from 'vue-echarts-v3/src/full.js';

import './assets/css/animate.min.css';

// 接口
Vue.prototype.$api = {
	dataset
};

Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'small'
});

Vue.component('IEcharts', IEcharts);

Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    next();
});

new Vue({
    router,
	store,
    render: h => h(App)
}).$mount('#app');
