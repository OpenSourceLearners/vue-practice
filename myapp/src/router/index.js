import Vue from 'vue';
import Router from 'vue-router';

// import App from '../App';
// import home from '../views/home/home';
// import login from '../views/login';

const App = resolve => require(['../App'], resolve);
const home = resolve => require(['../views/home/home'], resolve);
const login = resolve => require(['../views/login'], resolve);

// const App = resolve => require.ensure(['../App.vue'], () => resoleve(require('../App.vue')));
// const App = resolve => require.ensure(['../views/home/home.vue'], () => resoleve(require('../views/home/home.vue')));
// const App = resolve => require.ensure(['../views/login.vue'], () => resoleve(require('../views/login.vue')));
 
//注册路由
Vue.use(Router);
var myRouter =  new Router({
    routes: [
        {
            path: '/',
            component: App,
            children:[
                { path: '/home', component: home },
                { path: '/login', component: login },
                { path: '*', redirect: '/home'}
            ],
        },
    ]
});

myRouter.beforeEach((to, from, next) => {
    if(to.path != '/login' && !sessionStorage.getItem('accessToken') && sessionStorage.getItem('accessToken') == undefined){
        next({
            path: '/login',
        });
    }else{ 
        next();
    }
})

export default myRouter;