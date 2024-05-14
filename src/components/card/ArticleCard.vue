<script setup lang="ts">
import SvgIcon from "@/components/icon/SvgIcon.vue";

interface ArticleComponentProps {
  // 封面
  cover?: string
  // 标签
  label?: string
  // 标题
  title?: string
  // 内容
  content?: string
  // 发布日期
  publishDate?: string
  // 发布人
  publisher?: string
  // 浏览量
  views?: string
  // 评论量
  comments?: string
  // 点赞量
  likes?: string
  // 是否置顶
  isTop?: boolean
}
const props = withDefaults(defineProps<ArticleComponentProps>(), {
  cover: 'https://www.lovestu.com/wp-content/uploads/2023/06/20230606115242410845.webp',
  label: 'wordpress',
  title: '【WordPress优化插件】WPOPT v2.3.0',
  content:
    'WPOPT插件，是由本站开发的一款WordPress优化插件，能对WordPress底层功能进行优化，支持功能开关，系统加速等功能。2.0版本全新发布，采用vite打包，界面采用Vue3+element-plus制作。无论是外观，还是框架功能，都是空前的强大。',
  publishDate: '2024-03-12',
  publisher: 'Ronin',
  views: '1648W+',
  comments: '58',
  likes: '89',
  isTop: true
})
const { cover, label, title, content, publishDate, publisher, views, comments, likes, isTop } =
  props
</script>

<template>
  <div class="article-item">
    <!-- cover -->
    <div class="item-left">
      <a href="http://www.lovestu.com/wpopt.html" target="_blank" class="a-thumbnail">
        <img
          :data-src="cover"
          :src="cover"
          width="480"
          height="300"
          alt="thumbnail"
          class="lazy entered loaded"
          data-ll-status="loaded"
        />
      </a>
      <div class="cat-float">
        <a href="http://www.lovestu.com/category/php/wordpress" target="_blank">{{ label }}</a>
      </div>
    </div>
    <!-- 内容 -->
    <div class="item-right">
      <div>
        <h2 class="article-title">
          <span class="item-sticky">置顶</span>
          <a class="title" href="http://www.lovestu.com/wpopt.html" target="_blank">{{ title }}</a>
        </h2>
        <div class="article-excerpt">
          {{ content }}
        </div>
      </div>
      <!-- 备注信息 -->
      <div class="article-meta">
        <div>{{ publishDate }} {{ publisher }}</div>
        <div style="display: flex">
          <div class="xy_center">
            <svg-icon icon-name="icon-view" size="21"></svg-icon>
            <span class="ml_1">{{ views }}</span>
          </div>
          <div class="xy_center ml_6">
            <svg-icon icon-name="icon-comment" size="16"></svg-icon>
            <span class="ml_1">{{ comments }}</span>
          </div>
          <div class="xy_center ml_6">
            <svg-icon icon-name="icon-like" size="18"></svg-icon>
            <span class="ml_1">{{ likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-item {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid var(--va-br-color-1);
  padding: 15px;
  transition: 0.3s;
  position: relative;

  .article-meta {
    font-size: 14px;
    color: var(--va-text-color-5);
    display: flex;
    justify-content: space-between;
  }

  .article-excerpt {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--va-text-color-4);
    font-size: 15px;
    line-height: 1.625;
    margin-top: 10px;
  }

  .item-sticky {
    display: inline-block;
    font-size: 14px;
    color: #fff;
    background-color: #409eff;
    margin-right: 10px;
    padding: 2px 4px;
    border-radius: 3px;
  }

  &:hover {
    background-color: var(--va-bg-hover);
  }
}

.article-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  overflow: hidden;

  a {
    color: var(--va-text-color-1);
  }

  .title {
    display: inline-block;

    &:hover {
      color: #409eff;
    }
  }
}

.cat-float {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;

  a {
    color: #fff;
    font-size: 14px;
    padding: 2px 5px;
  }

  &:hover a {
    color: #409eff;
  }
}

.item-left {
  position: relative;
  flex: 1;

  &:before {
    content: '';
    display: block;
    padding-top: 60%;
  }

  .a-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-width: 100%;
    vertical-align: top;
  }
}

.item-right {
  flex: 2.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 0;
  flex-shrink: 0;
}

a {
  color: #282b31;
  transition: color 0.4s;
  text-decoration: none;
  cursor: pointer;
}
</style>
