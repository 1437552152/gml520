<template>
  <div class="header" :class="{'link':ishidden}">
    <ul>
      <li :class="{'active':current==1}" @click="toggle(1)">
        <router-link to="/">首页</router-link>
      </li>
      <li :class="{'active':current==2}" @click="toggle(2)">
        <router-link to="/contact">联系我们</router-link>
      </li>
      <div class="clearfix"></div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: this.$route.path==='/'?1:2,
      ishidden: false
    };
  },
  watch: {
    $route: "getPath" // 监听事件
  },
  methods: {
    toggle(index) {
      this.current = index;
    },
    getPath() {
    //   alert(1);
      let path = this.$route.path; //或得当前路径
      console.log(path);
      if (path === "/contact") {
        this.ishidden = true;
        this.current=2
      } else {
        this.ishidden = false;
        this.current=1
      }
    }
  },
  created(){
      console.log(this.$route.path);
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  background-color: aquamarine;
  min-width: 1200px;
  ul {
    width: 1200px;
    margin: 0 auto;
    li {
      float: left;
      list-style: none;
      height: 50px;
      line-height: 50px;
      color: #000;
      font-size: 18px;
      width: 100px;
      text-align: center;

      a {
        display: block;
        color: #fff;
      }
      &.active {
        background-color: red;
      }
    }
  }
}
</style>
<style>
.clearfix {
  clear: both;
}
.link {
  display: none;
}
</style>

