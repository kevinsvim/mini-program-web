import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/modules/userStore'

const userStore = useUserStore()
// 最大重试次数
const MAX_RETRY = 3
// 重试间隔（毫秒）
const RETRY_INTERVAL = 3000
// 是否正在刷新
let refreshTokenLoading = false
/**
 * 创建axios实例
 */
const baseURL = '/api';
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})
/**
 * 请求拦截器
 */
service.interceptors.request.use(
  async (config) => {
    // 携带token
    const access_token: string = userStore.access_token
    if (access_token) {
      config.headers['Authorization'] = access_token
    }
    return config
  },
  (error) => Promise.reject(error)
)
// 刷新token后的任务队列
let refreshTasks: (() => void)[] = []
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    console.log(error)
    let msg: string
    switch (error.response.code) {
      case 400:
        msg = '请求错误'
        break
      case 401:
        msg = '未授权或token失效'
        if (!refreshTokenLoading) {
          refreshTokenLoading = true
          try {
            // 执行刷新
            await refreshTokenFn()
            // 执行刷新后的任务
            refreshTasks.forEach((fn) => fn())
            // 清除任务队列
            refreshTasks = []
            return service(error.config)
          } catch (error) {
            // 跳转至登录
            redirectToLogin()
          } finally {
            refreshTokenLoading = false
          }
        } else {
          return new Promise((resolve) => {
            refreshTasks.push(() => {
              resolve(service(error.config))
            })
          })
        }
        break
      case 402:
        msg = '禁止访问'
        break
      case 403:
        msg = '拒绝访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器内部错误'
        break
      case 501:
        msg = '服务未实现'
        break
      case 502:
        msg = '网关错误'
        break
      case 503:
        msg = '服务不可用'
        break
      case 504:
        msg = '网关超时'
        break
      case 505:
        msg = 'HTTP版本不受支持'
        break
      default:
        msg = '未知错误'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
  }
)
/**
 * 跳转首页逻辑
 */
const redirectToLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.value.fullPath
    }
  })
}
/**
 * 刷新token，重新请求
 */
const refreshTokenFn = async (retryCount: number = 0): Promise<any> => {
  const refreshToken = userStore.refresh_token || ''
  if (refreshToken) {
    try {
      // 尝试使用新创建的axios请求
      const { data } = await axios.post('/unsecured/user/refresh_token', {
        refresh_token: refreshToken
      })
      // 获取失败，抛出异常
      if (!data) {
        throw new Error('refreshToken is failed')
      }
      // 重新设置token
      return true
    } catch (error: Error | any) {
      if (retryCount >= MAX_RETRY || !error.response || error.response.code !== 401) {
        return false
      }
      // 等待一段时间进行重试
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL))
      return refreshTokenFn(retryCount + 1)
    }
  } else {
    return false
  }
}
export default service
