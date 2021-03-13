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
        <a-affix>
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
        </a-affix>
        <div class="carts-products">
          <div class="product-list" v-for="item in cartsList" :key="item.mch_id">
            <div class="shop-name">
              <input v-model="checkShopName" type="checkbox" name="checkShopName" id="checkshopname" style="margin-right: 8px;cursor: pointer;">
              <label for="checkshopname" style="color: #999999;cursor: pointer;">{{item.mch_name}}</label>
              <span class="coupon" v-if="item.coupon_list.length  > 0">
                <a-popover placement="bottomLeft" style="position: absolute;" id="a-popover-list">
                  <template slot="content">
                    <ul style="width: 350px;
                               height: 40px;
                               overflow: hidden;"
                    >
                      <li style="display: inline-block;
                                 width: 80px;
                                 height: 100%;
                                 background-color: #e4e4e4;
                                 overflow: hidden;
                                 line-height: 40px;
                                 text-align: center"
                      >
                        ￥1.00
                      </li>
                      <li style="display: inline-block;
                                 width: 210px;
                                 height: 100%;
                                 text-align: left;
                                 overflow: hidden;
                                 padding-left: 10px;"
                      >
                        <p>满5可用</p>
                        <p style="color: #9c9c9c">21455522</p>
                      </li>
                      <li style="display: inline-block;
                                 width: 60px;
                                 height: 100%;
                                 text-align: center;
                                 line-height: 40px;
                                 overflow: hidden"
                      >
                        已抢光
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
            <div class="shop-product" v-for="items in item.list" :key="items.id">
              <ul class="shop-product-list">
                <li>
                  <input v-model="checkproduct" type="checkbox" name="checkall" id="checkproduct" style="margin-right: 8px;cursor: pointer;">
                  <img :src="items.imgurl" alt="">
                </li>
                <li>
                  <p>{{items.pro_name}}</p>
                  <p v-for="attr in items.skuBeanList" :key="attr.cid" @click="updateAttr(items)">{{ attr.name}} <a-icon style="margin-left: 3px;" type="down" /></p>
                </li>
                <li>￥{{items.price}}</li>
                <li class="number-btn">
                  <div class="quantity-btn">
                    <span class="decrease" @click.stop="decrease(items)" ref="decreasecount"><a-icon type="minus" /></span>
                    <input type="text" v-model="items.num" ref="inputTag" @input="changeNum(items)" @blur="blurChange(items)" @focus="onFocus(items)">
                    <span class="add" :class="{addstocklimit: isOverStock}" @click.stop="addCount(items)" ref="addcount"><a-icon type="plus" /></span>
                  </div>
                </li>
                <li>￥{{(items.num * items.price).toFixed(2)}}</li>
                <li>
                  <div>
                    <p>移到我的收藏</p>
                    <p>删除</p>
                  </div>
                </li>
              </ul>
            </div>
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
      checkTotal: [],
      num: 0,
      isOverStock: false,
      focusNum: ''
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
    },
    decrease (items) {
      if (parseInt(items.num) > 0) {
        this.num = parseInt(items.num)
        this.num--
        items.num = this.num
        const target = window.event.currentTarget
        if (parseInt(items.num) === 0) {
          if (target.className === 'decrease') {
            target.style.cursor = 'not-allowed'
          }
        }
        if (parseInt(items.num) < parseInt(items.stock)) {
          const siblingNode = target.parentElement.childNodes[2]
          siblingNode.style.cursor = 'pointer'
        }
      }
    },
    addCount (items) {
      if (parseInt(items.num) < parseInt(items.stock)) {
        this.num = parseInt(items.num)
        this.num++
        items.num = this.num
        const target = window.event.currentTarget
        if (parseInt(items.num) > 0) {
          const siblingNode = target.parentElement.childNodes[0]
          siblingNode.style.cursor = 'pointer'
          target.style.cursor = 'pointer'
        }
        if (parseInt(items.num) === parseInt(items.stock)) {
          target.style.cursor = 'not-allowed'
        }
      }
    },
    onFocus (items) {
      this.focusNum = parseInt(items.num)
    },
    blurChange (items) {
      if (items.num === '') {
        items.num = this.focusNum
      }
    },
    changeNum (items) {
      if (items.num > parseInt(items.stock)) {
        items.num = parseInt(items.stock)
        this.$message.warning('库存只有' + items.stock)
      }
    },
    updateAttr (items) {
      const params = {
        module: 'app_pc',
        action: 'cart',
        m: 'dj_attribute',
        access_id: localStorage.getItem('token'),
        car_id: items.id,
        language: null
      }
      api.getCartsUpdateAttribute(params).then(res => {
        console.log(res.data.data)
      })
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
          padding-left: 5px;
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
                padding-left: 40px;
                width: calc(100% - 820px);
              }
              &:nth-child(3) {
                padding-left: 20px;
                width: 100px;
              }
              &:nth-child(4) {
                padding-left: 50px;
                width: 200px;
              }
              &:nth-child(5) {
                padding-left: 10px;
                width: 200px;
              }
              &:nth-child(6) {
                padding-left: 5px;
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
                color: #020202!important;
                font-size: 14px!important;
                font-weight: bold!important;
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
              ul {
                width: 100%;
                height: 121px;
                display: flex;
                align-items: center;
                overflow: hidden;
                li {
                  display: inline-block;
                  overflow: hidden;
                  position: relative;
                  color: #4e5053;
                  text-align: center;
                  font-weight: 500;
                  height: 95px;
                  line-height: 95px;
                  img {
                    position: absolute;
                    width: 95px;
                    height: 100%;
                    margin-left: 15px;
                  }
                  &:first-child {
                    width: 140px;
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
                    min-width: 175px;
                    line-height: normal;
                    text-align: left;
                    position: relative;
                    p {
                      &:first-child {
                        color: #020202;
                        font-size: 14px;
                        position: absolute;
                        left: 10px;
                        top: 0;
                      }
                      &:last-child {
                        position: absolute;
                        left: 10px;
                        bottom: 3px;
                        font-size: 12px;
                        cursor: pointer;
                        color: #999999;
                        &:hover {
                          color: red;
                        }
                      }
                    }
                  }
                  &:nth-child(3) {
                    color: #020202;
                    font-size: 14px;
                    width: 100px;
                  }
                  &:nth-child(4) {
                    width: 200px;
                    line-height: normal;
                    display: flex;
                    align-items: center;
                    line-height: normal;
                    justify-content: center;
                    .quantity-btn {
                      margin-left: 42px;
                      /*margin-top: 20px;*/
                      display: inline-block;
                      border-radius: 4px;
                      width: 130px;
                      height: 32px;
                      border: 1px solid #DCDFE6;
                      input {
                        height: 100%;
                        width: calc(100% - 66px);
                        text-align: center;
                        background-color: transparent;
                        border-left: 1px solid #DCDFE6;
                        border-right: 1px solid #DCDFE6;
                      }
                      .decrease {
                        cursor: pointer;
                        display: inline-block;
                        float: left;
                        width: 33px;
                        font-size: 12px;
                        height: 100%;
                        color: #9c9c9c;
                        font-family: Andalus;
                        font-weight: normal;
                        line-height: 32px;
                        text-align: center;
                      }
                      .add {
                        cursor: pointer;
                        display: inline-block;
                        float: right;
                        width: 33px;
                        height: 100%;
                        font-size: 14px;
                        color: #9c9c9c;
                        font-family: Andalus;
                        line-height: 30px;
                        text-align: center;
                      }
                      .addstocklimit {
                        cursor: not-allowed;
                        display: inline-block;
                        float: right;
                        width: 33px;
                        height: 100%;
                        font-size: 14px;
                        color: #9c9c9c;
                        font-family: Andalus;
                        line-height: 30px;
                        text-align: center;
                      }
                    }
                  }
                  &:nth-child(5) {
                    color: #D4282D;
                    font-weight: bold;
                    background-color: transparent;
                    width: 200px;
                  }
                  &:nth-child(6) {
                    display: flex;
                    align-items: center;
                    line-height: normal;
                    justify-content: center;
                    width: 200px;
                  }
                }
              }
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
