<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div class="check-button">
        <check-button :is-checked="isSelectAll" @click.native ="checkClick"/>
      </div>
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="checkLength">去计算:({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton/CheckButton.vue'
export default {
  name:"CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => item.checked === true).reduce((preValue,item) => {
        return preValue + item.count * item.price
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked === true).reduce((preValue,item) => {
        return preValue + item.count
      },0)
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
methods:{
  checkClick() {
    if(this.isSelectAll) {
      this.$store.state.cartList.forEach(item => item.checked = false)
    } else {
      this.$store.state.cartList.forEach(item => item.checked = true)
    }
  }
}
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    position:relative;
    background-color: #eee;
    line-height: 40px;


  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 6px;
    transform: scale(0.9);
    width: 60px;
  }
  .check-content span {
    margin-left: 3px;
  }
  .check-button {
    width: 20px;
    height: 20px;
  }
  .price{
    flex: 1;
    margin-left: 20px;
  }
  .checkLength {
    width: 90px;
    background-color: #ff8198;
    color: #fff;
    text-align: center;
  }
</style>