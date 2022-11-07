/** 公用接口 */
export enum PublicAPI {
  USERINFO = '/getInfo',
  MENULIST = '/getRouters',
  DICTS = '/system/dict/data/type/',
  DEPT = '/system/dept/treeselect',
  MENUTREE = '/system/menu/treeselect',
  PASSWORD = '/system/user/resetPwd'
}

/** 登录接口 */
export enum LoginAPI {
  CODE = '/captchaImage',
  LOGIN = '/login',
  LOGOUT = '/logout'
}

// 用户管理
export enum SysUserAPI {
  LIST = '/system/user/list',
  ADD = '/system/user',
  UPDATE = '/system/user',
  DETAIL = '/system/user/',
  DELTE = '/system/user/'
}

// 角色管理
export enum SysRoleAPI {
  LIST = '/system/role/list',
  ADD = '/system/role',
  UPDATE = '/system/role',
  DETAIL = '/system/role/',
  DELTE = '/system/role/',
  MENUTREE = '/system/menu/roleMenuTreeselect/',
  DOWNLOAD = '/system/role/export'
}

// 菜单管理
export enum SysMenuAPI {
  LIST = '/system/menu/list',
  ADD = '/system/menu',
  UPDATE = '/system/menu',
  DETAIL = '/system/menu/',
  DELTE = '/system/menu/'
}

// 部门管理
export enum SysDeptAPI {
  LIST = '/system/dept/list',
  ADD = '/system/dept',
  UPDATE = '/system/dept',
  DETAIL = '/system/dept/',
  DELTE = '/system/dept/'
}
