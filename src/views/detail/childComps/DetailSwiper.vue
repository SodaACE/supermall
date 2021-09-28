<template>
  <Swiper class="detail-content">
    <swiper-item v-for="item in topImages" :key="item.index">
      <img :src="item" alt="">
    </swiper-item>
  </Swiper>
</template>

<script>
 import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
  name:"DetailSwiper",
  props:{
    topImages:{
      type:Array
    }
  },
  components:{
    SwiperItem,
    Swiper
  }
}
</script>

<style scoped>
 .detail-content {
   height: 300px;
   overflow: hidden;
 } 
</style>