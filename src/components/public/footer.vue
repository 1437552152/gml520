<template>
  <div :class="{'footer':ishidden}">
    <div :class="{'containers':ishidden}">
      <div :class="{'footerTit':ishidden}">
        <div :class="{'Tits':ishidden}">
          <label>{{msg.address}}</label>
          <br />
          <label>{{msg.mobile}}</label>
        </div>
      </div>
      <div :class="{'footerList':ishidden}">
        <div :class="{'about':ishidden}">
          <ul>
            <li>
              <img :src="msg.publicPic" width="120px" height="100px" />
              <img :src="msg.weChatPic" width="120px" height="100px" />
            </li>
            <li>
              <p>联系我们</p>
              <a href="javascript:void(0)">7*24小时服务电话</a>
              <span>{{msg.mobile}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import user from "@/lib/api";
export default {
  data() {
    return {
      msg: {},
      ishidden: true
    };
  },
  created() {
    // 图片展示请求
    this.$http
      .get(user.getbaseConfig)
      .then(res => {
        console.log(res);
        this.msg = res.data.data;
        console.log(msg);
      })
      .catch(res => {
        console.log("请求失败");
      });
  }
};
</script>
<style lang="less" scoped>
.footer {
  margin-top: -24px;
  padding: 31px 0;
  background-size: cover;
  align-items: center;
  width: 100%;
  background-color: #414141;
  position:absolute;
  bottom:0;
}
.footer .containers {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
}
.footerTit {
  width: 30%;
  height: 100%;
}
.footerTit .Tits {
  padding-top: 30px;
}
.footer .containers .footerTit .Tits label {
  font-size: 15px;
  color: #fff;
  line-height: 35px;
}
.footerList {
  flex: 1px;
  margin: 0 0 0 170px;
}
.about ul li {
  float: left;
  width: 40%;
  margin-left: 6%;
  line-height: 25px;
}
.about ul li img:first-child {
  margin-right: 20px;
}
.about ul li p {
  font-size: 18px;
  color: #fff;
}
.about ul li a {
  font-size: 15px;
  color: #aaa;
  display: inline-block;
  width: 100%;
  text-decoration: none;
}
.about ul li span {
  color: #fff;
  font-size: 20px;
}
</style>
