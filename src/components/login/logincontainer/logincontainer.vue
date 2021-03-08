<template>
  <div class="longin-container-box">
    <div class="header">
      <ul>
        <li :class="{password: fontweight === 1}" @click="PasswordLogin">密码登录</li>
        <li :class="{password: fontweight === 0}" @click="VerificationCodeLogin">验证码登录</li>
      </ul>
    </div>
    <div class="form-list">
      <component :is="components" :VerificationCodeUrl="VerificationCodeUrl" :code="code" @getCodeImg="getVerificationCode"></component>
    </div>
    <div class="footer">
      <span>还不是会员？</span>
      <span>立即注册</span>
    </div>
  </div>
</template>

<script>
import PasswordLogin from './passwordlogin'
import VerificationCodeLogin from './verificationcodelogin'
import api from '@/api/api'
export default {
  name: 'logincontainer',
  data () {
    return {
      components: 'PasswordLogin',
      fontweight: 1,
      VerificationCodeUrl: null,
      code: null
    }
  },
  components: {
    PasswordLogin,
    VerificationCodeLogin
  },
  mounted () {
    this.getVerificationCode()
  },
  methods: {
    getVerificationCode () {
      const params = {
        module: 'app_pc',
        action: 'login',
        m: 'get_code'
      }
      api.getVerificationCode(params).then(res => {
        console.log('儿子')
        this.VerificationCodeUrl = 'https://v3pro.houjiemeishi.com/' + res.data.data.code_img
        this.code = res.data.data.code
      })
    },
    PasswordLogin () {
      this.components = 'PasswordLogin'
      this.fontweight = 1
    },
    VerificationCodeLogin () {
      this.components = 'VerificationCodeLogin'
      this.fontweight = 0
    }
  }
}
</script>

<style scoped lang="scss">
.longin-container-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background-color: #93ff96;*/
  .header {
    width: 100%;
    height: 95px;
    text-align: center;
    /*background-color: #e081ff;*/
    .password {
      font-weight: bold;
      color: #27282e;
    }
    li {
      display: inline-block;
      font-size: 18px;
      margin-top: 45px;
      cursor: pointer;
      color: #999999;
      &:nth-child(1) {
        font-family: "Microsoft YaHei";
        margin-right: 15px;
        padding-right: 15px;
        border-right: 1px solid #DCDFE6;
      }
    }
  }
  .form-list {
    width: 80%;
    height: calc(100% - 150px);
    margin: 0 auto;
    /*background-color: #e7fff3;*/
  }
  .footer {
    width: 100%;
    height: 61px;
    font-size: 16px;
    position: absolute;
    text-align: center;
    line-height: 61px;
    bottom: 0;
    background-color: #f8f8f8;
    span:nth-child(1) {
      color: #999999;
    }
    span:nth-child(2) {
      color: #d4282d;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
