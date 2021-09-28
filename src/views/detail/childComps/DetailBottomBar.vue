<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>

export default {
  name:"DetailBottomBar",
  methods:{
    addToCart() {
      this.$emit('addCart');
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: relative;
    background-color: #fff;
    display: flex;
  }
  .bar-item {
    flex:1;
    display: flex;
  }
  .bar-item div{
    flex: 1;
  }
  .bar-item .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }
  .bar-item .shop {
    background-position: 0 -98px;
  }
  .bar-item .service {
    background-position: 0 -53px;
  }
  .bar-left {
    font-size: 13px;
  }
  .text {
    margin-left: 12px;
  }
  .bar-right div{
    text-align: center;
    line-height: 49px;
    color: #fff;
    font-size: 15px;
    font-weight:500;
  }
  .cart {
    background-color: rgb(255,221,13);
  }
  .buy {
    background-color: rgb(255,120,154);
  }
</style>