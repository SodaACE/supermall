<template>
<nav-bar>
  <template #left>
    <div class="img" @click="back">
    <img src="~assets/img/common/back.svg" alt="">
    </div>
  </template>
  <template #center class="title">
    <div class="title">
      <div v-for="(item,index) in titles" 
          :key="item.index" 
          class="navItem"
          @click="itemClick(index)"
          :class="{active: index === currentIndex}">
      {{item}}
      </div>
    </div>
  </template>
</nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:"DetailNavBar",
  components:{
    NavBar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    }
  }
}
</script>

<style scoped>
 .title {
   display: flex;
 }
 .navItem {
   flex: 1;
   font-size: 13px;
 }
 .img{
   margin-top: 6px;
 }
 .active {
   color: var(--color-high-text);
 } 
</style>