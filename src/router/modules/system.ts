import { Layout } from '../constants'

export default {
  path: '/system',
  name: 'system',
  component: Layout,
  alwaysShow: true,
  hidden: false,
  meta: {
    icon: 'Setting',
    noCache: false,
    requireAuth: true,
    title: '系统管理',
    sort: 2
  },
  children: [
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/system/user/index.vue'),
      hidden: false,
      meta: {
        noCache: false,
        requireAuth: true,
        title: '用户管理'
      }
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('@/views/system/role/index.vue'),
      hidden: false,
      meta: {
        noCache: false,
        requireAuth: true,
        title: '角色管理'
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/system/menu/index.vue'),
      hidden: false,
      meta: {
        noCache: false,
        requireAuth: true,
        title: '菜单管理'
      }
    },
    {
      path: '/dept',
      name: 'dept',
      component: () => import('@/views/system/dept/index.vue'),
      hidden: false,
      meta: {
        noCache: false,
        requireAuth: true,
        title: '部门管理'
      }
    }
    // {
    //   path: '/post',
    //   name: 'post',
    //   component: () => import('@/views/system/post/index.vue'),
    //   hidden: false,
    //   meta: {
    //     noCache: false,
    //     requireAuth: true,
    //     title: '岗位管理'
    //   }
    // },
    // {
    //   path: '/dict',
    //   name: 'dict',
    //   component: () => import('@/views/system/dict/index.vue'),
    //   hidden: false,
    //   meta: {
    //     noCache: false,
    //     requireAuth: true,
    //     title: '字典管理'
    //   }
    // }
  ]
}
