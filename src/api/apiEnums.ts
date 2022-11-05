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

export enum SysUserAPI {
  LIST = '/system/user/list',
  ADD = '/system/user',
  UPDATE = '/system/user',
  DETAIL = '/system/user/',
  DELTE = '/system/user/'
}

export enum SysRoleAPI {
  LIST = '/system/role/list',
  ADD = '/system/role',
  UPDATE = '/system/role',
  DETAIL = '/system/role/',
  DELTE = '/system/role/',
  MENUTREE = '/system/menu/roleMenuTreeselect/'
}
