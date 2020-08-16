<template>
  <div class="goods">
    
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Object,
        default() {
          return []
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>

</style>
