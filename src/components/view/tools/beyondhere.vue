<template>
  <div class="root-node">
    <input type="text" name id />
    <button>获取文件</button>
    <p @click="transmitText=!transmitText">传递文本</p>
    <p>传递文件</p>
    <div v-show="transmitText">
      <textarea name id cols="30" rows="10"></textarea>
    </div>
    <div class="multi-line">
      <div
        class="edit-area"
        contenteditable="true"
        placeholder="写下你的评论……"
        @focus="focusEvent"
        @blur="blurEvent"
      ><h5>123</h5></div>
      <div v-show="showButton" class="submit-button">
        <mu-button color="info" :ripple="false" small>发布</mu-button>
      </div>
    </div>
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
  methods: {
    focusEvent() {
      this.showButton = true;
    },
    blurEvent() {
      this.showButton = false;
    }
  }
};
</script>

<style scoped>
.multi-line {
  display: flex;
}
.edit-area {
  background-color: #fff;
  padding: 5px;
  flex: 8;
  margin: 0 5px;
  width: 100%;
}
.edit-area:focus {
  width: 80%;
}
.submit-button {
  width: 88px;
}
</style>