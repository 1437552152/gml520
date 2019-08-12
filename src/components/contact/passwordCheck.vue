<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="请输入密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <!-- 强弱标志 -->
    <Progress
      :percent="formInline.percents"
      :status="formInline.status===0?'':(formInline.status===2?'wrong':'')"
      hide-info
    />

    {{formInline.status===0?'':(formInline.status===1?'弱':(formInline.status===2?'中':'强'))}}
    <!-- 再次确认密码 -->
    <div></div>
    <FormItem prop="rpassword">
      <Input type="password" v-model="formInline.rpassword" placeholder="请再次输入密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import checkStrong from "@/util/checkpassStrong";
export default {
  data() {
    const validateuser = (rule, value, callback) => {   
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (!/^[a-zA-Z\d]+$/.test(value)) {
        callback(new Error("请正确输入用户名"));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      this.add(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formInline.password) {
        callback(new Error("两次密码不一致"));
        console.log("value===" + value);
        console.log(this.formInline.password);
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        password: "",
        rpassword: "",
        // msgText: "",
        percents: 0,
        status: 0
      },
      ruleInline: {
        user: [
          {
            required: true,
            // message: "请输入用户名",
            // trigger: "blur",
            validator: validateuser
          }
        ],
        password: [
          {
            required: true,
            // message: "请输入密码",
            // trigger: "blur",
            validator: validatePass
          }
        ],
        rpassword: [
          {
            required: true,
            // message: "请再次输入密码",
            // trigger: "blur",
            validator: validatePassCheck
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    add(newValue) {
      let flag = checkStrong(newValue);
      console.log(flag);
      if (flag === 0) {
        this.formInline.percents = 0;
        this.formInline.status = 0;
      } else if (flag === 1) {
        this.formInline.percents = 33;
        this.formInline.status = 1;
      } else if (flag === 2) {
        this.formInline.percents = 66;
        // 第一次输入字母呈现红色,删除密码,再次输入的时候,却变成了蓝色?
        this.formInline.status = 2;
      } else {
        this.formInline.percents = 100;
          this.formInline.status = 3;
      }
    }
  }
  // watch: {}
};
</script>
<style>
.ivu-progress {
  width: 50%;
}
</style>
