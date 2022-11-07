import request from '@/service'
import { SysMenuAPI } from './apiEnums'
const { LIST, ADD, UPDATE, DETAIL, DELTE } = SysMenuAPI

/** 封装 Protable 组件测试用的 */
export const getSysMenuList = (params: any) => {
  return request.get<any>(LIST, params)
}

export const addSysMenuItem = (params: any) => {
  return request.post<any>(ADD, params)
}

export const updateSysMenuItem = (params: any) => {
  return request.put<any>(UPDATE, params)
}

export const detailSysMenuItem = (id: number) => {
  return request.get<any>(DETAIL + id)
}

export const deleteSysMenuItem = (id: number) => {
  return request.delete<any>(`${DELTE}${id}`)
}
