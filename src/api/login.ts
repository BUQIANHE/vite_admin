import request from '@/service'
import { LoginAPI } from './apiEnums'
const { CODE, LOGIN, LOGOUT } = LoginAPI

/**
 * 获取验证码
 * @returns 返回 uuid 和 验证码图片
 */
export const captchaImage = () => {
  return request.get<{ img: string; uuid: string; code: number }>(CODE)
}

/**
 * 登录
 * @param params 登录参数
 * @returns 返回token
 */
export const login = (params: API.LoginParams) => {
  return request.post<API.LoginResult>(LOGIN, params)
}

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return request.delete(LOGOUT)
}
