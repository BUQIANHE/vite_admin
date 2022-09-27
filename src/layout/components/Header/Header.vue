<script lang="ts" name="Header" setup></script>

<template>
  <div class="head_bar flex jsb">
    <Collapse />
    <div class="head_right flex jsb">
      <Notice />
      <FullScreen />
      <Theme />
      <Settings />
      <Avatar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.head_bar {
  height: 100%;
}
</style>
