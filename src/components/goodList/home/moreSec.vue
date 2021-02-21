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
      <div class="time-list">
        <ul>
          <li v-for="item in timelist" :key="item.name" :class="{seconding: item.type === 1}" @click="handleClick(event)">
            <div>
              <h2>{{item.title}}</h2>
              <p>{{ item.type === 1 ? '抢购中' : item.type === 2 ? '未开始' : '已结束' }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in list" :key="item.pro_id">
            <img :src="item.imgurl" alt="">
            <div class="list-MsgBox">
              <p>{{item.product_title}}</p>
              <p>
                <img :src="item.logo_img" alt="">
                <span>{{item.mch_name}}</span>
              </p>
              <label for="price" style="color: red">抢购价</label>
              <p id="price">{{'￥' + item.seconds_price}}</p>
              <p class="old-price">{{item.price}}</p>
              <p @click="panicBuying" class="panic-buying">立即抢购</p>
              <p class="had-buy">已有 <span>{{parseInt(item.max_num) - item.num}}</span> 人抢购成功</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="Pagination">
      <a-pagination v-model="current" :total="list.length" show-less-items />
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
      timelist: null,
      list: null,
      current: '1'
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
        page: this.current
      }
      api.getSecondTimeAPI(params).then(res => {
        this.timelist = res.data.time_list
        this.list = res.data.list
        console.log(res)
      })
    },
    panicBuying () {
      alert('555')
    },
    handleClick () {
      const a = window.event.target.nodeName
      if (a === 'LI') {
        const children = window.event.target.parentNode.childNodes
        for (let i = 0; i < children.length; i++) {
          children[i].style.backgroundColor = '#ffffff'
        }
        window.event.target.style.backgroundColor = '#d4282d'
        window.event.target.style.color = '#2f20ff'
      } else {
        window.event.target.parentNode.parentNode.style.backgroundColor = '#d4282d'
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
