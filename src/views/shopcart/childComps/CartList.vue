<template>
  <scroll class="contents" ref="scroll">
    <div class="cart-list ">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
  </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartlistItem.vue'
import {mapGetters} from 'vuex'
export default {
  name:"CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>

.contents {
  height: 100%;
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
</style>