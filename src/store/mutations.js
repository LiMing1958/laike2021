export default {
  setUserName (state, username) {
    state.UserName = username
    localStorage.setItem('username', username)
  },
  sendverificationcode (state, obj) { // 向忘记密码兄弟组件传值
    state.sengForgetCodeObj = obj
  },
  changeForgetPasswordShow (state, isShowForgetPassword) {
    state.isShowForgetPassword = isShowForgetPassword
  },
  ChangeLoginComponent (state, loginComponent) { // 登录页面组件切换
    state.loginComponent = loginComponent
  },
  setIsOpenChat (state, isChat) {
    state.isOpenChat = isChat
  },
  setRequestData (state, type) {
    state.requestDataType = type
  },
  toCartPage (state, showPage) {
    state.showPage = showPage
  },
  toMoreSecPage (state, showPage) {
    state.showPage = showPage
  },
  toHome (state, showPage) {
    state.showPage = showPage
  },
  toCouponCenter (state, showPage) {
    state.showPage = showPage
  },
  toProductDetailsPage (state, showPage) {
    state.showPage = showPage
  },
  sendProductDetails (state, products) {
    state.products = products
  },
  secondTime (state, secondTime) {
    state.secondTime = secondTime
  // state.endtime = secondTime.current_time[0].endtime
  },
  setActiveKey (state, key) {
    state.activeKey = key
  },
  getCartList (state, cartList) {
    state.cartList = cartList
  }
}
