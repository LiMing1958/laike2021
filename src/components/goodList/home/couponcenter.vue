<template>
    <div class="box">
      <div class="nav-box">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <span class="breadcrumb-link">首页</span>
          </a-breadcrumb-item>
          <span slot="separator">
            <a-icon style="color: #acacac" type="right" />
          </span>
          <a-breadcrumb-item>领券中心</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="list-box">
          <div class="list-item" v-for="item in list" :key="item.id">
            <div class="left">
              <img v-if="item.discount === 0"  src="../../../assets/images/coupon_mj.png" alt="">
              <img v-if="item.discount === 1" src="../../../assets/images/coupon_zk.png" alt="">
            </div>
            <div class="right"></div>
          </div>
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
      params: {
        module: 'app_pc',
        action: 'coupon',
        m: 'index',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        page: 1
      }
    }
  },
  created () {
    this.getCouponCenter()
  },
  methods: {
    getCouponCenter () {
      api.getCouponCenter(this.params).then(res => {
        this.list = res.data.data.list
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
      line-height: 168px;
      margin:0 0 30px 0;
      /*border: 1px solid #acacac;*/
      border-radius: -20px;
      box-shadow: #e2e2e2 1px 1px 13px 1px ;//边框阴影
      /*background-color: #ffc239;*/
    }
  }
}
</style>
