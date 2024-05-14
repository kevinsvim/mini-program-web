<template>
  <div style="padding: 0; margin: 0">
    <!-- 顶部信息 -->
    <div
      class="page-header"
      :style="{ color: colorSetting.titleColor, background: colorSetting.titleBgColor }"
    >
      <div class="header-left">
        <h1>
          <LogoTitle :title="'Vault'" />
        </h1>
        <el-divider direction="vertical" style="height: 25px" />
        <span class="header-write">写文章</span>
      </div>
      <div>
        <el-button type="primary" @click="changeTheme">切换主题</el-button>
      </div>
      <div class="header-right">
        <el-avatar
          style="cursor: pointer"
          shape="square"
          :size="35"
          :src="'https://pic1.zhimg.com/v2-bd64c3ac8d203f791398c497f0752ee5_r.jpg?source=1940ef5c'"
        />
      </div>
    </div>
    <!-- 文章区域 -->
    <div id="aiEditor" ref="divRef" style="padding: 0; margin: 0" :class="colorSetting.themeClass">
      <div class="aie-container">
        <!-- 头部功能区 -->
        <div class="aie-header-panel">
          <div class="aie-container-header"></div>
        </div>
        <!-- 中间内容区 -->
        <div class="aie-main">
          <!-- 文档目录 -->
          <div class="aie-directory-content" id="directory">
            <div class="aie-directory" :style="{ color: colorSetting.outlineColor }">
              <h5>文档目录</h5>
              <div id="outline"></div>
            </div>
          </div>
          <!-- 文章内容 -->
          <div class="aie-container-panel aie-content">
            <div class="title">
              <input v-model="article.title" placeholder="请输入标题（最多100字）" />
            </div>
            <el-divider
              border-style="dashed"
              style="border-top: 1px solid var(--aie-container-border)"
            />
            <div class="aie-container-main"></div>
            <el-divider
              border-style="dashed"
              style="border-top: 1px solid var(--aie-container-border)"
            />

            <div class="aie-container-footer">
              <div class="setting">
                <!-- 文章标签 -->
                <div class="setting-item">
                  <label class="setting-item-title"
                    >文章标签
                    <span class="ml_4">
                      <svg-icon icon-name="icon-tip"></svg-icon>
                    </span>
                  </label>
                  <div class="flex gap-2">
                    <el-tag
                      v-for="item in hasSelectedTag"
                      :key="item.id"
                      closable
                      :disable-transitions="false"
                      size="default"
                      style="margin-right: 5px"
                      @close="() => handleTagClose(item)"
                    >
                      {{ item.tag }}
                    </el-tag>
                    <el-button class="button-new-tag" size="small" @click.stop="showInput">
                      + 添加文章标签
                    </el-button>
                  </div>
                  <div style="position: absolute; top: 45px; left: 123px; z-index: 99">
                    <transition name="el-zoom-in-top">
                      <AddTagBox
                        v-show="isShowTagBox"
                        v-click-outside="handleClickOutside"
                        :tag-list="tagList"
                        @add-tag="addTag"
                        :selected-tags="hasSelectedTag"
                      ></AddTagBox>
                    </transition>
                  </div>
                </div>
                <!-- 创作声明 -->
                <div class="setting-item">
                  <label class="setting-item-title"
                    >创作声明
                    <span class="ml_4">
                      <svg-icon icon-name="icon-tip"></svg-icon>
                    </span>
                  </label>
                  <el-select
                    v-model="article.statement"
                    clearable
                    placeholder="Select"
                    style="width: 240px;"
                    class="custom-select"
                  >
                    <el-option
                      v-for="item in articleSetting.statements"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <!-- 分类专栏 -->
                <div class="setting-item">
                  <label class="setting-item-title"
                    >内容摘要
                    <span class="ml_4">
                      <svg-icon icon-name="icon-tip"></svg-icon>
                    </span>
                  </label>
                  <el-input
                    v-model="article.abstract"
                    maxlength="200"
                    class="abstract-input"
                    placeholder="摘要：会在推荐、列表等场景外露，帮助读者快速了解内容，支持一键将正文前 200 字符键入摘要文本框"
                    show-word-limit
                    input-style="background-color: var(--aie-container-bg); color: var(--aie-text-color);"
                    rows="3"
                    type="textarea"
                  />
                  <el-button size="small" round class="extract-btn">
                    <span style="font-size: 11px">快速提取</span>
                  </el-button>
                </div>
                <!-- 文章类型 -->
                <div class="setting-item">
                  <label class="setting-item-title"
                    >文章类型
                    <span class="ml_4">
                      <svg-icon icon-name="icon-tip"></svg-icon>
                    </span>
                  </label>
                  <el-radio-group v-model="article.type">
                    <el-radio :value="1" class="theme-text">原创</el-radio>
                    <el-radio :value="2" class="theme-text">转载</el-radio>
                    <el-radio :value="3" class="theme-text">翻译</el-radio>
                  </el-radio-group>
                </div>
                <!-- 原文链接 -->
                <div class="source-link" v-if="article.type !== 1">
                  <input type="text" v-model="article.copyFrom" placeholder="请输入原文链接" style="background-color: var(--aie-container-bg); color: var(--aie-text-color);"/>
                  <el-checkbox
                    v-if="article.type == 2"
                    v-model="article.isAuthorized"
                    :label="articleSetting.reprinted"
                    size="large"
                  />
                  <el-checkbox
                    v-if="article.type == 3"
                    v-model="article.isAuthorized"
                    :label="articleSetting.translation"
                    size="large"
                  />
                </div>
                <!-- 可见范围 -->
                <div class="setting-item">
                  <label class="setting-item-title"
                    >可见范围
                    <span class="ml_4">
                      <svg-icon icon-name="icon-tip" icon-style="icon-tip"></svg-icon>
                    </span>
                  </label>
                  <el-radio-group v-model="article.visibleRange">
                    <el-radio :value="1" class="theme-text">全部可见</el-radio>
                    <el-radio :value="2" class="theme-text">粉丝可见</el-radio>
                    <el-radio :value="3" class="theme-text">仅我可见</el-radio>
                  </el-radio-group>
                </div>
                <!-- 添加封面 -->
                <div class="setting-item" style="margin-bottom: 15px">
                  <label class="setting-item-title">添加封面</label>
                  <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false"
                  >
                    <img v-if="article.cover" :src="article.cover" class="avatar" alt="" />
                    <svg-icon v-else icon-name="icon-add" size="14"></svg-icon>
                    <span style="margin-left: 5px">添加文章封面</span>
                    <template #tip>
                      <div class="el-upload__tip">图片支持jpg/png，大小少于500KB.</div>
                    </template>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部发布栏 -->
    <div class="publish-footer" :style="{ backgroundColor: colorSetting.bottomBgColor, borderTop: colorSetting.bottomBrColor }">
      <el-button plain>预览</el-button>
      <el-button type="primary" @click="handlePublish" :disabled="disabled.publishBtnDisabled"
        >发布</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'
