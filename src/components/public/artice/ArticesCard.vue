<template>
  <div class="artices-card">
      <ul>
          <li>列表</li>
          <li>列表</li>
          <li>列表</li>
      </ul>
  </div>
</template>

<script>
export default { 
  name:"ArticesCard",
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
.artices-card{
  border-radius: 5px;
  background-color: white;
  padding: 5px 20px;
}
</style>