import request from '@/service'
import { SysDeptAPI } from './apiEnums'
const { LIST, ADD, UPDATE, DETAIL, DELTE } = SysDeptAPI

export const getSysDeptList = (params: any) => {
  return request.get<any>(LIST, params)
}

export const addSysDeptItem = (params: any) => {
  return request.post<any>(ADD, params)
}

export const updateSysDeptItem = (params: any) => {
  return request.put<any>(UPDATE, params)
}

export const detailSysDeptItem = (id: number) => {
  return request.get<any>(DETAIL + id)
}

export const deleteSysDeptItem = (id: number) => {
  return request.delete<any>(`${DELTE}${id}`)
}
