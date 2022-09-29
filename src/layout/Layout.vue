<script lang="ts" name="Layout" setup>
import useAppStore from '@/pinia/appStore'

const appStore = useAppStore()
const { menuCollapse } = toRefs(appStore.golbalSettings)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="menuCollapse ? '65px' : '240px'">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <div class="main_card">
            <router-view v-slot="{ Component, route }">
              <transition appear name="fade-transform" mode="out-in">
                <!-- <keep-alive> -->
                <component :is="Component" :key="route.path" />
                <!-- </keep-alive> -->
              </transition>
            </router-view>
          </div>
        </el-main>
        <el-footer>
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

    .main_card {
      width: 100%;
      height: 100%;
      // overflow: auto;
      // background: #fff;

      // :deep(.el-scrollbar__view) {
      //   height: inherit;
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: flex-end;
      //   flex-direction: column;
      // }
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
</style>
