import request from '@/service'
import { PublicAPI } from './apiEnums'
const { USERINFO, MENULIST, DICTS, DEPT } = PublicAPI

/**
 * 获取用户信息 和 使用权限
 * @returns
 */
export const getUserInfo = () => {
  return request.get<API.UserInfoResult>(USERINFO)
}

/**
 * 获取当前用户的权限列表
 * @returns
 */
export const getMenuList = () => {
  return request.get<API.MenuList>(MENULIST)
}

// export const getDictsListData = (type: string) => {
//   return request.get<any>(`${DICTS}${type}`)
// }

// export const getDeptTree = () => {
//   return request.get<any>(DEPT)
// }
