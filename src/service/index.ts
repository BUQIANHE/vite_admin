import { ContentType, ResCode } from '@/enums'
import { useAppStore } from '@/pinia'
import router from '@/router'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { checkStatus } from './checkStatus'
import { NO_TOKEN_API, TOKEN_PREFIX } from './constants'

const config = {
  baseURL: '/api',
  timeout: ResCode.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class Service {
  instance: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.instance = axios.create(config)

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const appStore = useAppStore()
        const token = appStore.token
        const headers = !NO_TOKEN_API.includes(config.url!)
          ? {
              'Content-Type': ContentType.JSON,
              Authorization: `${TOKEN_PREFIX}${token}`
            }
          : null

        return {
          ...config,
          headers,
          cancelToken: source.token
        }
      },
      (err: AxiosError) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const appStore = useAppStore()
        const { data } = response

        if (data.code === ResCode.OVERDUE) {
          ElMessage.error(data.msg)
          // 退出登录
          appStore.logout()
          // 取消其他请求
          source.cancel()
          // 跳转登录页
          router.push({
            path: '/login'
          })
        } else if (data.code === ResCode.ERROR) {
          if (config.url !== 'login') {
            ElMessage.error(data.msg)
          }
        } else if (data.code !== ResCode.SUCCESS) {
          ElMessage.error(data.msg)
        } else {
          return data
        }
      },
      (err: AxiosError) => {
        const { response } = err

        if (axios.isCancel(err)) {
          return new Promise(() => {
            console.log(err)
          })
        }

        /** 根据响应的错误状态码，做不同的处理 */
        if (response) return checkStatus(response.status)

        /** 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面 */
        if (!window.navigator.onLine) return router.replace({ path: '/500' })

        return Promise.reject(err)
      }
    )
  }

  // 常用的请求方法
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.instance.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.instance.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.instance.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.instance.delete(url, { params, ..._object })
  }
}

export default new Service(config)
