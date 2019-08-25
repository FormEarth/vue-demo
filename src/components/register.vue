<template>
  <mu-container class="register-container" fluid :style="backgroundDiv">
    <div class="register-box">
      <mu-form ref="form" :model="validateForm">
        <mu-appbar title="用户注册" color="white" z-depth="0" textColor="black">
          <mu-button icon slot="left" @click="$router.back(-1)" class="back-button">
            <mu-icon value="keyboard_arrow_left" color="black" size="36"></mu-icon>
          </mu-button>
        </mu-appbar>
        <mu-form-item v-show="emialOrPhone" prop="email" :rules="emailRules" icon="email">
          <mu-text-field v-model="validateForm.email" prop="email" placeholder="您的邮箱"></mu-text-field>
        </mu-form-item>
        <mu-form-item v-show="!emialOrPhone" prop="phone" :rules="phoneRules" icon="phone">
          <mu-text-field v-model="validateForm.phone" prop="phone" placeholder="您的手机号"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" :rules="passwordRules" icon="vpn_key">
          <mu-text-field
            type="password"
            v-model="validateForm.password"
            prop="password"
            placeholder="密码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="repassword" :rules="repasswordRules" icon="vpn_key">
          <mu-text-field
            type="password"
            v-model="validateForm.repassword"
            prop="repassword"
            placeholder="再次输入密码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" :rules="passwordRules" icon="security">
          <mu-text-field
            type="password"
            v-model="validateForm.password"
            prop="password"
            placeholder="验证码"
            append="code"
          >
            <slot name="code">
              <mu-button
                :class="{disabled: !this.canClick}"
                flat
                color="primary"
                @click="countDown"
              >{{content}}</mu-button>
            </slot>
          </mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <div style="display:flex;padding:0 20px;">
          <div style="width:50%;"><mu-button full-width color="success" @click="submit">注册</mu-button></div>
          &nbsp;&nbsp;&nbsp;
          <div style="width:50%;"><mu-button full-width color="primary" @click="clear">重置</mu-button></div>
        </div>
        <div style="text-align:center;margin-top:10px;">
          注册即表示同意
          <a href>《服务条款》</a>和
          <a href>《隐私政策》</a>
        </div>
      </mu-form>
    </div>
  </mu-container>
</template>
<script>
export default {
  data() {
    return {
      emialOrPhone: true,
      emailRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      repasswordRules: [
        { validate: val => !!val, message: "必须填写您的密码" }
      ],
      phoneRules: [{ validate: val => !!val, message: "必须填写手机号" }],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        email: "",
        phone: "",
        password: "",
        repassword: "",
        isAgree: false
      },
      content: "获取验证码",
      totalTime: 10,
      canClick: true,
      backgroundDiv: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        password: "",
        isAgree: false
      };
    },
    exchange() {
      this.emialOrPhone
        ? (this.emialOrPhone = false)
        : (this.emialOrPhone = true);
      this.$refs.form.clear();
    },
    countDown() {
      if (!this.canClick) return;
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送";
          this.totalTime = 10;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
a {
  color: blue;
}
.register-container {
  width: 100%;
  height: 100%;
}
.mu-paper {
  margin-top: 12%;
  background-color: rgba(244, 243, 250, 0.8);
}
.mu-form-item {
  margin-top: 10px;
  margin-right: 25px;
}
.mu-checkbox {
  margin-left: 10px;
}
.mu-form-item-help {
  left: 15px;
}
.register-box {
  background-color: white;
  padding-bottom: 15px;
}
/* 宽度在800px以上应用的css */
@media screen and (min-width: 800px) {
  .register-container {
    height: 100%;
    padding-top: 50px;
  }
  .register-box {
    width: 40%;
    margin-left: 30%;
  }
  .back-button{
    display: none;
  }
}
/* 宽度在600px~800px应用的css */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .register-container {
    height: 100%;
    padding-top: 50px;
  }
  .register-box {
    width: 90%;
    margin: 0 5%;
  }
}
/* 宽度在300px~640px应用的css */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .register-container {
    height: 100%;
    padding-top: 20px;
  }
  .register-box {
    width: 100%;
    /* margin: 0 5%; */
  }
}
</style>