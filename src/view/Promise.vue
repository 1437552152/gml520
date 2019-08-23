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

  </div>
</template>

<script>

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
    loadTree() {
      new Promise((resolve, reject) => {
        this.$http.get(user.getbaseConfig).then(res => {
         
        });
        resolve(
             console.log('res==>',111)
        );
      }).then(res => {
      this.$http
        .get(user.newslist, {
          params: {
            type: 0,
            newstype: 1
          }
        })
        .then(res => {
          console.log("res==>", 222);
          this.lists = res.data.data.newsList;
        })
        .catch(res => {
          //   this.$Message.error(res.data.msg);
        });
      });
    },
  },
  created() {
    //   先输出111,再输出222,
    this.loadTree();
  },
  mounted() {
  }
};
</script>
<style  scoped  lang="less">
@import "../styles/contact/index.less";
</style>