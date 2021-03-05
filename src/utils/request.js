import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 3 * 1000
})
service.interceptors.request.use(config => {
  // const user = {
  //   access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I'
  // }
  // localStorage.setItem('pc_user', JSON.stringify(user))
  // location.pathname = '/PC/index.html'
  if (store.state.requestDataType) {
    // 后台需要formData格式，所以需要用qs插件转换格式
    config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  } else { // 客服留言所需数据类型
    config.headers = {
      'Content-Type': 'application/json'
    }
  }

  console.log(config.headers)

  return config
}, error => {
  Promise.reject(error)
})
service.interceptors.response.use(response => {
  return response
})
export default service
