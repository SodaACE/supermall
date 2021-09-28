import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
   addCounter(state,payload) {
    payload.counter++
   },
   addToCart(state,payload) {
     state.cartList.push(payload)
   }
  },
  getters:{
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  actions: {
    addCart(context,payload){
     return new Promise((resolve,reject) => {
      let oldProduct = null
      for(let i = 0;i < context.state.cartList.length;i++) {
        if(context.state.cartList[i].iid == payload.iid) {
          oldProduct = context.state.cartList[i]
        }
      }
      if(oldProduct) {
        context.commit('addCounter',oldProduct)
        resolve('当前数量+1')
      } else {
        payload.checked = true
        payload.count = 1
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
     })
    }
  },
  modules: {
  }
})

export default store
