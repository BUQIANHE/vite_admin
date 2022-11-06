<script lang="ts" name="index" setup>
import { ColumnProps } from '@/components/ProTable/types'
import { DrawerExpose } from '@/components/FormItem/types'
import { Plus, Delete, Edit, Download } from '@element-plus/icons-vue'
import { useTooptip } from '@/hooks/useTooltip'
import { usePublicStore } from '@/pinia'
import { filterEnums, staticLinksExport } from '@/utils'
import {
  getSysRoleList,
  addSysRoleItem,
  updateSysRoleItem,
  detailSysRoleItem,
  deleteSysRoleItem,
  getRoleMenuTree,
  exportExecl
} from '@/api/role'
import { getMenuTree } from '@/api/public'
import { ElButton, ElTag, ElTree, FormRules } from 'element-plus'

const publicStore = usePublicStore()

const columns: Partial<ColumnProps>[] = [
  {
    colType: 'selection',
    hideInForm: true,
    attrs: {
      width: 60
    }
  },
  {
    type: 'input',
    label: '角色名',
    prop: 'roleName',
    value: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写角色名',
      clearable: true
    },
    rules: [{ required: true, message: '请填写角色名', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '权限标识',
    prop: 'roleKey',
    value: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写权限标识',
      clearable: true
    },
    rules: [{ required: true, message: '请填写权限标识', trigger: 'blur' }]
  },
  {
    type: 'input-number',
    label: '排序',
    prop: 'roleSort',
    value: 0
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    value: 0,
    searchValue: 0,
    showInSearch: true,
    attrs: {
      placeholder: '请选择状态',
      clearable: true
    },
    children: publicStore.useStatus
  },
  {
    type: 'tree',
    label: '菜单权限',
    prop: 'menuIds',
    value: '',
    hideInTable: true,
    attrs: {}
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

onMounted(() => {
  // 获取菜单权限树数据
  fetchMenuTreeData()
})

const proTable = ref()

// 是否批量删除
const isBatchDelect = computed((): boolean => (proTable.value?.ids?.length ? false : true))

// 可显示的表单项
const formColumns = computed((): any[] => columns.filter((item) => !item.hideInForm))

// 表单项参数
const formModel = reactive<any>({ model: {} })
formColumns.value.map((item) => (formModel.model[item.prop] = item.value))

// 表单的验证规则
const rules: FormRules = {}
formColumns.value.map((item) => (rules[item.prop] = item.rules))

const menuTree = ref<any>([])
const menuTreeDefaultProps = {
  label: 'label',
  children: 'children',
  disabled: 'disabled'
}

// 获取菜单权限树数据
const fetchMenuTreeData = async () => {
  try {
    const res = await getMenuTree()
    if (res?.code === 200) {
      menuTree.value = res.data
    }
  } catch (err) {
    console.log(err)
  }
}

// 插槽表单字段
const menuIds = ref<number[]>([])
// 选择权限树
const handleCheckTree = (node: any, data: any) => {
  menuIds.value = [...new Set([...data.checkedKeys, ...data?.halfCheckedKeys])]
}

const treeRef = ref<InstanceType<typeof ElTree>>()
// 获取菜单回显数据
const fetchEchoMenuRoles = async (id: number | undefined, tree = treeRef) => {
  if (!id) return
  try {
    const res = await getRoleMenuTree(id)
    if (res?.code === 200) {
      let checkedKeysArr: number[] = []
      res.checkedKeys.forEach((item: number) => {
        if (tree.value!.getNode(item).childNodes || !tree.value!.getNode(item).childNodes?.length) {
          checkedKeysArr.push(item)
        }
      })
      treeRef.value!.setCheckedKeys(checkedKeysArr)
    }
  } catch (err) {
    console.log(err)
  }
}

const formItemRef = ref<DrawerExpose>()
const isAdd = ref<boolean>(false)
// 打开form表单 类型（新增， 修改， 查看）
const open = async (params: API.FormParams) => {
  // 重置表单的model参数
  formColumns.value.map((item) => (formModel.model[item.prop] = item.value))
  isAdd.value = params?.isNew || false

  // 查看修改调用详情接口
  if (params?.id) await fetchFormItemDetail(params?.id)

  // 获取权限回显数据
  if (!params?.isNew && params?.id) {
    nextTick(() => fetchEchoMenuRoles(params?.id))
  }

  let props = {
    formColumns,
    rules,
    model: { ...formModel.model },
    isAdd: params?.isNew || false,
    isUseSlot: true,
    formTitle: '用户管理',
    apiRequest: params?.isNew ? addSysRoleItem : updateSysRoleItem,
    refreshTable: proTable.value.search
  }
  formItemRef.value!.formItemParams(props)
}

// 获取表单详情信息
const fetchFormItemDetail = async (id: number) => {
  try {
    const res = await detailSysRoleItem(id)
    if (res.code === 200) {
      Object.assign(formModel.model, res.data, {
        roleSort: +res?.data?.roleSort || 0,
        status: +res?.data?.status || 0
      })
    }
  } catch (err) {
    console.log(err)
  }
}

// 下载导出
const download = async () => {
  try {
    const params = {
      ...proTable.value.searchRef.query
    }
    const res = await exportExecl(params)
    if (res.code === 200) {
      staticLinksExport(res.msg)
      ElMessage.success('导出成功')
    }
  } catch (err) {
    console.log(err)
  }
}

// 提交表单
const submit = async (formModel: any) => {
  if (!menuIds.value?.length) {
    ElMessage.error('请选择权限')
    return
  }

  const params = {
    ...formModel,
    menuIds: menuIds.value
  }

  try {
    const res = isAdd.value ? await addSysRoleItem(params) : await updateSysRoleItem(params)
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
  await useTooptip(deleteSysRoleItem, ids, '删除所选数据')
  proTable.value.search()
}
</script>

<template>
  <div class="pages">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request="getSysRoleList"
      :span="6"
      :is-page="false"
      row-key="roleId"
      data-key="rows"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="Plus" @click="open({ isNew: true })">新增</el-button>
        <el-button
          type="danger"
          :disabled="isBatchDelect"
          :icon="Delete"
          @click="openMsgBox(proTable.ids)"
          >批量删除</el-button
        >
        <el-button type="success" :icon="Download" @click="download">导出</el-button>
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
          @click="open({ id: scope.row.roleId })"
          >编辑</el-button
        >
        <el-button
          link
          type="danger"
          :icon="Delete"
          size="small"
          @click="openMsgBox([scope.row.roleId])"
          >删除</el-button
        >
      </template>
    </ProTable>

    <FormItem ref="formItemRef" @submit="submit">
      <template #menuIds>
        <el-tree
          ref="treeRef"
          class="role_tree"
          empty-text="暂无权限"
          node-key="id"
          show-checkbox
          highlight-current
          :default-expand-all="false"
          :data="menuTree"
          :props="menuTreeDefaultProps"
          @check="handleCheckTree"
        />
      </template>
    </FormItem>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tree) {
  width: 100%;
}
</style>
