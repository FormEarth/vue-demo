<template>
  <mu-container>
    <div class="user-card" :style="{backgroundImage: 'url(' + user.frontCover + ')'}">
      <div style="display:flex;justify-content:space-between;height:50px;">
        <mu-button icon slot="left" :ripple="false" @click="$router.back(-1)">
          <mu-icon value="arrow_back" color="white"></mu-icon>
        </mu-button>
        <mu-button icon slot="right" to="/mine/personal/frontcover">
          <mu-icon value="edit" color="white"></mu-icon>
        </mu-button>
      </div>
      <div v-show="showHeader">
        <div class="user-avatar" style="display:flex;z-index:100;">
          <img :src="user.avatar" alt="用户头像" />
          <div style="text-align:right;padding:17px 10px 0 0;width:100%;">
            <mu-button
              v-if="loginAndIsSelf"
              color="white"
              textColor="black"
              round
              small
              to="/mine/personal"
            >
              <mu-icon value="edit"></mu-icon>编辑
            </mu-button>
            <mu-button
              v-else-if="!currentUserIsWatched"
              :disabled="buttonLoading"
              color="greenA700"
              round
              small
              @click="userWatch"
            >关注</mu-button>
            <mu-button
              v-else
              :disabled="buttonLoading"
              color="greenA700"
              round
              small
              @click="removeWatch"
            >已关注</mu-button>
            <!-- <mu-button fab small >
              <mu-icon value="email"></mu-icon>
            </mu-button>-->
          </div>
        </div>

        <div style="color:rgba(255,255,255,0.9);padding-left:3%;z-index:100;">
          <div style="margin:20px 0 0px 0;letter-spacing:0.1em;">
            <div class="user-name">{{user.userName}}</div>
            <div>{{user.sign}}</div>
            <div class="personal-profile">个人简介:{{user.personalProfile}}</div>
            <!-- <span style="white-space: pre-wrap;">{{user.personalProfile}}</span> -->
          </div>
          <div v-if="loginAndIsSelf">
            <div class="data-item">
              {{$store.state.current_user.user_watch_list.length}}
              <label>&nbsp;关注</label>
            </div>
            <div class="data-item">
              {{$store.state.current_user.user_like_list.length}}
              <label>&nbsp;喜欢</label>
            </div>
            <div class="data-item">
              {{$store.state.current_user.user_keep_list.length}}
              <label>&nbsp;收藏</label>
            </div>
          </div>
          <demo-tag color="white" ellipse small></demo-tag>
          <demo-tag color="white" ellipse small>一个 绅士</demo-tag>
        </div>
      </div>
    </div>
    <mu-tabs
      :value.sync="active"
      indicator-color="red"
      inverse
      full-width
      style="position:sticky;top:0;"
    >
      <mu-tab>图集</mu-tab>
      <mu-tab>文章</mu-tab>
      <mu-tab>喜欢</mu-tab>
    </mu-tabs>
    <atlas-list withUser></atlas-list>
  </mu-container>
</template>
<script>
import AtlasList from "@/components/view/home/atlas/atlasList.vue";

