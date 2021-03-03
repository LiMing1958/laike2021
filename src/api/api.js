import http from '../utils/http'
export default {
  deleteSearchHistory (params) {
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  getProductsDetail (params) {
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  getcomment (params) { // 获取商品性情页面的评论信息
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  getSearchProducts (params) {
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  getListAPI (params) {
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  receive (params) {
    // 首页领券中心立即领取
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  getCoupon (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getSearchList (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
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
  getCouponCenter (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  putSomeAPI (params) {
    return http.put('/index.php?store_id=1&store_type=6', params)
  },
  deleteListAPI (params) {
    return http.delete('/index.php?store_id=1&store_type=6', params)
  }
}
