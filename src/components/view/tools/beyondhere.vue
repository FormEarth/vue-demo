<template>
  <div class="root-node">
    <input type="text" name id />
    <button>获取文件</button>
    <p @click="transmitText=!transmitText">传递文本</p>
    <p>传递文件</p>
    <div v-show="transmitText">
      <textarea name id cols="30" rows="10"></textarea>
    </div>
    <demo-text-editor :originContent="text" @change="modifyText"></demo-text-editor>
    {{text}}
    <div>{{appName}}</div>
    <div>{{userAgent}}</div>
    <mu-button color="info" @click="showNotify">点我</mu-button>
  </div>
</template>

<script>

export default {
  name: "BeyondHere",
  data() {
    return {
      text: "",
      transmitText: false,
      showButton: false
    };
  },
  computed: {
    appName() {
      var parser = require('ua-parser-js');
      var ua = parser(navigator.userAgent);
      return 'browser:'+ua.browser.name+',version:'+ua.browser.version+",os"+ua.os.name+",os.version"+ua.os.version
    },
    userAgent(){
      return navigator.userAgent;
    }
  },
  methods: {
    modifyText(content) {
      this.text = content;
    },
    showNotify() {
      this.$demo_notify( "操作成功");
    }
  }
};
</script>

<style scoped>
</style>