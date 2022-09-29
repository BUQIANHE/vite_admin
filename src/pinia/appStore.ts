import { defineStore } from 'pinia'
import settings from '@/config/settings.json'
import { APPINFO_KEY, clearAppInfo } from '@/utils/auth'
import { getMenuList, getUserInfo } from '@/api/public'
import { login as userLogin, logout as userLogout } from '@/api/login'
import piniaPersistConfig from '@/hooks/piniaPersist'
import router from '@/router'
import routes from '@/router/routes'
import { Layout } from '@/router/constants'

const useAppStore = defineStore('app', {
  state: (): API.AppState => ({
    token: '',
    isAuthenticated: false,
    userInfo: {},
    roles: [],
    permissions: [],
    menuList: [],

    golbalSettings: { ...settings }
  }),
  actions: {
    // 设置token
    setToken(token: string) {
      this.token = token
      if (this.token !== '') this.isAuthenticated = true
    },

    // 设置用户信息
    setUserInfo(userInfo: API.UserInfo) {
      this.userInfo = userInfo
    },

    // 换肤
    switchTheme(isDark: boolean) {
      this.golbalSettings.isDark = isDark
      this.golbalSettings.theme = isDark ? 'dark' : 'light'
    },

    // 切换侧边栏
    switchAsideMenu() {
      this.golbalSettings.menuCollapse = !this.golbalSettings.menuCollapse
    },

    // 重置state
    reset() {
      this.$reset()
    },

    // 清空本地存储信息
    clearLocalInfo() {
      clearAppInfo()
    },

    // 获取用户信息
    async fetchUserInfos() {
      try {
        if (this.token) {
          const res: API.UserInfoResult = await getUserInfo()
          if (res.code === 200) {
            const { permissions, roles, user } = res
            this.permissions = permissions
            this.roles = roles
            this.userInfo = { ...user }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 获取左侧权限菜单
    async fetchMenuList() {
      try {
        if (this.token) {
          const res = await getMenuList()
          if (res.code === 200) {
            res.data.forEach((item) => {
              if (item.component === 'Layout' && item?.children?.length) {
                item.component = Layout
                item.children.forEach((key) => {
                  key.component = () => import(`@/views/${key.component}.vue`)
                })
              }
            })
          }

          this.menuList = (
            this.golbalSettings.menuFromServer ? [...routes, ...res.data] : [...routes]
          ) as API.MenuListItem[]
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 登录
    async login(params: API.LoginParams) {
      try {
        const res: API.LoginResult = await userLogin(params)
        if (res.code === 200) {
          this.setToken(res.token)
          return res
        }
      } catch (err) {
        this.reset()
        throw err
      }
    },

    // 退出登录
    async logout() {
      try {
        const res: API.Result = (await userLogout()) as API.Result
        if (res.code === 200) {
          this.reset()
          this.clearLocalInfo()
          ElMessage.success(res.msg!)
          router.push({ path: '/login' })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  // 数据持久化
  persist: piniaPersistConfig(APPINFO_KEY)
})

export default useAppStore
