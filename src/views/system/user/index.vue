<script lang="ts" name="index" setup>
import { ColumnProps } from '@/components/ProTable/types'
import { Plus, Delete, View, Edit } from '@element-plus/icons-vue'
import {
  getSysUserList,
  addSysUserItem,
  updateSysUserItem,
  detailSysUserItem,
  deleteSysUserItem
} from '@/api/user'
import { useTooptip } from '@/hooks/useTooltip'
import { usePublicStore } from '@/pinia'

const publicStore = usePublicStore()
onBeforeMount(() => {
  publicStore.fetchDeptTree()
})

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
    label: '用户账号',
    prop: 'userName',
    value: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写用户账号',
      clearable: true
    }
  },
  {
    type: 'input',
    label: '用户名称',
    prop: 'nickName',
    value: '',
    attrs: {
      placeholder: '请填写用户名称',
      clearable: true
    }
  },
  {
    type: 'input',
    label: '手机',
    prop: 'phonenumber',
    value: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写手机号',
      clearable: true
    }
  },
  {
    type: 'tree-select',
    label: '部门',
    prop: 'deptId',
    value: '',
    showInSearch: true,
    attrs: {
      data: publicStore.department,
      placeholder: '请选择部门',
      clearable: true,
      checkStrictly: true,
      // defaultExpandedKeys: [0] // 默认展开的节点的 key 的数组
      defaultExpandAll: true // 是否默认展开所有节点
    }
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
    children: [
      {
        label: '停用',
        value: 1
      },
      {
        label: '正常',
        value: 0
      }
    ]
  },
  {
    label: '操作',
    prop: 'operation',
    hideInForm: true,
    attrs: {
      fixed: 'right',
      width: 200
    }
  }
]

const proTable = ref()
const formItemRef = ref()

const isBatchDelect = computed((): boolean => {
  if (proTable.value?.ids?.length) {
    return false
  } else {
    return true
  }
})

const formTitle = ref<string>('用户管理')

const isAdd = ref<boolean>(false)
const readonly = ref<boolean>(false)

// 打开form表单 类型（新增， 修改， 查看）
const open = async (params: API.FormParams) => {
  isAdd.value = params?.isNew || false
  readonly.value = params?.isRead || false

  if (params?.id) await fetchFormItemDetail(params?.id)

  formItemRef.value.visibleDrawer = true
}

// 获取表单详情信息
const fetchFormItemDetail = async (id: number) => {
  try {
    formItemRef.value.model = {}
    const res = await detailSysUserItem(id)
    if (res.code === 200) {
      Object.assign(formItemRef.value.model, res.data, {
        orderNum: +res?.data?.orderNum || 0,
        status: +res?.data?.status || 0
      })
    }
  } catch (err) {
    console.log(err)
  }
}

// 表单提交（新增，修改）
const submit = async () => {
  try {
    const params = { ...formItemRef.value.model }
    let res
    switch (isAdd.value) {
      case true:
        res = await addSysUserItem(params)
        break
      case false:
        res = await updateSysUserItem(params)
        break
    }
    if (res.code === 200) ElMessage.success('提交成功！')
    formItemRef.value.close()
    proTable.value.search()
  } catch (err) {
    console.log(err)
  }
}
// 删除表格数据
const openMsgBox = async (ids: number[]) => {
  await useTooptip(deleteSysUserItem, ids, '删除所选数据')
  proTable.value.search()
}
</script>

<template>
  <div class="pages">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request="getSysUserList"
      :span="6"
      :is-page="false"
      row-key="userId"
      data-key="rows"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="Plus" @click="open({ isNew: true })">新增</el-button>
        <el-button type="danger" :disabled="isBatchDelect" :icon="Delete">批量删除</el-button>
      </template>

      <template #tableStatus="scope">
        <el-tag :type="scope.row.status === '0' ? 'success' : 'info'">{{
          scope.row.status === '0' ? '正常' : '停用'
        }}</el-tag>
      </template>

      <template #tableOperation="scope">
        <el-button
          link
          type="primary"
          :icon="View"
          size="small"
          @click="open({ id: scope.row.userId, isRead: true })"
          >查看</el-button
        >
        <el-button
          link
          type="primary"
          :icon="Edit"
          size="small"
          @click="open({ id: scope.row.userId })"
          >编辑</el-button
        >
        <el-button
          link
          type="danger"
          :icon="Delete"
          size="small"
          @click="openMsgBox([scope.row.userId])"
          >删除</el-button
        >
      </template>
    </ProTable>

    <FormItem
      ref="formItemRef"
      :columns="columns"
      :is-add="isAdd"
      :readonly="readonly"
      :form-title="formTitle"
      @submit="submit"
    />
  </div>
</template>

<style lang="scss" scoped></style>
