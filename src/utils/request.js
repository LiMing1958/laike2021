import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 3 * 1000
})
service.interceptors.request.use(config => {
  if (store.state.requestDataType) {
    config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  } else { // 客服留言所需数据类型
    config.headers = {
      'Content-Type': 'application/json'
    }
  }
  return config
}, error => {
  Promise.reject(error)
})
service.interceptors.response.use(response => {
  return response
})
export default service
