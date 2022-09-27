<script lang="ts" name="FullScreen" setup>
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <el-tooltip
    class="box-item right_item"
    effect="dark"
    :content="`点击${isFullscreen ? '退出' : '切换'}全屏`"
    placement="bottom"
  >
    <div class="right_item">
      <SvgIcon :size="18" :name="isFullscreen ? 'OffScreen' : 'FullScreen'" @click="toggle" />
    </div>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.right_item {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}
</style>
