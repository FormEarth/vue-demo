<template>
  <div>
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :maxlength="max"
      @input="$emit('input', $event.target.value)"
    />
    <span class="error-message">{{error}}</span>
  </div>
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
    max: {
      type: String,
      default: "100"
    },
    value: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // inputValue: this.value
    };
  }
  // watch: {
  //   inputValue(newVal, oldVal) {
  //     // 在监听你使用update事件来更新word,而在父组件不需要调用该函数
  //     this.$emit("update:value", newVal);
  //   }
  // }
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
.error-message {
  font-size: 12px;
  color: red;
}
</style>