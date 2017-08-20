import axios from 'axios';
import qs from 'qs';

var instance = axios.create({
    headers: {'X-Requested-With': 'XMLHttpRequest'},
});

function get(url, params){
    return new Promise((resolve, reject) => {
        instance.get(url, {params})
        .then(({data}) => {
            if(data.code == 200){
                resolve(data);
            }else{
                reject({code: data.code, msg: data.msg});
            }
        })
        .catch(() => {
            reject({code: 503, msg: '服务器大概是被UFO带走了!'});
        });
    });
}
function post(url, params){
    params = qs.stringify(params);
    return new Promise((resolve, reject) => {
        instance.post(url, params)
        .then(({data}) => {
            if(data.code == 200){
                resolve(data);
            }else{
                reject({code: data.code, msg: data.msg});
            }
        })
        .catch(() => {
            reject({code: 503, msg: '服务器大概是被UFO带走了!'});
        });
    });
}

export default {
    get,
    post
};