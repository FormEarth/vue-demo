<template>
  <mu-container>
    <mu-paper :z-depth="0" class="home-paper">
      <mu-appbar color="primary">
        <mu-button icon slot="left">
          <mu-icon value="whatshot"></mu-icon>
        </mu-button>
        <mu-button icon slot="right">
          <mu-icon value="search"></mu-icon>
        </mu-button>
      </mu-appbar>
    </mu-paper>
    <mu-button fab color="redA700" :ripple="false" @click="change">
      <mu-icon value="add"></mu-icon>
    </mu-button>
    <div>
      <mu-slide-left-transition>
        <mu-button v-show="this.open" to="/home/atlas/add" style="margin-bottom:8px;">
          发布图集
          <!-- <mu-icon right value="edit" color="redA700"></mu-icon> -->
        </mu-button>
      </mu-slide-left-transition>
      <mu-slide-right-transition>
        <mu-button v-show="this.open" to="/home/artice/add" style="margin-bottom:8px;">
          写长文
        </mu-button>
      </mu-slide-right-transition>
      <mu-slide-bottom-transition>
        <mu-button v-show="this.open" to="/home/artice/add" style="margin-bottom:8px;">写短文</mu-button>
      </mu-slide-bottom-transition>
    </div>
  </mu-container>
</template>
<script>
export default {
  name: "star",
  data() {
    return {
      open: true, //写文章按钮是否展开,
      selects: [],
      picture: require("@/assets/images/carousel1.jpg")
    };
  },
  //created()是一个函数
  created() {
    // artices().then(response => {
    //       const artices = response.data.data
    //       this.artices = artices
    //     });
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    change(){
      this.open?this.open=false:this.open=true;
    }
  }
};
</script>
<style scoped>
.container {
  /* background-color: azure; */
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  /* min-width: 350px; */
}

</style>