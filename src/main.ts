import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'
import './common.css'

import pinia from './pinia'
import router from '@/router'

import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/SvgIcon.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

const ElIcons: string[] = []
app.use(pinia).use(router).use(ElementPlus, { locale: zhCn }).component('svgIcon', svgIcon)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
  ElIcons.push(key)
}

app.mount('#app')
