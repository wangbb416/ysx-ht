import axios from "axios";
import store from '../store/store';
import route from '../router/index'
// import { Message } from "vant";
// import {getCookie} from "../assets/js/cookie.js";


// if (sessionStorage.getItem("token")) {
//   window.token = sessionStorage.getItem("token");
// }

const httpServer = (opts, data, type = "") => {
    let httpDefaultOpts = {
        //http默认配置
        method: opts.method,
        url: opts.url,
        timeout: 60000,
        // baseURL: mainUrl,
        baseURL: process.env.NODE_ENV === "development" ? opts.baseURL : process.env.VUE_APP_URL,
        params: Object.assign({}, data),
        data: JSON.stringify(data)
    };
    if (type && type === "downExcel") {
        //下载excal数据流，无其他作用
        httpDefaultOpts.responseType = "blob";
    }
    let tempType = Object.prototype.toString.call(data)
    try {
        if (tempType === "[object Array]" || tempType === '[object FormData]') {
            //判断是数组还是对象
            httpDefaultOpts.data = data;
        } else {
            httpDefaultOpts.data = Object.assign({}, data);
        }
    } catch (e) {
        httpDefaultOpts.data = Object.assign({}, data);
    }
    
    let headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        // "Cache-Control": "no-cache",
        "If-Modified-Since": "0",
        'token': store.state.tokenValue,
        "MC-User-Type":"1",//用户类型,代表蓝色循环用户
        "MC-System-Type":"1",//系统类型,代表蓝色循环后台管理系统
    };
    if (store.state.tokenName) {
        let tokenName = store.state.tokenName
        let prefix = store.state.tokenPrefix
        headers[tokenName] = prefix + ' '+ store.state.tokenValue
    }
    // console.log("store.state.tokenPrefix--------------",store.state.tokenPrefix);
    httpDefaultOpts["headers"] = headers


    //上传文件用（这里是后台上传，前端传fromData格式）
    if (type && type === "upFile") {
        httpDefaultOpts.headers['Content-Type'] = "application/x-www-form-urlencoded";
    }
    //"content-type": "application/x-www-form-urlencoded"
    if (opts.method == "get") {
        delete httpDefaultOpts.data;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            //兼容某些IE get 请求会从缓存拿数据问题
            if (httpDefaultOpts.url.indexOf("?") != "-1") {
                httpDefaultOpts.url =
                    httpDefaultOpts.url + "&timeStapIE=" + new Date().getTime();
            } else {
                httpDefaultOpts.url =
                    httpDefaultOpts.url + "?timeStapIE=" + new Date().getTime();
            }
        }
    } else {
        delete httpDefaultOpts.params;
    }

    let promise = new Promise(function (resolve, reject) {
        axios(httpDefaultOpts)
            .then(res => {
                resolve(res);
            })
            .catch(response => {
                reject(response);
            });
    });
    return promise;
};

axios.interceptors.response.use(
    response => {
        if (response.config.responseType === 'blob') {
            return Promise.resolve({
                code: 200,
                data: response.data,
                msg: response.data.msg || '',
            });
        }
        if (response && response.data && response.data.code) {
            if (response.data.code == 200) {
                return Promise.resolve({
                    code: 200,
                    data: response.data.data || {},
                    msg: response.data.msg || '',
                });
            } else if (response.data.code == 403) {
                route.replace({path: "/login"});
                return Promise.reject({
                    code: 403,
                    data: {},
                    msg: response.data.msg
                });
            } else if (response.data.code == 401) {
                route.replace({path: "/login"});
                return Promise.reject({
                    code: 401,
                    data: {},
                    msg: response.data.msg
                });
            } else {
                return Promise.reject({
                    code: response.data.code,
                    data: response.data || {},
                    msg: response.data.msg || ''
                });
            }
        } else {
            return Promise.reject({
                msg: '未知异常！'
            });
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    // store.commit('setTokenValue', "");
                    // route.replace({path: "/login"});
                    return Promise.reject({
                        msg:error.response.data.msg||'账号状态异常！'
                    });
            }
        }

        return Promise.reject({
            msg: error.message || "未知异常"
        });
    }
);

export default {httpServer};
