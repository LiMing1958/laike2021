import http from '../utils/http'
export default {
  getListAPI (params) {
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  postFormAPI (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  gethotRecommendAPI (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getSecondTimeAPI (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  putSomeAPI (params) {
    return http.put('/index.php?store_id=1&store_type=6', params)
  },
  deleteListAPI (params) {
    return http.delete('/index.php?store_id=1&store_type=6', params)
  }
}
