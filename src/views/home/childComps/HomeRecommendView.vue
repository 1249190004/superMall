<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.link" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return[]
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    padding: 15px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .recommend-item img{
    width: 80%;
    height: 80%;
    margin-bottom: 5px;
  }
</style>
