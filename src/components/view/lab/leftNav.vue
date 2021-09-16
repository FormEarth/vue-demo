<template>
  <main>
    <div class="left-nav" >
      <div class="icon-item">EasyT</div>
      <div  v-for="(icon,index) in icons" :key="index" :class="['icon-item',index==current_nav?'active':'']">
        <mu-icon :value="icon" size="30" @click="change_index(index)"></mu-icon>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Left", //实验室页面
  data() {
    return {
        current_nav : 0,
        icons:['extension','view_quilt','content_paste','sync']
    };
  },
  methods:{
      change_index(index){
          console.log('---:'+index)
          this.current_nav = index
      }
  }
};
</script>

<style>
main {
  height: 100%;
  width: 100%;
}
.left-nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: black;
  color: white;
  padding-top: 20px;
}
.icon-item {
  margin-top: 20px;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
  transition: all .5s;
}
.icon-item img {
  width: 100%;
}
.active {
  color: #000;
  background-color: #fff;
}
</style>