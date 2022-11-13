<script lang="ts" name="Card" setup>
withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: '标题'
  }
)
</script>

<template>
  <slot name="header">
    <p class="title">{{ title }}</p>
  </slot>
  <slot name="body">
    <div class="chart_box">
      <slot name="chart" />
    </div>
  </slot>
</template>

<style lang="scss" scoped>
.title {
  margin: 0;
  padding: var(--el-menu-level-padding);
  border-bottom: var(--el-border);
}
.chart_box {
  padding: var(--el-menu-level-padding);
}
</style>
