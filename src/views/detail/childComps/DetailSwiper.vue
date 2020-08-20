<template>
    <Swiper class="detail-swiper">
      <SwiperItem v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "../../../components/common/swiper/index"
  export default {
    name: "DetailSwiper",
    props:{
      topImages :{
        type:Array,
        default(){
          return[]
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 350px;
    overflow: hidden;
  }
</style>
