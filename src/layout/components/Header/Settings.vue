<script lang="ts" name="Settings" setup>
import { useAppStore } from '@/pinia'
import { depthColor, lightColor } from '@/utils/setColor'

const appStore = useAppStore()
const golbalConfig = computed(() => appStore.golbalSettings)
const settingsDrawer = ref<boolean>(false)

const handleSettings = () => {
  settingsDrawer.value = !settingsDrawer.value
}

// css的自定义变量
let cssVarArr = ['--el-color-primary']

// 选择主题色
const handleThememColor = (val: string) => {
  if (val) golbalConfig.value.themeColor = val

  cssVarArr.map((item) =>
    document.documentElement.style.setProperty(item, golbalConfig.value.themeColor)
  )

  const theme = localStorage.getItem('vueuse-color-scheme')
  // 颜色变浅
  for (let i = 1; i <= 9; i++) {
    let clr: any = ''
    switch (theme) {
      case 'light':
        clr = lightColor(golbalConfig.value.themeColor, i / 10)
        break
      case 'dark':
      default:
        clr = depthColor(golbalConfig.value.themeColor, i / 10)
        break
    }
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${clr}`)
  }
}

// 切换灰色和弱色模式
const handleColorModel = (val: boolean, type: string) => {
  const body = document.body as HTMLElement

  if (!val) return body.setAttribute('style', '')

  switch (type) {
    case 'gray':
      body.setAttribute('style', 'filter: grayscale(1)')
      appStore.golbalSettings.isGray = val
      break
    case 'weak':
      body.setAttribute('style', 'filter: invert(80%)')
      appStore.golbalSettings.isWeak = val
      break
  }
}

onBeforeMount(() => {
  handleThememColor(golbalConfig.value.themeColor)
  if (golbalConfig.value.isGray) handleColorModel(golbalConfig.value.isGray, 'gray')
  if (golbalConfig.value.isWeak) handleColorModel(golbalConfig.value.isGray, 'weak')
})
</script>

<template>
  <el-tooltip class="box-item right_item" effect="dark" content="页面配置" placement="bottom">
    <div class="right_item">
      <el-icon :size="18" @click="handleSettings"><Setting /></el-icon>
    </div>
  </el-tooltip>
  <el-drawer v-model="settingsDrawer" direction="rtl" title="页面配置" size="360px">
    <el-divider class="divider_line">
      <el-icon :size="18"><Brush /></el-icon>
      <span class="title"> 主题配置</span>
    </el-divider>
    <div class="item flex jsb aic">
      <span class="text">主题颜色</span>
      <el-color-picker v-model="golbalConfig.themeColor" @change="handleThememColor" />
    </div>
    <div class="item flex jsb aic">
      <span class="text">灰色模式</span>
      <el-switch v-model="golbalConfig.isGray" @change="handleColorModel($event, 'gray')" />
    </div>
    <div class="item flex jsb aic">
      <span class="text">色弱模式</span>
      <el-switch v-model="golbalConfig.isWeak" @change="handleColorModel($event, 'weak')" />
    </div>
    <el-divider class="divider_line">
      <el-icon :size="18"><Setting /></el-icon>
      <span class="title"> 界面配置</span>
    </el-divider>
    <div class="item flex jsb aic">
      <span class="text">折叠菜单</span>
      <el-switch v-model="golbalConfig.menuCollapse" />
    </div>
    <div class="item flex jsb aic">
      <span class="text">面包屑导航</span>
      <el-switch v-model="golbalConfig.breadcrumb" />
    </div>
    <div class="item flex jsb aic">
      <span class="text">标签栏</span>
      <el-switch v-model="golbalConfig.tabs" />
    </div>
    <div class="item flex jsb aic">
      <span class="text">页脚</span>
      <el-switch v-model="golbalConfig.footer" />
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.right_item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
}

.item {
  margin: 15px 0;
}

.divider_line {
  :deep(.el-divider__text) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    margin-left: 6px;
    font-size: var(--el-font-size-small);
  }
}
</style>
