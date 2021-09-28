<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="navbar"/>
  <scroll class="content" ref="contentss" @scroll="contentScroll" :probe-type="3">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo" ref="params" />
    <detail-comment-info :comment-info="commentInfo"  ref="comment" />
    <goods-list :goods="recommend" ref="recommend" ></goods-list>
  </scroll>
    <back-top @click.native="backClick" v-show="isShowTop"/>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
export default {
  name:"Detail",
    components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:{},
      titleScrollY:[],
      getThemeTopY:null,
      currentIndex:0,
      isShowTop:false
    }
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then((res) => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if( data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] 
      }
    })

    getRecommend(this.iid).then(res => {
      this.recommend = res.data.list
    }),
    this.getThemeTopY = this.debounce(() => {
            this.$nextTick(() => {
      this.titleScrollY = []
      this.titleScrollY.push(0)
      this.titleScrollY.push(this.$refs.params.$el.offsetTop)
      this.titleScrollY.push(this.$refs.comment.$el.offsetTop)
      this.titleScrollY.push(this.$refs.recommend.$el.offsetTop)
      this.titleScrollY.push(Number.MAX_VALUE)
    })
    },50)
  },

  methods:{
    imageLoad() {
      this.$refs.contentss.refresh()
      this.getThemeTopY()
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
    titleClick(index) {
      this.$refs.contentss.scrollTo(0,-this.titleScrollY[index],300)
    },
    contentScroll(position) {
    this.isShowTop = (-position.y) > 1000
      const positionY = -position.y
      let length = this.titleScrollY.length
      for(let i = 0;i < length; i++) {
              if(this.currentIndex != i && positionY >= this.titleScrollY[i] && positionY < this.titleScrollY[i+1]) {
        this.currentIndex = i
        console.log(this.current);
        this.$refs.navbar.currentIndex = this.currentIndex;
      }
      }
    },
      backClick() {
    this.$refs.contentss.scrollTo(0,0,1000)
  },
  addToCart() {
    const product = {}
    product.image = this.topImages[0]
    product.title = this.goods.title
    product.desc = this.goods.desc
    product.price = this.goods.realPrice
    product.iid = this.iid

    this.$store.dispatch('addCart',product).then(res => {
      this.$toast.show(res,2000)
    })
}
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>