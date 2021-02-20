<template>
  <div class="box">
    <div class="SecondTop">
      <div class="top-content">
        <div class="top-content-left">
          <img src="../../../assets/images/Seconds_icon.png" alt="">
          <img src="../../../assets/images/Seconds2_icon.png" alt="">
        </div>
        <div class="top-content-right">
          <h2>距离结束</h2>
          <div class="timer">
            <timer></timer>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      333
    </div>
  </div>
</template>

<script>
import timer from './timer'
import api from '../../../api/api'
export default {
  name: 'secondcontainer',
  data () {
    return {
      time_list: null
    }
  },
  created () {
    this.getTime()
  },
  components: {
    timer
  },
  methods: {
    getTime () {
      const params = {
        module: 'app_pc',
        action: 'seckill',
        m: 'seckillhome',
        page: 1
      }
      api.getSecondTimeAPI(params).then(res => {
        // this.time_list = res.data.data.time_list
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .box {
    width: 100%;
    min-height: calc( 100vh - 762px );
    padding: -20px 0px 0px 0px!important;
    margin: 0 auto;
    .SecondTop {
      width: 100%;
      height: 90px;
      background-color: #f3dfc4;
      /*margin: 0 auto;*/
      .top-content {
        width: 620px;
        height: 90px;
        margin: 0 auto;
        line-height: 90px;
        /*background-color: #ff016f;*/
        .top-content-left {
          float: left;
          img {
            margin-right: 12px;
            &:nth-child(2) {
              width: 152px;
              height: 33px;
              margin-bottom: 11px;
            }
          }
        }
        .top-content-right {
          float: right;
          width: 390px;
          /*background-color: #ffd656;*/
          h2 {
            float: left;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #333333;
            padding-right: 14px;
          }
          .timer {
            float: left;
          }
        }
      }
    }
  }
</style>
