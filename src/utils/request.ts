import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_PROXY
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 容错：防止请求地址中有空格
  config.url = config.url?.trim()
  // 统一设置用户身份token
  const user = store.state.user
  if (user && user.token) {
    if (!config) {
      config = {}
    }
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

let isRefreshing = false
// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // 统一处理接口相应错误，比如token过期无效 服务端异常等 自定义状态码
  const status = response.data.status
  // 正确的情况
  if (!status || status === 200) {
    return response
  }
  // 其他错误情况

  // 统一处理登录过期
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('登录已过期，取消停留在此页面或者重新登录', '登陆过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      // 清除本地过期的登录信息
      store.commit('setUser', null)
      // 跳转到登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })
    // 抛出异常
    return Promise.reject(response)
  }
  // 其他错误情况
  ElMessage.error(response.data.msg || '请求失败，请稍后再试')
  return Promise.reject(response)
}, function (error) {
  // http状态码
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default <T= any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
