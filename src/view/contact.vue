<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-07-25 15:53:12
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-07-25 18:37:56
 -->

<template>
  <div>
    <Carousel />
    <!-- <Map /> -->
    <!-- 图片渲染 -->
    <!-- <img :src="msg.logoPic" />
    <img :src="msg.publicPic" width="100px" height="100px" />
    <img :src="msg.weChatPic" width="100px" height="100px" />
    <label>{{msg.address}}</label>
    <label>{{msg.mobile}}</label>-->

    <!-- 新闻列表渲染 -->
    <div :class="{'list':isHidden}">
      <ul>
        <li v-for="(list,index) in lists" :class="{'xh':isHidden}" :key="index">
          <img :src="list.focusPic" :class="{'photo':isHidden}" />
          <p :class="{'strong':isHidden}">{{list.title}}</p>
          <p :class="{'strong':isHidden}">
            <span>{{list.time}}</span>
            <router-link :to="{path:'/detail',query:{ id:list.newsId }}">
              <a :class="{'hidden':isHidden}">查看更多</a>
            </router-link>
          </p>
        </li>
        <div class="clearfix"></div>
      </ul>
    </div>
    <!-- 表单
      <form>
        <div :class="{'textL':isHidden}">
          <input type="text" placeholder="请填写手机号码" />
          <input type="text" placeholder="请填写邮箱" />
          <input type="text" placeholder="请填写姓名" />
          <Button type="primary" @click="getForm">提交</Button>
        </div>
      </form>
    </div>-->
    <!-- 产品列表 -->
    <div>
      <ul>
        <li v-for="(item,index) in products" :class="{'proct':isHidden}" :key="index">
          <router-link :to="{path:'/detail',query:{ id:item.productId }}">
            <img :src="item.pic" :class="{'productphoto':isHidden}" />
          </router-link>
        </li>
      </ul>
    </div>
    <hr />
    <FormWrap v-on:dealForm="dealForm" :class="{'format':isHidden}" />
    <!-- 表单密码验证强弱 -->
    <PasswordStrong />
    <PasswordCheck />
  </div>
</template>

<script>
import Map from "@/components/contact/map";
import Carousel from "@/components/contact/Carousel";
import FormWrap from "@/components/contact/formWrap";
import PasswordStrong from "@/components/contact/passwordStrong";
import PasswordCheck from "@/components/contact/passwordCheck";
import user from "@/lib/api";
import Qs from "qs";
// const data = {
//   email: "1",
//   contact: "1",
//   mobile: "1",
//   title: "1",
//   desc: "1"
// };
export default {
  data() {
    return {
      msg: {},
      lists: [],
      isHidden: true,
      strong: true,
      products: []
    };
  },
  methods: {
    getbaseConfig() {
      // 图片展示请求
      this.$http
        .get(user.getbaseConfig)
        .then(res => {
          this.msg = res.data.data;
        })
        .catch(res => {
          this.$message.error(res.data.msg);
        });
    },
    getNewsList(type = "0", newstype = "1") {
      // 新闻列表请求
      this.$http
        .get(user.newslist, {
          params: {
            type: 0,
            newstype: 1
          }
        })
        .then(res => {
          console.log(res);
          this.lists = res.data.data.newsList;
          console.log(this.lists);
        })
        .catch(res => {
          this.$Message.error(res.data.msg);
        });
    },
    dealForm(params) {
      console.log("params==>", params);
      // 表单请求
      this.$http
        .post(user.baoming, params)
        .then(res => {
          this.$Message.success(res.data.msg);
        })
        .catch(res => {
          this.$Message.error(res.data.msg);
        });
    },
    // 创建Promise
    wait(time) {
      return new Promise((resolve, reject) => {
        // resolve处理函数
        setTimeout(resolve, time);
      });
    }
  },
  created() {
    console.log(document.querySelector(".format"));
    this.getbaseConfig();
    this.getNewsList("0", "1");
    // 检查浏览器是否支持Promise
    if (typeof Promise === "function") {
      console.log("支持");
    } else {
      console.log("不支持");
    }
    this.wait(1000).then((value)=> {
      console.log(1);
    });
  },
  components: { Map, Carousel, FormWrap, PasswordStrong, PasswordCheck },
  mounted() {
    console.log(document.querySelector(".format"));
  }
};
</script>
<style  scoped  lang="less">
@import "../styles/contact/index.less";
</style>