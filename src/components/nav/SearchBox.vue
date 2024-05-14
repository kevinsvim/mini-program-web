<template>
  <div class="search-container" v-click-outside="handleTargetClick">
    <!-- 搜索框 -->
    <form class="nav-searchForm" :class="{ active: isFocus }">
      <div class="nav-search-content" :class="{ focus: isFocus }">
        <input
          class="nav-search-input"
          type="text"
          autocomplete="off"
          accesskey="s"
          maxlength="100"
          v-model="searchContent"
          :placeholder="placeholder"
          :title="placeholder"
          @click.stop="handleFocus"
        />
        <!-- 清除图标 -->
        <div v-show="hasClean" class="clear_content" @click="handleClear">
          <svg-icon icon-name="icon-close1" icon-style="close-icon" size="15"></svg-icon>
        </div>
      </div>
      <!-- 搜索图标 -->
      <div class="nav-search-btn" @click.stop="handleSearch">
        <svg-icon icon-name="icon-search" class="icon-search" size="19"></svg-icon>
      </div>
    </form>
    <!-- 搜索面板列表 -->
    <div v-show="isFocus" class="search-panel">
      <!--历史记录-->
      <div>
        <div class="header">
          <div class="title">搜索历史</div>
          <div class="clear" @click.stop="clearHistories">清空</div>
        </div>
        <!-- 历史记录列表 -->
        <div class="histories-wrap" :style="[{ maxHeight: isExpand ? 172 + 'px' : 92 + 'px' }]">
          <div class="histories" ref="historyRef">
            <transition-group name="fade">
              <button-clear
                v-for="(item, index) in searchHistory"
                :key="index"
                class="button-clear"
                :search-content="item"
                @removeSpecifiedRecord="() => removeSpecifiedRecord(item)"
              ></button-clear>
            </transition-group>
          </div>
        </div>
        <!-- 展开更多 -->
        <div class="history-fold-wrap" v-if="showMoreBtn">
          <div v-if="!isExpand">
            <div class="fold-text" @click.stop="handExpand">
              展开更多
              <svg-icon icon-name="icon-arrow-d" icon-style="arrow-d" size="12"></svg-icon>
            </div>
          </div>
          <div v-else>
            <div class="fold-text" @click.stop="handFold">
              收起
              <svg-icon icon-name="icon-arrow-u" icon-style="arrow-u" size="12"></svg-icon>
            </div>
          </div>
        </div>
      </div>
      <!--热搜榜-->
      <div class="trending" style="max-width: 498px">
        <div class="header">
          <div class="title">Vault热搜</div>
        </div>
        <!--趋势-->
        <div class="trending-content">
          <div class="trending-col" style="max-width: 244px">
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">1</div>
              <div class="trending-text">幻兽帕鲁澄清抄袭争议</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
                alt=""/>
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">3</div>
              <div class="trending-text">湖南暴雪已致1万多人受灾</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
              />
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">5</div>
              <div class="trending-text">LOL萧炎</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
              />
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">7</div>
              <div class="trending-text">若注定无法成功该努力吗</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221117/eaf2dd702d7cc14d8d9511190245d057/nhoSO8rRli.png@28h"
              />
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">9</div>
              <div class="trending-text">哈尔滨通报千元跟团游吃馒头</div>
              <!---->
            </div>
          </div>
          <div class="trending-col" style="max-width: 244px">
            <div class="trending-item" tabindex="0">
              <div class="trending-rank search-rank-top">2</div>
              <div class="trending-text">幻兽帕鲁峰值在线人数历史第2</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221117/eaf2dd702d7cc14d8d9511190245d057/nhoSO8rRli.png@28h"
              />
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">4</div>
              <div class="trending-text">小众亚文化出圈是福是祸</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221117/eaf2dd702d7cc14d8d9511190245d057/nhoSO8rRli.png@28h"
              />
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">6</div>
              <div class="trending-text">电竞世界杯首个项目官宣</div>
              <!---->
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">8</div>
              <div class="trending-text">火星发现大量冰水沉积物</div>
              <!---->
            </div>
            <div class="trending-item" tabindex="0">
              <div class="trending-rank">10</div>
              <div class="trending-text">满级唐僧 无伤速通</div>
              <img
                class="trending-mark"
                src="https://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount, computed, reactive } from 'vue'
import SvgIcon from '@/components/icon/SvgIcon.vue'
import ButtonClear from '@/components/nav/ButtonClear.vue'
import { useHistoryStore } from '@/stores/modules/historyStore'
import type { SearchTypes } from '@/types/search'

const useHistory = useHistoryStore()
// 是否聚焦
const isFocus = ref<boolean>(false)
// 是否显示清除按钮
const hasClean = ref<boolean>(false)
// 搜索内容
const searchContent = ref<string>('')
// 历史记录ref
const historyRef = ref<any>()
// 是否显示展开更多按钮
const showMoreBtn = ref<boolean>(false)
// 是否处理展开状态
const isExpand = ref<boolean>(false)

// 监听搜索内容变化
watch(searchContent, (val) => {
  hasClean.value = val != ''
})

// 点击搜索框与搜索面板之外的目标区域触发该事件
const handleTargetClick = () => {
  // 一旦isFocus为false，则搜索面板就会关闭
  isFocus.value = false
}
// 清空搜索内容
const handleClear = () => {
  searchContent.value = ''
}
// 计算行数
watch(isFocus, (val) => {
  if (val) {
    nextTick(() => {
      historyRef.value.clientHeight > 80 ? (showMoreBtn.value = true) : (showMoreBtn.value = false)
    })
  } else {
    // 取消焦点，则重置默认值
    isExpand.value = false
  }
})
// 点击展开更多
const handExpand = () => {
  isExpand.value = true
}
// 收起
const handFold = () => {
  isExpand.value = false
}

