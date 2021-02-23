<template>
    <div class="box">
      <div class="nav-box">
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="list-box">
        <ul>
          <li v-for="item in list" :key="item.id">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'couponcenter',
  data () {
    return {
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
    getCouponCenter () {
      api.getCouponCenter(this.params).then(res => {
        this.list = res.data.list
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
  }
}
</style>
