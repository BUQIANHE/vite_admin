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

/** 渲染表单组件中的子组件 */
export const isChildComponent = (type: string) => {
  switch (type) {
    case 'select':
      return 'option'
    case 'checkbox-group':
      return 'checkbox'
    case 'radio-group':
      return 'radio'
  }
}

/** 小驼峰命名规则 */
export const titleCase = (str: string) => {
  return str?.toLowerCase()?.replace(/( |^)[a-z]/g, (L) => L?.toUpperCase())
}

/**
 * 构造树型结构数据
 * @param data 数据源
 * @param id id字段 默认 'id'
 * @param parentId 父节点字段 默认 'parentId'
 * @param children 子节点字段 默认 'children'
 * @param rootId 根Id 默认 0
 * @returns
 */
export const setTreeData = (
  data: any[],
  id: string,
  parentId?: string,
  children?: string,
  rootId?: any
) => {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId =
    rootId ||
    Math.min(
      ...data.map((item) => {
        return item[parentId!]
      })
    ) ||
    0

  const cloneData = JSON.parse(JSON.stringify(data))

  const treeData = cloneData.filter((father: { [x: string]: any; children: string }) => {
    const branchArr = cloneData.filter((child: { [x: string]: any }) => {
      return father[id] === child[parentId!]
    })

    if (branchArr.length > 0) {
      father.children = branchArr
    } else {
      father.children = ''
    }

    return father[parentId!] === rootId
  })
  return treeData !== '' ? treeData : data
}
