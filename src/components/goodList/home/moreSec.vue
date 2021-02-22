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
            <timer v-if="isShow === 1"></timer>
            <overtime v-if="isShow === 0"></overtime>
            <beforetime :endTime="endtime" v-if="isShow === 2"></beforetime>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="time-list">
        <ul>
          <li v-for="item in timeList" :key="item.name" :class="{seconding: item.type === 1}" @click.stop="handleClick(item.type, item.endtime, item.id)">
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
              <p class="over-Time" v-if="item.type === 0">已结束</p>
              <p class="over-Time" v-if="item.type === 2">即将开始</p>
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
import overtime from './overtime'
import beforetime from './beforetime1'
import api from '../../../api/api'
// import Event from '../../../assets/js/event'
export default {
  name: 'secondcontainer',
  data () {
    return {
      timeList: null,
      list: null,
      length: 1,
      current: 1,
      isShow: 1,
      endtime: null,
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
    timer,
    overtime,
    beforetime
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
      alert('555')
    },
    handleClick (type, endtime, id) {
      this.params.id = id
      this.getTime()
      if (type === 0) {
        this.SecStatus = '已结束'
        this.isShow = 0
      } else if (type === 1) {
        this.SecStatus = '距离结束'
        this.isShow = 1
      } else {
        this.SecStatus = '距离开始'
        this.endtime = endtime
        this.isShow = 2
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
