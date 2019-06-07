<template>
  <!-- <div class="login"> -->
  <mu-container class="demo-container is-stripe" :style="backgroundDiv">
    <div style="padding-top:20px;">
      <mu-paper class="demo-paper" :z-depth="5" round>
        <mu-appbar color="rgba(244, 243, 250, 0.7)" z-depth="0" textColor="black" title="登录">
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
          <mu-button flat @click="submit">
            登录
            <mu-icon right value="send"></mu-icon>
          </mu-button>
          <!-- <mu-divider></mu-divider> -->
          <!-- <mu-form-item style="text-align: center;color:black">
                <label style="margin-left: 35%">更多登录方式</label>
          </mu-form-item>-->
        </mu-form>
        <!-- <mu-button flat color="primary">忘记密码？</mu-button>
        <br>
        <mu-button flat color="primary" @click="openSimpleDialog">没有账号？</mu-button>-->
        <mu-expansion-panel :zDepth="0" :expand="panel" @change="toggle()">
          <!-- <div slot="header">123</div> -->
          <mu-button flat color="primary">忘记密码？</mu-button>
          <br>
          <!-- <mu-button flat color="primary" to="/register">没有账号？</mu-button> -->
          <mu-button flat color="primary" @click="openSimpleDialog">没有账号？</mu-button>
          <br>
          <mu-button flat color="primary" to="/home">首页</mu-button>
        </mu-expansion-panel>
      </mu-paper>
    </div>
    <mu-dialog width="360" transition="slide-left" :open.sync="openDialog">
      暂未开放注册哦^_^
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">好吧</mu-button>
    </mu-dialog>
  </mu-container>
  <!-- </div> -->
</template>

<script>
import { userLogin } from "@/axios/api"; //引入axios接口

export default {
  name: "login",
  data() {
    return {
      openDialog: false,
      visibility: false,
      panel: false,
      active: 0,
      backgroundDiv: {
        backgroundImage:
          "url(" + require("@/assets/images/login_background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
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
        remberMe: false
      }
    };
  },
  methods: {
    toggle(panel) {
      this.panel ? (this.panel = false) : (this.panel = true);
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
    //登录点击事件
    submit() {
      this.$refs.form.validate().then(result => {
        if (!result) return;
        userLogin().then(response => {
          const user = response.data.data;
          //sessionStorage只能存储string类型，不能直接存对象，所以存的时候对象要转为字符串
          sessionStorage.setItem("current_user", JSON.stringify(user));
          this.$store.commit("save_user", user);
          if (this.$route.query.redirect) {
            //如果存在参数
            let redirect = this.$route.query.redirect;
            this.$router.replace(redirect); //则跳转至进入登录页前的路由，这里使用了replace，因为不希望返回时到登录页
          } else {
            this.$router.replace("/mine"); //否则跳转至我的首页
          }
          //取值的时候也要注意字符串转对象
          console.log(JSON.parse(sessionStorage.getItem("current_user")));
        });
        // axios.post("http://192.168.0.110:8080/demo/api/user/login")
        //   .then(response => {
        //     console.log(response.data.data);
        //   });
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
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
  height: 120%;
}
.mu-appbar {
  width: 100%;
  margin-bottom: 18px;
}
.demo-paper {
  margin-left: 7px;
  margin-right: 7px;
  background: rgba(244, 243, 250, 0.7);
}
.mu-input {
  margin-bottom: 2px;
  margin-top: 10px;
  margin-right: 25px;
}
.mu-demo-form {
  text-align: center;
}
.mu-expansion-panel {
  background: rgba(244, 243, 250, 0.5);
}
</style>
