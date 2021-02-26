<template>
  <div class="second-box" id="sec">
    <div class="pc-img">
      <img :src="secondsList.pcAdImg" alt="">
      <div class="current-time">
        <p>
          <span>{{secondsList.current_time[0].title}}</span>
          <span>点场</span>
        </p>
        <p class="miaosha-back"></p>
        <p>倒计时</p>
        <p>
          <timer :timer="ramaintime"></timer>
        </p>
        <button @click="moreSec">更多抢购></button>
      </div>
    </div>
    <div class="second-list">
      <ul>
        <li v-for="item in secondsList.pro_list" :key="item.id">
          <img :src="item.imgurl" alt="">
          <div class="imgMsg">
            <p>
              {{item.product_title}}
            </p>
            <p>
              <img :src="item.logo" alt="">
              <span>{{item.mch_name}}</span>
            </p>
            <p>
              <span>
                <a-progress :percent="item.is_delete > 0 ? (item.is_delete / item.max_num) * 100 : 45"/>
              </span>
              <span>已抢购 {{item.is_delete}} 件</span>
            </p>
            <p>
              <span>抢购价</span>
              <span>{{"￥" + item.seconds_price}}</span>
              <span>{{"￥" + item.price}}</span>
            </p>
            <p>
              <a-button type="danger" @click="handleSecClick()" >
                立即抢购
              </a-button>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <a-modal v-model="visible"
             :footer="null"
             width="762px"
             height="400px"
             :centered=true
             @cancel="handleSetBodyStyle">
      <div style="text-align: center">
        <img class="modal-code" src="data:image/png;base64,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" alt="">
        <h2 style="font-size: 20px!important;
                             font-weight: bold!important;
                             color: #000000!important;
                              padding-top: 20px!important;">
          扫码进入小程序立即抢购
        </h2>
      </div>
    </a-modal>
  </div>
</template>

<script>
import timer from './timer'
export default {
  name: 'secondslist',
  props: ['secondsList'],
  data () {
    return {
      visible: false,
      showPage: 'HomeList'
    }
  },
  computed: {
    ramaintime: function () {
      const endTime = this.secondsList.current_time[0].endtime
      // const startTime = this.secondsList.current_time[0].starttime
      const endTimeArr = endTime.split(':')
      // const startTimeArr = startTime.split(':')
      var endtime = parseInt(endTimeArr[0]) * 3600 + parseInt(endTimeArr[1]) * 60 + parseInt(endTimeArr[2])
      // var starttime = parseInt(startTimeArr[0]) * 3600 + parseInt(startTimeArr[1]) * 60 + parseInt(startTimeArr[2])
      const curDate = new Date()
      var curHour = curDate.getHours()
      var curMinute = curDate.getMinutes()
      var curSec = curDate.getSeconds()
      var starttime = curHour * 3600 + curMinute * 60 + curSec
      return endtime - starttime - 0.6
    }
  },
  components: {
    timer
  },
  methods: {
    handleSecClick () {
      this.visible = !this.visible
    },
    moreSec () {
      console.log(this.secondsList)
      this.showPage = 'MoreSec'
      this.$store.commit('toMoreSecPage', this.showPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.second-box {
  width: 1275px;
  margin: 0 auto;
  overflow: hidden;
  /*background-color: #a2ff35;*/
  .pc-img {
    float: left;
    position: relative;
    .current-time {
      text-align: center;
      position: absolute;
      width: 200px;
      height: 280px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      /*background-color: rgba(0, 0, 0, 0.4);*/
      p:nth-child(1) {
        color: #705747;
        margin-top: 40px;
        span:nth-child(1) {
          font-size: 30px;
        }
      }
      p:nth-child(2) {
        display: inline-block;
        margin-top: 10px;
        width: 28px;
        height: 3px;
        background: #BD946D;
      }
      p:nth-child(3) {
        margin-top: 15px;
        font-size: 16px;
      }
      p:nth-child(4) {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #705C47;
        font-size: 18px;
        margin-top: 10px;
      }
      button {
        margin-top: 40px;
        width: 112px;
        height: 32px;
        background: #BD946D;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 400;
        border: 0;
        outline: 0;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }
  .second-list {
    width: calc(100% - 252px);
    height: 399px;
    /*background-color: #55ff7c;*/
    float: left;
    overflow: hidden;
    li {
      width: 511.5px;
      height: 199.5px;
      /*line-height: 199.5px;*/
      padding: 0 29px 0 15px;
      float: left;
      overflow: hidden;
      display: flex;
      align-items: center;
      &:nth-child(1),&:nth-child(2) {
        border-top: 1px solid #E6E6E6;
        border-right: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
      }
      &:nth-child(3),&:nth-child(4) {
        border-right: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
      }
      img {
        width: 160px;
        height: 150px;
        float: left;
      }
      .imgMsg {
        padding-top: 10px;
        width: 250px;
        height: 100%;
        float: left;
        /*background-color: #edff2b;*/
        p {
          width: 100%;
          height: 25px;
          font-size: 16px;
          font-weight: 400;
          color: #020202;
          line-height: 25px;
          margin: 0px 0 5px 14px;
          /*background-color: #ffb235;*/
          display: flex;
          align-items: center;
          &:nth-child(3) {
            span {
              width: 140px;
              &:nth-child(2) {
                margin-left: 20px;
              }
            }
          }
          &:nth-child(2) {
            span {
              padding-left: 7px;
            }
          }
          &:nth-child(4) {
            span:nth-child(1) {
              color: #D4282D;
              font-size: 14px;
              font-weight: 400;
            }
            span:nth-child(2) {
              font-weight: bold;
              font-size: 24px;
              color: #D4282D;
            }
            span:nth-child(3) {
              margin-top: 5px;
              color: #888888;
              font-size: 14px;
              font-weight: 400;
              padding-left: 10px;
              text-decoration:line-through
            }
          }
          &:nth-child(5) {
            margin-top: 30px;
          }
          img {
            margin-top: 2px;
            width: 20px;
            height: 20px;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            color: #888888;
          }
        }
      }
    }
  }
}
</style>
