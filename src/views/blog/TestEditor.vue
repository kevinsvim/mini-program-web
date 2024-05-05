<template>
  <div style="padding: 20px 10px">
    <div style="margin-bottom: 20px">
      由于当前未进行 ai 配置，因此 ai 功能暂时不可用。ai 功能体验地址：<a href="http://aieditor.jpress.cn" target="_blank">http://aieditor.jpress.cn</a>
    </div>
    <div ref="divRef" class="aiEditor" style="height: 850px"/>
  </div>

</template>

<script setup lang="ts">
import {AiEditor} from "aieditor";
import "aieditor/dist/style.css"
import {onMounted, ref} from "vue";
const divRef = ref()
onMounted(() => {
  new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
  })
})
</script>

<style lang="scss">
.aiEditor {
  *{
    box-sizing: content-box;
  }
  .aie-dropdown-item{
    h1,h2,h3,h4,h5,h6{
      padding: 0;
      margin: 0;
      border: none;
    }
  }

}
</style>