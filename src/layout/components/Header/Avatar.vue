<script lang="ts" name="Avatar" setup>
import { useAppStore } from '@/pinia'
import router from '@/router'
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const appStore = useAppStore()

const handleMessageBox = () => {
  ElMessageBox.confirm('是否退出登录？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true
  })
    .then(async () => {
      await appStore.logout()
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleUserSetting = () => {
  router.push({ path: '/personal_settings' })
}
</script>

<template>
  <el-dropdown class="avatar_item">
    <el-avatar :icon="UserFilled" :size="30" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleUserSetting">个人设置</el-dropdown-item>
        <el-dropdown-item @click="handleMessageBox">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.avatar_item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}
</style>
