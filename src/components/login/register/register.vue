<template>
  <div class="longin-container-box">
    <div class="header">
     用户注册
    </div>
    <div class="form-list">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback prop="userId">
          <a-input style="height: 45px;" v-model.number="ruleForm.userId" placeholder="设置账号（6-15位字母或数字）"/>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="checkPass">
          <a-input type="password" style="height: 45px;" v-model.number="ruleForm.checkPass" placeholder="设置密码（6-16位数的新密码）"/>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="tel">
          <a-input v-model.number="ruleForm.tel" placeholder="请输入手机号"/>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="PhoneVerificationCode">
          <a-input style="width: 68.75%;" v-model.number="ruleForm.PhoneVerificationCode" type="password" autocomplete="off" placeholder="手机验证码" />
          <span class="yanzhengma" @click="getTelCode">
          获取验证码
        </span>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="VerificationCode">
          <a-input style="width: 60%;" v-model.number="ruleForm.VerificationCode" placeholder="验证码"/>
          <span class="yanzhengma" @click="$emit('getCode')">
          <img style="height: 100%;width: 100%;" :src="$store.state.sengForgetCodeObj.codeUrl" alt="">
        </span>
        </a-form-model-item>
        <div class="AutoLogin-ForgotPassword">
          <div class="xieyi">
            <input v-model="agreeRegistrationAgreement" type="checkbox" name="login" id="register" style="margin-right: 8px;cursor: pointer;">
            <label for="register" style="color: #999999;cursor: pointer;">注册代表你同意</label>
            <span style="cursor: pointer;color: #999999" @click="getRegistrationAgreement">《来客注册协议》</span>
            <a-modal v-model="visible"
                     title="来客注册协议"
                     :footer="null"
                     width="762px"
                     destroyOnClose="true">
              <div class="content-text" v-html="RegistrationAgreement">
              </div>
            </a-modal>
          </div>
        </div>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 0 }">
          <a-button type="primary" style="font-weight: bold;width: 100%;height: 45px;background-color: #d4282d;border: none;margin-top: 20px;" @click="submitForm('ruleForm')">
            注册
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="footer">
      <span style="cursor: pointer" @click="backToPasswordLogin">返回登录</span>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'logincontainer',
  data () {
    // 校验新密码
    let timerPass
    const validateUserId = (rule, value, callback) => {
      clearTimeout(timerPass)
      if (value === '') {
        callback(new Error('账号不能为空'))
      }
      timerPass = setTimeout(() => {
        if (value.toString().length < 6 || value.toString().length > 15) {
          callback(new Error('请输入6-15位字母或数字'))
        } else {
          callback()
        }
      }, 500)
    }
    // 输入密码校验
    let validatePassword
    const validatePass = (rule, value, callback) => {
      clearTimeout(validatePassword)
      if (value === '') {
        callback(new Error('密码不能为空'))
      }
      validatePassword = setTimeout(() => {
        if (value.toString().length < 6 || value.toString().length > 16) {
          callback(new Error('请输入6-16位字母或数字的密码'))
        } else {
          callback()
        }
      }, 500)
    }
    let checkPending
    const checkAge = (rule, value, callback) => {
      clearTimeout(checkPending)
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      checkPending = setTimeout(() => {
        if (!Number.isInteger(value)) {
          this.telStatus = false
          callback(new Error('请输入正确的手机号码'))
        } else {
          if (value.toString().length < 11 || value.toString().length > 11) {
            this.telStatus = false
            callback(new Error('请输入11位手机号码'))
          } else {
            this.telStatus = true
            callback()
          }
        }
      }, 500)
    }
    let TimerVirificationCode
    const VirificationCode = (rule, value, callback) => {
      clearTimeout(TimerVirificationCode)
      if (value === '') {
        callback(new Error('请输入验证码'))
      }
      TimerVirificationCode = setTimeout(() => {
        if (value.toUpperCase() !== this.$store.state.sengForgetCodeObj.imgCode) {
          callback(new Error('输入的验证码有误，请重新输入'))
        } else {
          callback()
        }
      }, 500)
    }
    let timerPhoneVerificationCode1
    const PhoneVerificationCode1 = (rule, value, callback) => {
      clearTimeout(timerPhoneVerificationCode1)
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      }
      timerPhoneVerificationCode1 = setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入正确的手机验证码'))
        } else if (value.toString().length !== 6) {
          callback(new Error('请输入6位数字手机验证码'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      visible: false,
      agreeRegistrationAgreement: false,
      RegistrationAgreement: null,
      component: 'VerificationCodeLogin',
      fontweight: 1,
      VerificationCodeUrl: null,
      code: null,
      loginType: false,
      telStatus: true,
      ruleForm: {
        userId: '',
        checkPass: '',
        tel: '',
        PhoneVerificationCode: '',
        VerificationCode: ''
      },
      rules: {
        checkPass: [{ validator: validatePass, trigger: 'change' }],
        userId: [{ validator: validateUserId, trigger: 'change' }],
        VerificationCode: [{ validator: VirificationCode, trigger: 'change' }],
        PhoneVerificationCode: [{ validator: PhoneVerificationCode1, trigger: 'change' }],
        tel: [{ validator: checkAge, trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      if (this.agreeRegistrationAgreement) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const params = {
              module: 'app_pc',
              action: 'login',
              m: 'user_register',
              userId: this.ruleForm.userId,
              phone: this.ruleForm.tel,
              imgCode: this.$store.state.sengForgetCodeObj.imgCode,
              keyCode: this.ruleForm.PhoneVerificationCode,
              password: this.ruleForm.checkPass,
              language: null
            }
            api.forgetPassword(params).then(res => {
              if (res.data.code === 200) {
                this.$message.success('恭喜您，注册成功，赶紧登录开心购吧！')
              } else
              if (res.data.code === 113) {
                this.$message.error(res.data.message)
              } else if (res.data.code === 216) {
                this.$message.error(res.data.message)
              } else if (res.data.code === 103) {
                this.$message.error(res.data.message)
              } else if (res.data.code === 203) {
                this.$message.error(res.data.message)
              }
            })
          } else {
            return false
          }
        })
      } else {
        this.$message.error('请勾选注册协议')
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getRegistrationAgreement () {
      const params = {
        module: 'app_pc',
        action: 'login',
        m: 'register_agreement'
      }
      api.getRegistrationAgreement(params).then(res => {
        console.log(res.data)
        this.RegistrationAgreement = res.data.data.content
      })
      this.visible = !this.visible
    },
    getTelCode () {
      if (this.telStatus) {
        const params = {
          module: 'app',
          action: 'user',
          app: 'secret_key',
          phone: this.ruleForm.tel
        }
        api.getTelCode(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('发送成功，请输入手机验证码！')
          } else
          if (res.data.code === 220) {
            this.$message.error(res.data.message)
          }
          console.log(res)
        })
      } else {
        return false
      }
    },
    backToPasswordLogin () {
      this.$store.commit('ChangeLoginComponent', 'LoginContainer')
    }
  }
}
</script>

<style scoped lang="scss">
 ::v-deep .ant-modal-body {
   overflow-y: scroll;
 }
 ::v-deep .ant-modal {
    top: 141px!important;
  }
.longin-container-box {
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  /*background-color: #93ff96;*/
  .yanzhengma {
    display: inline-block;
    color: rgb(2, 2, 2);
    cursor: pointer;
    font-size: 16px;
    float: right;
    width: 100px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: rgb(221, 221, 221);
    img {
      margin-top: -2px;
    }
  }
  ::v-deep .ant-col-14 {
    display: block;
    box-sizing: border-box;
    width: 100%;
    .ant-input {
      height: 45px;
    }
  }
  .header {
    width: 100%;
    height: 120px;
    line-height: 150px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #27282E;
    /*background-color: #e081ff;*/
  }
  .form-list {
    width: 80%;
    /*height: calc(100% - 150px);*/
    margin: 0 auto;
    .AutoLogin-ForgotPassword {
      width: 100%;
      padding-bottom: 10px;
    }
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
  }
}
</style>
