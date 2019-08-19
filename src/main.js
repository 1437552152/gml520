
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Host from './lib/env'
import qs from 'qs';//安装qs依赖
import'../static/Ueditor/ueditor.config.js'
import'../static/Ueditor/ueditor.all.min.js'
import'../static/Ueditor/lang/zh-cn/zh-cn.js'
import'../static/Ueditor/ueditor.parse.min.js'
import Echart from 'echarts';//安装echarts依赖

// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'


axios.defaults.baseURL = Host;
// axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = Echart;
Vue.config.productionTip = false
Vue.use(iView)
//引入图片查看器
// Vue.use(Viewer, {
//   defaultOptions: {
//     zIndex: 9999
//   }
// })

//http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log("config.data==>",config.data);
    // const token = getCookie('名称');
    // config.data = JSON.stringify(config.data, {
    //   arrayFormat: "repeat"
    // });
    if(config.method==='post'){
      config.data = qs.stringify(config.data, {
        arrayFormat: "repeat"
      });
    }
    console.log("config.data==>",config.data);
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWF0ZSIsImlhdCI6MTU2NTkzNTAzMCwiZXhwIjoxNTY1OTc4MjMwfQ.x-90Wej50V3pMWdHs_B9UCdpQ4mcEjCzyE9FwnwM8iE';
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded',
      'token':token
    };
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
