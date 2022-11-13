<script lang="ts" name="List" setup>
const props = withDefaults(
  defineProps<{
    list: any
    height: number | string
  }>(),
  {
    list: []
  }
)

const Height = computed((): string => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  } else {
    return props.height
  }
})
</script>

<template>
  <el-scrollbar class="list" :height="Height">
    <template v-for="(item, index) in list" :key="index">
      <ListItem v-bind="item" />
    </template>
  </el-scrollbar>
</template>
