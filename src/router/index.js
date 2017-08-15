import Router from 'vue-router';
import App from '../App';
import home from '../views/home/home';
import login from '../views/login'
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