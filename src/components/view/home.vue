<template>
    <mu-container class="demo-container" fluid>
    <demo-content>
      <div slot="user-card">
        <demo-card :user="user"></demo-card>
      </div>
      <div slot="detail-content">
        <demo-tag>test tag</demo-tag>
      </div>
    </demo-content>
  </mu-container>
</template>

<script>
export default {
  name:"Home",
  data(){
    return{

    }
  },
  created(){

  }
}
</script>

<style scoped>
.demo-container {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
</style>