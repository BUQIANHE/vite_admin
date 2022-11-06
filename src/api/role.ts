import request from '@/service'
import { SysRoleAPI } from './apiEnums'
const { LIST, ADD, UPDATE, DETAIL, DELTE, MENUTREE, DOWNLOAD } = SysRoleAPI

/** 封装 Protable 组件测试用的 */
export const getSysRoleList = (params: any) => {
  return request.get<any>(LIST, params)
}

export const addSysRoleItem = (params: any) => {
  return request.post<any>(ADD, params)
}

export const updateSysRoleItem = (params: any) => {
  return request.put<any>(UPDATE, params)
}

export const detailSysRoleItem = (id: number) => {
  return request.get<any>(DETAIL + id)
}

export const deleteSysRoleItem = (id: number) => {
  return request.delete<any>(`${DELTE}${id}`)
}

/**
 * 根据角色获取动态菜单权限数
 * @param id 角色id
 * @returns
 */
export const getRoleMenuTree = (id: number) => {
  return request.get<any>(`${MENUTREE}/${id}`)
}

// 导出
export const exportExecl = (params: any) => {
  return request.get<any>(DOWNLOAD, params)
}
