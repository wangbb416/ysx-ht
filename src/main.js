import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/store";
import './assets/fonts/iconfont.css' //暂时不用等iconfont可以自定上传svg后打开这里

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from "./api";
import ApiSetting from "./api/apiset";

import "./assets/style/common.less"
import '@/assets/style/otherSystemLogin.less'

import {menuBtnValid} from "./utils/menuBtnValid"
Vue.prototype.MenuBtnValid = menuBtnValid
import Bus from "vue-bus"
Vue.use(Bus)

// import gojs from 'gojs'  // 在 main.js 中引入
import gojs from './assets/js/go.js'
Vue.prototype.go = gojs  // 挂载 

Vue.prototype.$http = http.httpServer;
Vue.prototype.GLOBALApi = ApiSetting;

Vue.use(ElementUI);
Vue.use(Viewer);//图片预览

//防止button点击过快
export const preventReClick = Vue.directive("preventReClick", {
    inserted: function (el, binding) {
        el.addEventListener("click", () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 1000);
            }
        });
    }
});
//防止其他元素点击过快
export const fastClick = Vue.directive("fastClick", {
    inserted: function (el, binding) {
        el.addEventListener("click", () => {
            el.style.pointerEvents = "none";
            setTimeout(() => {
                el.style.pointerEvents = "auto";
            }, binding.value || 1000);
        });
    }
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {

    // 其他系统跳转免登录
    if(to.path == '/otherSystemLogin'){
        // console.log("otherSystemLogin");
        next()
    }else{
        if (to.path == '/login' && to.query.loginType !== 'changePassword') {
            console.log("清除数据");
            sessionStorage.clear();
            localStorage.clear();
            store.commit('setTokenValue', "");
            store.commit('setUsername', "");
            store.commit("setCompanyId", "");
            store.commit("setUserInfo", {});
            store.commit('setMenuList', []);
            store.commit('setRouterList', ['/login', 'videoRateDetail', "/memberManage"]);
        }
        Vue.nextTick(() => {
            let userToken = store.state.tokenValue;
            if (!userToken && to.path != '/login') {
                // console.log("userToken",userToken);
                console.log("重新跳转登录");
                next({
                    path: '/login'
                })
            } else {
                next()
            }
        })
    }

    

    
})


new Vue({
    store,
    router,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
}).$mount('#app')


Viewer.setDefaults({
    "zIndex": 99999,
    'inline': false,
    'button': true, //右上角按钮
    "navbar": true, //底部缩略图
    "title": true, //当前图片标题
    "toolbar": true, //底部工具栏
    "tooltip": true, //显示缩放百分比
    "movable": true, //是否可以移动
    "zoomable": true, //是否可以缩放
    "rotatable": true, //是否可旋转
    "scalable": true, //是否可翻转
    "transition": true, //使用 CSS3 过度
    "fullscreen": true, //播放时是否全屏
    "keyboard": true, //是否支持键盘
    "url": "data-source",
    ready: function (e) {
        //console.log(e.type,'组件以初始化');
    },
    show: function (e) {
        //console.log(e.type,'图片显示开始');
    },
    shown: function (e) {
        //console.log(e.type,'图片显示结束');
    },
    hide: function (e) {
        //console.log(e.type,'图片隐藏完成');
    },
    hidden: function (e) {
        //console.log(e.type,'图片隐藏结束');
    },
    view: function (e) {
        //console.log(e.type,'视图开始');
    },
    viewed: function (e) {
        //console.log(e.type,'视图结束');
    },
    zoom: function (e) {
        //console.log(e.type,'图片缩放开始');
    },
    zoomed: function (e) {
        //console.log(e.type,'图片缩放结束');
    }
});
