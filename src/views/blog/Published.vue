<template>
  <div>
    <!-- 顶部信息 -->
    <div class="page-header">
      <div class="header-left">
        <h1>
          <LogoTitle :title="'Vault'" />
        </h1>
        <el-divider direction="vertical" style="height: 25px" />
        <span class="header-write">写文章</span>
      </div>
      <div class="header-right">
        <el-avatar
          style="cursor: pointer"
          shape="square"
          :size="35"
          :src="'https://pic1.zhimg.com/v2-bd64c3ac8d203f791398c497f0752ee5_r.jpg?source=1940ef5c'"
        />
        <el-button style="margin-left: 20px" type="primary" @click="isDark = !isDark">切换主题</el-button>
      </div>
    </div>
    <div class="container">
      <a class="success-modal-title"><img
          src="https://mp-blog.csdn.net/mp_blog/img/back.ae64b651.png" alt="back"/><span
          style="margin-left: 8px">管理博文</span></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoTitle from '@/components/nav/LogoTitle.vue'
import { isDark } from '@/styles/theme/dark'
</script>
<style scoped lang="scss">
.page-header {
  position: fixed;
  display: flex;
  height: 50px;
  line-height: 50px;
  padding: 0 23%;
  top: 0;
  z-index: 98;
  color: var(--va-text-color-1);
  background-color: var(--va-bg-color-2);

  .header-left {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > h1 {
      padding-right: 10px;
    }

    > .header-write {
      padding-left: 10px;
      font-size: 17px;
      font-weight: 500;
      font-family: HarmonyOS_Sans_SC_Regular, sans-serif;
    }
  }

  .header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 816px;
  min-height: 500px;
  -webkit-box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  border: 1px solid #f0f0f5;
  background: #fff url(https://mp-blog.csdn.net/mp_blog/img/success-bg.4fb05392.png);
  background-size: cover;
  padding: 12px 24px 24px;
  -webkit-font-smoothing: antialiased;
}

.success-modal-title {
  height: 24px;
  font-size: 14px;
  font-family: PingFang SC, sans-serif;
  font-weight: 400;
  color: #555666;
  line-height: 24px;
  cursor: pointer;

  img{
    width: 6px;
    height: 10px;
  }
}


</style>
