// src\router\modules\media.ts
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'media',
  name: 'media',
  meta: {
    title: '媒体',
    requiresAuth: true
  },
  component: () => import('@/views/media/index.vue')
}

export default routes
