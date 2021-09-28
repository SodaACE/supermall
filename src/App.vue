<template>
  <div id="app">
<router-view v-slot="{ Component }">
  <keep-alive exclude="Detail,BackTop">
    <component :is="Component" />
  </keep-alive>
</router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import mainTabBar from 'components/content/mainTabBar/MainTabBar.vue'
export default {
  name:'App',
  components:{
    mainTabBar
}
}
</script>

<style>
  @import url('assets/css/base.css');
</style>