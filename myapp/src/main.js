import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import http from './lib/http'
import FastClick from 'fastclick';
import myRouter from './router/index';
import store from './store';
//导入初始化样式
import './assets/css/reset.css';

//解决浏览器会有大约300毫秒的等待时间
if ('addEventListener' in document) {  
    document.addEventListener('DOMContentLoaded', function() {  
        FastClick.attach(document.body);  
    }, false);  
}

//注册vuex
Vue.use(Vuex);

new Vue({
    el: '#app',
    router: myRouter,
    http,
    store,
    render: h => h('router-view'),
});