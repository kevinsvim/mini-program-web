<template>
  <div>
    <el-switch v-model="isDark" @click="toggleTheme" id="btn" style="--el-switch-on-color: #2c2c2c;">
      <template #active-action>
        <span >
          <svg-icon icon-name="icon-moon"></svg-icon>
        </span>
      </template>
      <template #inactive-action>
        <span>
          <svg-icon icon-name="icon-sun"></svg-icon>
        </span>
      </template>
    </el-switch>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'
import { useThemeStore } from "@/stores/themeStore";
import { ref } from 'vue'

const themeStore = useThemeStore()
const isDark = ref(false)

// 初始化主题
themeStore.initializeTheme()

const toggleTheme = (ev: PointerEvent) => {
  // 获取圆心位置
  document.documentElement.style.setProperty('--x', ev.clientX + 'px')
  document.documentElement.style.setProperty('--y', ev.clientY + 'px')
  // 处理兼容性
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      themeStore.toggleTheme(isDark.value ? 'dark' : 'light')
    })
  } else {
    themeStore.toggleTheme(isDark.value ? 'dark' : 'light')
  }
}
</script>
<style lang="scss">
@import "@/styles/theme/handle";
#btn{
  padding: 5px 16px;
  background-color: transparent;
  border-radius: 8px;
  line-height: 1.4;
  cursor: pointer;
  transition: .3s;
  transform: scale(1);
  border-color: transparent;
  color: #fff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
}
::view-transition-old(*) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(*) {
  mix-blend-mode: normal;
  animation: clip 0.4s ease-in;
}
@keyframes clip {
  from {
    clip-path: circle(0% at var(--x) var(--y));
  }
  to{
    clip-path: circle(100% at var(--x) var(--y));
  }
}
.el-switch__core .el-switch__action {
  @include background_color('switch-btn-color')
}
</style>
