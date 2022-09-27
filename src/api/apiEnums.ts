/** 公用接口 */
export enum PublicAPI {
  USERINFO = '/getInfo',
  MENULIST = '/getRouters',
  DICTS = '/system/dict/data/type/',
  DEPT = '/system/dept/treeselect'
}

/** 登录接口 */
export enum LoginAPI {
  CODE = '/captchaImage',
  LOGIN = '/login',
  LOGOUT = '/logout'
}
