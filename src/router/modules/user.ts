import { Layout } from '../constants'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/setting',
  alwaysShow: false,
  hidden: true,
  meta: {
    noCache: false,
    title: '个人设置'
    // hidden: true
  },
  children: [
    {
      path: '/user/setting',
      name: 'userSetting',
      component: () => import('@/views/user/Setting.vue'),
      meta: {
        noCache: false,
        requiresAuth: true
      }
    }
  ]
}
