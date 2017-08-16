import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
// import FastClick from 'fastclick';
import myRouter from './router/index';
//导入初始化样式
import './assets/css/reset.css';

//注册路由
Vue.use(Router);
//注册vuex
Vue.use(Vuex);

new Vue({
    el: '#app',
    router: myRouter,
    render: h => h('router-view'),
});