<template>
<div id="home">
  <nav-bar class="home-nav">
    <template #center>
      <div>
        购物街
      </div>
    </template>
  </nav-bar>
    <tab-control class="tab-control" 
                 ref="tabControl1" 
                 :titles="['流行','新款','精选']" 
                 @changeItem="clickItem" 
                 v-show="isTabfixed"/>
  <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
           @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
    <home-swipers :banners="banners" @swiperImageLoad="swiperImageLoad" />
  <recommend-view :recommends="recommends"/>
  <fashion-view/>
  <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @changeItem="clickItem"/>
  <goods-list :goods="showGoods"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowTop"/>
</div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import HomeSwipers from './childComps/HomeSwipers.vue'
import RecommendView from './childComps/RecommendView.vue'
import FashionView from './childComps/FashionView.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'

  import emitter from '@/main.js'

export default {
  name:'home',
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwipers,
    RecommendView,
    FashionView
},
data() {
  return {
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    isShowTop:false,
    isTabfixed:false,
    offsetTop:0,
    saveY:0
  }
},
created() {
  this.getHomeMultidata(),

  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
mounted(){
  const refresh = this.debounce(this.$refs.scroll.refresh, 50)
  emitter.on('homeimageLoad',() => {
    refresh()
  })
},
activated() {
  this.$refs.scroll.scrollTo(0,this.saveY,0)
  this.$refs.scroll.refresh()
},
deactivated() {
  this.saveY = this.$refs.scroll.getScrollY()
},
methods:{
  getHomeMultidata() {
  getHomeMultidata().then(res => {
    this.banners = res.data.banner.list
    this.recommends = res.data.recommend.list
  })
  },
  getHomeGoods(type){
    const page = this.goods[type].page + 1;
    getHomeGoods(type,page).then(res =>{
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1 
      this.$refs.scroll.finishPullUp()
    })
  },
  clickItem(index) {
    switch(index) {
      case 0:
        this.currentType = 'pop'
        break
      case 1:
        this.currentType = 'new'
        break
      case 2:
        this.currentType = 'sell'
        break
    }
    this.$refs.tabControl1.currentIndex = index
    this.$refs.tabControl2.currentIndex = index
  },
  backClick() {
    this.$refs.scroll.scrollTo(0,0,1000)
    console.log('1');
  },
  contentScroll(position) {
    this.isShowTop = (-position.y) > 1000
    this.isTabfixed = (-position.y) > this.offsetTop
  },
   debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
},
  loadMore() {
    this.getHomeGoods(this.currentType)
  },
  swiperImageLoad() {
  this.offsetTop = this.$refs.tabControl2.$el.offsetTop
  }

},
computed:{
  showGoods() {
    return this.goods[this.currentType].list
  },
}
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  width: 100%;
}
#home {
  height: 100vh;
  position: relative;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>