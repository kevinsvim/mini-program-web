import './styles/settings/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from '@/stores'
import 'element-plus/dist/index.css'
import SvgIcon from "@/components/icon/SvgIcon.vue";
import '@/assets/iconfont/iconfont.js'
import '@/assets/font/font.scss'
// import  { ClickOutSide } from "@/directives/clickOutsideDirective";
import { ClickOutside } from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/dark/css-vars.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
// 注册图标
app.component('SvgIcon', SvgIcon)

app.directive('click-outside', ClickOutside)
app.mount('#app')

