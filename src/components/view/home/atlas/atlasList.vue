<template>
  <div class="demo-container">
    <!-- <mu-paper :z-depth="0" class="home-paper"> -->
      <mu-list textline="three-line" dense>
        <mu-sub-header style="background-color: white">图集推荐</mu-sub-header>
        <div v-for="atlas in atlases" :key="atlas.id">
          <atlas-item style="margin-bottom:3px;" :atlas="atlas"></atlas-item>
        </div>
      </mu-list>
    <!-- </mu-paper> -->
  </div>
</template>

<script>
import AtlasItem from "@/components/public/AtlasItem.vue";
export default {
  name: "AtlasList",
  data() {
    return {
        atlases: [], //文章列表数据
    };
  },
  created(){
    this.$http.atlas.queryAllAtlas().then(response=>{
      if(response.data.code=='2000'){
        console.log(response.data)
        this.atlases = response.data.data.atlases
      }

    })
  },
  components: {
    "atlas-item": AtlasItem
  }
};
</script>

<style scoped>
@media screen and (min-width: 800px) {
  .demo-container {
    padding: 10px 10%;
  }
}
</style>