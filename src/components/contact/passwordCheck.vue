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
    <Progress :percent="percent" />
    <!-- 再次确认密码 -->
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
import checkStrong from "@/components/js/checkpassStrong.js";
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
        msgText: "",
        percent: 0
      },
      ruleInline: {
        user: [
          {
            required: true,
            // message: "请输入用户名",
            trigger: "blur",
            validator: validateuser
          }
        ],
        password: [
          {
            required: true,
            // message: "请输入密码",
            trigger: "blur",
            validator: validatePass
          }
        ],
        rpassword: [
          {
            required: true,
            // message: "请再次输入密码",
            trigger: "blur",
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

    add(newValue, oldValue) {
      this.msgText = checkStrong(newValue);
      if (this.msgText > 1 || this.msgText == 1) {
        this.percent += 33;
      } else {
        this.percent == 0;
      }
      if (this.msgText > 2 || this.msgText == 2) {
        this.percent += 66;
      } else {
        this.percent == 0;
      }
      if (this.msgText == 4) {
        this.percent += 100;
      } else {
        this.percent == 0;
      }
    }
  }
  // watch: {}
};
</script>

