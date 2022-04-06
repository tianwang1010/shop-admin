import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'order',
  name: 'order',
  component: RouterView,
  meta: {
    title: '订单',
    requiresAuth: true
  },
  children: [
    {
      path: 'list',
      name: 'order_list',
      meta: {
        title: '订单列表'
      },
      component: () => import('@/views/order/list/index.vue')
    },
    {
      path: 'offline',
      name: 'order-offline',
      meta: {
        title: '离线订单'
      },
      component: () => import('@/views/order/offline/index.vue')
    }
  ]
}

export default routes
