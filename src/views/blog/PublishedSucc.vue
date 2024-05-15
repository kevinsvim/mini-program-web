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
        <el-button style="margin-left: 20px" type="primary" @click="isDark = !isDark"
          >切换主题</el-button
        >
      </div>
    </div>
    <div class="container" :class="{ 'bg-dark': isDark, 'bg-light': !isDark }">
      <a class="success-modal-title"
        ><img src="https://mp-blog.csdn.net/mp_blog/img/back.ae64b651.png" alt="back" /><span
          style="margin-left: 8px; color: var(--va-text-color-1)"
          >管理博文</span
        ></a
      >
      <div class="success">
        <div>
          <img src="@/assets/iconfont/picture/success.png" alt="">
        </div>
        <div class="success-tip">
          发布成功！正在审核中
        </div>
        <div class="img-box">
          <a href="">
            <img src="@/assets/extra/flow.png" alt="立即查看流量券" class="new">
            <span class="text">感谢您的分享，技术宅让世界更美好！</span>
          </a>
        </div>
        <div class="success-btn">
          <el-button text bg style="background-color: var(--va-btn-bg-color)" round>回到首页</el-button>
          <el-button text bg style="background-color: var(--va-btn-bg-color)" round>查看文章</el-button>
          <el-button text bg style="background-color: var(--va-btn-bg-color)" round>重新编辑</el-button>
          <el-button text bg style="background-color: var(--va-btn-bg-color)" round>再写一篇</el-button>
        </div>
      </div>
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
  width: 100%;
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
  background-size: cover;
  padding: 12px 24px 24px;
  -webkit-font-smoothing: antialiased;
}

.bg-dark {
  background: #000 url(@/assets/bg/published-dark.jpg);
}

.bg-light {
  background: #fff url(@/assets/bg/published-light.png);
}

.success-modal-title {
  height: 24px;
  font-size: 14px;
  font-family:
    PingFang SC,
    sans-serif;
  font-weight: 400;
  color: #555666;
  line-height: 24px;
  cursor: pointer;

  img {
    width: 6px;
    height: 10px;
  }
}

.success {
  margin: 0 auto;
  text-align: center;

  img {
    width: 120px;
  }

  &-tip {
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 10px;
    color: var(--va-text-color-1);
    line-height: 28px;
  }
}

.img-box {
  display: inline-block;
  width: 336px;
  height: 130px;
  background: rgba(232, 232, 237, .4);
  border-radius: 12px;
  padding: 12px 13px 14px;

  .new {
    display: block;
    width: 310px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  .text {
    font-size: 14px;
    font-weight: 400;
    color: var(--va-text-color-4);
  }
}

.success-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-bg {
  background-color: var(--va-btn-bg-color);
}
</style>
