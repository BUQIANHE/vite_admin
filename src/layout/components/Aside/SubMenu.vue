<script lang="ts" name="SubMenu" setup>
const props = withDefaults(
  defineProps<{
    menuList: API.MenuListItem[]
    activeClr: string
  }>(),
  {
    menuList: () => [],
    activeClr: '#409EFF'
  }
)
</script>

<template>
  <template v-if="props.menuList?.length">
    <template v-for="menu in props.menuList" :key="menu.path">
      <template v-if="menu?.children">
        <el-sub-menu v-if="menu?.children?.length > 1" :index="menu.path">
          <template #title>
            <template v-if="menu.meta.icon">
              <el-icon>
                <component :is="menu.meta.icon" />
              </el-icon>
            </template>
            <span>{{ menu.meta.title }}</span>
          </template>
          <SubMenu :menu-list="menu.children!" :active-clr="props.activeClr" />
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
          <template v-if="menu.meta.icon">
            <el-icon>
              <component :is="menu.meta.icon" />
            </el-icon>
          </template>
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <el-menu-item :index="menu.path">
          <template v-if="menu.meta.icon">
            <el-icon>
              <component :is="menu.meta.icon" />
            </el-icon>
          </template>
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item {
  position: relative;
  &.is-active {
    background-color: #060708 !important;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      background: v-bind(activeClr);
      content: '';
    }
  }
}
</style>
