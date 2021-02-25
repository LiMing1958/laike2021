<template>
  <div class="header">
    <div class="main">
      <div class="header-left">
        <span @click="toHome">来客推商城欢迎您</span>
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
        <span class="iconfont">&#xe75c;</span>
        <span>下载APP</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headList',
  props: {
    msg: String
  },
  methods: {
    toHome () {
      this.$store.commit('toHome', 'HomeList')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /*@media screen and (max-width:1200px) {*/
  /*  .child {*/
  /*    width: 100%!important;*/
  /*    height: 45% !important;*/
  /*    !*max-height:400px;*!*/
  /*  }*/
  /*  .mainContent{*/
  /*    !*min-height: 250px!important;*!*/
  /*    height: 10px!important;*/
  /*  }*/
  /*}*/
.header {
  height: 36px;
  width: 100%;
  background-color: rgb(51,51,51);
  line-height: 36px;
  min-width: 600px;
  margin-bottom: 30px;
  .main {
    max-width: 1220px;
    min-width: 660px;
    margin: 0 auto;
    span {
      color: #B8B8B8;
      font-size: 12px;
      cursor: pointer;
    }
    .header-left {
      float: left;
    }
    .header-right {
      float: right;
      .iconfont {
        font-size: 16px!important;
      }
      i {
        color: #B8B8B8;
        margin: 0 6px
      }
    }
  }
}
</style>
