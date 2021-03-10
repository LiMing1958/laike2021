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
        <a-breadcrumb-item>购物车</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="cart-list-box">
      <div class="empty-box">
        <div class="empty-img">
          <img src="@/assets/images/empty_cart.png" alt="">
          <p>购物车内暂时还没有商品，赶紧去逛逛~</p>
          <p>或者先登录同步之前加入的商品</p>
          <button>去逛逛</button>
        </div>
      </div>
      <div class="recomrecommend"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shoppingcart'
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
    .cart-list-box {
      width: 100%;
      /*height: 1000px;*/
      /*background-color: #ff6848;*/
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .empty-box {
        width: 100%;
        height: 389px;
        /*background-color: #8edeff;*/
        text-align: center;
       .empty-img {
         margin-top: 52px;
         img {
           margin-bottom: 20px;
         }
         p {
           font-size: 16px;
           line-height: 20px;
           color: #888888;
         }
         button {
           background: #ffffff;
           color: #D4282D;
           margin-top: 30px;
           width: 112px;
           height: 40px;
           border: 1px solid rgba(212,40,45,1);
           cursor: pointer;
         }
       }
      }
    }
  }
</style>
