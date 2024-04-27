<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { BlogTypes } from "@/types/blog";

interface Tag {
  id: number
  tag: string
  selected?: boolean
  children?: Tag[]
}

interface IProps {
  // 标签列表
  tagList?: Tag[]
  // 标题
  title?: string
  // 输入框提示
  placeholder?: string
  // 子标题
  subTitle?: string
  // 是否具备输入功能
  isShowInput?: boolean
  // 已经选择的标签集合
  selectedTags?: Tag[]
}

const emit = defineEmits(['addTag'])
const props = withDefaults(defineProps<IProps>(), {
  tagList: () => [
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
          id: 1,
          tag: 'Pytorch'
        },
        {
          id: 2,
          tag: 'test'
        }
      ]
    },
    {
      id: 3,
      tag: 'Java',
      children: [
        {
          id: 1,
          tag: 'ssss'
        }
      ]
    },
    {
      id: 4,
      tag: '编程语言',
      children: [
        {
          id: 1,
          tag: ''
        }
      ]
    },
    {
      id: 5,
      tag: '开发工具',
      children: [
        {
          id: 1,
          tag: ''
        }
      ]
    },
    {
      id: 6,
      tag: '数据结构与算法',
      children: [
        {
          id: 1,
          tag: ''
        }
      ]
    },
    {
      id: 7,
      tag: '大数据',
      children: [
        {
          id: 1,
          tag: ''
        }
      ]
    },
    {
      id: 8,
      tag: '前端',
      children: [
        {
          id: 1,
          tag: ''
        }
      ]
    },
    {
      id: 9,
      tag: '后端',
      children: [
        {
          id: 1,
          tag: ''
        }
      ]
    }
  ],
  title: '文章标签',
  placeholder: '请输入文字搜索，按Enter可以自定义添加标签',
  subTitle: '添加标签',
  isShowInput: true,
  selectedTags: () => [],
})
const { tagList, title, placeholder, subTitle, isShowInput, selectedTags } = props
const tag = ref()
// 默认激活父标签id
const activeTagId = ref<number>(tagList[0]?.id)
const activeTags = reactive<any>([])
const restaurants = ref<BlogTypes.RestaurantItem[]>([])
activeTags.push(...(tagList[0]?.children ?? []))
/**
 * 处理父标签被点击
 * @param pId 父标签id
 */
const handleParentTagClick = (pId: number) => {
  if (activeTagId.value === pId) return
  activeTagId.value = pId
  // 过滤出指定的子标签列表
  activeTags.length = 0
  tagList.forEach((item) => {
    if (item.id === pId) {
      activeTags.push(...(item.children ?? []))
      return
    }
  })
}

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: BlogTypes.RestaurantItem) => {
    return restaurant.tag.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const loadAll = () => {
  // 给每个子标签加入selected，区分是否选择
  return (
    tagList?.flatMap((item) => {
      if (item.children) {
        return item.children.map((child) => ({
          ...child,
          selected: false
        }))
      } else {
        return []
      }
    }) ?? []
  )
}
onMounted(() => {
  restaurants.value = loadAll()
})
/**
 * 点击标签或列表内容
 */
const handleSelectTag = (item: BlogTypes.RestaurantItem) => {
  // 判断selectedTags中是否包含选择的id
  if (!selectedTags.map(item => item.id).includes(item.id)) {
    item.selected = true
    emit('addTag', item)
  }
}
</script>

<template>
  <div class="mark_box">
    <!-- 顶部 -->
    <div class="mark_title">{{ title }}</div>
    <!-- 搜索框 -->
    <div class="mark_search" v-if="isShowInput">
      <el-autocomplete
        v-model="tag"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        value-key="tag"
        clearable
        style="width: 100%; --el-input-height: 40px"
        :placeholder="placeholder"
        @select="handleSelectTag"
      />
    </div>
    <!-- tree -->
    <div class="mark_tree">
      <ul class="mark_tree_left">
        <el-scrollbar height="264px" :always="true">
          <li
            @click="() => handleParentTagClick(item.id)"
            v-for="item in tagList"
            :key="item.id"
            :class="{ active: activeTagId == item.id }"
          >
            {{ item.tag }}
          </li>
        </el-scrollbar>
      </ul>
      <div class="mark_tree_right">
        <el-scrollbar height="264px">
          <div class="addTagTitle">{{ subTitle }}</div>
          <div class="sub_tag">
            <el-tag
              v-for="item in activeTags"
              :key="item.tag"
              type="success"
              effect="light"
              class="tag_content"
              :class="{ 'is-disabled': item.selected }"
              @click="() => handleSelectTag(item)"
            >
              {{ item.tag }}
            </el-tag>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mark_box {
  width: 580px;
  height: auto;
  z-index: 2006;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e3e3e3;
  padding: 10px 15px;
}

.mark_title {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  font-family: 'PingFang SC', 'sans-serif';
}

.mark_search {
  width: 100%;
  height: 36px;
  margin: 10px 0;
}

:deep(.el-input__inner) {
  --el-input-inner-height: 36px;
}

.mark_tree {
  height: 264px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  .mark_tree_left {
    width: 150px;
    height: 100%;
    overflow-y: scroll;
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      font-weight: 400;
      cursor: pointer;
      text-align: left;
      margin-top: 3px;
      color: #777888;
      font-size: 14px;
      padding-left: 16px;
      line-height: 32px;
    }

    .active {
      color: #00aeec;
    }
  }

  .mark_tree_right {
    flex: 1;
    overflow-y: auto;
    padding: 9px 6px 12px 30px;

    div {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

.sub_tag {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  text-align: left;
}

.tag_content {
  margin: 0 15px 15px 0;
  cursor: pointer;

  &:hover {
    background-color: #d1edc4;
    transition: background-color 0.5s;
  }
}

.is-disabled {
  cursor: not-allowed;
  background: #f5f7fa;
  color: #c0c4cc;

  &:hover {
    background: #f5f7fa;
  }
}

// 修改滚动条宽度
:deep(.el-scrollbar__bar.is-vertical) {
  opacity: 1;
  width: 4px;
}
</style>
