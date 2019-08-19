<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-07-11 18:27:29
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-07-11 18:27:37
 -->
<template>
  <div>
    <div class="content">
      <Tabs type="card">
        <TabPane v-for="tab in tabs" :key="tab" :label="'标签' + tab">标签{{ tab }}</TabPane>
        <Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>
      </Tabs>
    </div>
    <!-- vue样式绑定 -->
    <div :class="{'hidden':isHidden}">1、对象</div>
    <div
      class="strong"
      :class="{'hidden':isHidden,'bigger':isBigger}"
    >2、可以一次传入多个属性，且:class 可以和常规的 class 同时使用</div>
    <div
      :class="customClasses"
    >3、当 :class 的表达式过长或逻辑复杂时，我们可以通过计算属性来绑定,注：如果样式名称带有 -，那么必须加上单引号（示例中的 bigger-text）才能被正确识别</div>
    <div :class="[strongerClass,biggerClass]">4、给 :class 绑定一个 class 数组</div>
    <div :class="[isHidden?strongerClass:'']">5、数组中的元素也可以使用三元表达式来计算</div>
    <div :class="[{'strong':isStrong}]">6、当需要设置的 class 很多时，我们可以在数组语法的基础上使用对象语法，从而简化表达式，让代码变得更易维护</div>
    <div :class="btnClass">7、也可以在 computed 或 methods 中返回需要设定的数组</div>
    <div :style="border">8、绑定内联样式</div>
    <!-- 练习结束 -->
    <div class="center-btn">
    <div class="linkto">
      <router-link to="/contact">
        <Button type="primary">点我到联系我们页面</Button>
      </router-link>
    </div>
    <!-- 生命周期 -->
    <div class="linkto" @click="toRescue">
      <Button type="primary">点我理解生命周期</Button>
    </div>
    <!-- Vue脚手架（vue-cli）并创建一个项目 -->
    <div class="linkto" @click="toDo">
      <Button type="primary">点我知道如何操作脚手架</Button>
    </div>
    <!-- 产品类型的增删改查 -->
    <div class="linkto">
      <router-link to="/refresh">
        <Button type="primary">产品类型的增删改查</Button>
      </router-link>
    </div>
    <!-- 产品列表的增删改查 -->
    <div class="linkto">
      <router-link to="/productlist">
        <Button type="primary">产品列表的增删改查</Button>
      </router-link>
    </div>
    <!-- 表格增删改查 -->
    <div class="linkto">
      <router-link to="/sql">
        <Button type="primary">表格的增删改查</Button>
      </router-link>
    </div>
    <!-- 组件之间传值 -->
    <div class="linkto" @click="toValue">
      <Button type="primary">点我知道父子组件之间如何传值</Button>
    </div>
    <!-- 购物车 -->
    <div class="linkto">
      <router-link to="/shopping">
        <Button type="primary">点我去购物</Button>
      </router-link>
    </div>
    <!-- 富文本编辑器 -->
    <div class="linkto">
      <router-link to="/editor">
        <Button type="primary">编辑器</Button>
      </router-link>
    </div>
    <!-- 导入导出 -->
    <div class="linkto">
      <router-link to="/import">
        <Button type="primary">导入导出</Button>
      </router-link>
    </div>
    <!-- echarts图表 -->
    <div class="linkto">
      <router-link to="/echart">
        <Button type="primary">echarts图表</Button>
      </router-link>
    </div>
    <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: 2,
      isHidden: true,
      isBigger: true,
      strongerClass: "strong",
      biggerClass: "bigger",
      isStrong: true,
      size: "small",
      isGreen: true,
      border: {
        border: "1px solid #00F",
        textShadow: "0 0 .3em gray"
      },
      url: {
        url1: "https://segmentfault.com/a/1190000014640577",
        url2: "https://blog.csdn.net/inthuixiang/article/details/82225407",
        url3: "https://www.cnblogs.com/amunamuna/p/8872979.html"
      }
    };
  },
  created() {},
  methods: {
    handleTabsAdd() {
      this.tabs++;
    },
    toRescue() {
      window.location.href = this.url.url1;
    },
    toDo() {
      window.location.href = this.url.url2;
    },
    toValue() {
      window.location.href = this.url.url3;
    }
  },
  computed: {
    customClasses() {
      return {
        display: !this.isHidden,
        "bigger-text": this.isHidden && this.isBigger
      };
    },
    btnClass() {
      return [
        "btn",
        {
          ["btn-" + this.size]: this.size !== "",
          ["btn-green"]: this.isGreen
        }
      ];
    }
  }
};
</script>
<style scoped>
.content {
  width: 500px;
  margin: 0 auto;
}
.linkto {
  margin-top: 18px;
  text-align: center;
  width: 20%;
  float: left;
}
.center-btn{
  height: 200px;
}
</style>
