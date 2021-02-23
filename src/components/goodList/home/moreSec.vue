<template>
  <div class="box">
    <div class="SecondTop">
      <div class="top-content">
        <div class="top-content-left">
          <img src="../../../assets/images/Seconds_icon.png" alt="">
          <img src="../../../assets/images/Seconds2_icon.png" alt="">
        </div>
        <div class="top-content-right">
          <h2>{{SecStatus}}</h2>
          <div class="timer">
            <timer></timer>
<!--            <overtime v-if="isShow === 0"></overtime>-->
<!--            <time-one :endTime="starttime" v-if="isShow === 2"></time-one>-->
<!--            <time-two :endTime="starttime" v-if="isShow === 3"></time-two>-->
<!--            <time-three :endTime="starttime" v-if="isShow === 4"></time-three>-->
<!--            <time-four :endTime="starttime" v-if="isShow === 5"></time-four>-->
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="time-list">
        <ul>
          <li v-for="item in timeList" :key="item.name" :class="{seconding: item.type === 1}" @click.stop="handleClick(item.type, item.starttime, item.endtime, item.id)">
            <div>
              <h2>{{item.title}}</h2>
              <p>{{ item.type === 1 ? '抢购中' : item.type === 2 ? '即将开枪' : '已结束' }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in list" :key="item.pro_id">
            <div class="imgBox">
              <img :src="item.imgurl" alt="">
              <div class="coverContent" v-if="item.type === 0">已结束</div>
              <div class="coverContent" v-if="item.type === 2">即将开始</div>
            </div>
            <div class="list-MsgBox">
              <p>{{item.product_title}}</p>
              <p>
                <img :src="item.logo_img" alt="">
                <span>{{item.mch_name}}</span>
              </p>
              <label for="price" style="color: red">抢购价</label>
              <p id="price">{{'￥' + item.seconds_price}}</p>
              <p class="old-price">{{item.price}}</p>
              <p @click="panicBuying" class="panic-buying" v-if="item.type === 1">立即抢购</p>
              <a-modal v-model="visible"
                       :footer="null"
                       width="762px"
                       height="400px"
                       :centered=true>
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
              <p class="over-Time" v-if="item.type === 0">已结束</p>
              <p class="over-Time" v-if="item.type === 2">即将开抢</p>
              <p class="had-buy">已有 <span>{{parseInt(item.max_num) - item.num}}</span> 人抢购成功</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="Pagination">
      <a-pagination v-model="current" :total="length" show-less-items />
    </div>
  </div>
</template>

<script>
import timer from './timer'
// import overtime from './overtime'
// import TimeOne from './beforetime1'
// import TimeTwo from './beforetime2'
// import TimeThree from './beforetime3'
// import TimeFour from './beforetime4'
import api from '../../../api/api'
// import Event from '../../../assets/js/event'
export default {
  name: 'secondcontainer',
  data () {
    return {
      visible: false,
      timeList: null,
      list: null,
      length: 1,
      current: 1,
      isShow: 1,
      starttime: null,
      SecStatus: '距离结束',
      params: {
        id: null
      }
    }
  },
  mounted () {
    this.getTime()
  },
  components: {
    timer
    // overtime,
    // TimeOne,
    // TimeTwo,
    // TimeThree,
    // TimeFour
  },
  methods: {
    getTime () {
      const params = {
        module: 'app_pc',
        action: 'seckill',
        m: 'seckillhome',
        page: this.current,
        id: this.params.id
      }
      api.getSecondTimeAPI(params).then(res => {
        this.timeList = res.data.time_list
        this.list = res.data.list
        this.length = res.data.list.length
        console.log(res)
      })
    },
    panicBuying () {
      this.visible = true
    },
    handleClick (type, starttime, endtime, id) {
      this.params.id = id
      this.getTime()
      if (type === 0) {
        this.SecStatus = '已结束'
        this.$store.commit('secondTime', endtime)
        // alert(this.$store.state.secondTime)
      } else if (type === 1) {
        this.SecStatus = '距离结束'
        this.isShow = 1
      } else {
        this.SecStatus = '距离开始'
        this.starttime = starttime
        if (id === '32') {
          this.isShow = 2
        } else if (id === '33') {
          this.isShow = 3
        } else if (id === '34') {
          this.isShow = 4
        } else if (id === '35') {
          this.isShow = 5
        }
      }
      const a = window.event.target.nodeName
      if (a === 'LI') {
        const children = window.event.target.parentNode.childNodes
        const length = children.length
        for (let i = 0; i < length; i++) {
          children[i].style.backgroundColor = '#ffffff'
          children[i].childNodes[0].childNodes[0].style.color = '#020202'
          children[i].childNodes[0].childNodes[0].style.fontWeight = 'normal'
          children[i].childNodes[0].childNodes[1].style.color = '#020202'
        }
        window.event.target.style.backgroundColor = '#d4282d'
        window.event.target.childNodes[0].childNodes[0].style.color = '#ffffff'
        window.event.target.childNodes[0].childNodes[0].style.fontWeight = 'bold'
        window.event.target.childNodes[0].childNodes[1].style.color = '#ffffff'
      } else {
        const children = window.event.target.parentNode.parentNode.parentNode.childNodes
        const length = children.length
        for (let i = 0; i < length; i++) {
          children[i].style.backgroundColor = '#ffffff'
          children[i].childNodes[0].childNodes[0].style.color = '#020202'
          children[i].childNodes[0].childNodes[0].style.fontWeight = 'normal'
          children[i].childNodes[0].childNodes[1].style.color = '#020202'
        }
        window.event.target.parentNode.parentNode.style.backgroundColor = '#d4282d'
        window.event.target.parentNode.childNodes[0].style.color = '#ffffff'
        window.event.target.parentNode.childNodes[0].style.fontWeight = 'bold'
        window.event.target.parentNode.childNodes[1].style.color = '#ffffff'
      }
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
    .Pagination {
      width: 100%;
      margin-top: 44px;
      text-align: center;
    }
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
    .container {
      max-width: 1275px;
      min-width: 780px;
      margin: 0 auto;
      padding-top: 30px;
      /*background-color: #d2ffa8;*/
      .time-list {
        margin-bottom: 25px;
        ul {
          width: 100%;
          height: 69px;
          display: flex;
          .seconding {
            background-color: #d4282d;
            h2 {
              color: #FFFFFF;
              font-size: 22px;
              font-weight: bold;
            }
            p {
              color: white;
            }
          }
          li {
            float: left;
            flex: 1;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            h2 {
              font-size: 22px;
              font-weight: 400;
              color: #020202;
            }
            p {
              text-align: center;
              font-size: 14px;
              font-weight: 400;
              color: #020202;
            }
          }
        }
      }
      .list {
        overflow: hidden;
        li {
          width: 628px;
          height: 300px;
          float: left;
          padding-left: 25px;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          .imgBox {
            position: relative;
            .coverContent {
              font-size: 18px;
              color: #ffffff;
              line-height: 140px;
              text-align: center;
              position: absolute;
              width: 140px;
              height: 140px;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              display: block;
              margin: auto;
              border-radius: 140px;
              background-color: rgba(0, 0, 0, 0.4);
            }
          }
          &:nth-child(1) {
            margin-bottom: 20px;
          }
          &:nth-child(2) {
            float: right;
            margin-bottom: 20px;
          }
          &:nth-child(3) {
            float: left;
          }
          &:nth-child(4) {
            float: right;
          }
          img {
            width: 246px;
            height: 253px;
          }
          .list-MsgBox {
            width: 357px;
            height: 253px;
            padding-left: 30px;
            /*background-color: #c2f6ff;*/
            p:nth-child(1) {
              font-size: 16px;
              color: #020202;
            }
            p:nth-child(2) {
              height: 25px;
              margin-top: 8px;
              margin-bottom: 44px;
              /*background-color: #ecffc3;*/
              /*line-height: 20px;*/
              position: relative;
              img {
                width: 20px;
                height: 20px;
              }
              span {
                display: inline-block;
                position: absolute;
                height: 20px;
                top: 2.5px;
                left: 25px;
                /*background-color: #ffead9;*/
              }
            }
            label {
              float: left;
              margin-top: 10px;
              margin-right: 3px;
            }
            #price {
              /*float: left;*/
              font-weight: bold!important;
              font-size: 24px!important;
              color: #D4282D!important;
            }
            .old-price {
              text-decoration: line-through;
              color: #888888;
              font-size: 14px;
              font-weight: 400;
            }
            .over-Time {
              outline: 0;
              border: 0;
              width: 180px;
              height: 32px;
              background: #b8b8b8;
              border-radius: 3px;
              font-size: 16px;
              font-weight: 400;
              line-height: 32px;
              text-align: center;
              color: #FFFFFF;
              margin-top: 29px;
              cursor: not-allowed;
            }
            .panic-buying {
              outline: 0;
              border: 0;
              width: 180px;
              height: 32px;
              background: #D4282D;
              border-radius: 3px;
              font-size: 16px;
              font-weight: 400;
              line-height: 32px;
              text-align: center;
              color: #FFFFFF;
              margin-top: 29px;
              cursor: pointer;
            }
            .had-buy {
              width: 180px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              span {
                color: red;
              }
            }
          }
        }
      }
    }
  }
</style>
