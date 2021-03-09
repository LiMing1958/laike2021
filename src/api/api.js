import http from '../utils/http'
export default {
  getRegistrationAgreement (params) { // 获取注册协议
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  forgetPassword (params) { // 手机验证码登录
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  codeLogin (params) { // 手机验证码登录
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  login (params) { // 密码登录
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getTelCode (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getVerificationCode (params) { // 登录界面获取验证码
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  deleteSearchHistory (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getProductsDetail (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  buyNow (params) { // 立即购买
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  addToShopCart (params) { // 加入购物车
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getcomment (params) { // 获取商品性情页面的评论信息
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  sendMessage (params) { // 客服留言
    return http.post('https://new-api.meiqia.com/client/tickets_v2?ent_id=130760', params)
  },
  getSearchProducts (params) {
    return http.post('/index.php?store_id=1&store_type=6', params)
  },
  getListAPI (params) {
    return http.get('/index.php?store_id=1&store_type=6', params)
  },
  receive (params) {
    // 首页领券中心立即领取
    return http.post('/index.php?store_id=1&store_type=6', params)
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
