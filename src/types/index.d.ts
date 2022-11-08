declare namespace API {
  interface Result {
    code: number
    msg?: string
  }

  interface Options {
    label: string
    value: string | number
    children?: Options[]
  }

  interface ResultData<T = any> extends Result {
    data?: T
  }

  export interface FormParams {
    // 新增修改表单和删除表格项参数
    id?: number // 详情ID
    isNew?: boolean // 新增 默认true false => 修改
    isRead?: boolean // 查看
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

  interface PublicState {
    department?: Partial<DepartmentItem>[]
    menu?: Partial<MenuItem>[]
    useStatus?: Options[]
    [x: string]: any
  }

  interface DepartmentItem {
    deptId: number
    deptName: string
    parentId?: number
    parentName?: string
    children?: DepartmentItem[]
  }

  interface DepartmentTree extends Result {
    data: DepartmentItem[]
  }

  interface MenuItem {
    id: number
    label: string
    children?: MenuItem[]
  }

  interface MenuTree extends Result {
    data: MenuItem[]
  }
}
