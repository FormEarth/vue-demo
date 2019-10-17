<template>
  <input :type="type" :placeholder="placeholder" v-model="inputValue" />
</template>

<script>
export default {
  name: "DemoInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "提示"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inputValue: ""
    };
  },
  watch: {
    inputValue(newVal, oldVal) {
      // 在监听你使用update事件来更新word,而在父组件不需要调用该函数
      this.$emit("update:value", newVal);
    }
  }
};
</script>

<style scoped>
input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px 5px;
}
input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
</style>