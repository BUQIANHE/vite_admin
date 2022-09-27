declare namespace API {
  interface Result {
    code: number
    msg?: string
  }

  interface ResultData<T = any> extends Result {
    data?: T
  }

  interface AppState {
    token: string
    isAuthenticated?: boolean
    userInfo: Partial<UserInfo>
    roles: string[]
    permissions: string[]
    menuList: Partial<MenuListItem[]>
    golbalSettings: GlobalSettings
  }

  interface UserInfo {
    admin: boolean
    avatar?: string
    createBy?: string
    createTime?: string
    delFlag?: string
    email?: string
    loginDate?: string
    loginIp?: string
    nickName?: string
    phonenumber?: string
    remark?: string
    roleIds?: string
    roles: string[]
    role: ''
    sex?: string
    status?: string
    userId: number
    userName: string
  }

  interface UserInfoResult extends Result {
    permissions: string[]
    roles: string[]
    user: any
  }

  interface MenuList extends Result {
    data: MenuListItem[]
  }

  interface MenuListItem {
    name?: string
    path: string
    component?: any
    redirect?: string
    alwaysShow?: boolean
    hidden?: boolean
    meta?: RouterMeta
    children?: MenuListItem[]
  }

  interface LoginParams {
    username: string
    password: string
    code: string
    uuid: string
  }

  interface LoginResult extends Result {
    token: string
  }
}
