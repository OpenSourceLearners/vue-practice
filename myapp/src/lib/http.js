import axios from 'axios';
import qs from 'qs';

axios({
    headers: {'X-Requested-With': 'XMLHttpRequest'},
});

function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, {params})
        .then(({data}) => {
            if(data.code == 200){
                return resolve(data.data);
            }else{
                return reject({code: data.code, message: data.msg});
            }
        })
        .catch(() => {
            return reject({code: 503, message: '服务器大概是被UFO带走了!'});
        });
    });
}
function post(url, params){
    params = qs.stringify(params);
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(({data}) => {
            if(data.code == 200){
                return resolve(data.data);
            }else{
                return reject({code: data.code, message: data.msg});
            }
        })
        .catch(() => {
            return reject({code: 503, message: '服务器大概是被UFO带走了!'});
        });
    });
}

export default {
    get,
    post
};