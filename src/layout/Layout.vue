<script lang="ts" name="Layout" setup>
import useAppStore from '@/pinia/appStore'

const appStore = useAppStore()
const golbalConfig = computed(() => appStore.golbalSettings)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="golbalConfig.menuCollapse ? '65px' : '240px'">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <Tabs v-if="golbalConfig.tabs" />
        <el-main>
          <div class="main_card">
            <router-view v-slot="{ Component, route }">
              <Transition appear name="fade-transform" mode="out-in">
                <!-- <keep-alive> -->
                <component :is="Component" :key="route.path" />
                <!-- </keep-alive> -->
              </Transition>
            </router-view>
          </div>
        </el-main>
        <el-footer v-if="golbalConfig.footer">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;

  :deep(.el-aside) {
    border-right: var(--el-border);
  }

  :deep(.el-header) {
    border-bottom: var(--el-border);
  }

  :deep(.el-footer) {
    border-top: var(--el-border);
  }

  .el-container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .el-aside {
    background: #191a20;
    transition: all 0.3s ease;
  }

  .el-main {
    background: var(--el-bg-color-page);
    overflow: hidden;

    .main_card {
      width: 100%;
      height: 100%;
    }
  }

  .el-footer {
    height: auto;
  }

  .el-aside,
  .is-vertical {
    align-self: normal;
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}
.fade-transform-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}
</style>
