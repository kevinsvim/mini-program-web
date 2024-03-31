<script setup lang="ts">
interface IProps {
  img: string
  title: string
  description: string
  width: number
  height: number
  alt: string
  href: string
}

/**
 * 宽高传递以%为单位，默认是100%
 */
const props = withDefaults(defineProps<IProps>(), {
  img: 'https://image.uisdc.com/wp-content/uploads/2023/04/hao-nav-iconfont.jpg',
  title: 'IconFont',
  description: '国内最著名的图标搜索及管理平台，超2300万个图标下载',
  width: 100,
  height: 100,
  alt: 'HI',
  href: 'javascript:void()',
})
const { img, title, description, width, height, alt, href } = props
</script>
<template>
  <div :style="{width: width + '%', height: height + '%'}" class="card">
    <a :href="href" target="_blank" class="f-box">
      <h3 class="item-title">
        <i class="item-ico">
          <i class="thumb thumb-img">
            <img :src="img" :alt="alt" />
          </i>
        </i>
        <strong class="title">{{ title }}</strong>
      </h3>
      <div class="item-desc">{{ description }}</div>
    </a>
  </div>
</template>
<style scoped lang="scss">
@media (min-width: 750px) {
  .f-box {
    padding: 20px;
    background-color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
  }
}

@media (min-width: 1660px) {
  .item-title {
    line-height: 32px;
    .item-ico {
      width: 32px;
      height: 32px;
    }
  }
}

.f-box {
  display: block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  // 解决<750px时的高度塌陷
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  .item-title {
    display: flex;
    align-items: center;
    line-height: 28px;
    margin-bottom: 12px;
    white-space: nowrap;
    overflow: hidden;
    color: #3c3c3c;
    -o-text-overflow: clip;
    font-size: 16px;
    text-overflow: clip;
  }

  .item-desc {
    font-size: 12px;
    color: #8f8f8f;
    line-height: 18px;
    height: 36px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: HarmonyOS_Sans_SC_Regular, "PingFang SC", "Microsoft YaHei", sans-serif;
  }
}

.title {
  font-size: 16px;
  color: #3c3c3c;
}

.card:hover {
  .title {
    color: #ff6000;
  }
  .f-box {
    transform: translateY(-5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.item-ico {
  display: inline-block;
  vertical-align: top;
  width: 28px;
  height: 28px;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 5px;
}

.thumb {
  position: relative;
  display: block;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background-position: center;
  -webkit-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  img {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
  }
}
</style>
