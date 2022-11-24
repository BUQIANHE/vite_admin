<script lang="ts" name="Menu" setup>
import { useAppStore } from '@/pinia'

const route = useRoute()
const appStore = useAppStore()

const { themeColor, menuCollapse } = toRefs(appStore.golbalSettings)
const list = appStore.menuList.filter((item) => item?.alwaysShow) as API.MenuListItem[]

const activeMenu = computed((): string => {
  return route.path === '/index' ? '/home' : route.path
})
</script>

<template>
  <el-menu
    class="aside_menu"
    text-color="#fff"
    background-color="#191a20"
    unique-opened
    :router="true"
    :active-text-color="themeColor"
    :collapse="menuCollapse"
    :collapse-transition="false"
    :default-active="activeMenu"
  >
    <SubMenu :menu-list="list" :active-clr="themeColor" />
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  width: inherit;
  overflow: auto;
  overflow-x: hidden;
  border-right: none;
}
</style>
