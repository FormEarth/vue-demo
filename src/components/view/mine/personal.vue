<template>
  <mu-container>
    <div class="detail-content">
      <mu-list>
        <mu-sub-header>基本信息</mu-sub-header>
        <mu-list-item avatar button :ripple="false" to="/mine/personal/avatar">
          <mu-list-item-action>
            <mu-avatar size="40">
              <img :src="user.avatar" :onerror="defaultImg" />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>头像</mu-list-item-title>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-content>
            <mu-list-item-title>账号</mu-list-item-title>
            <mu-list-item-sub-title>{{user.account}}</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="goInfoEdit('userName',user.userName)">
          <mu-list-item-content>
            <mu-list-item-title>昵称</mu-list-item-title>
            <mu-list-item-sub-title>{{user.userName}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="goInfoEdit('birthday',user.birthday)">
          <mu-list-item-content>
            <mu-list-item-title>生日</mu-list-item-title>
            <mu-list-item-sub-title>{{user.birthday}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="goInfoEdit('sign',user.sign)">
          <mu-list-item-content>
            <mu-list-item-title>签名</mu-list-item-title>
            <mu-list-item-sub-title>{{user.sign|allowEmpty}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item
          button
          :ripple="false"
          @click="goInfoEdit('personalProfile',user.personalProfile)"
        >
          <mu-list-item-content>
            <mu-list-item-title>简介</mu-list-item-title>
            <mu-list-item-sub-title>{{user.personalProfile|allowEmpty}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="goInfoEdit('sex',user.sex)">
          <mu-list-item-content>
            <mu-list-item-title>性别</mu-list-item-title>
            <mu-list-item-sub-title>{{user.sex|sex}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <!-- <mu-divider></mu-divider> -->
      <mu-list textline="two-line">
        <mu-sub-header>更多</mu-sub-header>
        <mu-list-item button :ripple="false">
          <mu-list-item-content>
            <mu-list-item-title>Vacation itinerary</mu-list-item-title>
            <mu-list-item-sub-title>Jan 20, 2014</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="info"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar color="yellow600">
              <mu-icon value="insert_chart"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>Kitchen remodel</mu-list-item-title>
            <mu-list-item-sub-title>Jan 10, 2014</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="info"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
  </mu-container>
</template>
<script>
export default {
  name: "personal",
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = this.$store.state.current_user;
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    // user: function() {
    //   return this.$store.state.current_user;
    // }
    //默认加载的图片
    defaultImg() {
      return 'this.src="' + require("@/assets/broken_image.jpg") + '"';
    }
  },
  methods: {
    goInfoEdit(type, modify) {
      this.$router.push({
        name: "personalinfoedit",
        query: { type: type, modifyValue: modify }
      });
    }
  },
  filters: {
    sex(value) {
      if (value == 0) {
        return "未填写";
      } else {
        return value == 1 ? "男" : "女";
      }
    },
    allowEmpty(value) {
      if (value == null || value == "") {
        return "未填写";
      } else {
        return value;
      }
    }
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  /* max-width: 500px; */
  min-width: 350px;
  background-color: white;
}

@media screen and (min-width: 993px) {
  /* .detail-content {
    padding: 0 10%;
  } */
}
</style>