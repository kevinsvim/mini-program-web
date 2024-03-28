<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside-wrap" width="150px">
        <div class="sidebar">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :value="false" v-show="isCollapse">
              <div class="xy_center">
                <svg-icon icon-name="icon-expand" size="20"></svg-icon>
                <span style="font-size: 13px; ">展开</span>
              </div>
            </el-radio-button>
            <el-radio-button :value="true" v-show="!isCollapse">
              <!--<div class="xy_center" style="width: 100px">-->
              <!--  <svg-icon icon-name="icon-fold" size="20"></svg-icon>-->
              <!--  <span style="font-size: 13px; ">关闭</span>-->
              <!--</div>-->
              <i class="sn-btn">
                <svg-icon icon-name="icon-fold" size="20"></svg-icon>
                <span style="font-size: 13px; ">关闭</span>
              </i>
            </el-radio-button>
          </el-radio-group>
          <el-menu
            :default-active="active"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item
                v-for="item in anchorList"
                :index="item.id"
                :key="item.id"
                @click="() => anchorPosition(item.anchor)"
            >
              <el-icon><svg-icon :icon-name="item.iconClass"></svg-icon></el-icon>
              <template #title>
                <span class="sidebar-title">{{ item.text }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <div class="main">
          <div class="main-wrap">
            <SearchNavbar></SearchNavbar>
            <div v-for="item in anchorList" :key="item.id">
              <h2 :id="item.anchor">
                <strong>
                  <i class="hot">{{ item.text }}</i>
                </strong>
              </h2>
              <el-row :gutter="20">
                <el-col :span="spanCol" :key="tool.id" v-for="tool in item.tools">
                  <ToolCard
                    class="tool-card"
                    :href="item.path + tool.filename"
                    :title="tool.title"
                    :description="tool.description"
                    :img="tool.icon"
                  ></ToolCard>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'
import SearchNavbar from '@/components/common/SearchNavbar.vue'
import ToolCard from '@/components/card/ToolCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from 'lodash'

const anchorList = [
  {
    id: 1,
    anchor: 'hot',
    text: '热门工具',
    iconClass: 'icon-tool',
    path: '/tool/hot/',
    tools: [
      {
        id: 1,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 2,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 3,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 4,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 5,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 6,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 7,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      }
    ]
  },
  {
    id: 2,
    anchor: 'online',
    text: '在线工具',
    iconClass: 'icon-tool',
    path: '/tool/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 3,
    anchor: 'text',
    text: '文本工具',
    iconClass: 'icon-tool',
    path: '/tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 4,
    anchor: 'usually',
    text: '常用工具',
    iconClass: 'icon-tool',
    path: '/tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 5,
    anchor: 'compile',
    text: '编译工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 6,
    anchor: 'other1',
    text: '其它工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 7,
    anchor: 'hot1',
    text: '热门工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 8,
    anchor: 'online1',
    text: '在线工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 9,
    anchor: 'text1',
    text: '文本工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 10,
    anchor: 'usually1',
    text: '常用工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  },
  {
    id: 11,
    anchor: 'compile1',
    text: '编译工具',
    iconClass: 'icon-tool',
    path: 'tools/online/',
    tools: [
      {
        id: 1,
        title: 'JSON 格式化工具',
        icon: 'icon-tool',
        filename: 'json_format.html',
        description: 'json格式化'
      }
    ]
  }
]
const selectedAnchor = ref('hot')
const spanCol = ref<number>(4)
const isCollapse = ref(false)
const active = ref(1)
const anchorPosition = (anchor: string) => {
  selectedAnchor.value = anchor
  // 如果是第一个元素，将滚动条其移动到顶部
  if (anchor === 'hot') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    const el = document.getElementById(anchor)
    const offset = -100
    const rect = el?.getBoundingClientRect() || { top: 0 }
    window.scrollTo({
      top: window.scrollY + rect.top + offset,
      behavior: 'smooth'
    })
    // el?.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" })
  }
}
/**
 * 内容滚动到一定高度时，紧接着改变选中功能
 * 防抖
 */
const handleScroll = debounce(() => {
  // 遍历所有功能集合
  anchorList.forEach((item) => {
    const el = document.getElementById(item.anchor)
    const rect = el?.getBoundingClientRect() || { top: 0 }
    const offset = -100
    if (rect.top <= window.innerHeight + offset) {
      // active.value = item.id
      return
    }
  })
}, 200)

onMounted(() => {
  // 监听滚动条变化
  window.addEventListener('scroll', handleScroll)
  checkScreenWidth()
  // 监听屏幕宽度
  window.addEventListener('resize', checkScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkScreenWidth)
})
/**
 * 适配屏幕宽度
 * 针对750px/992px/1200px做屏幕适配
 */
const checkScreenWidth = () => {
  const screenWidth = window.innerWidth
  if (screenWidth < 768) {
    spanCol.value = 12
  } else if (screenWidth < 1000 && screenWidth >= 768) {
    spanCol.value = 8
  } else if (screenWidth < 1392 && screenWidth >= 1000) {
    spanCol.value = 6
  } else {
    spanCol.value = 4
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 80vh;
  max-height: 90vh;
  overflow-y: auto;
  --el-menu-active-color: #fff;
  --el-menu-bg-color: #eff4f8;
  border: none;
  margin-top: 25px;
}
.el-radio-button__inner {
  padding: 4px 8px;
  border-bottom: none;
  border-bottom-right-radius: unset !important;
  border-bottom-left-radius: unset !important;
}
.el-menu-item.is-active {
  color: #fff;
  background-color: #ff6000;
  border-radius: 10px;
}
.el-menu-item {
  height: 42px;
}
</style>

<style scoped lang="scss">
.sn-btn {
  display: block;
  line-height: 20px;
  padding: 4px 42px;
  color: #3a3a3a;
  white-space: nowrap;
  background-color: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}

.aside-wrap {
  position: relative;
  width: 150px;
  margin-right: 20px;
}

.sidebar {
  position: fixed;
  left: 20px;
  top: 95px;
  width: 150px;
}

.hot {
  display: block;
  margin-top: 30px;
  font-weight: bold;
  color: #3c3c3c;
  font-size: 20px;
}

.tool-card {
  margin-top: 20px;
}

.sidebar-title {
  font-size: 14px;
  font-family: 'PingFang SC';
}
@media (min-width: 750px) {
  .main {
    padding: 15px;
  }
}

@media (min-width: 992px) {
  .sidebar {
    display: block;
  }
}

@media (max-width: 992px) {
  .aside-wrap {
    display: none;
  }
}
</style>
