<template>
  <div class="cart">
    <nav-bar class="navBar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import {mapGetters} from 'vuex'
export default {
  name:'shopcart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style>
.navBar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.cart{
  height: 100vh;
  overflow: hidden;
}
</style>