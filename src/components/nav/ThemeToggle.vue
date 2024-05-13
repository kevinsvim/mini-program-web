<template>
  <div>
    <el-button color="#626aef" :dark="isDark" @click="updateView" round>
      <template #icon>
        <span v-if="isDark">
          <svg-icon icon-name="icon-moon"></svg-icon>
        </span>
        <span v-else>
          <svg-icon icon-name="icon-sun"></svg-icon>
        </span>
      </template>
      {{ isDark ? 'Dark' : 'Light' }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { isDark } from "@/styles/theme/dark";
const toggleDark = useToggle(isDark)

function updateView(event: MouseEvent) {
  // 在不支持的浏览器里不做动画
  if (!document.startViewTransition) {
    toggleDark()
    return
  }
  // 开始一次视图过渡
  const transition = document.startViewTransition(() => toggleDark())
  transition.ready.then(() => {
    const x = event.clientX
    const y = event.clientY
    //计算按钮到最远点的距离用作裁剪圆形的半径
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    // 开始动画
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
</script>
<style lang="scss">
@import '@/styles/theme/handle';

@keyframes clip {
  0% {
    clip-path: circle(0 at 200px 50px);
  }
  100% {
    clip-path: circle(200% at 200px 50px);
  }
}

.el-switch__core .el-switch__action {
  @include background_color('switch-btn-color');
}

/* Alternative custom animation style */
::view-transition-old(root),
::view-transition-new(root) {
  height: auto;
  width: 100vw;
  animation: none;
  mix-blend-mode: normal;
}

html.dark::view-transition-old(root) {
  z-index: 2147483646;
}

html.dark::view-transition-new(root) {
  z-index: 1;
}

html::view-transition-old(root) {
  z-index: 1;
}

html::view-transition-new(root) {
  z-index: 2147483646;
}
</style>
