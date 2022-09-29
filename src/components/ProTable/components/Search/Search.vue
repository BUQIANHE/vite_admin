<script lang="ts" name="Search" setup>
import { ColumnProps } from '../../types'
import { isChildComponent } from '@/utils'
import useSearch from '../../hooks/useSearch'
import { FormInstance } from 'element-plus'

const props = withDefaults(
  defineProps<{
    columns: Partial<ColumnProps>[]
    span?: number
  }>(),
  {
    columns: () => [],
    span: 6
  }
)

const searchModelRef = ref<FormInstance>()
const { expand, searchModel, searchColumns, expandCount, initSearch } = useSearch(
  props.columns,
  props.span
)

onMounted(() => {
  initSearch()
})

const emits = defineEmits(['search'])

// 发射查询事件
const search = () => {
  emits('search')
}

// 重置查询表单
const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 暴露查询参数给父组件使用
defineExpose({
  query: searchModel
})
</script>

<template>
  <div class="search_card">
    <el-form ref="searchModelRef" :model="searchModel" label-position="top" class="search_form">
      <el-row :gutter="16" class="search_item">
        <el-col
          v-for="(item, index) in searchColumns"
          v-show="expand || index + 1 <= expandCount"
          :key="index"
          :span="span"
        >
          <el-form-item :label="item.label" :prop="item.prop">
            <component
              :is="`el-${item.type}`"
              v-bind="item.attrs"
              v-model="searchModel[item.prop!]"
            >
              <template v-if="item?.children?.length">
                <template v-for="(child, i) in item.children" :key="i">
                  <component
                    :is="`el-${isChildComponent(item.type!)}`"
                    :label="child.label"
                    :value="child.value"
                  />
                </template>
              </template>
            </component>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        justify="end"
        class="search_btns"
        :class="{ expend: searchColumns.length >= expandCount }"
      >
        <el-col :span="24" :style="{ textAlign: 'right' }">
          <el-button type="primary" @click="search"> 查询 </el-button>
          <el-button class="rest_btn" @click="reset(searchModelRef)"> 清空 </el-button>
          <el-button
            v-if="searchColumns.length > expandCount"
            class="expend_btn flex jcc"
            link
            @click="expand = !expand"
            >{{ expand ? '收起' : '展开'
            }}<el-icon><component :is="expand ? 'ArrowUp' : 'ArrowDown'" /></el-icon
          ></el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-divider class="table_header_line" />
</template>

<style lang="scss" scoped>
.search_card {
  width: 100%;

  .search {
    &_form {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
    }

    &_item {
      flex: 1;
      margin-right: 0 !important;

      :deep(.el-col) {
        &:nth-child(4n) {
          padding-right: 0 !important;
        }
      }
    }

    &_btns {
      width: auto;

      :deep(.el-col) {
        margin-bottom: 10px;
      }
      &.expend {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        :deep(.el-col) {
          margin-bottom: 0;
        }
      }
    }
  }

  :deep(.el-input__wrapper) {
    width: calc(100% - 22px);
  }

  :deep(.el-select-v2) {
    width: 100%;
  }

  :deep(.el-select) {
    width: 100%;
  }

  :deep(.el-form-item) {
    margin-bottom: 10px;
  }
}
.table_header_line {
  margin: 20px 0;
}
</style>
