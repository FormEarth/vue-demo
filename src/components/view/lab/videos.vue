<template>
  <div class="videos">
    <div class="video-item" v-for="(video,index) in videos" :key="index">
      <video controls :src="video.url" width="100%"
    >您的浏览器不支持 video 标签。</video>
    {{video.name}},{{video.time}},{{video.size}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Videos",
  data() {
    return {
      videos: []
    };
  },
  created() {
    let _this = this;
    this.$http.atlas.getVideoList().then(response => {
      if (response.data.code == "2000") {
        _this.videos = response.data.data.videos;
      }
    });
  }
};
</script>

<style scoped>
.videos{
  display: flex;
  flex-wrap: wrap;
}
.video-item {
  width: 50%;
  /* height: 500px; */
  padding: 20px;
}
</style>