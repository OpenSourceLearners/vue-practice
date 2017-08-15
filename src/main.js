import Vue from 'vue';
import Router from 'vue-router';
import myRouter from './router/index';
//导入初始化样式
import './assets/css/reset.css';

//注册路由
Vue.use(Router);

new Vue({
    el: '#app',
    router: myRouter,
    render: h => h('router-view'),
});