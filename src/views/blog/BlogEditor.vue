<template>
  <div class="editor">
    <!-- 顶部信息 -->
    <div class="page-header">
      <div class="header-left">
        <h1><LogoTitle :title="'Vault'"/></h1>
        <el-divider direction="vertical" style="height: 25px;"/>
        <span class="header-write">写文章</span>
      </div>
      <div class="header-right">
        <el-avatar style="cursor: pointer" shape="square" :size="35" :src="'https://pic1.zhimg.com/v2-bd64c3ac8d203f791398c497f0752ee5_r.jpg?source=1940ef5c'" />
      </div>
    </div>
    <div ref="divRef">
      <div class="aie-container">
        <!-- 头部功能区域 -->
        <div class="aie-header-panel">
          <div class="aie-container-header"></div>
        </div>
        <!-- 内容区域 -->
        <div class="content">
          <div class="title">
            <input title="title" v-model="article.title" placeholder="请输入标题（最多100字）"/>
          </div>
          <el-divider/>
          <div class="aie-container-main"></div>
          <el-divider/>
          <div class="aie-container-footer">
            <div class="setting">
              <!-- 文章标签 -->
              <div class="setting-item">
                <label class="setting-item-title">文章标签
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <!--<el-button plain size="small">-->
                <!--  <svg-icon icon-name="icon-add" size="12"></svg-icon>-->
                <!--  <span class="ml_4">添加文章标签</span>-->
                <!--</el-button>-->
                <div class="flex gap-2">
                  <el-tag
                      v-for="tag in dynamicTags"
                      :key="tag"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                      v-if="inputVisible"
                      ref="InputRef"
                      v-model="inputValue"
                      class="w-20"
                      size="small"
                      @keyup.enter="handleInputConfirm"
                      @blur="handleInputConfirm"
                  />
                  <el-button id="addTagBtn" v-else class="button-new-tag" size="small" @click.stop="showInput">
                    + 添加文章标签
                  </el-button>
                </div>
                <div style="position: absolute; top: 45px; left: 123px; z-index: 99">
                  <AddTagBox
                      v-show="isShowTagBox"
                      v-click-outside="handleClickOutside"
                  ></AddTagBox>
                </div>
              </div>
              <!-- 创作声明 -->
              <div class="setting-item">
                <label class="setting-item-title">创作声明
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-select
                    v-model="article.statement"
                    clearable
                    placeholder="Select"
                    style="width: 240px">
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
                <label class="setting-item-title">分类专栏
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-button plain size="small">
                  <svg-icon icon-name="icon-add" size="12"></svg-icon>
                  <span class="ml_4">添加分类标签</span>
                </el-button>
              </div>
              <!-- 文章类型 -->
              <div class="setting-item">
                <label class="setting-item-title">文章类型
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-radio-group v-model="article.type">
                  <el-radio :label="1">原创</el-radio>
                  <el-radio :label="2">转载</el-radio>
                  <el-radio :label="3">翻译</el-radio>
                </el-radio-group>
              </div>
              <!-- 原文链接 -->
              <div class="source-link" v-if="article.type !== 1">
                <input type="text" v-model="article.copyFrom" placeholder="请输入原文链接"/>
                <el-checkbox v-if="article.type == 2" v-model="article.isAuthorized" :label="articleSetting.reprinted" size="large" />
                <el-checkbox v-if="article.type == 3" v-model="article.isAuthorized" :label="articleSetting.translation" size="large"/>
              </div>
              <!-- 可见范围 -->
              <div class="setting-item">
                <label class="setting-item-title">可见范围
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-radio-group v-model="article.visibleRange">
                  <el-radio :label="1">全部可见</el-radio>
                  <el-radio :label="2">粉丝可见</el-radio>
                  <el-radio :label="3">仅我可见</el-radio>
                </el-radio-group>
              </div>
              <!-- 添加封面 -->
              <div class="setting-item">
                <label class="setting-item-title">添加封面</label>
                <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false">
                  <img v-if="article.cover" :src="article.cover" class="avatar"  alt=""/>
                  <svg-icon v-else icon-name="icon-add" size="14"></svg-icon>
                  <span style="margin-left: 5px">添加文章封面</span>
                  <template #tip>
                    <div class="el-upload__tip">
                      图片支持jpg/png，大小少于500KB.
                    </div>
                  </template>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部发布栏 -->
    <div class="publish-footer">
      <el-button plain>预览</el-button>
      <el-button type="primary" @click="handlePublish" :disabled="disabled.publishBtnDisabled">发布</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import { onMounted, ref, onUnmounted, onBeforeUnmount, reactive, watch, unref } from "vue";
