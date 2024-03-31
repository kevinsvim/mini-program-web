<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside-wrap" width="150px">
        <div class="sidebar">
          <div class="sn-btn xy_center">
            <svg-icon icon-name="icon-fold" size="20"></svg-icon>
            <span>全部工具导航</span>
          </div>
          <el-anchor
              class="sidebar-anchor"
              :container="containerRef"
              direction="vertical"
              type="default"
              :offset="30"
              @click="$event.preventDefault()"
          >
            <el-anchor-link
                style="height: 42px;"
                class="xy_center"
                :class="{ 'is-active': selectedAnchor === item.anchor }"
                v-for="item in anchorList"
                :href="'#'+item.anchor"
                :title="item.anchor"
                :key="item.id"
                @click="selectedAnchor = item.anchor"
                >
              <template #default>
                <div class="xy_center">
                  <svg-icon :icon-name="item.iconClass" size="16"></svg-icon>
                  <span class="sidebar-title">{{ item.text }}</span>
                </div>

              </template>
            </el-anchor-link>
          </el-anchor>
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
    path: '/tool/',
    tools: [
      {
        id: 1,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'json/JsonFormat.vue',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 2,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat.vue',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 3,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat.vue',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 4,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat.vue',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 5,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat.vue',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 6,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat.vue',
        description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出'
      },
      {
        id: 7,
        title: 'JSON 在线解析',
        icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
        filename: 'JsonFormat.vue',
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
const containerRef = ref()
/**
 * @deprecated
 * @date 2024-04-01移除
 * 自定义锚点设计
 */
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
    const offset = -200
    if (rect.top <= window.innerHeight + offset) {
      // selectedAnchor.value = item.anchor
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
  if (screenWidth < 750) {
    spanCol.value = 12
  } else if (screenWidth < 1000 && screenWidth >= 750) {
    spanCol.value = 8
  } else if (screenWidth < 1392 && screenWidth >= 1000) {
    spanCol.value = 6
  } else {
    spanCol.value = 4
  }
}
</script>

<style lang="scss">
.el-menu-item.is-active {
  color: #fff;
  background-color: #ff6000;
  border-radius: 10px;
}
.el-menu-item {
  height: 42px;
}
.el-anchor.el-anchor--vertical .el-anchor__list {
  padding-left: unset;
}
</style>

<style scoped lang="scss">
.sidebar-anchor {
  margin-top: 20px;
  border-radius: 10px;
}

.sn-btn {
  line-height: 40px;
  color: #3a3a3a;
  white-space: nowrap;
  background-color: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;

  span {
    font-size: 15px;
    font-family: YShayuTi,"Microsoft YaHei",sans-serif;
    color: #3a3a3a;
  }
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
  font-family:  "Microsoft YaHei" sans-serif;
  color: #5a5a5a;
  margin-left: 5px;
}

.is-active {
  color: #fff;
  background-color: #ff6000;
  border-radius: 10px;
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