export default {
  name: "info",
  data() {
    return {
      buttonLoading: false,
      showHeader: true,
      open: "send",
      active: 0,
      user: {},
      articles: [],
      pictures: [],
      favorites: []
    };
  },
  computed: {
    //已登录并且查看的是自己的资料
    loginAndIsSelf() {
      if (this.$store.getters.isLogin) {
        if (
          this.$store.state.current_user.userId == this.$route.params.userId
        ) {
          return true;
        }
      }
      return false;
    },
    //当前用户是否已关注
    currentUserIsWatched() {
      if (this.$store.getters.isLogin) {
        if (
          this.$store.state.current_user.user_watch_list.includes(
            this.user.userId
          )
        ) {
          return true;
        }
      }
      return false;
    }
  },
  created() {
    console.log(this.$route.params.userId);
    console.log("login_user_id:" + this.$store.state.current_user.userId);
    if (this.loginAndIsSelf) {
      this.user = this.$store.state.current_user;
      window.document.title = this.user.userName + "的个人主页";
    } else {
      //TODO 查询用户
      this.$http.user
        .getCommonInfoByUserId(this.$route.params.userId)
        .then(response => {
          if (response.data.code == "2000") {
            this.user = response.data.data.user;
          } else {
          }
        })
        .catch(error => {});
    }
    // 获取地理位置信息,（需要https支持……）
    // navigator.geolocation.getCurrentPosition(this.geoHandler, this.errorHandler, {
    //   enableHighAccuracy: true,
    //   maximumAge: 1000
    // })
  },
  mounted() {
    // window.addEventListener("scroll", this.scroll, 1000);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.scroll, false);
  },
  components: {
    AtlasList
  },
  methods: {
    //关注用户
    userWatch() {
      this.buttonLoading = true;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "正在关注"
      });
      this.$http.user
        .userAddCollection({
          collectionType: "USER_WATCH",
          collectionId: this.user.userId
        })
        .then(response => {
          if (response.data.code == "2000") {
            this.$toast.clear();
            this.$store.commit("add_watch_user", this.user.userId);
            //保存数据到sessionStorage
            sessionStorage.setItem(
              "current_user",
              JSON.stringify(this.$store.state.current_user)
            );
            this.$toast("关注成功");
          } else {
            this.$toast.clear();
          }
          this.buttonLoading = false;
        })
        .catch(error => {
          this.buttonLoading = false;
          this.$toast.clear();
        });
    },
    //不再关注
    removeWatch() {
      this.buttonLoading = true;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "正在关注"
      });
      this.$http.user
        .userRemoveCollection({
          collectionType: "USER_WATCH",
          collectionId: this.user.userId
        })
        .then(response => {
          if (response.data.code == "2000") {
            this.$toast.clear();
            this.$store.commit("remove_watch_user", this.user.userId);
            //保存数据到sessionStorage
            sessionStorage.setItem(
              "current_user",
              JSON.stringify(this.$store.state.current_user)
            );
            this.$toast("取消关注成功");
          } else {
            this.$toast.clear();
          }
          this.buttonLoading = false;
        })
        .catch(error => {
          this.$toast.clear();
          this.buttonLoading = false;
        });
    },
    //监听滚动
    scroll() {
      // var offsetTop = document.querySelector('#searchBar').offsetTop;
      // console.log("offsetTop:"+offsetTop)
      console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 20) {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    },
    // 防抖
    debounce(fn, wait) {
      var timeout = null;
      return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      };
    },
    geoHandler(position) {
      var geoMsg = "";
      geoMsg += "timestamp属性为：" + position.timestamp;
      // 获取Coordinates对象，该对象里包含了详细的地理位置信息
      var coords = position.coords;
      // 遍历Coordinates对象的所有属性
      for (var prop in coords) {
        geoMsg += prop + "-->" + coords[prop];
      }
      // 输出地理位置信息
      console.log(geoMsg);
    },
    errorHandler(error) {
      // 为不同错误代码定义错误提示
      var errMsg = {
        1: "用户拒绝了位置服务",
        2: "无法获取地址位置信息",
        3: "获取地理位置信息超时"
      };
      // 弹出错误提示
      alert(errMsg[error.code]);
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
}
.user-card {
  background-size: cover;
}
.user-card .user-avatar {
  width: 100%;
  height: 62px;
  padding-top: 0px;
  padding-left: 6%;
}
.user-card .user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* border: 1px solid white; */
}
.user-name {
  height: 18px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 9px;
  /* margin-left: calc(50% - 30px); */
  /* text-align: left; */
}
.user-other {
  margin-top: 7px;
  padding-left: 2%;
}
.data-item {
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
}
.personal-profile {
  white-space: pre-wrap;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;/** 这个属性在build时会被删除，需要特别处理 */
  /* autoprefixer: on */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>