import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { eager: true })
let clientRoutes = Object.values(modules)?.length
  ? Object.values(modules).map((item) => (item as any).default)
  : []
clientRoutes = clientRoutes.sort((a: any, b: any) => a.meta.sort - b.meta.sort)

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  ...clientRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/notFound/index.vue')
  }
]

export default routes
