<template>
  <div class="login-box">
    <div class="header">
      <div class="logo">
        <router-link to="/">
          <div class="logo-img">
            <img src="@/assets/images/logo.png" alt="">
          </div>
        </router-link>
        <div class="right-nav-msg">
          <span @click="toHome">
            <router-link to="/">
            <span class="icon-home"><a-icon type="home" /></span>
            <span class="icon-home">商城首页</span>
            </router-link>
             <span class="fenge">|</span>
          </span>
          <span>
            <span class="iconfont">&#xe75c;</span>
            <span>下载APP</span>
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="login-register-box">
        <component :is="components"></component>
      </div>
    </div>
    <div class="footer">
      <div class="footer-container">
        <ul>
          <li>关于我们</li>
          <li>新手指南</li>
          <li>支付方式</li>
          <li>帮助中心</li>
          <li>售后服务</li>
        </ul>
        <p>
          Copyright © 2017 壹拾捌号网络版权所有[官方网站]湘ICP备17020355号
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginContainer from './logincontainer/logincontainer'
import register from './register/register'
export default {
  name: 'login',
  data () {
    return {
      components: 'LoginContainer'
    }
  },
  components: {
    LoginContainer,
    register
  },
  methods: {
    toHome () {
      this.$store.commit('toHome', 'HomeList')
    }
  }
}
</script>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100vh;
  background-color: rgb(241, 244, 250);
  .header {
    width: 100%;
    height: 80px;
    line-height: 80px;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #fff;
    .logo {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      /*background-color: #fffca1;*/
      .logo-img {
        width: 174px;
        height: 100%;
        line-height: 80px;
        /*background-color: #ff801c;*/
        float: left;
        img {
          width: 100%;
          height: 51px;
        }
      }
      .right-nav-msg {
        width: 200px;
        height: 100%;
        float: right;
        line-height: 80px;
        font-size: 16px;
        color: #666666;
        text-align: center;
        /*background-color: #90ff8b;*/
        .iconfont {
          margin-right: 5px;
        }
        .icon-home {
          color: #666666;
          margin-right: 5px;
        }
        .fenge {
          margin: 0 10px;
          color: #DCDFE6;
          display: inline-block;
        }
      }
    }
  }
  .container {
    width: 1000px;
    height: 100%;
    background: url('../../assets/images/login_bg1.png') no-repeat;
    background-size: 65%;
    background-position-x: -17.2%;
    background-position-y: 48.5%;
    margin: 0 auto;
    .login-register-box {
      width: 400px;
      min-height: 545px;
      position: relative;
      background: rgba(255,255,255,1);
      /*background: rgb(79, 255, 179);*/
      box-shadow: 0px 2px 26px 0px rgba(81,84,92,0.16);
      position: absolute;
      right: 24%;
      top: 50%;
      z-index: 1000;
      transform: translateY(-50%);
    }
  }
  .footer {
    width: 100%;
    height: 88px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    .footer-container {
      font-size: 12px;
      text-align: center;
      p {
        color: #888888;
        margin-top: 5px;
      }
      li {
        display: inline-block;
        color: #666666;
        margin-bottom: 12px;
        border-right: 1px solid #666666;
        padding: 0 8px;
        cursor: pointer;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
