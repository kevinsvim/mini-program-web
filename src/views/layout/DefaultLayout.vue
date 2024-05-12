<template>
  <div>
    <el-header>
      <VaultNavigationBar></VaultNavigationBar>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <VaultFooter></VaultFooter>
    </el-footer>

  </div>
</template>
<script setup lang="ts">

import VaultNavigationBar from "@/views/layout/nav/TopBar.vue";
import VaultFooter from "@/views/layout/footer/VaultFooter.vue";
</script>

<style scoped lang="scss">
  * {
    padding: 0;
  }
</style>
