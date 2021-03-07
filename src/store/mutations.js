export default {
  setIsOpenChat (state, isChat) {
    state.isOpenChat = isChat
  },
  setRequestData (state, type) {
    state.requestDataType = type
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
