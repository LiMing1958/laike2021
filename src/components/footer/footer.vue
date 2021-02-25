<template>
  <div class="box">
    <div>
      <ul>
        <li>
          <img src="../../assets/images/customer_service.png" alt="">
          <h5>7X9小时在线客服</h5>
          <h6>Online customer service</h6>
        </li>
        <li>
          <img src="../../assets/images/lightning_delivery.png" alt="">
          <h5>闪电发货</h5>
          <h6>Lightning delivery</h6>
        </li>
        <li>
          <img src="../../assets/images/app_code.png" alt="" style="width: 100px;height: 100px;">
          <h5 style="font-size: 14px;
                    line-height: 14px;
                    margin-top: 20px;">
            扫码下载来客推APP
          </h5>
        </li>
        <li>
          <img src="../../assets/images/wx_code.png" alt=""  style="width: 100px;height: 100px;">
          <h5 style="font-size: 14px;
                    line-height: 14px;
                    margin-top: 20px;">
            扫码体验来客小程序
          </h5>
        </li>
      </ul>
    </div>
    <div>
        <p>
          <span>
            <a href="https://v3pro.houjiemeishi.com/PC/index.html?module=my&action=aboutUs&type=aboutus">关于我们</a>
          </span>
          <span>
            <a href="https://v3pro.houjiemeishi.com/PC/index.html?module=my&action=aboutUs&type=shopping_process">新手指南</a>
          </span>
          <span>
            <a href="https://v3pro.houjiemeishi.com/PC/index.html?module=my&action=aboutUs&type=payment_method">支付方式</a>
          </span>
          <span>
            <a href="https://v3pro.houjiemeishi.com/PC/index.html?module=my&action=aboutUs&type=after_sales_issues">帮助中心</a>
          </span>
          <span>
            <a href="https://v3pro.houjiemeishi.com/PC/index.html?module=my&action=aboutUs&type=return_policy">售后服务</a>
          </span>
        </p>
        <p>
          <a href="https://www.laiketui.com/">Copyright © 2021 壹拾捌号网络版权所有[官方网站] 湘ICP备17020355号</a>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headList',
  props: {
    msg: String
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
.box {
  height: 288px;
  min-width: 1300px;
  width: 100%;
  background-color: #333333;
  margin-top: 168px;
  /*position: fixed;*/
  /*bottom: 0;*/
  div:nth-child(1) {
    width: 100%;
    height: 213px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    /*padding-bottom: 40px;*/
    border-bottom: 1px solid #4D4D4D;
    li {
      width: 300px;
      height: 134px;
      float: left;
      text-align: center;
      h5 {
        font-size: 16px;
        line-height: 16px;
        color: #DDDDDD;
        margin-top: 25px;
      }
      h6 {
        font-size: 14px;
        line-height: 12px;
        color: #999999;
        margin-top: 9px;
      }
      /*background-color: #ff7876;*/
      &:nth-child(n + 2) {
        border-left: 1px solid #4D4D4D;
      }
    }
  }
  div:nth-child(2) {
    width: 100vw;
    height: 75px;
    box-sizing: border-box;
    text-align: center;
    padding-top: 20px;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*line-height: 88px;*/
    p {
      font-size: 12px;
      margin-bottom: 15px;
      span:nth-child(n + 2) {
        border-left: 1px solid #999999;
        margin-left: 5px;
        padding-left: 5px;
      }
      a {
        color: #999999;
      }
    }
  }
}
</style>
