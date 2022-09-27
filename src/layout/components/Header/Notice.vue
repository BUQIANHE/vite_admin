<script lang="ts" name="Notice" setup>
const isNotice = ref<boolean>(true)
const noticeDrawer = ref<boolean>(false)

const handleNotice = () => {
  noticeDrawer.value = !noticeDrawer.value
}
</script>

<template>
  <el-tooltip class="box-item" effect="dark" content="消息通知" placement="bottom">
    <div class="right_item">
      <el-badge :is-dot="isNotice" @click="handleNotice">
        <el-icon :size="18"><Bell /></el-icon>
      </el-badge>
    </div>
  </el-tooltip>
  <el-drawer v-model="noticeDrawer" direction="rtl" title="消息通知" size="360px">
    <span>消息通知</span>
    <template #footer>
      <div class="footer_box">
        <el-button>关闭</el-button>
        <el-button type="primary">清空</el-button>
      </div>
    </template>
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
