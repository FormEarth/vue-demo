<template>
  <div class="login" :style="backgroundDiv">
    <mu-container class="demo-container is-stripe">
      <mu-row gutter>
        <mu-col span="12" sm="11" md="5" lg="6" xl="6">
          <mu-paper class="demo-paper" :z-depth="5">
            <mu-appbar color="white" z-depth="0" textColor="black" title="登录">
              <mu-button icon slot="left" @click="$router.back(-1)">
                <mu-icon value="keyboard_arrow_left" color="black" size="36"></mu-icon>
              </mu-button>
            </mu-appbar>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
              <mu-form-item prop="name" :rules="usernameRules" icon="perm_identity">
                <mu-text-field v-model="validateForm.name" placeholder="您的账号"></mu-text-field>
              </mu-form-item>
              <mu-form-item prop="password" :rules="passwordRules" icon="vpn_key">
                <mu-text-field
                  placeholder="您的密码"
                  v-model="validateForm.password"
                  :action-icon="visibility ? 'visibility_off' : 'visibility'"
                  :action-click="() => (visibility = !visibility)"
                  :type="visibility ? 'text' : 'password'"
                ></mu-text-field>
              </mu-form-item>
              <mu-form-item prop="remberMe" help-text="请勿在公用电脑勾选此选项" style="padding-left:16px;">
                <mu-checkbox label="记住我" v-model="validateForm.remberMe"></mu-checkbox>
              </mu-form-item>
              <mu-button flat @click="submit">登录
                <mu-icon right value="send"></mu-icon>
              </mu-button>
              <mu-divider></mu-divider>
              <!-- <mu-form-item style="text-align: center;color:black">
                <label style="margin-left: 35%">更多登录方式</label>
              </mu-form-item>-->
            </mu-form>
            <mu-expansion-panel :zDepth="0" :expand="panel === 'panel1'" @change="toggle('panel1')">
              <div slot="header"></div>
              <mu-button flat color="primary">忘记密码？</mu-button>
              <br>
              <!-- <mu-button flat color="primary" to="/register">没有账号？</mu-button> -->
              <mu-button flat color="primary" @click="openSimpleDialog">没有账号？</mu-button>
              <br>
              <!-- <mu-button flat color="primary" to="/home">首页</mu-button> -->
            </mu-expansion-panel>
          </mu-paper>
        </mu-col>
      </mu-row>
      <mu-dialog width="360" transition="slide-left" :open.sync="openDialog">暂未开放注册哦^_^
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">好吧</mu-button>
      </mu-dialog>
    </mu-container>
  </div>
</template>

<script>
import carouselImg1 from "@/assets/images/carousel1.jpg";
import carouselImg2 from "@/assets/images/carousel2.jpg";
export default {
  name: "login",
  data() {
    return {
      openDialog: false,
      visibility: false,
      panel: "",
      active: 0,
      backgroundDiv: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      usernameRules: [
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
      validateForm: {
        name: "",
        password: "",
        remberMe:false,
      }
    };
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },
    goHomepage() {
      this.$router.push("/home");
    },
    goRegister() {
      this.$router.push("/register");
    },
    changeActive(index) {
      this.active = index;
    },
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        name: "",
        password: "",
        remberMeffalse: false
      };
    },
    openSimpleDialog() {
      this.openDialog = true;
    },
    closeSimpleDialog() {
      this.openDialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  height: 100%;
}
.mu-appbar {
  width: 100%;
  margin-bottom: 18px;
}
.demo-paper {
  margin-top: 4%;
}
.mu-input {
  margin-bottom: 2px;
  margin-top: 10px;
  margin-right: 25px;
}
.mu-demo-form {
  text-align: center;
}
</style>
