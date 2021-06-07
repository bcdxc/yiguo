import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/manager',
        name: 'Manager',
        component: () => import('../views/Manager.vue')
      },
      {
        path: '/classify',
        name: 'Classify',
        component: () => import('../views/Classify.vue'),
        // children: [
        //   {
        //     path: 'secondmenu',
        //     name: 'SecondMenu',
        //     component: () => import('../views/SecondMenu.vue')
        //   }
        // ]
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/overview',
        name: 'Overview',
        component: () => import('../views/Overview.vue')
      },
      {
        path: '/proposal',
        name: 'Proposal',
        component: () => import('../views/Proposal.vue')
      },
      {
        path: '/addgoods',
        name: 'AddGoods',
        component: () => import('../views/AddGoods.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const isLogin = Boolean(sessionStorage.getItem('isLogin'));
  if (!isLogin && to.path !== "/login") {
    next({ name: 'Login' });
  } else {
    next();
  }
})

export default router
