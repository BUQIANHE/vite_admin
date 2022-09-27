export const TOKEN_KEY = 'token'
export const APPINFO_KEY = 'appInfo'

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const getAppInfo = () => {
  localStorage.getItem(APPINFO_KEY)
}

const clearAppInfo = () => {
  localStorage.removeItem(APPINFO_KEY)
}

export { isLogin, getToken, setToken, clearToken, getAppInfo, clearAppInfo }
