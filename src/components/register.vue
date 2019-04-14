<template>
<div class="register" :style="backgroundDiv">
  <mu-container>
    <mu-row>
      <mu-col span="12" sm="11" md="5" lg="6" xl="6">
        <mu-paper class="demo-paper" :z-depth="5">
          <mu-form ref="form" :model="validateForm">
            <mu-appbar title="用户注册" color="white" z-depth="0" textColor="black">
              <mu-button icon slot="left" @click="$router.back(-1)">
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
                placeholder="密码"></mu-text-field>
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
                append="code">
                <slot name="code">
                  <mu-button :class="{disabled: !this.canClick}" flat color="primary" @click="countDown">{{content}}</mu-button>
                </slot>
              </mu-text-field>
            </mu-form-item>
            <mu-form-item prop="isAgree" :rules="argeeRules">
              <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
            </mu-form-item>
            <mu-form-item>
              <mu-button flat color="primary" @click="submit">注册</mu-button>
              <mu-button flat @click="clear">重置</mu-button>
              <mu-tooltip v-if="emialOrPhone" content="手机号注册">
                <mu-button flat color="primary" @click="exchange">
                  <mu-icon value="phone"></mu-icon>
                  <mu-icon value="keyboard_arrow_right"></mu-icon>
                </mu-button>
              </mu-tooltip>
              <mu-tooltip v-else content="邮箱注册">
                <mu-button flat color="primary" @click="exchange">
                  <mu-icon value="email"></mu-icon>
                  <mu-icon value="keyboard_arrow_right"></mu-icon>
                </mu-button>
              </mu-tooltip>
            </mu-form-item>
          </mu-form>
        </mu-paper>
      </mu-col>
    </mu-row>
  </mu-container>
  </div>
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
      repasswordRules: [{ validate: val => !!val, message: "必须填写您的密码" }],
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
        backgroundImage: 'url(' + require('@/assets/background.jpg') + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
.register {
  height: 100%;
}
.mu-paper {
  margin-top: 12%;
}
.mu-appbar {
  width: 100%;
  text-align: left;
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
</style>