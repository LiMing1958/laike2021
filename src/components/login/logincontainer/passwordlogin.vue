<template>
  <div class="password-login-box">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback prop="tel">
        <a-input v-model="ruleForm.tel" type="text" autocomplete="off" placeholder="账号/手机号" />
      </a-form-model-item>
      <a-form-model-item has-feedback prop="checkPass">
        <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="密码" />
      </a-form-model-item>
      <a-form-model-item has-feedback prop="VerificationCode">
        <a-input style="width: 60%;" v-model.number="ruleForm.VerificationCode" placeholder="验证码"/>
        <span class="yanzhengma" @click="$emit('getCodeObj')">
          <img style="height: 100%;width: 100%;" :src="$store.state.sengForgetCodeObj.codeUrl" alt="">
        </span>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 0 }">
        <a-button type="primary" style="font-weight: bold;width: 100%;height: 45px;background-color: #d4282d;border: none;margin-top: 20px;" @click="submitForm('ruleForm')">
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div class="AutoLogin-ForgotPassword">
      <div>
        <input v-model="loginType" type="checkbox" name="login" id="login" style="margin-right: 8px;cursor: pointer;">
        <label for="login" style="color: #999999;cursor: pointer;">自动登录</label>
        <span style="float: right;color: #999999;cursor: pointer" @click="forfetpasssword">忘记密码</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'passwordlogin',
  props: ['VerificationCodeUrl', 'code'],
  data () {
    // 验证码
    let TimerVirificationCode
    const verificationcode = (rule, value, callback) => {
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
    // 账号和手机号
    const AccountMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号或手机号'))
      } else {
        callback()
      }
    }

    let timerPass
    const validatePass2 = (rule, value, callback) => {
      clearTimeout(timerPass)
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      timerPass = setTimeout(() => {
        if (value.toString().length < 6) {
          callback(new Error('您输入的密码小数6位，请重新输入！'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      loginType: false,
      ruleForm: {
        tel: '',
        checkPass: '',
        VerificationCode: ''
      },
      rules: {
        tel: [{ validator: AccountMobile, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        VerificationCode: [{ validator: verificationcode, trigger: 'change' }]
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
            m: 'login',
            access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
            phone: this.ruleForm.tel,
            password: this.ruleForm.checkPass,
            imgCode: this.ruleForm.VerificationCode,
            language: null
          }
          api.login(params).then(res => {
            this.$emit('getCodeImg')
            if (res.data.code === 200) {
              localStorage.setItem('token', res.data.data.access_id)
              this.$store.commit('setUserName', res.data.data.user_name)
              this.$message.success('登录成功！')
              this.$router.push('/')
            } else if (res.data.code === 114) {
              this.$message.error(res.data.message)
            }
            console.log(res.data.code)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
     float: right;
     width: 100px;
     height: 45px;
     cursor: pointer;
     /*background-color: #36ff4d;*/
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
