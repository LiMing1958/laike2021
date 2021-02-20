<template>
  <div>
    <home-swiper :banner="sliders"></home-swiper>
    <div class="couponCenter">
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
import HomeSwiper from '../swiper/swiperNew'
import HotRecommend from '../hotRecommend/hotRecommend'
import newProduct from '../hotNewProduct/newproduct'
import seconds from '../seconds/seconds'
import api from '../../../api/api'
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
    HomeSwiper,
    HotRecommend,
    newProduct,
    seconds
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
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIyNjU5NjEsImV4cCI6MTYxMjMwOTE2MSwianRpIjoiMWUwYjcwMjMxZjJiNjJlYjg5ZGI4ZjFkNDllODYyZDEifQ.ggO9qA_Cm7sT9wqg_aHjIyyqFx--3btCrc_0Ssn3mpo',
        cid: null
      }
      api.gethotRecommendAPI(params).then((res) => {
        // console.log(res.data.data)
        this.sliders = res.data.data.banner
        this.hotRecommendList = res.data.data.list_r
        this.newProduct = res.data.data.list_x
        this.seconds = res.data.data.seconds
        // console.log(this.sliders)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .couponCenter {
    max-width: 1275px;
    min-width: 780px;
    margin: 0 auto;
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
