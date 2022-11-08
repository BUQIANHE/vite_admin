<script lang="ts" name="index" setup>
import { ColumnProps } from '@/components/ProTable/types'
import { DrawerExpose } from '@/components/FormItem/types'
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { useTooptip } from '@/hooks/useTooltip'
import { usePublicStore } from '@/pinia'
import { filterEnums } from '@/utils'
import {
  getSysMenuList,
  addSysMenuItem,
  updateSysMenuItem,
  detailSysMenuItem,
  deleteSysMenuItem
} from '@/api/menu'
import { FormRules } from 'element-plus'
import { SysState } from '@/injectKey'

const publicStore = usePublicStore()

publicStore.fetchMenuTree()

const columns: Partial<ColumnProps>[] = [
  {
    type: 'tree-select',
    label: '上级菜单',
    prop: 'parentId',
    value: 0,
    showInSearch: false,
    hideInTable: true,
    attrs: {
      data: publicStore.allMenuTree,
      checkStrictly: true,
      defaultExpandedKeys: [0]
    }
    // rules: [{ required: true, message: '请选择上级菜单', trigger: 'change' }]
  },
  {
    type: 'radio-group',
    label: '菜单类型',
    prop: 'menuType',
    value: 'M',
    showInSearch: false,
    hideInTable: true,
    children: publicStore.menuType
    // rules: [{ required: true, message: '请选择菜单类型', trigger: 'change' }]
  },
  {
    type: 'input',
    label: '菜单名称',
    prop: 'menuName',
    value: '',
    searchValue: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写菜单名称',
      clearable: true
    },
    rules: [{ required: true, message: '请填写菜单名称', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '图标',
    prop: 'icon',
    value: '',
    attrs: {
      placeholder: '请填写图标',
      clearable: true
    }
  },
  {
    type: 'input-number',
    label: '排序',
    value: 0,
    prop: 'orderNum',
    attrs: {
      clearable: true,
      min: 0
    },
    rules: [{ required: true, message: '请填写菜单顺序', trigger: ['blur', 'change'] }]
  },
  {
    type: 'input',
    label: '权限标识',
    prop: 'perms',
    value: '',
    attrs: {
      placeholder: '请填写权限标识',
      clearable: true
    }
  },
  {
    type: 'input',
    label: '组件路径',
    prop: 'component',
    value: '',
    attrs: {
      placeholder: '请填写组件路径',
      clearable: true
    },
    rules: [{ required: true, message: '请填写组件路径', trigger: 'blur' }]
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
    formTitle: '菜单管理',
    isUseSlot: true,
    apiRequest: params?.isNew ? addSysMenuItem : updateSysMenuItem,
    refreshTable: proTable.value.search
  }
  formItemRef.value!.formItemParams(props)
}

// 获取表单详情信息
const fetchFormItemDetail = async (id: number) => {
  try {
    const res = await detailSysMenuItem(id)
    if (res.code === 200) {
      Object.assign(formModel.model, res.data, {
        roleSort: +res?.data?.roleSort || 0,
        status: +res?.data?.status || 0,
        orderNum: +res?.data?.orderNum || 0
      })
      form.icon = res.data.icon || ''
    }
  } catch (err) {
    console.log(err)
  }
}

const form = reactive({ icon: '' })
provide(SysState, { form, readonly })

const submit = async (formModel: any) => {
  const params = {
    ...formModel,
    ...form
  }

  try {
    const res = isAdd.value ? await addSysMenuItem(params) : await updateSysMenuItem(params)
    if (res?.code === 200) {
      ElMessage.success(res?.msg)
      proTable.value.search()
      formItemRef.value!.close()
    }
  } catch (err) {
    console.log(err)
  }
}

// 删除表格数据
const openMsgBox = async (ids: number[]) => {
  await useTooptip(deleteSysMenuItem, ids, '删除所选数据')
  proTable.value.search()
}
</script>

<template>
  <div class="pages">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request="getSysMenuList"
      :span="6"
      :is-pages="false"
      :is-tree-data="true"
      row-key="menuId"
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
          @click="open({ id: scope.row.menuId })"
          >编辑</el-button
        >
        <el-button
          link
          type="danger"
          :icon="Delete"
          size="small"
          @click="openMsgBox([scope.row.menuId])"
          >删除</el-button
        >
      </template>
    </ProTable>

    <FormItem ref="formItemRef" @submit="submit">
      <template #icon>
        <IconItem />
      </template>
    </FormItem>
  </div>
</template>