import { onMounted, ref, onUnmounted, onBeforeUnmount, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import SvgIcon from '@/components/icon/SvgIcon.vue'
import LogoTitle from '@/components/nav/LogoTitle.vue'
import type { BlogTypes } from '@/types/blog'
import articleApi from '@/api/article'
import AddTagBox from '@/components/box/AddTagBox.vue'
import { isDark } from "@/styles/theme/dark";

import { ElLoading } from 'element-plus'
const route = useRoute()
const divRef = ref()
const hasUnsavedContent = ref(false)
let aiEditor: AiEditor | null = null
const article = reactive<BlogTypes.ArticleType>({
  title: '',
  content: '',
  cover: '',
  // 创作声明
  statement: 0,
  // 文章类型
  type: 1,
  // 原文链接
  copyFrom: '',
  abstract: '',
  // 是否授权文章（转载或翻译）
  isAuthorized: false,
  // 可见范围(1-全部可见，2-粉丝可见，3-仅我可见)
  visibleRange: 1,
  // 文章标签
  tagIds: []
})
const hasSelectedTag = reactive<BlogTypes.RestaurantItem[]>([])
const articleSetting = {
  reprinted: '原文允许进行转载，或者已经获得原作者的转载授权。',
  translation: '原文允许进行翻译，或者已经获得原作者的翻译授权。',
  statements: [
    {
      value: 0,
      label: '无声明'
    },
    {
      value: 1,
      label: 'Option2'
    },
    {
      value: 2,
      label: 'Option3'
    }
  ]
}
const disabled = reactive({
  publishBtnDisabled: true
})
onMounted(() => {
  window.addEventListener('beforeunload', beforeLeave)
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: '',
    theme: 'light',
    onChange: (editor) => {
      updateOutLine(editor)
      hasUnsavedContent.value = editor.getText() !== ''
    },
    onCreated: (editor) => {
      updateOutLine(editor)
    }
  })
  dark()
})
onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
/**
 * 更新目录
 */
const updateOutLine = (editor: AiEditor) => {
  const outlineContainer = document.querySelector('#outline')
  while (outlineContainer?.firstChild) {
    outlineContainer.removeChild(outlineContainer.firstChild)
  }

  const outlines = editor.getOutline()
  for (let outline of outlines) {
    const child = document.createElement('div')
    child.classList.add(`aie-title${outline.level}`)
    child.style.marginLeft = `${14 * (outline.level - 1)}px`
    child.innerHTML = `<a href="#${outline.id}">${outline.text}</a>`
    child.addEventListener('click', (e) => {
      e.preventDefault()
      const el = editor.innerEditor.view.dom.querySelector(`#${outline.id}`) as HTMLElement
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      setTimeout(() => {
        editor.focusPos(outline.pos + outline.size - 1)
      }, 1000)
    })
    outlineContainer?.appendChild(child)
  }
}
/**
 * 配置主题
 */
