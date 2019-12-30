<template>
  <div class="multi-line">
    <div
      ref="editor"
      v-html="originContent"
      class="edit-area"
      contenteditable="true"
      @input="changeTxt"
      @focus="focusEvent"
      @blur="blurEvent($event)"
    >
      <h5>123</h5>
    </div>
    <div v-show="showButton" class="submit-button">
      <mu-button color="info" :ripple="false" small>发布</mu-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoTextEditor",
  props: {
    originContent: {
      type: String,
      default: "写点什么吧……"
    }
  },
  data() {
    return {
      text: this.originContent,
      showButton: false
    };
  },
  watch: {
    originContent(newVal, oldVal) {
      console.log("watch---:" + newVal);
      if (!newVal) {
        // 清空节点内所有html来清空文本
        this.$refs.editor.innerHTML = "";
      } else {
        setTimeout(() => {
          this.keepLastIndex(this.$refs.editor);
        }, 5);
      }
    }
  },
  methods: {
    focusEvent() {
      this.showButton = true;
    },
    blurEvent(event) {
      //   this.showButton = this.text.length <= 0 ? false : true;
      this.showButton = this.originContent.length == 0 ? false : true;
      //   this.$emit("change", event.target.innerHTML);
    },
    changeTxt() {
      console.log(this.$refs.editor.innerHTML);
      this.$emit("change", this.$refs.editor.innerHTML);
    },
    keepLastIndex(obj) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    }
  }
};
</script>

<style scoped>
.multi-line {
  display: flex;
  width: 100%;
}
.edit-area {
  background-color: #fff;
  padding: 5px;
  flex: 8;
  margin: 0 5px;
  width: 100%;
  min-height: 25px;
}
.edit-area:focus {
  width: 80%;
}
.submit-button {
  width: 88px;
}
</style>