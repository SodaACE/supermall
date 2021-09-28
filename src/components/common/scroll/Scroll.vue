<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
     </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  data() {
    return {
      scroll:null,
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    PullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      observeDOM: true,
      probeType:this.probeType,
      PullUpLoad:this.PullUpLoad
    })
    this.scroll.on('scroll',position => {
      this.$emit('scroll', position);
    })
      if(this.PullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
  }
  },
  methods: {
    scrollTo(x,y,time) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