const colorSetting = reactive({
  titleColor: '',
  titleBgColor: '#fff',
  outlineColor: '',
  themeClass: 'aie-theme-light',
  bottomBgColor: '#fff',
  bottomBrColor: '1px solid #eee'
})
const dark = () => {
  if (isDark.value) {
    colorSetting.titleColor = '#eee'
    colorSetting.titleBgColor = '#1a1b1e'
    colorSetting.outlineColor = '#eee'
    colorSetting.themeClass = 'aie-theme-dark'
    colorSetting.bottomBgColor = '#1a1b1e'
    colorSetting.bottomBrColor = '1px solid #3c3c3c'
  } else {
    colorSetting.titleColor = ''
    colorSetting.titleBgColor = '#fff'
    colorSetting.outlineColor = ''
    colorSetting.themeClass = 'aie-theme-light'
    colorSetting.bottomBgColor = '#fff'
    colorSetting.bottomBrColor = '1px solid #eee'
  }
}
const changeTheme = () => {
  isDark.value = !isDark.value
  dark()
}
/**
 * 监听内容失去焦点
 */
watch([() => hasUnsavedContent.value, () => article.title], () => {
  // 存在内容
  disabled.publishBtnDisabled = !(hasUnsavedContent.value && article.title !== '')
})
/**
 * 处理文章发布
 */
const handlePublish = () => {
  // 检测是否满足发布条件
  if (article.title !== '' && aiEditor?.getText() !== '') {
    // 开启loading
    const loading = ElLoading.service({
      lock: true,
      text: '发布中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    articleApi
      .saveArticle(article)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      }).finally(() => loading.close())
  } else {
    // 提示不存在发布条件
    alert('请保证你已经填写了标题和内容')
  }
}

const beforeLeave = async (e: any) => {
  // 检查路由是否是write,并且检查是否有未保存的内容
  if (route.path === '/write' && hasUnsavedContent.value) {
    // 提示用户是否保存
    e.preventDefault()
  }
}
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeLeave)
})

// -------------------------------------底部功能处理------------------------------------- //
/**
 * 点击添加文章标签
 */
// 是否显示box弹窗
const isShowTagBox = ref(false)
const tagList = reactive([
  {
    id: 1,
    tag: '推荐',
    children: [
      {
        id: 1,
        tag: 'Java'
      },
      {
        id: 2,
        tag: 'CountDownLatch'
      },
      {
        id: 3,
        tag: 'ThreadLocal'
      },
      {
        id: 4,
        tag: 'JVM'
      },
      {
        id: 5,
        tag: 'Java'
      }
    ]
  },
  {
    id: 2,
    tag: 'Python',
    children: [
      {
        id: 6,
        tag: 'Pytorch'
      },
      {
        id: 7,
        tag: 'test'
      }
    ]
  },
  {
    id: 3,
    tag: 'Java',
    children: [
      {
        id: 8,
        tag: 'ssss'
      }
    ]
  },
  {
    id: 4,
    tag: '编程语言',
    children: [
      {
        id: 9,
        tag: 'Golang'
      }
    ]
  },
  {
    id: 5,
    tag: '开发工具',
    children: [
      {
        id: 10,
        tag: 'IDEA'
      }
    ]
  },
  {
    id: 6,
    tag: '数据结构与算法',
    children: [
      {
        id: 11,
        tag: '二叉树'
      }
    ]
  },
  {
    id: 7,
    tag: '大数据',
    children: [
      {
        id: 12,
        tag: 'Hadoop'
      }
    ]
  },
  {
    id: 8,
    tag: '前端',
    children: [
      {
        id: 13,
        tag: 'Angular'
      }
    ]
  },
  {
    id: 9,
    tag: '后端',
    children: [
      {
        id: 14,
        tag: 'C++'
      }
    ]
  }
])

const loadAll = () => {
  tagList?.forEach((item) => {
    item.children.forEach((child) => {
      Object.assign(child, 'selected', false)
    })
  })
}
loadAll()
// 按钮是否被点击
const showInput = () => {
  // 1. 显示或关闭弹框
  isShowTagBox.value = !isShowTagBox.value
}
// 避免点击按钮弹框无法打开
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const el = document.getElementById('addTagBtn')
  if (!el?.contains(target)) {
    isShowTagBox.value = false
  }
}
const addTag = (tag: BlogTypes.RestaurantItem) => {
  if (!article.tagIds.includes(tag.id)) {
    article.tagIds.push(tag.id)
    hasSelectedTag.push(tag)
  }
}
/**
 * 关闭指定标签
 */
