<script lang="ts" name="Breadcrumb" setup>
const route = useRoute()
const title = computed(() => route.meta.title)
const isHome = computed(() => title.value === '首页')
</script>

<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="!isHome">{{ title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 auto 0 20px;
}
</style>
