<template>
  <div class="password-login-box">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <slot name="register">
      </slot>
      <a-form-model-item has-feedback prop="tel">
        <a-input v-model.number="ruleForm.tel" placeholder="请输入手机号"/>
      </a-form-model-item>
      <a-form-model-item has-feedback prop="PhoneVerificationCode">
        <a-input style="width: 68.75%;" v-model.number="ruleForm.PhoneVerificationCode" type="password" autocomplete="off" placeholder="手机验证码" />
        <span class="yanzhengma" @click="getTelCode">
          获取验证码
        </span>
      </a-form-model-item>
      <slot name="forgetPassword">
      </slot>
      <a-form-model-item has-feedback prop="VerificationCode">
        <a-input style="width: 60%;" v-model.number="ruleForm.VerificationCode" placeholder="验证码"/>
        <span class="yanzhengma"  @click="$emit('getCodeObj')">
          <img style="height: 100%;width: 100%;" :src="$store.state.sengForgetCodeObj.codeUrl" alt="">
        </span>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 0 }">
        <a-button type="primary" style="width: 100%;height: 45px;background-color: #d4282d;border: none;margin-top: 20px;" @click="submitForm('ruleForm')">
          {{$store.state.loginComponent === 'ForgetPassword' ? '保存' : '登录'}}
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div class="AutoLogin-ForgotPassword">
      <div>
        <span style="float: right;color: #999999;cursor: pointer;" @click="forfetpasssword" v-show="$store.state.isShowForgetPassword">忘记密码</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'verificationcodelogin',
  props: ['VerificationCodeUrl', 'code'],
  data () {
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
    const validatePass = (rule, value, callback) => {
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
    let timeCode
    const validatePass2 = (rule, value, callback) => {
      clearTimeout(timeCode)
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      }
      timeCode = setTimeout(() => {
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
      loginType: false,
      telStatus: true,
      ruleForm: {
        tel: '',
        PhoneVerificationCode: '',
        VerificationCode: ''
      },
      rules: {
        VerificationCode: [{ validator: validatePass, trigger: 'change' }],
        PhoneVerificationCode: [{ validator: validatePass2, trigger: 'change' }],
        tel: [
          { validator: checkAge, trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            module: 'app_pc',
            action: 'login',
            m: 'register',
            access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
            phone: this.ruleForm.tel,
            keyCode: this.ruleForm.PhoneVerificationCode,
            imgCode: this.ruleForm.VerificationCode
          }
          api.codeLogin(params).then(res => {
            if (res.data.code === 216) {
              this.$message.error(res.data.message)
            } else if (res.data.code === 217) {
              this.$message.error(res.data.message)
            } else if (res.data.code === 103) {
              this.$message.error(res.data.message)
            } else {}
            console.log(res)
          })
        } else {
          console.log('error submit!!')
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
    forfetpasssword () {
      this.$store.commit('ChangeLoginComponent', 'ForgetPassword')
    }
  }
}
</script>
<style scoped lang="scss">
 .password-login-box {
  width: 100%;
  height: 100%;
   position: relative;
   /*text-align: center;*/
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
   .AutoLogin-ForgotPassword {
     width: 100%;
     height: 45px;
     margin-top: -13px;
     /*background-color: #ffa719;*/
   }
}
</style>
