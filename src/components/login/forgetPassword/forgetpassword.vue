<template>
  <div class="longin-container-box">
    <div class="header">
     找回密码
    </div>
    <div class="form-list">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback prop="tel">
          <a-input v-model.number="ruleForm.tel" placeholder="请输入手机号"/>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="PhoneVerificationCode">
          <a-input style="width: 68.75%;" v-model.number="ruleForm.PhoneVerificationCode" type="password" autocomplete="off" placeholder="手机验证码" />
          <span class="yanzhengma" @click="getTelCode">
          获取验证码
        </span>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="newPass">
          <a-input style="height: 45px;" v-model.number="ruleForm.newPass" placeholder="设置密码（6-16位数的新密码）"/>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="checkPass">
          <a-input style="height: 45px;" v-model.number="ruleForm.checkPass" placeholder="再次输入密码"/>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="VerificationCode">
          <a-input style="width: 60%;" v-model.number="ruleForm.VerificationCode" placeholder="验证码"/>
          <span class="yanzhengma" @click="getVerificationCode">
          <img style="height: 100%;width: 100%;" :src="$store.state.sengForgetCodeObj.codeUrl" alt="">
        </span>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 0 }">
          <a-button type="primary" style="font-weight: bold;width: 100%;height: 45px;background-color: #d4282d;border: none;margin-top: 20px;" @click="submitForm('ruleForm')">
            保存
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
    const validatePass2 = (rule, value, callback) => {
      clearTimeout(timerPass)
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      timerPass = setTimeout(() => {
        if (value.toString().length < 6 || value.toString().length > 16) {
          callback(new Error('请输入6-16位数密码'))
        } else {
          callback()
        }
      }, 500)
    }
    // 再次输入密码校验
    let validatePassword
    const validatePass = (rule, value, callback) => {
      clearTimeout(validatePassword)
      if (value === '') {
        callback(new Error('请再次输入新密码！'))
      }
      validatePassword = setTimeout(() => {
        if (this.ruleForm.checkPass !== this.ruleForm.newPass) {
          callback(new Error('两次输入的密码不一致，请重新输入！'))
        } else {
          callback()
        }
      }, 800)
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
      component: 'VerificationCodeLogin',
      fontweight: 1,
      VerificationCodeUrl: null,
      telStatus: true,
      verificationCodeObj: null,
      codeUrl: null,
      ruleForm: {
        newPass: '',
        checkPass: '',
        tel: '',
        PhoneVerificationCode: '',
        VerificationCode: ''
      },
      rules: {
        checkPass: [{ validator: validatePass, trigger: 'change' }],
        newPass: [{ validator: validatePass2, trigger: 'change' }],
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
    getVerificationCode () {
      this.$emit('getCode')
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            module: 'app_pc',
            action: 'login',
            m: 'forgotpassword',
            phone: this.ruleForm.tel,
            keyCode: this.ruleForm.PhoneVerificationCode,
            password: this.ruleForm.checkPass,
            language: null
          }
          api.forgetPassword(params).then(res => {
            if (res.data.code === 113) {
              this.$message.error(res.data.message)
            } else if (res.data.code === 217) {
              this.$message.error(res.data.message)
            } else if (res.data.code === 103) {
              this.$message.error(res.data.message)
            } else {}
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getTelCode () {
      if (this.telStatus) {
        const params = {
          module: 'app_pc',
          action: 'login',
          m: 'forget_zhanghao',
          phone: this.ruleForm.tel
        }
        api.getTelCode(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('发送成功，请输入手机验证码！')
          } else
          if (res.data.code === 113) {
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
