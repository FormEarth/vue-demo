<template>
  <mu-container>
    <mu-list toggle-nested>
      <mu-list-item v-if="isLogin" avatar button @click="goMyPage">
        <mu-list-item-action>
          <mu-avatar size="40">
            <img :src="user.avatar" :onerror="defaultImg" />
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>
            {{user.userName}}
            <mu-chip
              color="redA700"
              text-color="white"
              style="line-height: 20px;font-size:10px"
            >vip 8</mu-chip>
          </mu-list-item-title>
          <mu-list-item-sub-title>{{user.sign}}</mu-list-item-sub-title>
        </mu-list-item-content>
        <!-- <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>
        </mu-list-item-action> -->
      </mu-list-item>
      <mu-list-item v-else avatar button :ripple="false" to="/login">
        <mu-list-item-action>
          <mu-avatar>
            <mu-icon value="person"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>未登录</mu-list-item-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>

      <mu-list-item button :ripple="false" to="/mine/personal">
        <mu-list-item-action>
          <mu-icon value="contacts" color="indigo400"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>个人信息</mu-list-item-title>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="dashboard" color="primary"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>动态</mu-list-item-title>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" to="/mine/inbox">
        <mu-list-item-action>
          <mu-icon value="inbox" color="redA700"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>草稿箱</mu-list-item-title>
        <mu-list-item-action>
          <mu-badge content="100+" color="redA700"></mu-badge>
          <!-- <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>-->
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="beenhere" color="green"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>收藏</mu-list-item-title>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" to="/mine/setting">
        <mu-list-item-action>
          <mu-icon value="settings" color="blueGrey500"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>设置</mu-list-item-title>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="arrow_forward_ios"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="openAlertDialog" v-show="isLogin">
        <mu-list-item-action>
          <mu-icon value="exit_to_app" color="black"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>退出</mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>加入我们</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info" color="primary"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>关于</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info" color="primary"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <!-- </mu-paper> -->
    <mu-dialog
      title="退出登录"
      width="600"
      max-width="80%"
      transition="slide-left"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      该操作将清除您当前的登录状态
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="userLogout">确认</mu-button>
    </mu-dialog>
    <!-- <app-footer param="mine"></app-footer> -->
  </mu-container>
</template>
<script>
export default {
  name: "mine",
  data() {
    return {
      open: "send",
      openAlert: false
    };
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    user: function() {
      return this.$store.state.current_user;
    },
    //默认加载的图片
    defaultImg() {
      return 'this.src="' + require("@/assets/broken_image.jpg") + '"';
    }
  },
  methods: {
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    userLogout() {
      this.$http.user.userLogout(this.user).then(response => {
        //移除sessionStorge中的用户数据
        sessionStorage.removeItem("current_user");
        //移除vuex中的用户数据
        this.$store.commit("remove_user");
        //TODO 发后台登出api
        this.openAlert = false;
        this.$notify({
          message: "登出成功",
          duration: 1000,
          background: "#2196f3"
        });
      });
    },
    goMyPage() {
      var url = "/" + this.user.userId + "/homepage";
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.demo-list {
  width: 100%;
}
.demo-list-wrap {
  width: 100%;
  max-width: 500px;
  overflow: hidden;
}
@media screen and (min-width: 800px) {
  .container {
    padding: 10px 10%;
  }
}
@media screen and (max-width: 600px) {
  .demo-card {
    display: none;
  }
}
</style>