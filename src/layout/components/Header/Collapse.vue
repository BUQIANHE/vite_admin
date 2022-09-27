<script lang="ts" name="Collapse" setup>
import { useAppStore } from '@/pinia'

const appStore = useAppStore()

const { menuCollapse } = toRefs(appStore.golbalSettings)

const switchMenuCollapse = () => {
  appStore.switchAsideMenu()
}
</script>

<template>
  <div class="head_left">
    <el-icon :size="18" @click="switchMenuCollapse"
      ><component :is="menuCollapse ? 'Expand' : 'Fold'" />
    </el-icon>
  </div>
</template>
