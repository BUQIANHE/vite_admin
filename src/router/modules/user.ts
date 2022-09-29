import { Layout } from '../constants'

export default {
  path: '/personal',
  component: Layout,
  alwaysShow: false,
  hidden: true,
  meta: {
    noCache: false,
    title: '个人设置'
    // hidden: true
  },
  children: [
    {
      path: '/personal_settings',
      name: 'personalSettings',
      component: () => import('@/views/user/Setting.vue'),
      meta: {
        noCache: false,
        requiresAuth: true
      }
    }
  ]
}
