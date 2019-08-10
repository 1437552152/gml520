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
    <div class="input_span">
      <label style="margin-left:40px;">强度:</label>
      <span id="one" :class="formInline.isHidden?stronger1:simplity"></span>
      <span id="two" :class="formInline.isHidden?stronger2:simplity"></span>
      <span id="three" :class="formInline.isHidden?stronger3:simplity"></span>
    </div>
    <div id="font">
      <span>弱</span>
      <span>中</span>
      <span>强</span>
    </div>
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
// 密码
    const validatePass = (rule, value, callback) => {
      
       this.password(value);
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
        isHidden: false,
        stronger1:'stronger1',
        stronger2:'stronger2',
        stronger3:'stronger3',
        // simplity:'simplity'
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
    password(newValue) { 
      this.msgText = checkStrong(newValue);
      console.log(this.msgText);
      if (this.msgText == 1) {
        this.formInline.isHidden = true;
      } else {
        this.formInline.isHidden = false;
      }
      if (this.msgText == 2) {
        this.formInline.isHidden = true;
      } else {
        this.formInline.isHidden = false;
      }
      if (this.msgText == 4) {
        this.formInline.isHidden = true;
      } else {
        this.formInline.isHidden = false;
      }
    }
  }
  // watch: {}
};
</script>
<style lang="less" scoped>
.input_span span {
  display: inline-block;
  width: 85px;
  height: 10px;
  background: #eee;
  line-height: 20px;
}

#one {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 20px;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
#font span:nth-child(1) {
  color: red;
  margin-left: 128px;
}
#font span:nth-child(2) {
  color: orange;
  margin: 0 70px;
}
#font span:nth-child(3) {
  color: #00d1b2;
}
.stronger1 {
  background: red;
}
.stronger2 {
  background: green;
}
.stronger3 {
  background: yellow;
}
.simplity{
  background: #eee;
}
</style>
