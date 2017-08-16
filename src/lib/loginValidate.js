//登录验证
function checkLogin(username, password, callback){
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
    var flag = false;
    if(username == 'admin' && password == 'admin'){
        flag = true;
    }
    callback(flag, 'afdshjkasdffds');
}

export {
    checkLogin
};