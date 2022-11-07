<script lang="ts" name="index" setup>
import { ColumnProps } from '@/components/ProTable/types'
import { DrawerExpose } from '@/components/FormItem/types'
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { useTooptip } from '@/hooks/useTooltip'
import { usePublicStore } from '@/pinia'
import { filterEnums } from '@/utils'
import {
  getSysDeptList,
  addSysDeptItem,
  updateSysDeptItem,
  detailSysDeptItem,
  deleteSysDeptItem
} from '@/api/dept'
import { FormRules } from 'element-plus'

const publicStore = usePublicStore()

publicStore.fetchDeptTree()

const columns: Partial<ColumnProps>[] = [
  {
    type: 'tree-select',
    label: '上级部门',
    prop: 'parentId',
    value: '',
    showInSearch: false,
    hideInTable: true,
    attrs: {
      data: publicStore.department,
      checkStrictly: true,
      defaultExpandAll: true
    },
    rules: [{ required: true, message: '请选择上级部门', trigger: 'change' }]
  },
  {
    type: 'input',
    label: '部门名称',
    prop: 'deptName',
    value: '',
    searchValue: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写部门名称',
      clearable: true
    },
    rules: [{ required: true, message: '请填写部门名称', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '负责人',
    prop: 'leader',
    value: '',
    searchValue: '',
    showInSearch: false,
    hideInTable: true,
    attrs: {
      placeholder: '请填写负责人',
      clearable: true
    }
  },
  {
    type: 'input',
    label: '联系电话',
    prop: 'phone',
    value: '',
    searchValue: '',
    showInSearch: false,
    hideInTable: true,
    attrs: {
      placeholder: '请填写联系电话',
      clearable: true
    }
  },
  {
    type: 'input-number',
    label: '排序',
    value: 0,
    prop: 'orderNum',
    showInSearch: false,
    attrs: {
      clearable: true,
      min: 0
    },
    rules: [{ required: true, message: '请填写部门顺序', trigger: ['blur', 'change'] }]
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    value: 0,
    searchValue: '',
    showInSearch: true,
    attrs: {
      placeholder: '请选择状态',
      clearable: true
    },
    children: publicStore.useStatus
  },
  {
    label: '操作',
    prop: 'operation',
    hideInForm: true,
    attrs: {
      fixed: 'right',
      align: 'center',
      width: 200
    }
  }
]

const proTable = ref()

// 可显示的表单项
const formColumns = computed((): any[] => columns.filter((item) => !item.hideInForm))

// 表单项参数
const formModel = reactive<any>({ model: {} })
formColumns.value.map((item) => (formModel.model[item.prop] = item.value))

// 表单的验证规则
const rules: FormRules = {}
formColumns.value.map((item) => (rules[item.prop] = item.rules))

const formItemRef = ref<DrawerExpose>()
const isAdd = ref<boolean>(false)
const readonly = ref<boolean>(false)
const open = async (params: API.FormParams) => {
  formColumns.value.map((item) => (formModel.model[item.prop] = item.value))
  isAdd.value = params?.isNew || false
  readonly.value = params?.isRead || false

  // 查看修改调用详情接口
  if (params?.id) await fetchFormItemDetail(params?.id)

  let props = {
    formColumns,
    rules,
    model: { ...formModel.model },
    isAdd: params?.isNew || false,
    formTitle: '部门管理',
    apiRequest: params?.isNew ? addSysDeptItem : updateSysDeptItem,
    refreshTable: proTable.value.search
  }
  formItemRef.value!.formItemParams(props)
}

// 获取表单详情信息
const fetchFormItemDetail = async (id: number) => {
  try {
    const res = await detailSysDeptItem(id)
    if (res.code === 200) {
      Object.assign(formModel.model, res.data, {
        status: +res?.data?.status || 0,
        orderNum: +res?.data?.orderNum || 0
      })
    }
  } catch (err) {
    console.log(err)
  }
}

// 删除表格数据
const openMsgBox = async (ids: number[]) => {
  await useTooptip(deleteSysDeptItem, ids, '删除所选数据')
  proTable.value.search()
}
</script>

<template>
  <div class="pages">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request="getSysDeptList"
      :span="6"
      :is-pages="false"
      :is-tree-data="true"
      row-key="deptId"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="Plus" @click="open({ isNew: true })">新增</el-button>
      </template>

      <template #status="scope">
        <el-tag :type="scope.row.status === '0' ? 'success' : 'info'">{{
          filterEnums(Number(scope.row.status), publicStore.useStatus)
        }}</el-tag>
      </template>

      <template #operation="scope">
        <el-button
          link
          type="primary"
          :icon="Edit"
          size="small"
          @click="open({ id: scope.row.deptId })"
          >编辑</el-button
        >
        <el-button
          link
          type="danger"
          :icon="Delete"
          size="small"
          @click="openMsgBox([scope.row.deptId])"
          >删除</el-button
        >
      </template>
    </ProTable>

    <FormItem ref="formItemRef" />
  </div>
</template>

<style lang="scss" scoped></style>
