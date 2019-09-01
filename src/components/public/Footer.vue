<template>
  <div class="footer-container" :style="footerStyle">{{value}}</div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    height: {
      type: Number,
      default: 40
    },
    value: {
      type: String,
      default: "© 2019 raining_heavily"
    }
  },
  data() {
    return {};
  },
  computed: {
    footerStyle: function() {
      return {
        // 'width': this.width + 'px',
        height: this.height + "px"
      };
    }
  }
};
</script>

<style>
.footer-container {
  text-align: center;
  padding-top: 13px;
}
</style>