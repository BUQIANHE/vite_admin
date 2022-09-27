import { Layout } from '../constants'

export default {
  path: '/home',
  component: Layout,
  redirect: '/index',
  alwaysShow: true,
  hidden: false,
  meta: {
    noCache: false,
    title: '首页',
    icon: 'House',
    sort: 1
  },
  children: [
    {
      path: '/index',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        noCache: false,
        requiresAuth: true
      }
    }
  ]
}
