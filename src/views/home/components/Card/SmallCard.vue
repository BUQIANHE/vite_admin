<script lang="ts" name="SmallCard" setup>
interface CardProps {
  name?: string
  isTotal?: boolean
  total?: number | string
  isDesc?: boolean
  desc?: string
  isDescNum?: boolean
  descNum?: number | string
  isFooter?: boolean
  bodyHeight?: number | string
  bodyClassName?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  name: '标题',
  isTotal: true,
  total: 0,
  isDesc: true,
  desc: '描述信息',
  isDescNum: true,
  descNum: 0,
  isFooter: true,
  bodyHeight: 80,
  bodyClassName: 'jcc'
})
</script>

<template>
  <div class="header">
    <slot name="header">
      <p class="name">{{ name }}</p>
      <h3 v-if="props.isTotal" class="total">{{ total }}</h3>
    </slot>
  </div>
  <div class="body flex aic" :class="bodyClassName" :style="`height: ${bodyHeight}px`">
    <slot name="body" />
  </div>
  <div v-if="props.isFooter" class="footer">
    <slot name="footer">
      <p v-if="props.isDesc" class="desc">
        {{ desc }} <span v-if="props.isDescNum">{{ descNum }}</span>
      </p>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.header {
  .name {
    margin-top: 0;
    margin-bottom: var(--el-font-size-extra-small);
  }

  .total {
    font-size: 26px;
    margin: 0;
    color: transparent;
    display: inline-block;
  }
}

.body {
  flex: 1;
  padding: var(--el-font-size-small) 0 6px;
}

.footer {
  border-top: var(--el-border);
  padding-top: var(--el-font-size-extra-small);

  .desc,
  .info {
    margin: 0;
  }

  span {
    color: var(--el-color-success);
  }

  .num {
    margin: 0 10px;
  }
}
</style>
