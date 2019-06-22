<template>
  <mu-container style="color:black;">
    <mu-appbar :color="this.$store.state.current_theme_color" textColor="black" title="设置" z-depth="1">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-list>
      <mu-sub-header color="black">图集&文章设置</mu-sub-header>
      <mu-list-item button :ripple="false" @click="events = !events" color="primary">
        <mu-list-item-title>全部预览模式</mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="events" :ripple="false" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="calls = !calls">
        <mu-list-item-title>图片水印</mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="calls" :ripple="false" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="messages = !messages">
        <mu-list-item-title>图片压缩</mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="messages" :ripple="false" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="themeToggle">
        <mu-list-item-title>夜间模式</mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="dark" :ripple="false" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-list>
      <mu-sub-header>屏蔽设置</mu-sub-header>
      <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="dashboard" color="primary"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>我屏蔽的作者</mu-list-item-title>
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
          <mu-list-item-title>我屏蔽的标签</mu-list-item-title>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="arrow_forward_ios"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
    </mu-list>
    <mu-list>
      <mu-sub-header>通知设置</mu-sub-header>
      <mu-list-item button :ripple="false" @click="notifications = !notifications">
        <mu-list-item-action>
          <mu-checkbox v-model="notifications" readonly></mu-checkbox>
        </mu-list-item-action>
        <mu-list-item-title>允许通过邮箱联系我</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="sounds = !sounds">
        <mu-list-item-action>
          <mu-checkbox v-model="sounds" readonly></mu-checkbox>
        </mu-list-item-action>
        <mu-list-item-title>声音</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="videoSounds = !videoSounds">
        <mu-list-item-action>
          <mu-checkbox v-model="videoSounds" readonly></mu-checkbox>
        </mu-list-item-action>
        <mu-list-item-title>视频的声音</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-container>
</template>
<script>
import theme from 'muse-ui/lib/theme';

export default {
  name: "setting",
  data() {
    return {
      events: false,
      calls: true,
      messages: true,
      notifications: false,
      sounds: false,
      videoSounds: false,
      dark:false
    };
  },
  created(){
    this.$store.state.current_theme=="dark"?this.dark=true:this.dark=false
  },
  methods: {
    starArtice(star) {
      star ? (this.star = false) : (this.star = true);
    },
    //切换夜间模式
    themeToggle(){
      this.dark = !this.dark
      if(this.dark){
        this.$store.commit("theme_toggle", "dark");
        theme.use('dark');
      }else{
        this.$store.commit("theme_toggle", "light");
        theme.use('light');
      }
      console.log("this.$store.state.current_theme:"+this.$store.state.current_theme)
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