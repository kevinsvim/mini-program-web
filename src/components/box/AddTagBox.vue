<template>
  <div class="mark_box">
    <!-- 顶部 -->
    <div class="mark_title">文章标签</div>
    <!-- 搜索框 -->
    <div class="mark_search">
      <el-autocomplete
        v-model="tag"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        style="width: 100%; --el-input-height: 40px"
        placeholder="请输入文字搜索，按Enter可以自定义添加标签"
        @select="handleSelect"
      />
    </div>
    <!-- tree -->
    <div class="mark_tree">
      <ul class="mark_tree_left">
        <el-scrollbar height="264px" :always="true">
            <li @click="() => handleParentLabelClick(item.id)"
                v-for="item in labelList"
                :key="item.id"
                :class="{ active: activeLabelId == item.id}"
            >{{ item.label }}</li>
        </el-scrollbar>
      </ul>
      <div class="mark_tree_right">
        <el-scrollbar height="264px">
          <div class="addTagTitle">添加标签</div>
          <div class="sub_label">
            <el-tag
                v-for="item in activeLabels"
                :key="item.label"
                type="success"
                effect="light"
                style="margin: 0 15px 15px 0"
            >
              {{ item.label }}
            </el-tag>
          </div>

        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'

const tag = ref()
const labelList = reactive([
  {
    id: 1,
    label: '推荐',
    children: [
      {
        id: 1,
        label: 'Java'
      },
      {
        id: 2,
        label: 'CountDownLatch'
      },
      {
        id: 3,
        label: 'ThreadLocal'
      },
      {
        id: 4,
        label: 'JVM'
      },
      {
        id: 5,
        label: 'Java'
      }
    ]
  },
  {
    id: 2,
    label: 'Python',
    children: [
      {
        id: 1,
        label: 'Pytorch'
      },
      {
        id: 2,
        label: 'test'
      }
    ]
  },
  {
    id: 3,
    label: 'Java',
    children: [
      {
        id: 1,
        label: 'ssss'
      }
    ]
  },
  {
    id: 4,
    label: '编程语言',
    children: [
      {
        id: 1,
        label: ''
      }
    ]
  },
  {
    id: 5,
    label: '开发工具',
    children: [
      {
        id: 1,
        label: ''
      }
    ]
  },
  {
    id: 6,
    label: '数据结构与算法',
    children: [
      {
        id: 1,
        label: ''
      }
    ]
  },
  {
    id: 7,
    label: '大数据',
    children: [
      {
        id: 1,
        label: ''
      }
    ]
  },
  {
    id: 8,
    label: '前端',
    children: [
      {
        id: 1,
        label: ''
      }
    ]
  },
  {
    id: 9,
    label: '后端',
    children: [
      {
        id: 1,
        label: ''
      }
    ]
  }
])
// 默认激活父标签id
const activeLabelId = ref<number>(labelList[0]?.id);
const activeLabels = reactive<any>([]);
activeLabels.push(...labelList[0].children);

/**
 * 处理父标签被点击
 * @param id
 */
const handleParentLabelClick = (id: number) => {
  if (activeLabelId.value === id) return
  activeLabelId.value = id
  // 过滤出指定的子标签列表
  activeLabels.length = 0;
  labelList.forEach(item => {
    if (item.id === id) {
      activeLabels.push(...item.children)
      return
    }
  })
}
</script>

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

.sub_label {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  text-align: left;
}

// 修改滚动条宽度
:deep(.el-scrollbar__bar.is-vertical) {
  opacity: 1;
  width: 4px;
}

</style>
