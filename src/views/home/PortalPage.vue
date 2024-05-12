<template>
  <div class="home-container">
    <el-row :gutter="10">
      <el-col :span="18">
        <!-- banner  -->
        <el-carousel  motion-blur>
          <el-carousel-item v-for="item in bannerList" :key="item" style="height: 300px;">
            <img :src="item" alt="" style="width: 100%"/>
          </el-carousel-item>
        </el-carousel>
        <!--  -->
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item, index) in selectedList" :key="index">
            <div class="sub_content">
              <img :src="item" class="sub-recommend" alt=""/>
            </div>
          </el-col>
        </el-row>
        <!-- 文章列表 -->
        <div class="article-list">
          <!--  -->
          <div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="热门推荐" name="first">
                <ArticleCard style="border-top: 1px solid #F0F0F0;"/>
              </el-tab-pane>
              <el-tab-pane label="Go" name="second">Config</el-tab-pane>
              <el-tab-pane label="Java" name="third">Role</el-tab-pane>
              <el-tab-pane label="前端" name="fourth">Task</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="6">

      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from "@/components/card/ArticleCard.vue";
import { ref } from 'vue'


const bannerList = [
    "https://www.lovestu.com/wp-content/uploads/2024/02/20240208145025866326.webp",
    "https://www.nuoyo.cn/wp-content/uploads/2024/01/20240110081041908874.jpg"
]
const selectedList = [
    "https://www.lovestu.com/wp-content/uploads/2021/12/yxwz.png",
    "https://www.lovestu.com/wp-content/uploads/2020/09/flexbj.jpg",
    "https://www.lovestu.com/wp-content/uploads/2023/06/20230606115242410845.webp",
    "https://www.lovestu.com/wp-content/uploads/2023/12/20231201105423540416.webp"
]
const activeName = ref('first')
</script>

<style scoped lang="scss">
.home-container {
  width: 1200px;
  z-index: 1;
  margin: 10px auto;
}

.sub_content {
  margin-top: 10px;

  img {
    width: 100%;
    height: 126px;
    border-radius: 6px;
  }

  &:hover {
    animation: shake 0.5s ease-in-out;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.article-list {
  position: relative;
  width: 100%;
  height: 400px;
  margin-top: 10px;
  border-radius: 6px;
  background-color: var(--el-bg-color-page)
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

:deep(.el-carousel__indicators--horizontal) {
  display: none;
}

:deep(.el-carousel) {
  border-radius: 8px;
}

:deep(.el-tabs__nav) {
  margin-left: 20px;
}

:deep(.el-tabs__nav-wrap::after) {
  height: unset;
}

:deep(.el-tabs__nav-scroll) {
  margin-top: 15px;
}

:deep(.el-tabs__item) {
  font-size: 17px;
}
</style>
