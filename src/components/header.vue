<template>
  <div class="header">
    <div class="header-left">
      <span>来客推商城欢迎您</span>
    </div>
    <div class="header-right">
      <span>【登录】</span>
      <span>【注册】</span>
      <i>|</i>
      <span>我的订单</span>
      <i>|</i>
      <span>我的账户</span>
      <a-icon type="down" />
      <i>|</i>
      <a-icon type="shop" />
      <span>我的店铺</span>
      <i>|</i>
      <a-icon type="message" />
      <span>消息</span>
      <i>|</i>
      <span class="iconfont">&#xe600;</span>
      <span>客服服务</span>
      <i>|</i>
      <span>下载APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  height: 36px;
  width: 100%;
  background-color: rgb(51,51,51);
  line-height: 36px;
  min-width: 622px;
  span {
    color: #B8B8B8;
    font-size: 12px;
    cursor: pointer;
  }
  .header-left {
    float: left;
    margin-left: 5%;
  }
  .header-right {
    float: right;
    margin-right: 5%;
    i {
      color: #B8B8B8;
      margin: 0 6px
    }
  }
}
</style>