// 存储当前最大
const placeholders: SearchTypes.DynamicPlaceHolderType[] = [
  {
    id: 1,
    placeholder: '空白的心丶z ·23分钟前更新1'
  },
  {
    id: 2,
    placeholder: '空白的心丶z ·23分钟前更新2'
  },
  {
    id: 3,
    placeholder: '空白的心丶z ·23分钟前更新3'
  }
]
const searchHistory = reactive<string[]>([])
let intervalId: number
let placeholderIndex = ref<number>(0)
// 设置定时器
onMounted(() => {
  intervalId = setInterval(() => {
    placeholderIndex.value = (placeholderIndex.value + 1) % placeholders.length
  }, 20000)
})
const placeholder = computed(() => placeholders[placeholderIndex.value]['placeholder'])
// 组件卸载之前销毁定时器
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
// 移除指定历史记录
const removeSpecifiedRecord = (content: string) => {
  useHistory.removeSearchHistory(content)
  // 移除
  const tempList = searchHistory.filter((item) => item !== content)
  searchHistory.length = 0
  searchHistory.push(...tempList)
}
const handleFocus = () => {
  // 获取搜索历史记录
  searchHistory.length = 0
  searchHistory.push(...useHistory.getSearchHistory())
  isFocus.value = true
}
// 点击搜索
const handleSearch = () => {
  // 1. 保存搜索记录
  if (searchContent.value.trim() == '') {
    // 一旦搜索记录数据为空，则说明准备搜索提示的内容
    useHistory.saveSearchContent(placeholders[placeholderIndex.value]['placeholder'])
  } else {
    useHistory.saveSearchContent(searchContent.value)
  }
  // TODO 2. 跳转到搜索结果
}
// 清空搜索历史
const clearHistories = () => {
  searchHistory.length = 0
  useHistory.clearSearchHistory()
}
</script>

<style scoped lang="scss">
/* transition-group移动动画 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to {
  transform: translateX(-100%);
}
.search-container {
  position: relative;
  margin: 0 auto;
  min-width: 181px;
  max-width: 500px;
}

.nav-searchForm {
  display: flex;
  align-items: center;
  padding: 0 48px 0 4px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  line-height: 38px;
  border: 1px solid #e3e5e7;
  height: 40px;
  width: 500px;
  background-color: var(--va-bg-color-1);
  opacity: 0.9;
  transition: background-color 0.3s;
  border-radius: 8px;
}

// 搜索内容部分
.nav-search-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 8px;
  width: 100%;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 6px;

  .nav-search-input {
    flex: 1;
    overflow: hidden;
    padding-right: 8px;
    border: none;
    background-color: transparent;
    box-shadow: none;
    color: var(--va-text-color-1);
    font-size: 14px;
    line-height: 20px;
    outline: none;
  }

  .nav-search-clean {
    width: 16px;
    height: 16px;
    right: 10px;
    cursor: pointer;
  }

  .clear_content {
    display: flex;
    align-items: center;
  }
}

// 焦点选中时改变背景色
.focus {
  background-color: var(--va-input-focus-bg-color);
}

// 搜索按钮
.nav-search-btn {
  position: absolute;
  top: 3.5px;
  right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  line-height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e3e5e7;
  }
}

// 焦点选中状态
.active {
  border-radius: 8px 8px 0 0;
  border-bottom: none;
}

// 关闭图标
.close-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: #c9ccd0;
  overflow: hidden;

  &:hover {
    fill: #61666d;
  }
}

// 搜索面板
.search-panel {
  position: absolute;
  width: 100%;
  max-height: 612px;
  overflow-y: auto;
  background: var(--va-bg-color-1);
  border: 1px solid #e3e5e7;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 13px 0 16px;
  -webkit-font-smoothing: antialiased;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: var(--va-text-color-1);

  .title {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
  }

  .clear {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    color: #9499a0;
    cursor: pointer;

    &:hover {
      color: #3cc1f0;
    }
  }
}

// 历史记录
.histories-wrap {
  padding: 0 16px;
  overflow: hidden;

  .histories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-right: -10px;
    margin-bottom: 4px;
  }
}

// 热搜部分
.trending-content {
  display: flex;
}

.trending-col {
  flex: 1;

  &:first-child {
    margin-right: 10px;
  }
}

.trending-item {
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 16px;

  &:hover {
    background-color: var(--va-bg-hover-2);
  }
  .trending-rank {
    width: 15px;
    min-width: 15px;
    height: 17px;
    line-height: 17px;
    text-align: center;
    font-size: 14px;
    margin-right: 7px;
    color: #9499a0;
  }

  .trending-text {
    font-size: 14px;
    line-height: 17px;
    height: 17px;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0;
    color: var( --va-text-color-2);
  }

  .trending-mark {
    height: 14px;
    margin-right: 16px;
  }
}

// 展开与收起
.history-fold-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  margin: 0 auto 14px;

  .fold-text {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    color: #9499a0;
    cursor: pointer;
  }

  .arrow-d {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: #9499a0;
    overflow: hidden;
  }

  .arrow-u {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: #9499a0;
    overflow: hidden;
  }

  &:hover {
    .fold-text {
      color: #3cc1f0;
    }

    .arrow-d {
      fill: #3cc1f0;
    }

    .arrow-u {
      fill: #3cc1f0;
    }
  }
}

.icon-search {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: var(--va-text-color-3);
  overflow: hidden;

  &:hover {
    fill: #00a1d6;
  }
}

.button-clear {
  background-color: var(--va-btn-bg-color);
  color: var(--va-text-color-1);
}
</style>
