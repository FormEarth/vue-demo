<template>
    <mu-bottom-nav :value.sync="param" color="primary">
      <mu-bottom-nav-item value="home" title="首页" icon="home" to="/"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="star" title="关注" icon="add" to="/star"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mine" title="我的" icon="person" to="/mine"></mu-bottom-nav-item>
    </mu-bottom-nav>
</template>
<script>
export default {
  name:"AppFooter",
  props:["param"],
  data() {
    return {
      shift: 'home'
    };
  }
};
</script>
<style scoped>
.mu-bottom-nav {
  width: 100%;
  max-width: 500px;
  min-width:350px;
  position:fixed; 
  bottom:0px;
}
</style>
