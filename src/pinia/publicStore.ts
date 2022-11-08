import { defineStore } from 'pinia'
import { getDeptTree, getMenuTree } from '@/api/public'
import piniaPersistConfig from '@/hooks/piniaPersist'

const usePublicStore = defineStore('public', {
  state: (): API.PublicState => ({
    department: [],
    menu: [],
    allMenuTree: [],
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
    /** 获取部门树数据 */
    async fetchDeptTree() {
      const res = await getDeptTree()
      if (res?.code === 200) {
        console.log(res)
        this.department = res.data.map((item) => {
          return JSON.parse(JSON.stringify(item).replace(/id/g, 'value'))
        })
      }
    },

    /** 获取菜单树数据 */
    async fetchMenuTree() {
      const res = await getMenuTree()
      if (res?.code === 200) {
        this.menu = res.data.map((item) => {
          return JSON.parse(JSON.stringify(item).replace(/id/g, 'value'))
        })
        this.allMenuTree = [
          {
            label: '主目录',
            value: 0,
            children: this.menu
          }
        ]
      }
    }
  },
  // 数据持久化
  persist: piniaPersistConfig('publicInfo')
})

export default usePublicStore
