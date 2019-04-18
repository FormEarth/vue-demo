<template>
  <mu-container>
    <mu-paper :z-depth="0" class="demo-list-wrap">
      <mu-list toggle-nested>
        <mu-list-item v-if="isLogin" avatar button to="/mine/info">
          <mu-list-item-action>
            <mu-avatar>
              <mu-icon value="person"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>
              {{user.name}}
              <mu-chip color="redA700" text-color="white" style="line-height: 20px;font-size:10px">vip 8</mu-chip>
            </mu-list-item-title>
            <mu-list-item-sub-title>{{user.sign}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
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
        <!-- <mu-list-item
          button
          :ripple="false"
          nested
          :open="open === 'send'"
          @toggle-nested="open = arguments[0] ? 'send' : ''"
        >
          <mu-list-item-action>
            <mu-icon value="send"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>Sent mail</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>List Item 1</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>List Item 2</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button :ripple="false" slot="nested">
            <mu-list-item-title>List Item 3</mu-list-item-title>
          </mu-list-item>
        </mu-list-item> -->
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
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="inbox" color="redA700"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>草稿</mu-list-item-title>
          <mu-list-item-action>
            <mu-badge content="100+" color="redA700"></mu-badge>
            <!-- <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button> -->
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
            <mu-icon value="settings" color="black"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>设置</mu-list-item-title>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button :ripple="false">
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
    </mu-paper>
    <app-footer param="mine"></app-footer>
  </mu-container>
</template>
<script>
export default {
  name: "mine",
  data() {
    return {
      open: "send",
      isLogin:false,
      user:{
        name:"花间舞",
        sign:"曾经沧海难为水，除却巫山不是云"
      }
    };
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
}
.demo-list{
  width:100%;
}
.demo-list-wrap {
  width: 100%;
  max-width: 500px;
  overflow: hidden;
}
</style>