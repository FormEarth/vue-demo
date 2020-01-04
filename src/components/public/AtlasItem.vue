<template>
  <div class="main-content">
    <div class="atlas-item">
      <div class="atlas-item-header">
        <div style="display:flex;">
          <div
            class="header-left"
            style="cursor: pointer;"
            @click="$router.push('/'+atlas.user.userId+'/homepage')"
          >
            <img v-lazy="atlas.user.avatar" />
          </div>
          <div class="header-center">
            <div class="header-username">
              <span>{{atlas.user.userName}}</span>
              <!-- <span class="follow-button">关注</span> -->
            </div>
            <div style="height:23px;line-height:16px;padding-top:2px;">
              上海市 松江区&nbsp;来自demooo网页版
              {{atlas.sendTime|time}}
            </div>
          </div>
        </div>
        <div class="header-right">
          <mu-icon size="35" value="more_vert" @click="openAlertDialog" style="cursor: pointer;"></mu-icon>
        </div>
      </div>
      <mu-divider></mu-divider>
      <demo-atlas-view :images="atlas.atlasPictures" :identical="atlas.identical" forbidOversize></demo-atlas-view>
      <div v-if="atlas.atlasPictures.length>0">
        <demo-tag v-if="atlas.personal" color="red" small>仅自己可见</demo-tag>
        <demo-tag v-for="tag in atlas.atlasTags" :key="tag.tagId" small>{{tag.tagText}}</demo-tag>
      </div>
      <div ref="contentText" class="atlas-content" :style="{lineClamp: fold}">
        <span
          style="font-size:14px;white-space: pre-wrap;"
          v-html="atlas.atlasContent[atlas.atlasContent.length-1]"
        ></span>
        <demo-tag
          v-show="atlas.atlasPictures.length==0"
          v-for="tag in atlas.atlasTags"
          :key="tag.tagId"
          simple
        >{{tag.tagText}}</demo-tag>
      </div>
      <div v-if="showButton">
        <div class="show" @click="handleFold" v-show="fold==2">展开更多</div>
        <div class="show" @click="handleFold" v-show="fold==100">收起</div>
      </div>
      <!-- <div style="font-size:12px;">123条评论</div> -->
      <div class="atlas-item-footer">
        <div
          class="footer-left"
          style="font-size:12px;width:100%;margin-top:4px;margin-right:3px;"
        >123&nbsp;次喜欢</div>
        <div style="width:100%;text-align:right;">
          <mu-icon
            :value="isLiked?'favorite':'favorite_border'"
            :color="isLiked?'red700':''"
            size="25"
            @click="toggleLike"
          ></mu-icon>&nbsp;
          <mu-icon
            :value="isKeeped?'beenhere':'turned_in_not'"
            :color="isKeeped?'green':''"
            size="25"
            @click="toggleKeep"
          ></mu-icon>&nbsp;
          <mu-icon value="dvr" size="25"></mu-icon>&nbsp;
          <mu-icon value="open_in_new" size="25"></mu-icon>
        </div>
      </div>
    </div>
    <mu-dialog
      width="100%"
      max-width="90%"
      :esc-press-close="false"
      :overlay-opacity="0.6"
      :open.sync="openAlert"
    >
      <mu-list>
        <mu-list-item
          button
          :ripple="false"
          @click="$router.push('/atlas/detail/'+atlas.atlasId);openAlert=false"
        >
          <mu-list-item-action>
            <mu-icon value="collections"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>详情</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="star_border"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>关注 {{atlas.user.userName}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="file_copy"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>复制文字内容</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="link"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>复制图集链接</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="visibility_off"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>不看</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="openBotttomSheet">
          <mu-list-item-action>
            <mu-icon value="warning"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>举报</mu-list-item-title>
        </mu-list-item>
        <mu-list-item
          v-show="this.$store.state.current_user.userId==this.atlas.creater"
          :ripple="false"
          button
          @click="openAlert=false;$router.push('/atlas/edit/'+atlas.atlasId)"
        >
          <mu-list-item-action>
            <mu-icon value="edit"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>重新编辑</mu-list-item-title>
        </mu-list-item>
        <mu-list-item
          v-show="this.$store.state.current_user.userId==this.atlas.creater"
          :ripple="false"
          button
          @click="openAlert=false;showDialog=true;"
        >
          <mu-list-item-action>
            <mu-icon value="delete"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>删除</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-dialog>
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>您正在举报{{atlas.user.userName}}，举报原因：</mu-sub-header>
        <mu-list-item button>
          <mu-list-item-title>政治有害类</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>侵权</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>广告、不健康信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>内容引起不适</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @item-click="closeBottomSheet">
          <mu-list-item-title>取消</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <mu-dialog
      width="600"
      max-width="80%"
      title="删除确认"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="showDialog"
      transition="slide-left"
    >
      <div style="padding-left:24px;">确定要删除吗？删除后将无法撤销</div>
      <mu-button slot="actions" flat color="primary" @click="showDialog=false">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="deleteAtlas">确认</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import util from "@/util/util";

export default {
  name: "AtlasItem", //图集列表组件
  props: {
    //图集对象
    atlas: {
      type: Object
    },
    //外层循环的索引
    arrayIndex: {
      type: Number
    }
  },
  data() {
    return {
      openAlert: false,
      open: false,
      fold: 100,
      showButton: false,
      showDialog: false //删除的确认框
    };
  },
  computed: {
    //是否已喜欢
    isLiked() {
      if (this.$store.getters.isLogin) {
        if (
          this.$store.state.current_user.user_like_list.includes(
            this.atlas.atlasId
          )
        ) {
          return true;
        }
      }
      return false;
    },
    //是否已收藏
    isKeeped() {
      if (this.$store.getters.isLogin) {
        if (
          this.$store.state.current_user.user_keep_list.includes(
            this.atlas.atlasId
          )
        ) {
          return true;
        }
      }
      return false;
    },
    //默认加载的图片
    defaultImg() {
      return 'this.src="' + require("@/assets/broken_image.jpg") + '"';
    }
  },
  filters: {
    time: function(value) {
      return util.dateSubtract(value);
    }
  },
  mounted() {
    let initHight = this.$refs.contentText.offsetHeight;
    // 45是两行的高度,当溢出时才显示展示更多按钮,这样还是有问题，页面改变时，无法获取到overflow的溢出高度，无法使用监控来自适应
    if (initHight > 45) {
      this.showButton = true;
      this.fold = 2;
    }
    // let _this = this;
    // window.onresize = () => {
    //   console.log("页面宽度改变了");

    //   let height = this.$refs.contentText.offsetHeight;
    //   console.log("span高度："+height);
    //   if (height > 38.4) {
    //     _this.showButton = true;
    //   }else{
    //     _this.showButton = false;
    //   }
    // };
  },
  methods: {
    test() {
      alert(width);
    },
    //切换喜欢与取消喜欢
    toggleLike() {
      if (!this.$store.getters.isLogin) {
        this.$router.push("/login");
        return;
      }
      if (this.isLiked) {
        //移除喜欢
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "正在移除……"
        });
        this.$http.user
          .userRemoveCollection({
            collectionType: "ATLAS_LIKE",
            collectionId: this.atlas.atlasId
          })
          .then(response => {
            if (response.data.code == "2000") {
              this.$toast.clear();
              this.$store.commit("remove_like_list", this.atlas.atlasId);
              //保存数据到sessionStorage
              sessionStorage.setItem(
                "current_user",
                JSON.stringify(this.$store.state.current_user)
              );
              this.$demo_notify("已移除喜欢");
            } else {
              this.$toast.clear();
            }
          })
          .catch(error => {
            this.$toast.clear();
          });
      } else {
        //添加喜欢
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "正在添加……"
        });
        this.$http.user
          .userAddCollection({
            collectionType: "ATLAS_LIKE",
            collectionId: this.atlas.atlasId
          })
          .then(response => {
            if (response.data.code == "2000") {
              this.$toast.clear();
              this.$store.commit("add_like_list", this.atlas.atlasId);
              //保存数据到sessionStorage
              sessionStorage.setItem(
                "current_user",
                JSON.stringify(this.$store.state.current_user)
              );
              this.$demo_notify("已添加喜欢");
            } else {
              this.$toast.clear();
            }
          })
          .catch(error => {
            this.$toast.clear();
          });
      }
    },
    //切换收藏与取消收藏
    toggleKeep() {
      if (!this.$store.getters.isLogin) {
        this.$router.push("/login");
        return;
      }
      if (this.isKeeped) {
        //移除收藏
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "正在移除……"
        });
        this.$http.user
          .userRemoveCollection({
            collectionType: "ATLAS_KEEP",
            collectionId: this.atlas.atlasId
          })
          .then(response => {
            if (response.data.code == "2000") {
              this.$toast.clear();
              this.$store.commit("remove_keep_list", this.atlas.atlasId);
              //保存数据到sessionStorage
              sessionStorage.setItem(
                "current_user",
                JSON.stringify(this.$store.state.current_user)
              );
              this.$demo_notify("已移除收藏");
            } else {
              this.$toast.clear();
            }
          })
          .catch(error => {
            this.$toast.clear();
          });
      } else {
        //添加喜欢
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "正在添加……"
        });
        this.$http.user
          .userAddCollection({
            collectionType: "ATLAS_KEEP",
            collectionId: this.atlas.atlasId
          })
          .then(response => {
            if (response.data.code == "2000") {
              this.$toast.clear();
              this.$store.commit("add_keep_list", this.atlas.atlasId);
              //保存数据到sessionStorage
              sessionStorage.setItem(
                "current_user",
                JSON.stringify(this.$store.state.current_user)
              );
              this.$demo_notify("已添加收藏");
            } else {
              this.$toast.clear();
            }
          })
          .catch(error => {
            this.$toast.clear();
          });
      }
    },
    goInfo() {
      this.$router.push("/mine/info");
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    closeBottomSheet() {
      this.open = false;
      this.$toast("举报成功！");
    },
    openBotttomSheet() {
      this.openAlert = false;
      this.open = true;
    },
    handleFold() {
      this.fold = this.fold == 100 ? 2 : 100;
    },
    onChange(index) {
      this.current = index;
    },
    //删除图集
    deleteAtlas() {
      console.log("调用了父组件");
      this.$emit("remove", this.arrayIndex);
      this.$http.atlas
        .deleteAtlasById(this.atlas.atlasId)
        .then(response => {
          if (response.data.code == "2000") {
            this.$toast("已删除");
            //调用父组件
            this.$emit("remove", this.arrayIndex);
            this.openAlert = false;
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style scoped>
.main-content {
  min-width: 350px;
  /* max-width: 800px; */
  width: 100%;
  background-color: #fff;
}
.atlas-item-header {
  display: flex;
  justify-content: space-between;
  height: 46px;
  padding: 2px 2px;
  /* background-color: rgb(160, 248, 186); */
}
.header-center {
  /* display: flex;
  flex-direction: column; */
  /* width: 60%; */
  padding-left: 4px;
  font-size: 10px;
}
.header-right {
  /* width: 30%; */
  text-align: right;
}
.header-left img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.atlas-item-footer {
  display: flex;
  justify-content: space-between;
}
.follow-button {
  border: 1px solid rgb(204, 0, 0);
  color: rgb(204, 0, 0);
  height: 14px;
  letter-spacing: 4px;
  font-size: 12px;
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
}
.menu-item {
  width: 100%;
  /* text-align:center; */
  /* border-bottom: 1px solid black; */
}
.mu-dialog-wrapper >>> .mu-dialog-body {
  padding: 0;
}
.header-username {
  font-family: 方正隶变简体, "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  height: 23px;
  font-size: 16px;
  line-height: 15px;
  padding-top: 5px;
  color: red;
}
.atlas-content {
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical; /** 这个属性在build时会被删除，需要特别处理 */
  /* autoprefixer: on */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 100;
  /* margin: 10px 0 10px 0; */
  font-size: 15px;
  padding: 0 2px;
}
.show {
  font-size: 13px;
  color: cornflowerblue;
}
</style>
