import { ElMessage } from 'element-plus'

/**
 * 16进制值转换成RGB值(此处是完整的16进制)
 * @param str 16进制的颜色值
 * @returns RGB值
 */
export const hexToRgb = (str: string) => {
  // 处理3位数字的16进制值
  if (str.length === 4) {
    str
      .slice(str.startsWith('#') ? 1 : 0)
      .split('')
      .map((item) => item + item)
      .join('')
  }

  let hexs: any = '' // 用来存储RGB数值的数组
  const reg = /^\#?[0-9A-Fa-f]{6}$/ // 16进制的正则规则
  if (!reg.test(str)) return ElMessage.warning('输入错误的hex')

  // 去除16进制值里面的#
  str = str.replace('#', '')
  // 将去除#的值转换两两一对的数组
  hexs = str.match(/../g)
  // 将数组的转换成16进制的数值
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)

  return hexs
}

/**
 * 将RGB的值转换成16进制的值
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns 16进制的值
 */
export const rgbToHex = (r: any, g: any, b: any) => {
  // RGB的正则规则
  const reg = /^\d{1,3}$/
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning('输入错误的hex')

  // 将rgb的值转换成16进制的字符串
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]

  // 将个位数的值加上前缀0
  for (let i = 0; i < 3; i++) if (hexs[i].length === 1) hexs[i] = `0${hexs[i]}`

  // 将转换成字符串的数组拼接成16进制的值并返回
  return `#${hexs.join('')}`
}

/**
 * 加深颜色 值越小颜色越深
 * @param color 16进制的颜色值(此处是完整的16进制)
 * @param level 加深程度 0~1之间 比如加深0.1, 相对应的每个色值在原来值的基础上减少1/10
 * @returns 16进制的颜色值
 */
export const depthColor = (color: string, level: number) => {
  // 处理3位数字的16进制值
  if (color.length === 4) {
    color
      .slice(color.startsWith('#') ? 1 : 0)
      .split('')
      .map((item) => item + item)
      .join('')
  }

  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值')

  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level))
  const [r, g, b] = rgb

  return rgbToHex(r, g, b)
}

/**
 * 变浅颜色 值越大颜色越浅
 * @param color 16进制的颜色值(此处是完整的16进制)
 * @param level 变浅程度 0~1之间 比如变浅0.1, 相对应的每个色值在相反值的基础上加上1/10
 * @returns 16进制的颜色值
 */
export const lightColor = (color: string, level: number) => {
  // 处理3位数字的16进制值
  if (color.length === 4) {
    color
      .slice(color.startsWith('#') ? 1 : 0)
      .split('')
      .map((item) => item + item)
      .join('')
  }

  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值')

  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  const [r, g, b] = rgb

  return rgbToHex(r, g, b)
}
