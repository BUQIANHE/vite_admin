<script lang="ts" name="IconItem" setup>
import { CircleClose } from '@element-plus/icons-vue'
import { AppState, GlobalConfig, SysProps, SysState } from '@/injectKey'

const { ElIcons } = inject(AppState) as GlobalConfig
const { form, readonly } = inject(SysState) as SysProps

const visibleIcons = ref<boolean>(false)

/** 打开图表库弹窗 */
const openDialog = () => {
  visibleIcons.value = true
}

/** 关闭图表库弹窗 */
const closeDialog = () => {
  visibleIcons.value = false
}

const chooseIcon = (val: string) => {
  form.icon = val
  closeDialog()
}
</script>

<template>
  <div class="icon_item_box">
    <div class="icon_item flex jfs">
      <el-input
        v-model="form.icon"
        class="icon_input"
        clearable
        :readonly="true"
        :disabled="readonly"
      >
        <template v-if="form?.icon" #append>
          <el-button :disabled="readonly" :icon="CircleClose" @click="chooseIcon('')" />
        </template>
      </el-input>
      <el-button :disabled="readonly" class="select_icon_btn" type="primary" @click="openDialog"
        >选择图标</el-button
      >
    </div>
    <el-dialog v-model="visibleIcons" draggable>
      <el-scrollbar style="height: 100%">
        <div class="icons_list">
          <template v-for="item in ElIcons" :key="item">
            <div class="icons_item flex jsb col" @click="chooseIcon(item)">
              <el-icon><component :is="item" /></el-icon>
              <span class="icons_name">{{ item }}</span>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.icon_item {
  width: 100%;
  .select_icon_btn {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  .icon_input {
    flex-grow: 1;

    :deep(.el-input__wrapper) {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}

.icon_item_box {
  width: 100%;

  :deep(.el-dialog.is-draggable) {
    height: 65%;
    overflow: hidden;
  }

  :deep(.el-dialog__body) {
    height: calc(100% - 90px);
  }
}

.icons_list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  .icons_item {
    border-radius: 6px;
    border: var(--el-border);
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: var(--el-bg-color-overlay);
    }

    :deep(.el-icon) {
      font-size: 24px;
    }

    span {
      font-size: 13px;
      line-height: 1rem;
      margin-top: 1rem;
    }
  }
}
</style>
