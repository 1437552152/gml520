<template>
  <div>
    <img
      :src="list.focusPic"
      width="600px"
      height="300px"
      v-for="(list,index) in lists"
      :key="index"
    />
    <div></div>
    <!-- <img :src="item.pic" width="600px" height="300px" v-for="item in products" /> -->
    <input type="text" v-model="firstname" />
    <input type="text" v-model="lastname" />
    <input type="text" v-model="fullname" />
  </div>
</template>
<script>
import user from "@/lib/api";
export default {
  data() {
    return {
      lists: [],
      products: [],
      firstname: "",
      lastname: ""
    };
  },
  methods: {
    getNewsdetail() {
      let newsID = this.$route.query.id;
      this.$http
        .get(user.newsdetail, {
          params: {
            newsId: newsID
          }
        })
        .then(response => {
          this.lists = response.data.data3;
          console.log(this.lists);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    firstname(newValue, OldValue) {
      console.log(newValue);
      console.log(OldValue);
    },
    lastname() {
      console.log(this.lastname);
    }
  },
  computed:{
          fullname:function(){
            return this.firstname +"-"+this.lastname
          }
        },
  created() {
    this.getNewsdetail();
    //
    //  this.$http
    // .get(user.newsdetail, {
    //   params: {
    //     productId: newsID
    //   }
    // })
    // .then(response => {
    //   this.products = response.data.data3;
    //   console.log(this.products);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
  }
};
</script>
