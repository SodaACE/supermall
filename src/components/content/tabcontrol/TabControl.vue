<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item.index" class="tab-control-item" :class="{active: index === currentIndex}" @click="tabControl(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array
    }
  },
  data() {
    return {
      currentIndex : 0
    }
  },
  methods:{
    tabControl(index) {
      this.currentIndex = index
      this.$emit('changeItem',index)
    }
}
}

</script>

<style>
  .tab-control {
    display: flex;
    font-size: 15px;
    line-height: 40px;
    height: 40px;
    background-color: #fff;
    text-align: center;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid  var(--color-tint);
  }
</style>