import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const home = () => import('../views/home/home.vue')
const category = () => import('../views/category/category.vue')
const profile = () => import('../views/profile/profile.vue')
const shopcart = () => import('../views/shopcart/shopcart.vue')
const detail = () => import('../views/detail/Detail.vue')

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/profile',
    component:profile
  },
  {
    path:'/shopcart',
    component:shopcart
  },
  {
    path:'/detail/:iid',
    component:detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router

