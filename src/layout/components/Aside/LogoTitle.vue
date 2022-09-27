<script lang="ts" name="LogoTitle" setup>
const props = withDefaults(
  defineProps<{
    isCollapse: boolean
  }>(),
  {
    isCollapse: false
  }
)
</script>

<template>
  <div class="aside_head flex jcc">
    <img class="logo" src="@/assets/images/vite.svg" alt="logo" />
    <h2 v-show="!props.isCollapse" class="title">后台管理系统</h2>
  </div>
</template>

<style lang="scss" scoped>
.aside_head {
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;

  img {
    width: 30px;
    object-fit: contain;
  }

  .title {
    font-size: 18px;
    color: #fff;
    margin-left: 10px;
    white-space: nowrap;
  }
}
</style>
