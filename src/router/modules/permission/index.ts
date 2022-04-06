// src\router\modules\permission.ts

import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  meta: {
    title: '权限管理',
    requiresAuth: true
  },
  component: RouterView,
  children: [
    {
      path: 'role',
      name: 'permission-role',
      meta: {
        title: '角色管理'
      },
      component: () => import('@/views/permission/role/index.vue')
    },
    {
      path: 'admin',
      name: 'permission-admin',
      meta: {
        title: '用户管理'
      },
      component: () => import('@/views/permission/admin/index.vue')
    },
    {
      path: 'rule',
      name: 'permission-rule',
      meta: {
        title: '菜单管理'
      },
      component: () => import('@/views/permission/rule/index.vue')
    }
  ]
}

export default routes
