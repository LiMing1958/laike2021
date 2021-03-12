<template>
    <div class="goodList">
      <transition>
<!--        <keep-alive>-->
          <component :is="$store.state.showPage" @getCartsNum="$emit('getcartsNumber')"></component>
<!--        </keep-alive>-->
      </transition>
    </div>
</template>

<script>
import HomeList from './home/homeList'
import MoreSec from './home/moreSec'
import CouponCenter from './home/couponcenter'
import ShoppingCart from './home/shoppingcart'
import ProductDetails from '@/components/goodList/productdetails/productdetails'
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
    HomeList,
    MoreSec,
    CouponCenter,
    ProductDetails,
    ShoppingCart
  }
}
</script>

<style scoped lang="scss">
  .v-enter{
    transform: translateX(-100px);
  }
  .v-leave-to{
    transform: translateX(100px);
    opacity: 0;
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }
/*.goodList {*/
/*  !*background-color: #ffd380;*!*/
/*  .couponCenter {*/
/*    max-width: 1275px;*/
/*    min-width: 780px;*/
/*    margin: 0 auto;*/
/*    img {*/
/*      margin-top: 50px;*/
/*      width: 100%;*/
/*      max-height: 150px;*/
/*    }*/
/*  }*/
/*  .newProduct {*/
/*    background-color: #f8f8f8;*/
/*    width: 100%;*/
/*  }*/
/*}*/
</style>
