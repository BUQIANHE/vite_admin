<script lang="ts" name="TableSetting" setup>
import { Operation } from '@element-plus/icons-vue'
import { ColumnProps } from '../../types'

const props = withDefaults(
  defineProps<{
    settingColumns: Partial<ColumnProps>[]
  }>(),
  {
    settingColumns: () => []
  }
)

const resetColumns = () => {
  props.settingColumns.map((item: any) => (item.showInTable = true))
}
</script>

<template>
  <el-popover placement="bottom" trigger="click">
    <template #reference>
      <el-button :icon="Operation" circle />
    </template>
    <div class="table_setting">
      <div class="pop_header flex jfe">
        <el-button type="primary" link @click="resetColumns">重置</el-button>
      </div>
      <el-divider class="pop_header_line" style="margin: 10px 0" />
      <el-scrollbar max-height="300px">
        <template v-for="item in settingColumns" :key="item.prop!">
          <el-checkbox
            v-model="item.showInTable"
            :label="item.label"
            style="width: 100%; margin-right: 0"
          />
        </template>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<style lang="less" scoped></style>
