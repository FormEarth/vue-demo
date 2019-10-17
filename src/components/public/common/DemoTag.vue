<template>
  <a class="article-tag">
    <slot></slot>
  </a>
</template>
    
<script>
export default {
  name: "DemoTag",
  props: {
    tag: {
      type: String,
      default: "[tag]"
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.article-tag {
  margin: 0 0.1em;
  padding: 0.3em 1em;
  color: #fff;
  background: rgba(33, 150, 243, 0.4);
  font-size: 12px;
  /* 换行时保证标签完整性 */
  white-space: pre;
}
</style>