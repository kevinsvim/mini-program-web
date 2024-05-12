<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import SvgIcon from "@/components/icon/SvgIcon.vue";

type Pointer = {
  x: number
  y: number
}
type CaptchaType = {
  bgImg: any
  ctx: any
  fontArr: any[]
  tips: any[]
  pointer: Pointer[]
  state: string
  timeIns: number
}

interface IProps {
  width?: number
  height?: number
  // 文字集
  fontStr?: string
  // 显示字数
  fontNum?: number
  // 点击验证数
  checkNum?: number
  // 精度
  accuracy?: number
  // 背景集合
  bgList?: string[]
  // 随机线条数
  lineNum?: number
}

const props = withDefaults(defineProps<IProps>(), {
  width: 360,
  height: 180,
  fontStr: '赵钱孙李周吴郑王朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭',
  fontNum: 5,
  checkNum: 3,
  accuracy: 15,
  bgList: function () {
    return [
      'https://th.bing.com/th/id/R.9c71046c87f2ff80e420620c187f3a20?rik=Ma8irdWBpLQMGA&pid=ImgRaw&r=0',
      'https://th.bing.com/th/id/R.b16b9b116836d478e3640622b9aba8c3?rik=89bQlvm6B8zQ2g&pid=ImgRaw&r=0'
    ]
  },
  lineNum: 7
})

const captcha: CaptchaType = reactive({
  bgImg: null,
  ctx: null,
  fontArr: [],
  tips: [],
  pointer: [],
  state: '',
  timeIns: -1
})
const emit = defineEmits(['captchaCloseEvent'])
const canvasRef = ref()
onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  if (captcha.timeIns != -1) {
    clearTimeout(captcha.timeIns)
  }
})
const init = () => {
  captcha.ctx = canvasRef.value.getContext('2d')
  getCaptcha()
}
/**
 * 加载图片
 */
const getCaptcha = () => {
  const img = document.createElement('img')
  const imagesLen = props.bgList.length
  const randomIndex = Math.floor(Math.random() * imagesLen)
  img.crossOrigin = 'Anonymous'
  img.src = props.bgList[randomIndex]
  captcha.bgImg = img
  img.onload = () => {
    console.log('图片加载完成')
    draw()
  }
}
/**
 * 画图
 */
const draw = () => {
  // 绘制背景图
  captcha.ctx.drawImage(captcha.bgImg, 0, 0, props.width, props.height)
  // 遍历文字显示的数量
  for (let i = 0; i < props.fontNum; i++) {
    // 随机获取文字
    const word = getRandomCharacter()
    const fontSize = randomNum(20, props.height / 4)
    const fontWeight = Math.random() > 0.5 ? 'bold' : 'normal'
    const fontStyle = Math.random() > 0.5 ? 'italic' : 'normal'
    const fontFamily = Math.random() > 0.5 ? 'HarmonyOS_Sans_SC_Regular' : 'sans-serif'
    const x = (props.width / props.fontNum) * i + 10
    const y = Math.random() * (props.height - fontSize)
    captcha.ctx.fillStyle = randomColor(0, 255)
    captcha.ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
    captcha.ctx.textBaseline = 'top'
    captcha.ctx.shadowColor = 'rgba(0.1, 0.4, 0.3, 0.5)' // 阴影颜色，RGBA格式，透明度在0到1之间
    captcha.ctx.shadowBlur = 5 // 阴影模糊程度
    captcha.ctx.shadowOffsetX = 6 // 阴影水平偏移量
    captcha.ctx.shadowOffsetY = 5 // 阴影垂直偏移量
    captcha.ctx.fillText(word, x, y)
    captcha.fontArr.push({ word, x, y })
  }
  // 绘制线条
  drawLine()
  for (let i = 0; i < props.checkNum; i++) {
    const randomIndex = Math.floor(Math.random() * captcha.fontArr.length)
    const character = captcha.fontArr.splice(randomIndex, 1)[0]
    captcha.tips.push(character)
  }
}
const drawLine = () => {
  for (let i = 0; i < props.lineNum; i++) {
    captcha.ctx.beginPath()
    captcha.ctx.moveTo(Math.random() * props.width, Math.random() * props.height)
    captcha.ctx.lineTo(Math.random() * props.width, Math.random() * props.height)
    captcha.ctx.strokeStyle = `rgba(${randomNum(0, 255)},${randomNum(0, 255)},${randomNum(
      0,
      255
    )},${Math.random()})`
    captcha.ctx.lineWidth = 3
    captcha.ctx.stroke()
  }
}
/**
 * 随机获取文字
 */
const getRandomCharacter = () => {
  const wordLen = props.fontStr.length
  const randomIndex = Math.floor(Math.random() * wordLen)
  return props.fontStr.charAt(randomIndex)
}
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max)
  let g = randomNum(min, max)
  let b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
const createPointer = (e: any) => {
  const x = e.offsetX - 15
  const y = e.offsetY - 15
  if (captcha.pointer.length < captcha.tips.length) {
    captcha.pointer.push({ x, y })
    captcha.state = 'active'
  } else {
    verify()
  }
}
/**
 * 验证函数
 * @return true 验证通过 false 验证失败
 * @description 遍历所有已经点击的集合
 */
