<script lang="ts" name="Theme" setup>
import { useAppStore } from '@/pinia'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
// {
//   storageKey: 'vueuse-color-scheme',
//   selector: 'html',
//   valueDark: 'dark',
//   valueLight: 'light'
// }
const toggleDark = useToggle(isDark)

const appStore = useAppStore()
watch(
  isDark,
  (newVal) => {
    appStore.golbalSettings.isDark = newVal
    if (newVal) {
      appStore.golbalSettings.theme = 'dark'
    } else {
      appStore.golbalSettings.theme = 'light'
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-tooltip class="box-item" effect="dark" content="切换主题" placement="bottom">
    <div class="right_item">
      <el-icon :size="18" @click="toggleDark()">
        <component :is="isDark ? 'Moon' : 'Sunny'" />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.right_item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
}
</style>
