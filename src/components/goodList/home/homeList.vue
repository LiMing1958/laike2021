<template>
  <div>
      <home-swiper :banner="sliders"></home-swiper>
<!--    领券中心-->
      <div class="couponCenter" @click="handleClickCouponCenter">
       <img src="https://v3pro.houjiemeishi.com/PC/static/images/home_yhq.png" alt="">
      </div>
     <hot-recommend :list_r="hotRecommendList"></hot-recommend>
     <div class="newProduct">
       <newProduct :list_x="newProduct"></newProduct>
      </div>
      <seconds :seconds="seconds"></seconds>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'goodList',
  props: ['itemId'],
  data () {
    return {
      sliders: null,
      hotRecommendList: null,
      newProduct: null,
      seconds: null
    }
  },
  components: {
    HomeSwiper: () => import('../swiper/swiperNew'),
    HotRecommend: () => import('../hotRecommend/hotRecommend'),
    newProduct: () => import('../hotNewProduct/newproduct'),
    seconds: () => import('../seconds/seconds')
  },
  created () {
    this.gethotRecommendAPI()
  },
  methods: {
    gethotRecommendAPI () {
      const params = {
        module: 'app_pc',
        action: 'index',
        m: 'home',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        cid: null
      }
      api.gethotRecommendAPI(params).then((res) => {
        // console.log(res.data.data)
        this.sliders = res.data.data.banner
        this.hotRecommendList = res.data.data.list_r
        this.newProduct = res.data.data.list_x
        this.seconds = res.data.data.seconds
        this.$store.commit('secondTime', this.seconds)
      })
    },
    handleClickCouponCenter () {
      // location.search = '?module=coupon&action=coupon'
      this.$store.commit('toCouponCenter', 'CouponCenter')
    }
  }
}
</script>

<style scoped lang="scss">
  .couponCenter {
    max-width: 1275px;
    min-width: 780px;
    margin: 0 auto;
    cursor: pointer;
    img {
      margin-top: 50px;
      width: 100%;
      max-height: 150px;
    }
  }
  .newProduct {
    background-color: #f8f8f8;
    width: 100%;
  }
</style>
