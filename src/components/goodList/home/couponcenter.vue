<template>
    <div class="box">
      <div class="nav-box">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <span class="breadcrumb-link">首页</span>
          </a-breadcrumb-item>
          <span slot="separator">
            <a-icon style="color: #acacac;font-size: 12px" type="right" />
          </span>
          <a-breadcrumb-item>领券中心</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="list-box">
          <div class="list-item" v-for="item in list" :key="item.id">
            <div class="left">
              <div class="half-angle-top"></div>
              <div class="half-angle-bottom"></div>
              <img v-if="item.discount === 0"  src="../../../assets/images/coupon_mj.png" alt="">
              <img v-if="item.discount > 0" src="../../../assets/images/coupon_zk.png" alt="">
              <div class="imgMsg">
                <p>
                  <span :class="{spLeft: item.money > 0, spRight: item.discount > 0}">
                    {{item.money > 0 ? '￥' : item.discount}}
                  </span>
                  <span :class="{spRight: item.money > 0, spLeft: item.discount > 0, zright: item.discount > 0, money: item.money > 0 }">
                    {{item.money > 0 ? item.money : '折'}}
                  </span>
                  <span :class="{man3: item.discount > 0, man1: item.money > 9, man2: item.money < 10}">{{item.z_money > 0 ? '满 ' + item.z_money + ' 可用' : '无限制'}}</span>
                </p>
                <p class="title" style="margin-top: 8px;">
                  <span class="name-title" style="color: #020202;">{{item.name}}</span>
                </p>
                <p :class="{progress: item.discount > 0}">
                  <span>{{item.num === '0' ? '已抢光' : '已抢'}}</span>
                  <span>
                      <a-progress :percent="item.num > 0 ? parseFloat(((item.circulation - item.num) * 100 / item.circulation).toFixed(2)) : 100"/>
                   </span>
                </p>
              </div>
            </div>
            <div class="right">
              <button @click="receive(item)">立即领取</button>
            </div>
          </div>
      </div>
      <div class="Pagination">
        <a-pagination v-model="current" :total="total" show-less-items />
      </div>
    </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'couponcenter',
  data () {
    return {
      list: null,
      total: null,
      current: 1,
      params: {
        module: 'app_pc',
        action: 'coupon',
        m: 'index',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        page: 1
      }
    }
  },
  mounted () {
    this.getCouponCenter()
  },
  methods: {
    receive (item) {
      console.log(item)
      const params = {
        module: 'app_pc',
        action: 'coupon',
        m: 'receive',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        id: item.id,
        language: null
      }
      api.receive(params).then(res => {
        if (res.data.code === 404) {
          this.$message.error(
            res.data.message
          )
          this.$router.push('/login')
        }
      })
    },
    getCouponCenter () {
      api.getCouponCenter(this.params).then(res => {
        this.list = res.data.data.list
        this.total = parseInt(res.data.data.total)
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  max-width: 1280px;
  min-width: 780px;
  margin: 0 auto;
  padding-left: 10px;
  /*background-color: #98ffee;*/
  .nav-box {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    /*background-color: #62ffe1;*/
    .breadcrumb-link {
      color: #606266!important;
    }
  }
  .list-box {
    width: 100%;
    /*background-color: #ff6848;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item {
      width: 615px;
      height: 168px;
      margin:0 0 30px 0;
      box-shadow: #e2e2e2 1px 1px 13px 1px ;//边框阴影
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      .left {
        width: 408px;
        height: 168px;
        padding: 30px;
        border-right: 1px dashed rgba(202, 202, 202, 0.67);
        position: relative;
        display: flex;
        align-items: center;
        /*background-color: #abf8ff;*/
        .imgMsg {
          float: right;
          max-width: 246px;
          height: 130px;
          margin-right: 10px;
          margin-left: 22px;
          /*background-color: #a6ff68;*/
          .progress {
            min-width: 300px;
            margin-top: 20px!important;
            span:nth-child(1) {
              margin:1px 5px 0 0;
              float: left;
            }
            span:nth-child(2) {
              display: inline-block;
              max-width: 139px;
              float: left;
            }
          }
          p {
            min-width: 200px;
            &:last-child {
              min-width: 300px;
              margin-top: 34px;
              span:nth-child(1) {
                margin:1px 5px 0 0;
                float: left;
              }
              span:nth-child(2) {
                display: inline-block;
                width: 139px;
                float: left;
              }
            }
            &:nth-child(1) {
              position: relative;
              .zright {
                position: absolute;
                top: 16px;
                left: 18px;
              }
              .money {
                position: absolute;
                top: -18px;
                left: 18px;
              }
              .spLeft {
                color: #d4282d;
                font-size: 18px;
              }
              .spRight {
                color: #d4282d;
                font-size: 34px;
                font-weight: bold;
              }
              .man3 {
                display: inline-block;
                position: absolute;
                top: 25px!important;
                left: 62px;
                min-width: 68px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 12px;
                background-color: #feeded;
                border-radius: 2px;
                transform: translateY(-5px);
                color: #d4282d;
              }
              .man1 {
                display: inline-block;
                position: absolute;
                top:  5px;
                left: 62px;
                min-width: 68px;
                height: 20px;
                line-height: 20px;
                padding: 0 4px;
                text-align: center;
                font-size: 12px;
                background-color: #feeded;
                border-radius: 2px;
                transform: translateY(-5px);
                color: #d4282d;
              }
              .man2 {
                display: inline-block;
                position: absolute;
                min-width: 68px;
                height: 20px;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
                padding: 0 4px;
                top: 5px;
                left: 40px;
                background-color: #feeded;
                border-radius: 2px;
                transform: translateY(-5px);
                color: #d4282d;
              }
            }
          }
        }
        .half-angle-top {
          left: 395px;
          top: -18px;
          width: 25px;
          height: 30px;
          border-radius: 30px;
          position: absolute;
          z-index: 99;
          background-color: #eaeaea;
        }
        .half-angle-bottom {
          left: 395px;
          bottom: -18px;
          width: 25px;
          height: 30px;
          border-radius: 30px;
          position: absolute;
          z-index: 99;
          background-color: #eaeaea;
        }
      }
      .right {
        /*background: radial-gradient(40rpx at right bottom,transparent 50%,#1889F6 50%);*/
        width: calc(100% - 408px);
        height: 168px;
        display: flex;
        align-items: center;
        justify-content: center;
        /*background-color: #ffc9bd;*/
        button {
          width: 112px;
          height: 36px;
          font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;
          border-radius: 18px;
          box-sizing: border-box;
          font-size: 16px;
          color: #FFFFFF;
          cursor: pointer;
          background-color: #D4282D;
        }
      }
    }
  }
  .Pagination {
    width: 100%;
    text-align: center;
    margin-top: 44px;
  }
}
</style>
