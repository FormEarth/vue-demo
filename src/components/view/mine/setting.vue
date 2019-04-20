<template>
  <mu-container>
    <mu-appbar color="indigoA200" textColor="black" title="设置" z-depth="1">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-list textline="two-line">
      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>通知与信息设置</mu-list-item-title>
          <mu-list-item-sub-title>总是中断</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-divider></mu-divider>
    <mu-list>
      <mu-sub-header>声音开启设置</mu-sub-header>
      <mu-list-item button :ripple="false" @click="events = !events">
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
    </mu-list>
    <mu-list>
      <mu-sub-header>通知设置</mu-sub-header>
      <mu-list-item button :ripple="false" @click="notifications = !notifications">
        <mu-list-item-action>
          <mu-checkbox v-model="notifications" readonly></mu-checkbox>
        </mu-list-item-action>
        <mu-list-item-title>通知</mu-list-item-title>
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
import ArticeContent from "@/components/public/ArticeContent.vue";

export default {
  name: "setting",
  data() {
    return {
      events: false,
      calls: true,
      messages: true,
      notifications: false,
      sounds: false,
      videoSounds: false
    };
  },
  methods: {
    starArtice(star) {
      star ? (this.star = false) : (this.star = true);
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