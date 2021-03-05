<template>
  <div id="app">
    <router-view/>
    <div class="toTop" v-show="isShowTop">
      <div class="Contact-Customer-Service">
        <div class="Contact-Customer-Service-box" @click="handleOpenChat">
          <div>
            <!--          用阿里图标时必须设置class="iconfont"-->
            <span class="iconfont">&#xe600;</span>
          </div>
          <div class="Customer-Service-text">联系客服</div>
        </div>
      </div>
      <div class="download-app">
        <div class="download-app-box">
          <div class="iconfont">
            <a-icon type="scan" />
          </div>
          <div class="download-app-text">下载APP</div>
        </div>
        <div class="download-code">
          <span class="jiantou"></span>
          <span class="cover-box">
            <span class="code-box">
              <img src="@/assets/images/app_code.png" width="130px" alt="">
              <p>下载来客电商APP</p>
            </span>
          </span>
        </div>
      </div>
      <div class="scrolltop">
        <div class="scrolltop-box" @click="handleScrollToTop">
          <div class="iconfont">
            <a-icon type="vertical-align-top" />
          </div>
          <div class="scrolltop-text">返回顶部</div>
        </div>
      </div>
    </div>
    <div ref="chat" id="cha" class="chat-customer-server" v-show="isChat">
      <div class="title-nav">
        <p>给我们留言</p>
        <span @click="[isChat = !isChat, isShowTop=!isShowTop, tel=null, messageContent=null]">
          <a-icon type="close" />
        </span>
      </div>
      <div class="chat-container" v-show="isChatcontainer">
        <div class="description-text">
          <p>您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题</p>
        </div>
        <div class="tel">
          <p>电话
            <span>*</span>
          </p>
          <input type="text" v-model="tel" placeholder="请输入电话号码" v-focus>
        </div>
        <div class="message-content">
          <p>留言内容
            <span>*</span>
          </p>
          <textarea v-model="messageContent" placeholder="请输入留言内容"></textarea>
        </div>
        <div class="submit">
          <a-button type="primary" style="width: 280px" @click="submit">
            提交
          </a-button>
        </div>
      </div>
      <div class="MessageSuccess" v-show="isShowMessageSuccess">
        <h1>留言成功</h1>
        <p>我们会尽快联系你</p>
        <a-button type="primary" style="width: 180px;margin-top: 25px;" @click="[isChat=!isChat, isShowTop=!isShowTop]">
          关闭
        </a-button>
        <p class="message-once-again" @click="handleMessageAgain">再次留言</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import mixin from '@/assets/js/scrollTop'
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  name: 'App',
  mixins: [mixin],
  data () {
    return {
      isChat: false,
      isShowTop: true,
      isChatcontainer: true,
      isShowMessageSuccess: false,
      tel: null,
      messageContent: null
    }
  },
  methods: {
    handleMessageAgain () {
      this.isChatcontainer = true
      this.isShowMessageSuccess = false
    },
    handleOpenChat () {
      this.isChat = true
      this.isShowTop = false
      this.isShowMessageSuccess = false
      this.isChatcontainer = true
    },
    submit () {
      this.$store.commit('setRequestData', false)
      const params = {
        channel: 'widget',
        client_info: {
          tel: this.tel
        },
        content: this.messageContent,
        enterprise_id: 130760,
        reserve_token: null,
        track_id: '1nv7cuRXqUeJHHrYHt5134Co5Ez',
        visit_id: '1pKHbXZKnx4zdaRB4uc3RSe5jDK'
      }
      const this_ = this
      api.sendMessage(params).then(res => {
        console.log(res.status)
        if (res.status === 201) {
          this_.$store.commit('setRequestData', true)
          this_.isChatcontainer = false
          this_.isShowMessageSuccess = true
        }
      })
    },
    handleScrollToTop () {
      this.scrolltotop()
    }
  }
}
</script>
<style lang="scss" scoped>
  .chat-customer-server {
    width: 330px;
    height: 510px;
    border-radius: 15px;
    /*box-shadow: rgb(228, 228, 228) 0px 0px 3px 1px;*/
    position: fixed;
    bottom: 10px;
    right: 20px;
    overflow: hidden;
    .title-nav {
      width: 100%;
      height: 65px;
      background-color: #1887ff;
      position: relative;
      p {
        height: 100%;
        font-size: 14px;
        line-height: 65px;
        padding-left: 10px;
        color: #ffffff;
      }
      span {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: #ffffff;
        cursor: pointer;
      }
    }
    .MessageSuccess {
      width: 100%;
      height: calc(100% - 65px);
      box-sizing: border-box;
      position: relative;
      background: rgba(234, 235, 237, 0.8);
      overflow-y: auto;
      text-align: center;
      h1 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
      }
      .message-once-again {
        margin-top: 25px;
        color: black;
        cursor: pointer;
        text-decoration: underline!important;
      }
    }
    .chat-container {
      width: 100%;
      height: calc(100% - 65px);
      box-sizing: border-box;
      position: relative;
      background: rgba(234, 235, 237, 0.8);
      overflow-y: auto;
      .description-text {
        width: 100%;
        height: 64px;
        padding: 16px;
        font-size: 12px;
        line-height: 15px;
        color: rgb(102, 102, 102);
        word-break: break-all;
        white-space: pre-line;
      }
      .tel {
        width: 100%;
        height: 61px;
        margin-bottom: 25px;
        input {
          width: 100%;
          height: 40px;
          padding: 0 15px;
        }
        p {
          padding-left: 16px;
          margin-bottom: 10px;
          span {
            color: #D4282D;
          }
        }
      }
      .message-content {
        width: 100%;
        min-height: 112px;
        textarea {
          width: 100%;
          height: 90px;
          padding: 0 15px;
        }
        p {
          padding-left: 16px;
          margin-bottom: 10px;
          span {
            color: #D4282D;
          }
        }
      }
      .submit {
        width: 100%;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
  .toTop {
    width: 82px;
    height: 210px;
    background-color: #ffffff;
    box-shadow: rgb(228, 228, 228) 0px 0px 5px 2px;
    position: fixed;
    bottom: 150px;
    right: 90px;
    cursor: pointer;
    .Contact-Customer-Service {
      width: 100%;
      height: 33.3%;
      display: flex;
      align-items: center;
      &:hover {
        .iconfont {
          color: #D4282D!important;
        }
        .Customer-Service-text {
          color: #D4282D!important;
        }
      }
      .Contact-Customer-Service-box {
        width: 100%;
        text-align: center;
        .iconfont {
          font-size: 28px;
          color: #666666;
        }
        .Customer-Service-text {
          margin-top: 5px;
          font-size: 14px;
          color: #666666;
        }
      }
    }
    .download-app {
      width: 100%;
      height: 33.3%;
      display: flex;
      align-items: center;
      position: relative;
      &:hover {
        .iconfont {
          color: #D4282D!important;
        }
        .download-app-text {
          color: #D4282D!important;
        }
      }
      &:hover .download-code {
        display: block;
      }
      .download-code {
        width: 150px;
        height: 175px;
        box-shadow: rgb(228, 228, 228) 0px 0px 5px 2px;
        background-color: #ffffff;
        position: absolute;
        left: -165px;
        top: 0;
        display: none;
        .cover-box {
          width: 100%;
          height: 100%;
          position: absolute;
          background-color: #ffffff;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 888;
          .code-box {
            display: block;
          }
        }
        .jiantou {
          display: block;
          width: 30px;
          height: 30px;
          background-color: #ffffff;
          box-shadow: rgb(228, 228, 228) 0px 0px 5px 2px;
          transform: rotate(45deg);
          -ms-transform: rotate(45deg); /* IE 9 */
          -moz-transform: rotate(45deg); /* Firefox */
          -webkit-transform: rotate(45deg); /* Safari and Chrome */
          -o-transform: rotate(45deg); /* Opera */
          position: absolute;
          left: 128px;
          top: 10px;
        }
      }
      .download-app-box {
        width: 100%;
        text-align: center;
        .iconfont {
          font-size: 28px;
          color: #666666;
        }
        .download-app-text {
          margin-top: 5px;
          font-size: 14px;
          color: #666666;
        }
      }
    }
    .scrolltop {
      width: 100%;
      height: 33.3%;
      display: flex;
      align-items: center;
      &:hover {
        .iconfont {
          color: #D4282D!important;
        }
        .scrolltop-text {
          color: #D4282D!important;
        }
      }
      .scrolltop-box {
        width: 100%;
        text-align: center;
        .iconfont {
          font-size: 28px;
          color: #666666;
        }
        .scrolltop-text {
          margin-top: 5px;
          font-size: 14px;
          color: #666666;
        }
      }
    }
  }
</style>
