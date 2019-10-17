<template>
  <div class="articles-card">
      <ul>
          <li>列表</li>
          <li>列表</li>
          <li>列表</li>
      </ul>
  </div>
</template>

<script>
export default { 
  name:"ArticlesCard",
  props:{

  },
  data(){
      return{

      }
  }
}
</script>

<style scoped>
 li{
    list-style-type: circle;
}
.articles-card{
  /* border-radius: 5px; */
  background-color: white;
  padding: 5px 20px;
}
</style>