const verify = () => {
  return captcha.pointer.every((item, index) => {
    return (
      item.x > captcha.tips[index].x - props.accuracy &&
      item.x < captcha.tips[index].x + props.accuracy &&
      item.y > captcha.tips[index].y - props.accuracy &&
      item.y < captcha.tips[index].y + props.accuracy
    )
  })
}
const handleVerify = () => {
  if (captcha.pointer.length === captcha.tips.length) {
    const isPass = verify()
    if (isPass) {
      captcha.state = 'success'
      // 关闭验证框
      captcha.timeIns && clearTimeout(captcha.timeIns)
      setTimeout(() => {
        emit('captchaCloseEvent')
      }, 1000)
      return
    } else {
      captcha.state = 'fail'
    }
  } else {
    captcha.state = 'fail'
  }
  captcha.timeIns = setTimeout(() => {
    reset()
  }, 1000)
}
const reset = () => {
  captcha.pointer = []
  captcha.state = ''
  captcha.tips = []
  captcha.fontArr = []
  captcha.timeIns && clearTimeout(captcha.timeIns)
  captcha.ctx.clearRect(0, 0, props.width, props.height)
  getCaptcha()
}
</script>

<template>
  <div class="captcha">
    <!-- 验证码提示 -->
    <div>
      <p class="captcha-tip">
        请依次点击文字：【<span v-for="(item, index) in captcha.tips" :key="index"
          >&nbsp;{{ item.word }}&nbsp;</span
        >】
      </p>
    </div>
    <!-- 关闭 -->
    <div class="close" @click="$emit('captchaCloseEvent')">
      <svg-icon icon-name="icon-captcha-close" class="icon-captcha-close" size="22"></svg-icon>
    </div>
    <!-- 图片画板   -->
    <div class="captcha-container" :style="{ width: `${props.width}px` }">
      <div class="pic">
        <canvas
          class="canvas"
          ref="canvasRef"
          :width="props.width"
          :height="props.height"
          @click="createPointer"
        ></canvas>
        <span
          class="pointer"
          v-for="(item, index) in captcha.pointer"
          :key="index"
          :style="{ left: `${item.x}px`, top: `${item.y}px` }"
        >
          <i>{{ index + 1 }}</i>
        </span>
      </div>
      <!-- 成功与否 -->
      <div class="state success" v-if="captcha.state == 'success'">
        <span>验证成功</span>
      </div>
      <div class="state fail" v-else-if="captcha.state == 'fail'">
        <span>验证失败，请按照提示重新操作</span>
      </div>
    </div>
    <!-- 刷新 -->
    <div class="refresh">
      <svg-icon icon-name="icon-refresh" class="refresh-icon" size="22" @click="reset"></svg-icon>
      <span>刷新</span>
    </div>
    <!-- 反馈 -->
    <div class="feedback">
      <svg-icon icon-name="icon-feedback" class="feedback-icon" size="22"></svg-icon>
      <span>反馈</span>
    </div>
    <!-- 确认按钮 -->
    <div class="confirm" @click="handleVerify">
      <span>确认</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}

.captcha {
  position: relative;
  width: 400px;
  height: 300px;
  border-radius: 20px;
  background-color: var(--va-bg-color-1);
  padding: 20px;
  box-shadow:
    8px 8px 16px #d0d0d0,
    -8px -8px 16px #ffffff;
  transition: all 0.3s ease;

  &-tip {
    font-size: 16px;

    span {
      font-weight: bold;
      color: var(--va-text-color-1);
    }
  }

  &-container {
    position: relative;
    border: 1px solid #e4e4e4;
    margin: 10px auto;
    overflow: hidden;
    user-select: none;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    user-select: none;
    z-index: 10;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
}

.state {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  span {
    line-height: 30px;
    font-size: 16px;
    color: #ffffff;
  }
}

.success {
  background-color: #5ebf70;
}

.fail {
  background-color: #de715b;
}

.canvas {
  display: block;
}

.pointer {
  background: #1abd6c;
  border-radius: 50%;
  padding: 15px;
  position: absolute;
}

.pointer i {
  color: #fff;
  font-style: normal;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.toolbar {
  width: 100%;
  height: 40px;
  border: 1px solid #e4e4e4;
  background: #f7f7f7;
  color: #666;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.toolbar.active {
  color: #fff;
  background: #1991fa;
  border: 1px solid #1991fa;
}

.toolbar.success {
  color: #fff;
  background: #52ccba;
  border: 1px solid #52ccba;
}

.toolbar.fail {
  color: #fff;
  background: #f57a7a;
  border: 1px solid #f57a7a;
}

.refresh, .feedback {
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 20px;
  cursor: pointer;
  font-size: 14px;
}

.refresh {
  left: 20px;
  span {
    margin-left: 5px;
  }
}

.feedback {
  left: 100px;
  span {
    margin-left: 5px;
  }
}

.confirm {
  position: absolute;
  right: 20px;
  bottom: 16px;
  cursor: pointer;
  height: 30px;
  width: 60px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background: #1991fa;
  border-radius: 5px;
  padding: 0 10px;
  transition: all 0.3s ease;

  &:hover {
    background: deepskyblue;
  }
}

.icon-captcha-close {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: var(--va-text-color-1);
  overflow: hidden;

  &:hover {
    fill: #00a1d6;
  }
}
</style>
