export const checkStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误!'
      break
    case 401:
      message = '未授权或登录超时，请重新登录!'
      break
    case 403:
      message = '拒绝访问!'
      break
    case 404:
      message = '请求出错!'
      break
    case 408:
      message = '请求超时!'
      break
    case 500:
      message = '服务器错误!'
      break
    case 501:
      message = '服务未实现!'
      break
    case 502:
      message = '网络错误!'
      break
    case 503:
      message = '服务不可用!'
      break
    case 504:
      message = '网络超时!'
      break
    case 505:
      message = 'HTTP版本不受支持!'
      break
    default:
      message = `连接出错(${status})!`
      break
  }

  return `${message}`
}
