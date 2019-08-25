<template>
  <mu-container class="demo-container" fluid :style="backgroundDiv">
    <div class="login-box">
      <mu-appbar title="用户登录" color="white" z-depth="0" textColor="black">
        <mu-button icon slot="left" @click="$router.back(-1)" class="back-button">
          <mu-icon value="keyboard_arrow_left" color="black" size="36"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item prop="account" :rules="accountRules" icon="perm_identity">
          <mu-text-field v-model="validateForm.account" placeholder="您的账号"></mu-text-field>
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
        <div style="padding:0 15px;">
          <mu-button full-width color="green500" @click="submit">
            登录
            <mu-icon right value="send"></mu-icon>
          </mu-button>
        </div>
        <!-- <mu-button flat @click="submit">
          登录
          <mu-icon right value="send"></mu-icon>
        </mu-button>-->
        <hr />
        <div style="text-align: center;color: grey;">——更多登录方式——</div>
        <div class="login-otherway">
          <div class="otherway-item">
            <img :src="wechat_png" alt />
          </div>
          <div class="otherway-item">
            <img :src="qq_png" alt />
          </div>
          <div class="otherway-item">
            <img :src="weibo_png" alt />
          </div>
        </div>
        <div style="padding:0 15px;">
          <mu-button full-width color="blueGrey100" textColor="black" to="/register">
            注册新账号
            <!-- <mu-icon right value="send"></mu-icon> -->
          </mu-button>
        </div>
        <div style="text-align:center;margin-top:10px;">
          登录即表示同意
          <a href>《服务条款》</a>和
          <a href>《隐私政策》</a>
        </div>
      </mu-form>
    </div>
    <mu-dialog width="360" transition="slide-left" :open.sync="openDialog">
      暂未开放注册哦^_^
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">好吧</mu-button>
    </mu-dialog>
  </mu-container>
</template>

<script>
import { userLogin } from "@/axios/api"; //引入api接口

export default {
  name: "login",
  data() {
    return {
      openDialog: false,
      visibility: false,
      panel: false,
      active: 0,
      backgroundDiv: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      accountRules: [
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
        account: "",
        password: "",
        remberMe: false
      },
      wechat_png: require("@/assets/images/wechat.png"),
      qq_png: require("@/assets/images/instagram.png"),
      weibo_png: require("@/assets/images/sina_weibo.png")
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
        userLogin(this.validateForm).then(response => {
          const user = response.data.data.current_user_data;
          //sessionStorage只能存储string类型，不能直接存对象，所以存的时候对象要转为字符串
          console.log("current_user", JSON.stringify(user));
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
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        account: "",
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

<style scoped>
a {
  color: blue;
}
.demo-container {
  width: 100%;
  height: 100%;
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
.login-box {
  background-color: white;
  padding-bottom: 15px;
}
.login-otherway {
  display: flex;
  justify-content: center;
}
.otherway-item {
  margin-right: 10px;
}
.otherway-item img {
  width: 25px;
  height: 25px;
}
/* 宽度在800px以上应用的css */
@media screen and (min-width: 800px) {
  .demo-container {
    padding-top: 50px;
  }
  .login-box {
    width: 40%;
    margin-left: 30%;
  }
  .back-button {
    display: none;
  }
}
/* 宽度在600px~800px应用的css */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .demo-container {
    padding-top: 50px;
  }
  .login-box {
    width: 90%;
    margin: 0 5%;
  }
}
/* 宽度在300px~640px应用的css */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .demo-container {
    padding-top: 20px;
  }
  .login-box {
    width: 100%;
    /* margin: 0 5%; */
  }
}
</style>
