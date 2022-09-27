<script lang="ts" name="SvgIcon" setup>
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'inherit'
  },
  size: {
    type: [String, Number],
    default: '1em'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" rel="external nofollow" :fill="props.color" />
  </svg>
</template>

<style lang="less" scoped></style>
