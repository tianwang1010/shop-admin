import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import productRoutes from './modules/product'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'
import mediaRoutes from './modules/media'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        meta: {
          title: '首页',
          requiresAuth: true
        },
        component: () => import('../views/home/index.vue')
      },
      productRoutes,
      orderRoutes,
      permissionRoutes,
      mediaRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// VueRouter 4 中可以不写 next 了，默认就是通过状态
router.beforeEach((to, from) => {
  nprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
