<script lang="ts" name="Menu" setup>
import { useAppStore } from '@/pinia'

const appStore = useAppStore()
const route = useRoute()

const { themeColor, menuCollapse } = toRefs(appStore.golbalSettings)
const list = appStore.menuList.filter((item) => item?.alwaysShow) as API.MenuListItem[]

const activeMenu = ref<string>('/home')

/**
 * 1. 判断当前路由是否在左侧菜单里面
 * 2. 判断有没有重定向
 */
activeMenu.value = JSON.stringify(list).includes(route.path)
  ? route.path !== '/index'
    ? route.path
    : '/home'
  : ''
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
