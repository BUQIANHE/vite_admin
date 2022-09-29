import { ElMessageBox } from 'element-plus'

type MessageType = '' | 'success' | 'warning' | 'info' | 'error'

export const useTooptip = (
  apiRequest: (params: any) => Promise<any>,
  params: number[],
  message: string,
  tooptipType: MessageType = 'warning'
) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: tooptipType,
      draggable: true
    }).then(async () => {
      const res = await apiRequest(params)

      if (!res) return reject(false)

      ElMessage({
        type: 'success',
        message: `${message}成功!`
      })

      resolve(true)
    })
  })
}
