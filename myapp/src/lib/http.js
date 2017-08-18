import axios from 'axios';
import qs from 'qs';

function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, {params})
        .then(({data}) => {
            if(data.code == 200){
                return resolve(data.data);
            }
        })
        .catch(() => {
            return reject({code: 503, message: '数据加载失败，请重试!'});
        });
    });
}
function post(url, params){
    params = qs.stringify(params);
    return new Promise((resolve, reject) => {
        axios.post(url, {params})
        .then(({data}) => {
            if(data.code == 200){
                return resolve();
            }
        })
        .catch(() => {
            return reject({code: 503, message: '数据加载失败,请重试!'});
        });
    });
}

export default {
    get,
    post
};