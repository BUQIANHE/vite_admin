<script lang="ts" name="index" setup>
import { ColumnProps } from '@/components/ProTable/types'
import { DrawerExpose } from '@/components/FormItem/types'
import { Plus, Delete, View, Edit, Key } from '@element-plus/icons-vue'
import {
  getSysUserList,
  addSysUserItem,
  updateSysUserItem,
  detailSysUserItem,
  deleteSysUserItem
} from '@/api/user'
import { useTooptip } from '@/hooks/useTooltip'
import { usePublicStore } from '@/pinia'
import { filterEnums } from '@/utils'
import { FormRules } from 'element-plus'

const publicStore = usePublicStore()
onBeforeMount(() => {
  publicStore.fetchDeptTree()
})

const columns: Partial<ColumnProps>[] = [
  // {
  //   colType: 'selection',
  //   hideInForm: true,
  //   attrs: {
  //     width: 60
  //   }
  // },
  {
    type: 'input',
    label: '用户账号',
    prop: 'userName',
    value: '',
    showInSearch: true,
    attrs: {
      placeholder: '请填写用户账号',
      clearable: true
    },
    rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '用户名称',
    prop: 'nickName',
    value: '',
    attrs: {
      placeholder: '请填写用户名称',
      clearable: true
    },
    rules: [{ required: true, message: '请填写用户名称', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '密码',
    prop: 'password',
    value: 'error@123',
    hideInTable: true,
    attrs: {
      type: 'password',
      showPassword: true,
      placeholder: '请填写密码'
    },
    rules: [{ required: true, message: '请填写密码', trigger: 'blur' }]
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
    type: 'input',
    label: '邮箱',
    prop: 'email',
    value: '',
    hideInTable: true,
    attrs: {
      type: 'email',
      placeholder: '请填写邮箱'
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
    },
    rules: [{ required: true, message: '请选择部门', trigger: 'change' }]
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
    label: '操作',
    prop: 'operation',
    hideInForm: true,
    attrs: {
      fixed: 'right',
      align: 'center',
      width: 280
    }
  }
]

const proTable = ref()

// 是否批量删除
// const isBatchDelect = computed((): boolean => (proTable.value?.ids?.length ? false : true))

// 可显示的表单项
const formColumns = computed((): any[] => columns.filter((item) => !item.hideInForm))

// 表单项参数
const formModel = reactive<any>({ model: {} })
formColumns.value.map((item) => (formModel.model[item.prop] = item.value))

// 表单的验证规则
const rules: FormRules = {}
formColumns.value.map((item) => (rules[item.prop] = item.rules))

// 没有部门名称值显示的字符
const deptName = computed(() => (name: string) => {
  return name ? name : '--'
})

const formItemRef = ref<DrawerExpose>()
const readonly = ref<boolean>(false)
const isAdd = ref<boolean>(false)
// 打开form表单 类型（新增， 修改， 查看）
const open = async (params: API.FormParams) => {
  // 重置表单的model参数
  formColumns.value.map((item) => (formModel.model[item.prop] = item.value))
  readonly.value = params?.isRead || false
  isAdd.value = params?.isNew || false

  // 查看修改调用详情接口
  if (params?.id) await fetchFormItemDetail(params?.id)

  let props = {
    formColumns,
    rules,
    model: { ...formModel.model },
    isAdd: params?.isNew || false,
    readonly: params?.isRead || false,
    formTitle: '用户管理',
    isUseSlot: true,
    apiRequest: params?.isNew ? addSysUserItem : updateSysUserItem,
    refreshTable: proTable.value.search
  }
  formItemRef.value!.formItemParams(props)
}

// 获取表单详情信息
const fetchFormItemDetail = async (id: number) => {
  try {
    const res = await detailSysUserItem(id)
    if (res.code === 200) {
      Object.assign(formModel.model, res.data, {
        orderNum: +res?.data?.orderNum || 0,
        status: +res?.data?.status || 0
      })
    }
  } catch (err) {
    console.log(err)
  }
}

// 插槽字段
const form = reactive({
  password: 'error@123'
})
// 表单提交
const submit = async (formModel: any) => {
  if (!form.password) {
    ElMessage.error('请填写密码')
    return
  }

  const params = {
    ...formModel,
    ...form
  }

  try {
    const res = isAdd.value ? await addSysUserItem(params) : await updateSysUserItem(params)
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
  await useTooptip(deleteSysUserItem, ids, '删除所选数据')
  proTable.value.search()
}

const formModule = ref<DrawerExpose>()
// 修改密码模块
const openModule = (params: any) => {
  formModule.value!.formParams(params)
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
        <!-- <el-button type="danger" :disabled="isBatchDelect" :icon="Delete">批量删除</el-button> -->
      </template>

      <template #status="scope">
        <el-tag :type="scope.row.status === '0' ? 'success' : 'info'">{{
          filterEnums(Number(scope.row.status), publicStore.useStatus)
        }}</el-tag>
      </template>

      <template #deptId="scope">
        <span>{{ deptName(scope.row.dept.deptName) }}</span>
      </template>

      <template #operation="scope">
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
        <el-button link type="success" :icon="Key" size="small" @click="openModule(scope.row)">
          修改密码
        </el-button>
      </template>
    </ProTable>

    <FormItem ref="formItemRef" @submit="submit">
      <template #passwordItem="scope">
        <el-form-item v-show="isAdd" :label="scope.row.label" :prop="scope.row.prop">
          <component
            :is="`el-${scope.row.type}`"
            v-show="isAdd"
            v-bind="scope.row.attrs"
            v-model="form.password"
            :disabled="!isAdd"
          />
        </el-form-item>
      </template>
    </FormItem>

    <Password ref="formModule" />
  </div>
</template>
