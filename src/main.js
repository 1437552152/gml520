
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Host from './lib/env'

import'../static/Ueditor/ueditor.config.js'
import'../static/Ueditor/ueditor.all.min.js'
import'../static/Ueditor/lang/zh-cn/zh-cn.js'
import'../static/Ueditor/ueditor.parse.min.js'

axios.defaults.baseURL = Host;
// axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(iView)

//http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log("config.data==>",config.data);
    // const token = getCookie('名称');
    config.data = JSON.stringify(config.data, {
      arrayFormat: "repeat"
    });
    console.log("config.data==>",config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
