<script lang="ts" name="Settings" setup>
const settingsDrawer = ref<boolean>(false)

const handleSettings = () => {
  settingsDrawer.value = !settingsDrawer.value
}
</script>

<template>
  <el-tooltip class="box-item right_item" effect="dark" content="页面配置" placement="bottom">
    <div class="right_item">
      <el-icon :size="18" @click="handleSettings"><Setting /></el-icon>
    </div>
  </el-tooltip>
  <el-drawer v-model="settingsDrawer" direction="rtl" title="页面配置" size="360px">
    <span>配置内容</span>
  </el-drawer>
</template>

<style lang="scss" scoped>
.right_item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
}
</style>
