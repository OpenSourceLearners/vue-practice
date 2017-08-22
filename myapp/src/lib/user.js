import http from './http';
const url = "/public/index/";
//登录验证
function checkLogin(user){
    /*
        由于vue最低ie要求时9，所以没有判断异步传输对象
    */
    // var xhr = new XMLHttpRequest(); //创建ajax传输对象
    // xhr.onreadystatechange = function(){
    //     if(xhr.status == 200 && xhr.responseText){
    //         var data = JSON.parse(xhr.responseText);
    //         for(var i = 0; i < data.length; i++){
    //             if(username == data[i].username && password == data[i].password){
    //                 callback(true);
    //                 return ;
    //             }
    //             callback(false);
    //         }
    //     }
    // }
    // xhr.open('GET', './dist/data/user.json', false);
    // xhr.send(null);
    // if(xhr.status == 200 && xhr.responseText){
    //     var data = JSON.parse(xhr.responseText);
    //     for(var i = 0; i < data.length; i++){
    //         if(){

    //         }
    //     }
    // }else{
    //     callback(false);
    // }
    // var flag = false;
    // var token = 'afdsfdsfds';
    // if(username == 'admin' && password == 'admin'){
    //     flag = true;
    // }
    // sessionStorage.setItem('username', username)
    // sessionStorage.setItem('accessToken', token);
    // callback(flag);
    return new Promise((resolve, reject) => {
        http.post(url + 'login/login', {username: user.username, password: user.password})
        .then((data) => {
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('accessToken', data.token);
            resolve(data);
        })
        .catch((error) => {
            reject(error)
        });
    });
    // return new Promise((resolve, reject) => {
    //     if(!localStorage.getItem(user.username)){
    //         reject({msg: '用户不存在！'});
    //     }else if(localStorage.getItem(user.username) != user.password){
    //         reject({msg: '密码错误！'});
    //     }else{
    //         sessionStorage.setItem('username', user.username);
    //         resolve({msg: '登录成功！'});
    //     }
    // });
}

function logout(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');
    http.post(url + 'login/outlogin')
    .then((data) => {
    })
    .catch((error) => {
    });
}   

function register(user){
    return new Promise((resolve, reject) => {
        // checkEmail(user.email)
        // .then((data) => {
        //     checkUsername(user.username)
        //     .then((data) => {
        //         http.post(url + 'register/login', {username: user.username, password: user.password})
        //         .then((data) => {
        //             resolve(data);
        //         })
        //         .catch((error) => {
        //             reject(error)
        //         });
        //     })
        //     .catch((error) => {
        //         reject(error)
        //     });
        // })
        // .catch((error) => {
        //     reject(error)
        // });
        checkEmail(user.email)
        .then((data) => {
            return checkUsername(user.username);
        })
        .then((data) => {
            return http.post(url + 'register/register', {username: user.username, password: user.password, email: user.email});
            // return new Promise((resolve, reject) => {
            //     try{
            //         localStorage.setItem(user.username, user.password);
            //         resolve({msg: '注册成功！'});
            //     }catch(e){
            //         reject({msg: e.message});
            //     }
            // });
        })
        .then((data) => {
            return resolve(data);
        })
        .catch((error) => {
            return reject(error);
        });
    });
}

function checkEmail(email){
    return http.post(url + 'register/verifyEmail', {email: email});
}

function checkUsername(username){
    return http.post(url + 'register/verifyUserName', {username: username});
    // return new Promise((resolve, reject) => {
    //     if(localStorage.getItem(username)){
    //         reject({
    //             msg: '该用户已注册！',
    //         });
    //     }else{
    //         resolve();
    //     }
    // });
}
export {
    checkLogin,
    logout,
    register,
    checkUsername,
    checkEmail,
};