<template>
  <mu-container style="background-color: black;">
    <!-- <mu-paper>暂时还什么都没有哦^……^</mu-paper> -->
    
    <div style="background-color: red;margin-bottom:10px">red</div>
    <div style="background-color: green;">green</div>
    <app-footer param="star"></app-footer>
  </mu-container>
</template>
<script>
export default {
  name: "star",
  data() {
    return {
      //value:'star',
      //shift: 'star'
    };
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.mu-paper {
  text-align: center;
}
</style>

