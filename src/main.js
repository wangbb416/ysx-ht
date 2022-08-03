// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
import '@/assets/style/ele.less'
import '@/assets/style/common.less'
import preventReClick from '@/utils/preventReClick' //防多次点击，重复提交

Vue.config.productionTip = false
Vue.use(ElementUI);


//防止其他元素点击过快
const fastClick = Vue.directive('fastClick', {
  inserted: function (el, binding) {
    el.addEventListener('click', () => {
      el.style.pointerEvents = "none"
      setTimeout(() => {
        el.style.pointerEvents = "auto"
      }, binding.value || 1000)
    })
  },
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