const handleTagClose = (item: BlogTypes.RestaurantItem) => {
  item.selected = false
  const index = article.tagIds.findIndex((id) => id === item.id)
  if (index != -1) {
    hasSelectedTag.splice(index, 1)
    article.tagIds.splice(index, 1)
  }
}
</script>
<style lang="scss">
.page-header {
  position: sticky;
  display: flex;
  height: 50px;
  line-height: 50px;
  padding: 0 23%;
  top: 0;
  z-index: 98;

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

#directory * {
  color: inherit;
}

.theme-text {
  color: var(--aie-text-color);
}

.title {
  width: 100%;
  height: 40px;
  max-width: 800px;
  border: none;
  background-color: var(--aie-menus-bg-color);

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 32px;
    color: var(--aie-menus-tip-bg-color);
    caret-color: var(--aie-text-color);
    background-color: var(--aie-bg-color);
    font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
    font-weight: 500;
  }
}

.aie-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: none;
  background: var(--aie-bg-color);
  margin-bottom: 50px;

  &-panel {
    width: calc(100% - 2rem - 2px);
    max-width: 800px;
    margin: 1rem auto;
    border: 1px solid var(--aie-container-border);
    height: 100%;
    min-height: 100vh;
    padding: 1rem;
  }

  &-main {
    position: relative;
    width: 100%;
    max-width: 800px;
    border: none;
    height: 100%;
    min-height: 100vh;
  }

  &-footer {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin-bottom: 15px;
    text-align: center;
    //line-height: 56px;
    font-size: 14px;
    color: #a0a0a0;
    z-index: 1;
  }
}

.setting-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 15px;

  .el-button--small {
    height: 15px;
  }

  .is-round {
    padding: 0 5px;
  }
}

.extract-btn {
  position: absolute;
  right: 195px;
  bottom: 4px;
}

.setting-item-title {
  min-width: 0;
  margin: 0 3px 0 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  line-height: 38px;
  font-size: 15px;
  font-weight: 500;
  width: 110px;
  padding-left: 10px;
  color: var(--aie-menus-tip-bg-color);
  font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
}

.icon-tip {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: var(--aie-menus-tip-bg-color);
  overflow: hidden;

  &:hover {
    fill: #00a1d6;
  }
}

.avatar-uploader {
  margin: 0;
  min-width: 0;
  flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  text-align: left;
}

.avatar-uploader .avatar {
  width: 152px;
  height: 102px;
  display: block;
}

.el-upload__tip {
  margin-top: 0;
}

.source-link {
  text-align: left;
  margin-left: 120px;

  input {
    display: block;
    width: 100%;
    height: 30px;
    outline: none;
    border: 1px solid #dddfe5;
    border-radius: 5px;
    text-indent: 10px;
  }
}

.publish-footer {
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 0 30%;
  z-index: 97;
}

.aie-header-panel {
  position: sticky;
  top: 50px;
  z-index: 99;
}

.aie-header-panel aie-header > div {
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.aie-container aie-header > div {
  border-top: 1px solid var(--aie-container-border);
  background-color: var(--aie-bg-color);
}

.aie-main {
  position: relative;
}

:deep(.el-select__wrapper) {
  background-color: black !important;
}

.aie-directory {
  position: absolute;
  top: 30px;
  left: 10px;
  width: 260px;
  z-index: 0;
}

.aie-directory h5 {
  color: #000000c4;
  font-size: 16px;
  text-indent: 4px;
  line-height: 32px;
}

.aie-directory a {
  height: 30px;
  font-size: 14px;
  color: #000000a3;
  text-indent: 4px;
  line-height: 30px;
  text-decoration: none;
  width: 100%;
  display: inline-block;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.aie-directory a:hover {
  cursor: pointer;
  background-color: #334d660f;
  border-radius: 4px;
}

.aie-title1 {
  font-size: 14px;
  font-weight: 500;
}

.aie-title2,
.aie-title3,
.aie-title4,
.aie-title5,
.aie-title6 {
  font-size: 12px;
}

.aie-directory-content {
  position: sticky;
  top: 108px;
}

@media screen and (max-width: 1280px) {
  .aie-directory {
    display: none;
  }
}

@media screen and (max-width: 1400px) {
  .aie-directory {
    width: 200px;
  }
}

.abstract-input {
  width: 540px;
}

@media screen and (max-width: 700px) {
  .abstract-input {
    width: 440px;
  }
}

@media screen and (max-width: 600px) {
  .abstract-input {
    width: 330px;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 152px;
  height: 102px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.aie-container aie-footer > div {
  line-height: 50px;
}
</style>
