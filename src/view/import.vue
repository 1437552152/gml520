<template>
  <div>
    <Button type="primary" @click="alert">单个点击</Button>
  </div>
</template>

<script>
// 1
// import a from '../util/a.js';
// 2
// import {a} from '../util/a.js'
// 4
// import axis from '../util/a.js'
// 3
import {x,y} from '../util/a.js'
export default {
  data() {
    return {};
  },
  methods: {
    alert() {
      console.log(x);
      console.log(y);
    },
  }
};
</script>

<style scoped>
</style>