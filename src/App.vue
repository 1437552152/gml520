<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- <Footer /> -->
    <!-- 组件 -->
    <child :message="parentMsg" @listenToChildEvent="showMsgFromChild"></child>
  </div>
</template>

<script>
import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import child from "@/components/child/child";
export default {
  name: "App",
  data() {
    return {
      parentMsg: [
        { id: "1", name: "小叶爸爸",age:'29' },
        { id: "2", name: "小叶妈妈",age:'28' },
        { id: "3", name: "小叶宝宝",age:'1' }
      ],
      
      sortType: 'age'
    };
  },
  methods: {
    showMsgFromChild(data) {
      console.log(data);
    }
  },
  components: { Header, Footer, child }
};
</script>
<style>
.clearfix{clear:both}
</style>
