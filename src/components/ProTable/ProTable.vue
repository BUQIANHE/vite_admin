<script lang="ts" name="ProTable" setup>
import { setTreeData } from '@/utils'
import { ColumnProps, PageProps } from './types'
import { Refresh } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    request: (params: any) => Promise<any> // 表格数据API ===> 必传
    columns: Partial<ColumnProps>[] // 查询、列表、表单配置项 ===> 必传
    span?: number // 查询表单布局 ===> 非必传，默认为 6
    isSearch?: boolean // 是否显示查询 ===> 非必传，默认显示（true）
    isPages?: boolean // 是否显示分页 ===> 非必传，默认显示（true）
    rowKey?: string // 表格的Key ===> 非必传
    dataKey?: string // 表格响应列表数据的`key`值 ===> 非必传， 默认值 ==> data
    isTreeData?: boolean // 表格列表数据是否为树结构 ===> 非必传，默认列表数据（false）
  }>(),
  {
    columns: () => [],
    span: 6,
    isSearch: true,
    isPages: true,
    rowKey: 'id',
    dataKey: 'data',
    isTreeData: false
  }
)
const searchRef = ref()
const selectRows = ref<any[]>([])
const settingColumns = ref<Partial<ColumnProps>[]>([])
const tableColumns = ref<Partial<ColumnProps>[]>([])
const tableData = ref<any[]>([])
const pageSizes = [10, 20, 50, 100, 200]
const pagination = reactive<PageProps>({
  current: 1,
  size: 20,
  total: 0
})

// 初始化表格columns
const initTable = () => {
  settingColumns.value = []

  settingColumns.value = props.columns.filter((item) => {
    if (!item.hideInTable) {
      item.showInTable = true
      return item
    }
  })
}

// 表格的columns
const watchTableColumns = () => {
  tableColumns.value = []

  tableColumns.value = settingColumns.value.filter((item) => item.showInTable)
}

// 获取表格列表数据
const fetchTableListData = async () => {
  try {
    const params = {
      ...searchRef.value.query,
      current: pagination.current,
      size: pagination.size
    }
    const res = await props.request(params)

    pagination.total = res.total
    tableData.value = props.isTreeData
      ? setTreeData(res[props.dataKey], props.rowKey)
      : res[props.dataKey]
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  initTable()
  watchTableColumns()
  search()
})

watch(
  () => settingColumns.value,
  () => {
    watchTableColumns()
  },
  { deep: true }
)

// 查询
const search = () => {
  pagination.current = 1
  fetchTableListData()
}

// 多选
const handleSelectionChange = (rows: any) => {
  selectRows.value = rows
}

// 表格选择行的id集合
const ids = computed((): number[] => selectRows.value.map((item: any) => item[props.rowKey]))

// 修改当页条数
const handleSizeChange = (val: number) => {
  pagination.current = 1
  pagination.size = val
  search()
}

// 修改页数
const handleCurrentChange = (val: number) => {
  pagination.current = val
  search()
}

defineExpose({
  ids,
  search,
  searchRef
})
</script>

<template>
  <div class="table_card el-card">
    <template v-if="isSearch">
      <Search ref="searchRef" :columns="props.columns" :span="props.span" @search="search" />
    </template>
    <div class="table_header title_bar flex jfe">
      <div class="header_btns">
        <slot name="tableHeader" />
      </div>
      <div class="site_btns">
        <el-button :icon="Refresh" circle @click="search" />
        <TableSetting :setting-columns="settingColumns" />
      </div>
    </div>
    <el-table
      ref="tableRef"
      height="600"
      class="table_main"
      :data="tableData"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
    >
      <template v-if="tableColumns?.length">
        <template v-for="col in tableColumns" :key="col.prop!">
          <el-table-column
            v-if="col.colType === 'selection'"
            v-bind="col.attrs"
            :type="col.colType"
            :label="col.label"
            reserve-selection
          />
          <el-table-column
            v-else-if="col.colType === 'expand'"
            v-slot="scope"
            v-bind="col.attrs"
            :type="col.colType"
            :label="col.label"
          >
            <slot :name="col.prop!" :row="scope.row" />
          </el-table-column>
          <el-table-column v-else v-bind="col.attrs" :prop="col.prop" :label="col.label" resizable>
            <!-- 自定义头部内容(tsx) -->
            <template v-if="col.renderTableHeader" #header>
              <component :is="col.renderTableHeader" :row="col" />
            </template>

            <template #default="scope">
              <slot :name="col.prop!" :row="scope.row">
                <span>{{ scope.row[col.prop!] }}</span>
              </slot>
            </template>
          </el-table-column>
        </template>
      </template>

      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <template v-if="props.isPages">
      <el-pagination
        v-model:currentPage="pagination.current"
        v-model:page-size="pagination.size"
        class="page_box flex jfe"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pageSizes"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.table_card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .table_header {
    width: 100%;
    padding: 0 0 20px;
    box-sizing: border-box;

    .site_btns {
      margin-left: 20px;
    }
  }

  .table_main {
    flex: 1;
    width: 100%;

    :deep(.el-table__inner-wrapper) {
      height: 100% !important;
    }

    :deep(.el-table__header) {
      .cell {
        font-weight: 400;
        color: var(--el-text-color-regular);
      }
    }
  }

  .page_box {
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
  }
}
</style>
