<script lang="ts" name="Aside" setup>
import { useAppStore } from '@/pinia'

const appStore = useAppStore()

const { menuCollapse } = toRefs(appStore.golbalSettings)
</script>

<template>
  <div class="aside_menu_box" :style="menuCollapse ? '65px' : '220px'">
    <LogoTitle :is-collapse="menuCollapse" />
    <el-scrollbar class="aside_menu_scroll">
      <Menu />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.aside_menu_box {
  width: initial;
  height: 100%;

  .aside_menu_scroll {
    width: inherit;
    height: calc(100% - 60px);
  }
}
</style>
