<template>
  <div class="second-box">
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
              <a-button type="danger" >
                立即抢购
              </a-button>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import timer from './timer'
export default {
  name: 'secondslist',
  props: ['secondsList'],
  data () {
    return {
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
    moreSec () {
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
