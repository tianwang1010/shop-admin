import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import productRoutes from './product'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'
import mediaRoutes from './modules/media'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
      productRoutes,
      orderRoutes,
      permissionRoutes,
      mediaRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// VueRouter 4 中可以不写 next 了，默认就是通过状态
router.beforeEach((to, from) => {
  nprogress.start()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
