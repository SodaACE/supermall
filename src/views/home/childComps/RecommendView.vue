<template>
<div class="recommend">
    <div v-for="item in recommends" class="recommend-item" :key="item.index">
    <a :href="item.link">
      <img :src="item.image" alt="">
    </a>
    <div>{{item.title}}</div>
  </div>
</div>
</template>
<script>
export default {
  name:'RecommendView',
  props:{
    recommends:{
      type:Array
    }
  }
}
</script>
<style >
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>