<template>
  <mu-container>
    <!-- <mu-appbar color="white" textColor="black" title="个人信息" z-depth="1">
      <mu-button icon slot="left" >
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </mu-appbar>-->
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-appbar color="lightBlue">
        <mu-button icon slot="left" @click="$router.back(-1)">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>个人信息
        <mu-button icon slot="right">
          <mu-icon value="view_quilt"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list textline="two-line">
        <!-- <mu-sub-header>Folders</mu-sub-header> -->
        <mu-list-item avatar button :ripple="false">
          <!-- <mu-list-item-action>
            <mu-avatar color="yellow600">
              <mu-icon value="insert_chart"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>-->
          <mu-list-item-content>
            <mu-list-item-title>头像</mu-list-item-title>
            <!-- <mu-list-item-sub-title>Jan 10, 2014</mu-list-item-sub-title> -->
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="person"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <!-- <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="folder"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>-->
          <mu-list-item-content>
            <mu-list-item-title>昵称</mu-list-item-title>
            <mu-list-item-sub-title>{{user.name}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon @click="openSimpleDialog">
              <mu-icon value="edit" color="primary"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <!-- <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="folder"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>-->
          <mu-list-item-content>
            <mu-list-item-title>个性签名</mu-list-item-title>
            <mu-list-item-sub-title>{{user.sign}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="edit" color="redA700"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <!-- <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="folder"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>-->
          <mu-list-item-content>
            <mu-list-item-title>简介</mu-list-item-title>
            <mu-list-item-sub-title>{{user.synopsis}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="edit" color="green"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-content>
            <mu-list-item-title>生日</mu-list-item-title>
            <mu-list-item-sub-title>1996-04-24</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="edit" color="yellow"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <!-- <mu-divider></mu-divider> -->
      <mu-list textline="two-line">
        <mu-sub-header>更多</mu-sub-header>
        <mu-list-item button :ripple="false">
          <!-- <mu-list-item-action>
            <mu-avatar color="blue">
              <mu-icon value="assignment"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>-->
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
      <mu-dialog title="修改昵称" width="360" :open.sync="openSimple" transition="slide-top">
        <van-cell-group>
            <van-field v-model="newName" placeholder="请输入新的昵称" :error-message="errorMessage"/>
        </van-cell-group>
        <mu-button slot="actions" flat color="primary" @click="modifyName">确认</mu-button>
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">取消</mu-button>
      </mu-dialog>
    </mu-paper>
  </mu-container>
</template>
<script>
import ArticeContent from "@/components/public/ArticeContent.vue";

export default {
  name: "setting",
  data() {
    return {
      openSimple: false,
      user: {
        name: "花间舞",
        sign: "直道相思了无益，未尝惆怅是轻狂",
        synopsis: "油腻的师姐" //简介
      },
      newName:"",
      errorMessage:""
    };
  },
  methods: {
    starArtice(star) {
      star ? (this.star = false) : (this.star = true);
    },
    openSimpleDialog() {
      this.openSimple = true
    },
    closeSimpleDialog() {
      this.newName = ""
      this.errorMessage = ""
      this.openSimple = false
    },
    modifyName(){
        if(this.newName==""){
            this.errorMessage = "昵称不能为空"
            return
        }
        this.user.name = this.newName
        this.openSimple = false
        this.newName = ""
    }
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.mu-appbar {
  width: 100%;
}
</style>