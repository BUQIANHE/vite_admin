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

  const treeData = cloneData.filter((father: { [x: string]: any; children: any }) => {
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

export const filterEnums = (value: any, enumData: any[] = []) => {
  const filterData = enumData.find((item) => item.value === value)
  return filterData ? filterData?.label : '--'
}

// export const forbidTree = (data: any) => {
//   for (const key in data) {
//     data[key].disabled = true
//     if (data[key]?.children?.length) forbidTree(data[key].children)
//   }
//   return data
// }

export const BASEURL = '/api'
// import.meta.env.BASE_URL

/**
 * 静态链接导出
 * @param fileName 导出文件名
 */
export const staticLinksExport = (fileName: string) => {
  window.location.href = `${BASEURL}/common/download?fileName=${encodeURI(fileName)}&delete=${true}`
}

/**
 * 下载导出
 * @param data 接口返回的文件数据
 */
export const exportExecl = (data: any) => {
  const fileName = data.fileName

  const url = window.URL.createObjectURL(data)
  const link = document.createElement('a')

  link.style.display = 'none'
  link.href = url
  link.download = decodeURIComponent(fileName)
  document.body.appendChild(link)
  link.click()
  // 撤销下载链接
  window.URL.revokeObjectURL(url)
}

/**
 * 数组对象去重
 * @param arr 去重的数组
 * @returns 去重后的数组
 */
export const removeRepeat = (arr: any) => {
  const obj: any = {}
  let data = []
  data = arr.reduce((item: any, next: any) => {
    obj[next?.name] ? '' : (obj[next?.name] = true && item.push(next))
    return item
  }, [])

  return data
}
