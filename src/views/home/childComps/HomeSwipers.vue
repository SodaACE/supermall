<template>
  <swiper>
    <SwiperItem v-for="item in banners" :key="item.index"> 
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwipers',
  props:{
    banners:{
      type:Array
    }
  },
  data() {
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad() {
    if(!this.isLoad) {
      this.$emit('swiperImageLoad');
      this.isLoad = true
    }
    }
}  
}
</script>

<style lang="">
  
</style>