import { ElMessage } from 'element-plus'

/** 导入本地静态文件 */
export const useStaticFiles = (url: string) => {
  const modules = import.meta.glob('/src/**/*.{jpg,jpeg,png,svg}', {
    eager: true
  })

  if (modules[url]) return (modules[url] as any).default
  else {
    ElMessage({
      message: '图片路径错误',
      type: 'error',
      showClose: true
    })
    console.error('图片路径错误')
  }
}
