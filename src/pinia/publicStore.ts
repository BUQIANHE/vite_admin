import { defineStore } from 'pinia'
import { getDeptTree } from '@/api/public'
import piniaPersistConfig from '@/hooks/piniaPersist'

const usePublicStore = defineStore('public', {
  state: (): API.PublicState => ({
    department: [],
    menuType: [
      { label: '目录', value: 'M' },
      { label: '菜单', value: 'C' },
      { label: '按钮', value: 'F' }
    ],
    useStatus: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 }
    ]
  }),

  actions: {
    /** 获取部门数据 */
    async fetchDeptTree() {
      const res = await getDeptTree()
      if (res?.code === 200) {
        const data = JSON.parse(JSON.stringify(res.data[0]).replace(/id/g, 'value'))
        this.department = [data]
      }
    }
  },
  // 数据持久化
  persist: piniaPersistConfig('publicInfo')
})

export default usePublicStore
