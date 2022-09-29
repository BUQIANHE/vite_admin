import request from '@/service'
import { SysUserAPI } from './apiEnums'
const { LIST, ADD, UPDATE, DETAIL, DELTE } = SysUserAPI

/** 封装 Protable 组件测试用的 */
export const getSysUserList = (params: any) => {
  return request.get<any>(LIST, params)
}

export const addSysUserItem = (params: any) => {
  return request.post<any>(ADD, params)
}

export const updateSysUserItem = (params: any) => {
  return request.put<any>(UPDATE, params)
}

export const detailSysUserItem = (id: number) => {
  return request.get<any>(DETAIL + id)
}

export const deleteSysUserItem = (id: number) => {
  return request.delete<any>(`${DELTE}${id}`)
}
