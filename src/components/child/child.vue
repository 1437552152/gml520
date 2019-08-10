<template>
  <div>
    <!-- 父组件向子组件传值 -->
    <h2>child子组件部分</h2>
    <div>
      <ul>
        <li v-for="(item,index) in message">{{item.name}}:{{item.age}}</li>
      </ul>
    </div>
    <!-- 子组件向父组件传值 -->
    <button @click="sendMsgToParent">点击</button>
  </div>
</template>
<script>
export default {
  props: ["message"],
  methods: {
    sendMsgToParent() {
      this.$emit("listenToChildEvent", "this message is from child");
    },
    // 数组排序
    sortKey(array, key) {
      return array.sort(function(a, b) {
        const x = a[key];
        console.log(x);
        const y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  },
  created() {
    console.log(this.message);
    // 方法调用
    this.sortKey(this.message, "age");
  }
};
</script>
