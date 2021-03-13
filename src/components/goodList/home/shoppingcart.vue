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
      <div class="empty-box" v-if="cartsList.length === 0">
        <div class="empty-img">
          <img src="@/assets/images/empty_cart.png" alt="">
          <p>购物车内暂时还没有商品，赶紧去逛逛~</p>
          <p>或者先登录同步之前加入的商品</p>
          <button>去逛逛</button>
        </div>
      </div>
      <div v-else class="carts-list">
        <div class="table-title">
          <ul>
            <li>
              <input v-model="checkTotal" type="checkbox" name="checkall" id="checkall" style="margin-right: 8px;cursor: pointer;">
              <label for="checkall" style="color: #999999;cursor: pointer;">全选</label>
            </li>
            <li>商品信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>金额（元）</li>
            <li>操作</li>
          </ul>
        </div>
        <div class="carts-products">
          <div class="product-list">
            <div class="shop-name">
              <input v-model="checkShopName" type="checkbox" name="checkShopName" id="checkshopname" style="margin-right: 8px;cursor: pointer;">
              <label for="checkshopname" style="color: #999999;cursor: pointer;">快快快</label>
              <span class="coupon">
                <a-popover placement="bottomLeft" style="position: absolute;" id="a-popover-list">
                  <template slot="content">
                    <ul style="width: 300px;
                               height: 40px;
                               background-color: #f9ff33;
                               overflow: hidden"
                    >
                      <li style="display: inline-block;
                                 width: 60px;
                                 height: 100%;
                                 background-color: #60ff76;
                                 overflow: hidden;
                                 line-height: 40px;
                                 text-align: center"
                      >
                        ￥1.00
                      </li>
                      <li style="display: inline-block;
                                 width: 180px;
                                 height: 100%;
                                 text-align: left;
                                 line-height: 40px;
                                 background-color: #ff4410;
                                 overflow: hidden"
                      >9999
                      </li>
                      <li style="display: inline-block;
                                 width: 60px;
                                 height: 100%;
                                 text-align: center;
                                 line-height: 40px;
                                 background-color: #60ff76;
                                 overflow: hidden"
                      >8888
                      </li>
                    </ul>
                  </template>
                  <a-button>
                    <span class="coupon-str">优惠券<a-icon type="down" /></span>
                    <img src="https://v3pro.houjiemeishi.com/PC/static/images/lq_bg.png" alt="">
                  </a-button>
                </a-popover>
              </span>
            </div>
            <div class="shop-product"></div>
          </div>
        </div>
      </div>
      <div class="recommend">
        <div class="recommend-title">
          <h1>为你推荐 </h1>
          <span>
            <h2>换一批</h2>
            <a-icon style="color: #666666;" type="redo" />
          </span>
        </div>
        <div class="recommend-list">
          <ul>
            <li v-for="item in recommendList" :key="item.id">
              <div class="img-box">
                <img :src="item.imgurl" alt="">
              </div>
              <div class="product-title">
                <p>{{item.product_title}}</p>
                <p>
                  <span>￥{{item.price}}</span>
                  <span class="iconfont" @click="handleClickCart(item)" ref="cartIcon">&#xe645;</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'shoppingcart',
  data () {
    return {
      recommendList: null,
      cartsList: null,
      checkShopName: [],
      checkTotal: []
    }
  },
  mounted () {
    // if (localStorage.getItem('username')) {
    this.getRecommendList()
    this.getCartsList()
    // }
  },
  methods: {
    getRecommendList () {
      const params = {
        module: 'app_pc',
        action: 'product',
        m: 'recommend',
        access_id: localStorage.getItem('token'),
        language: null
      }
      api.getRecommendList(params).then(res => {
        if (res.data.code === 200) {
          this.recommendList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getCartsList () {
      const params = {
        module: 'app_pc',
        action: 'cart',
        m: 'index',
        access_id: localStorage.getItem('token'),
        language: null
      }
      api.getCartsList(params).then(res => {
        if (res.data.code === 200) {
          this.cartsList = res.data.data.list
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleClickCart (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped lang="scss">
 ::v-deep .ant-btn {
    line-height: 1.499;
    position: absolute;
    display: inline-block;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: transparent;
    width: 100%;
    height: 100% ;
    line-height: 25px;
    padding: 0;
    font-size: 14px;
  }
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
      .carts-list {
        width: 100%;
        .table-title {
          width: 100%;
          height: 50px;
          background-color: #e2e2e2;
          ul {
            width: 100%;
            height: 100%;
            overflow: hidden;
            li {
              display: inline-block;
              overflow: hidden;
              line-height: 50px;
              color: #4e5053;
              text-align: center;
              font-weight: 500;
              height: 100%;
              &:first-child {
                width: 120px;
                text-align: left;
                label {
                  color: #4e5053!important;
                }
                label:hover {
                  color: red!important;
                }
              }
              &:nth-child(2) {
                width: calc(100% - 820px);
              }
              &:nth-child(3) {
                width: 100px;
              }
              &:nth-child(4) {
                width: 200px;
              }
              &:nth-child(5) {
                width: 200px;
              }
              &:nth-child(6) {
                width: 200px;
              }
            }
          }
        }
        .carts-products {
          width: 100%;
          .product-list {
            width: 100%;
            min-height: 184px;
            .shop-name {
              width: 100%;
              height: 63px;
              display: flex;
              align-items: center;
              padding-left: 10px;
              label {
                color: #4e5053!important;
              }
              label:hover {
                color: red!important;
              }
              .coupon {
                width: 80px;
                height: 25px;
                /*background-color: #9bff7f;*/
                display: inline-block;
                margin-left: 10px;
                position: relative;
                .coupon-str {
                  width: 100%;
                  height: 100%;
                  line-height: 23px;
                  text-align: center;
                  color:  #d4282d;
                  position: absolute;
                  left: 0;
                  top: 0;
                }
                img {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .shop-product {
              width: 100%;
              min-height: 121px;
              padding-left: 10px;
              border: 1px solid #d7d7d7;
            }
          }
        }
      }
      .recommend {
        width: 100%;
        margin-top: 79px;
        .recommend-title {
          width: 100%;
          height: 50px;
          h1 {
            float: left;
            color: #020202;
            font-size: 16px;
            font-weight: bold;
          }
          span {
            display: inline-block;
            float: right;
            font-size: 16px;
            h2 {
              color: #666666;
              display: inline-block;
              margin-right: 3px;
            }
          }
        }
        .recommend-list {
          width: 100%;
          height: 410px;
          margin-bottom: 10px;
          /*background-color: #bdff28;*/
          ul {
            width: 100%;
            height: 100%;
            li {
              width: 302px;
              height: 100%;
              overflow: hidden;
              display: inline-block;
              /*background-color: #0dffb1;*/
              margin-right: 20px;
              border: 1px solid #EEEEEE;
              padding-bottom: 21px;
              cursor: pointer;
              &:last-child {
                margin: 0;
              }
              &:hover {
                box-shadow: rgb(228, 228, 228) 0px 0px 5px 2px;
              }
              .img-box {
                width: 100%;
                height: 302px;
                /*background-color: #ff290e;*/
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .product-title {
                width: 100%;
                height: 98px;
                /*background-color: #afff2d;*/
                p {
                  width: 100%;
                  text-align: center;
                  &:first-child {
                    padding: 0 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: bold;
                    color: #020202;
                    font-size: 14px;
                    margin: 20px 0 13px 0;
                  }
                  span {
                    font-size: 16px;
                    &:first-child {
                      margin-right: 5px;
                      color: #D4282D;
                      vertical-align: middle;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