import { useRoute } from "vue-router";
import SvgIcon from "@/components/icon/SvgIcon.vue";
import LogoTitle from "@/components/nav/LogoTitle.vue";
import type { BlogTypes } from "@/types/blog";
import articleApi from "@/api/article";
import AddTagBox from "@/components/box/AddTagBox.vue";

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
  // 是否授权文章（转载或翻译）
  isAuthorized : false,
  // 可见范围(1-全部可见，2-粉丝可见，3-仅我可见)
  visibleRange: 1,
})
const articleSetting = {
  reprinted: '原文允许进行转载，或者已经获得原作者的转载授权。',
  translation: '原文允许进行翻译，或者已经获得原作者的翻译授权。',
  statements: [
    {
      value: 0,
      label: '无声明',
    },
    {
      value: 1,
      label: 'Option2',
    },
    {
      value: 2,
      label: 'Option3',
    },
  ],
}
const disabled = reactive({
  publishBtnDisabled: true,
})
onMounted(() => {
  window.addEventListener('beforeunload', beforeLeave)
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: '',
    onChange: (editor) => {
      hasUnsavedContent.value = editor.getText() !== '';
    },
  })
})
onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
/**
 * 监听内容失去焦点
 */
watch([() => hasUnsavedContent.value, () => article.title], () => {
  // 存在内容
  disabled.publishBtnDisabled = !(hasUnsavedContent.value && article.title !== '');
})
/**
 * 处理文章发布
 */
const handlePublish = () => {
  // 检测是否满足发布条件
  if (article.title !== '' && aiEditor?.getText() !== '') {
    articleApi.saveArticle(article).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
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
const addTagBtnRef = ref()
// 按钮是否被点击
const showInput = () => {
  // 1. 显示或关闭弹框
  isShowTagBox.value = !isShowTagBox.value
}
const handleClickOutside = (event: Event) => {
  const target = event.target
  const el = document.getElementById("addTagBox")
  if (el && !el.contains(target)) {
    isShowTagBox.value = false
  }
}
</script>
<style lang="scss">
.editor {
  background-color: #f3f4f6;
  padding: 0;
  margin: 0;
}

.page-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 51px;
  padding: 0 23%;
  background-color: #fff;
  line-height: 51px;
  border-bottom: 1px solid #efefef;
  z-index: 2;

  .header-left {
    flex: 1;
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
    justify-content: flex-end;
  }
}

.aie-header-panel {
  position: sticky;
  top: 51px;
  z-index: 2;
}

.aie-container aie-header>div {
  border: none;
}

.aie-container aie-header {
  display: flex;
  align-items: center;
}

.aie-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: none;
  background-color: #f3f4f6;
  margin-bottom: 50px;
  &-header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 56px;
    text-align: center;
    background-color: #fff;
  }

  &-main {
    position: relative;
    width: 100%;
    max-width: 800px;
    border: none;
    background-color: #fff;
    height: 100%;
    min-height: 100vh;
    z-index: 1 ;
  }

  &-footer {
    position: relative;
    width: 100%;
    max-width: 800px;
    background-color: #fff;
    text-align: center;
    //line-height: 56px;
    font-size: 14px;
    color: #a0a0a0;
    z-index: 1;
  }
}

.content {
  min-width: 867px;
  width: 867px;
  background-color: #fff;
  max-width: 800px;
  margin: 1rem auto 2rem;
  border-radius: 5px;
  padding: 20px;
}

.aie-content {
  padding: 0;
}

.title {
  width: 100%;
  height: 40px;
  max-width: 800px;
  background-color: #fff;
  border: none;
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 32px;
    font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
    font-weight: 500;
  }
}

.setting-item {
  position: relative;
  display: flex;
  margin-top: 15px;
}

.setting-item-title {
  min-width: 0;
  color: #373a40;
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
  font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
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

.ml_4 {
  margin-left: 4px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;
  padding: 0 30%;
  z-index: 2;
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

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
