<template>
  <div>
      <div style="margin:50px 0 0 50px">欢迎来到实验室，这里有很多即将推出的创意</div>
      <br>
      <div class="lab-item" @click="$router.push('/nav')">
          <mu-icon value="search"></mu-icon>
          导航
      </div>
      <div class="lab-item" @click="$router.push('/star')">
          <mu-icon value="favorite_border"></mu-icon>
          star
      </div>
      <div class="lab-item" @click="$router.push('/beyondhere')">
          <mu-icon value="swap_horiz"></mu-icon>
          beyondhere
      </div>
      <!-- <div class="lab-item" @click="$router.push('/lab/videos')">
          <mu-icon value="video_library"></mu-icon>
          视频
      </div> -->
  </div>
</template>

<script>
export default {
    name:'Lab',//实验室页面
    data(){
        return{
            
        }
    },
    created(){
    }
}
</script>

<style scoped>
.mu-icon{
    vertical-align: middle;
}
.lab-item{
    margin: 8px 50px;
    background-color: rgba(247, 247, 247, 0.95);
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    z-index: 10;
    max-width: 900px;
    font-size: 18px;
    font-weight: lighter;
    background-image: linear-gradient( 135deg, #ABDCFF 10%, rgb(76, 180, 255) 100%);
}
</style>