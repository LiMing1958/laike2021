import axios from 'axios'
import qs from 'qs'
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 3 * 1000
})
service.interceptors.request.use(config => {
  // config.data = JSON.stringify(config.data)
  // 后台需要formData格式，所以需要用qs插件转换格式
  config.data = qs.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}, error => {
  Promise.reject(error)
})
service.interceptors.response.use(response => {
  return response
})
export default service
