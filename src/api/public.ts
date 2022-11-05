import request from '@/service'
import { PublicAPI } from './apiEnums'
const { USERINFO, MENULIST, DICTS, DEPT, MENUTREE, PASSWORD } = PublicAPI

/**
 * 获取用户信息 和 使用权限
 * @returns
 */
export const getUserInfo = () => {
  return request.get<API.UserInfoResult>(USERINFO)
}

export const updatePassword = (params: { userId: number; password: string }) => {
  return request.put<any>(PASSWORD, params)
}

/**
 * 获取当前用户的权限列表
 * @returns
 */
export const getMenuList = () => {
  return request.get<API.MenuList>(MENULIST)
}

export const getDictsListData = (type: string) => {
  return request.get<any>(`${DICTS}${type}`)
}

export const getDeptTree = () => {
  return request.get<API.DepartmentTree>(DEPT)
}

/**
 * 获取权限菜单
 * @returns
 */
export const getMenuTree = () => {
  return request.get<any>(MENUTREE)
}
