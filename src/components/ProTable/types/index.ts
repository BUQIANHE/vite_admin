import { RuleItem } from './rules'
import { CSSProperties } from 'vue'

// 表单项的类型
export type FormType =
  | 'autocomplete'
  | 'cascader'
  | 'checkbox'
  | 'checkbox-group'
  | 'color-picker'
  | 'date-picker'
  | 'input'
  | 'input-number'
  | 'radio'
  | 'radio-group'
  | 'rate'
  | 'select'
  | 'tree-select'
  | 'option'
  | 'slider'
  | 'switch'
  | 'time-picker'
  | 'time-select'
  | 'transfer'
  | 'upload'
  | 'editor'

// 表格的数据类型，selection => 可选择，index => 默认数据， expend => 树形数据
export type TableColType = 'selection' | 'index' | 'expand'

export interface DefaultAttrs {
  placeholder?: string
  size?: string
  clearable?: boolean
  disabled?: boolean
  style?: CSSProperties
  [x: string]: any
}

export interface ColumnProps {
  type: FormType // 表单项组件类型
  colType?: TableColType // 表格数据类型
  value: any // 表单项的值， 可做默认值
  searchValue?: any // 查询表单的默认值
  label?: string // 表单项标题
  prop?: string // 表单项字段值
  showInSearch?: boolean // 字段是否显示在查询栏，默认值（false）
  hideInTable?: boolean // 字段是否显示在表格表头， 默认值（true）
  hideInForm?: boolean // 字段是否显示在Form，默认值（true）
  rules?: RuleItem[] // 表单项的验证规则
  attrs?: DefaultAttrs // 表单项的附加和默认属性
  tableAttrs?: {
    // 表格组件的默认属性
    [x: string]: any
  }
  children?: Partial<ColumnProps>[] // 表单项的子组件及相关属性
  renderTableHeader?: (params: any) => any // 自定表头
  [x: string]: any // 自定义属性
}

export interface SearchParams {
  expand: boolean
  searchColumns: Partial<ColumnProps>[]
  searchModel: {
    [x: string]: any
  }
}

export interface PageProps {
  current: number
  size: number
  total: number
}

export interface ProTableParams {
  loading: boolean
  settingColumns: ColumnProps[]
  tableColumns: Partial<ColumnProps>[]
  tableData: any
  pageSizes: number[]
  pagination: PageProps
  [x: string]: any
}
