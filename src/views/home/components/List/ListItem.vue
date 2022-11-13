<script lang="ts" name="ListItem" setup>
interface ItemProps {
  size?: number | string
  leftIcon?: string
  leftPic?: string
  name?: string
  desc?: string
  rightIcon?: string
}

const props = withDefaults(defineProps<ItemProps>(), {
  size: 40,
  leftIocn: '',
  leftPic: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  name: '标题',
  desc: '描述信息',
  rightIcon: 'ArrowRightBold'
})
</script>

<template>
  <div class="list_item flex jsb aic">
    <slot name="left">
      <template v-if="props?.leftIcon">
        <el-avatar :size="size" :icon="leftIcon" />
      </template>
      <template v-else>
        <el-avatar :size="size" :src="leftPic" />
      </template>
    </slot>
    <slot name="center">
      <div class="item">
        <p class="name">{{ name }}</p>
        <span class="desc">{{ desc }}</span>
      </div>
    </slot>
    <slot name="right">
      <el-icon><component :is="rightIcon" /></el-icon>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.jsb {
  justify-content: space-between;
}
.aic {
  align-items: center;
}

.jcc {
  justify-content: center;
}

.list_item {
  padding: var(--el-menu-level-padding);
  background: var(--el-disabled-bg-color);
  border-radius: var(--el-border-radius-base);
  transition: var(--el-transition-all);
  margin: var(--el-menu-level-padding);

  &:hover {
    box-shadow: var(--el-box-shadow);
  }
  .item {
    margin-left: var(--el-menu-level-padding);
    margin-right: auto;
    .name {
      margin: 0 0 var(--el-font-size-base);
      font-size: var(--el-font-size-medium);
      color: var(--el-color-primary);
    }
  }
}
</style>
