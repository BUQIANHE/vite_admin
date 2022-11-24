<script lang="ts" name="Tabs" setup>
import { NO_TABS_PATH } from '@/config/config'
import { usePublicStore } from '@/pinia'
import { TabsPaneContext } from 'element-plus'

const router = useRouter()
const route = useRoute()

const publicStore = usePublicStore()
const tabs = computed(() => publicStore.tabs)

interface TabItem {
  title: string
  path: string
  close: boolean
  icon?: string
}

const addTabs = (params: any) => {
  if (NO_TABS_PATH.includes(params.path)) return

  const obj: TabItem = {
    title: params.meta.title as string,
    path: params.path,
    close: true
  }

  if (tabs.value.every((item: TabItem) => item.path !== params.path)) {
    publicStore.tabs.push(obj)
  }
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    addTabs(route)
  },
  { immediate: true }
)

const activeTab = ref<string>('/index')
watchEffect(() => {
  activeTab.value = route.path
})

// 点击tabs跳转
const handleTab = (tabItem: TabsPaneContext) => {
  const path = tabItem.props.name as string
  router.push(path)
}

// 移除tabs
const removeTab = (targetTab: string) => {
  let active = activeTab.value
  if (active === targetTab) {
    publicStore.tabs.forEach((tab: TabItem, index: number) => {
      if (tab.path === targetTab) {
        const nextTab = publicStore.tabs[index + 1] || tabs.value[index - 1]
        if (nextTab) {
          active = nextTab.path
          router.push(nextTab.path)
        }
      }
    })
  }
  activeTab.value = active
  publicStore.tabs = publicStore.tabs.filter((tab: TabItem) => tab.path !== targetTab)
}
</script>

<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    class="tabs_card"
    @tab-click="handleTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.path"
      :path="item.path"
      :label="item.title"
      :name="item.path"
      :closable="item.close"
    >
      <template v-if="item.icon" #label>
        <el-icon class="custom_icon" :size="18">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.tabs_card {
  .tabs_item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .custom_icon {
    margin-right: 6px;
  }

  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__nav) {
    border-left: none;
    border-top: none;
    border-radius: 0;
    display: inline-flex;
  }

  :deep(.el-tabs__nav-next) {
    line-height: var(--el-component-size-large);
    height: var(--el-component-size-large);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--el-menu-level-padding);
    border-left: var(--el-border);
  }

  :deep(.el-tabs__nav-prev) {
    line-height: var(--el-component-size-large);
    border-right: var(--el-border);
    height: var(--el-component-size-large);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--el-menu-level-padding);
  }

  :deep(.el-tabs__item) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  :deep(.is-icon-close) {
    top: 1px;
  }
}
</style>
