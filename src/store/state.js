export default {
  isOpenChat: false,
  requestDataType: true,
  showPage: 'HomeList',
  secondTime: null,
  endtime: null,
  activeKey: 0,
  products: null,
  cartList: null,
  loginStatus: 0,
  loginComponent: 'LoginContainer',
  isShowForgetPassword: true,
  sengForgetCodeObj: null,
  UserName: localStorage.getItem('username') ? localStorage.getItem('username') : null
}
