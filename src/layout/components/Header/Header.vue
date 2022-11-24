<script lang="ts" name="Header" setup>
import { useAppStore } from '@/pinia'

const appStore = useAppStore()
const golbalConfig = computed(() => appStore.golbalSettings)
</script>

<template>
  <div class="head_bar flex jsb">
    <Collapse />
    <Breadcrumb v-if="golbalConfig.breadcrumb" />
    <div class="head_right flex jsb">
      <Notice />
      <FullScreen />
      <Theme />
      <Settings />
      <Avatar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.head_bar {
  height: 100%;
}
</style>
