<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@import '@/styles/theme/handle';

.el-popper__arrow {
  display: none;
}
body {
  //@include background_color('nav-bg-color');
  background-color: var(--el-bg-color-page);
}
</style>
