<template>
  <div class="logoTitle">
    <div class="logo-img">
      <img class="imgContain" src="../../assets/images/logo.png" alt="logo" @click="reload">
      <div class="searchList" v-show="visibleSearch" @mouseleave="addClose" @mouseenter="removeClose">
        <div class="inputBox">
          <input type="text" v-model="searchText" placeholder="搜索商品、品牌">
        </div>
        <div class="searchHistory">
          <div class="search-title">
            <p>最近搜索</p>
            <span><a-icon type="delete" @click="deleteHistory" /></span>
          </div>
          <div class="searchHistoryList">
            <ul>
              <li v-for="(item, index) in cartSearchList" :key="index">{{item.keyword}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="carList" v-show="visible" @mouseleave="addClose" @mouseenter="removeClose">
        <div class="title-top">最新加入的商品</div>
        <div class="carts-box">
          <div class="car-contain" v-for="item in cartList" :key="item.id">
            <div class="cart-img">
              <img :src="item.imgurl" alt="">
            </div>
            <div class="goods">
              <p>{{item.product_title}}</p>
              <p>{{item.attribute}}</p>
            </div>
            <div class="cart-money">
              <p><span style="color: #d4282d">{{item.price}}</span> x {{item.Goods_num}}</p>
              <p>删除</p>
            </div>
          </div>
        </div>
        <div class="car-footer">
          <p>共 <span style="color: #d4282d">{{cartNumber}}</span> 件商品    合计： <span style="color: #d4282d">{{ '￥' + cartPrice}}</span></p>
          <button @click="toCartPage">去购物车</button>
        </div>
      </div>
      <div class="iconList" @mouseleave="addClose" @mouseenter="removeClose">
        <span id="searchIcon" class="iconfont" @click="handleClickSearch" ref="searchIcon">&#xe78b;</span>
        <span class="iconfont" @click="handleClickCart" ref="cartIcon">&#xe645;</span>
        <span class="num-red">{{cartNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import Event from '@/assets/js/event'
export default {
  name: 'logoTitle',
  data () {
    return {
      visible: false,
      visibleSearch: false,
      cartSearchList: null,
      searchText: null,
      cartNumber: '',
      cartPrice: '',
      cartList: []
    }
  },
  mounted () {
    Event.$on('getCatsNumber', this.getNavList)
    this.getSearchList()
    this.getNavList()
  },
  methods: {
    getNavList () {
      const params = {
        module: 'app_pc',
        action: 'index',
        m: 'index',
        access_id: localStorage.getItem('token'),
        language: null
      }
      api.postFormAPI(params).then(res => {
        this.cartNumber = res.data.data.cart_num
        this.cartPrice = res.data.data.cart_price
        this.cartList = res.data.data.cart_list
      }).catch(err => console.log(err))
    },
    reload () {
      location.reload()
    },
    removeClose () {
      document.removeEventListener('click', this.handleClose)
    },
    addClose () {
      document.addEventListener('click', this.handleClose)
    },
    handleClose () {
      if (this.visibleSearch) {
        this.visibleSearch = false
        this.$refs.searchIcon.style.color = '#989898'
      }
      if (this.visible) {
        this.visible = false
        this.$refs.cartIcon.style.color = '#989898'
      }
    },
    deleteHistory () {
      if (this.cartSearchList.length > 0) {
        const params = {
          module: 'app_pc',
          action: 'index',
          m: 'one_click_clear',
          access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIyNjU5NjEsImV4cCI6MTYxMjMwOTE2MSwianRpIjoiMWUwYjcwMjMxZjJiNjJlYjg5ZGI4ZjFkNDllODYyZDEifQ.ggO9qA_Cm7sT9wqg_aHjIyyqFx--3btCrc_0Ssn3mpo',
          language: null
        }
        api.deleteSearchHistory(params).then(res => {
          if (res.status === 200) {
            this.getSearchList()
          }
        })
      }
    },
    handleClickCart () {
      this.visible = !this.visible
      if (this.visibleSearch) {
        this.visibleSearch = false
        this.$refs.searchIcon.style.color = '#989898'
      }
      if (this.visible) {
        this.$refs.cartIcon.style.color = 'black'
      } else {
        this.$refs.cartIcon.style.color = '#989898'
      }
    },
    handleClickSearch () {
      this.visibleSearch = !this.visibleSearch
      if (this.visible) {
        this.visible = false
        this.$refs.cartIcon.style.color = '#989898'
      }
      if (this.visibleSearch) {
        this.$refs.searchIcon.style.color = 'black'
      } else {
        this.$refs.searchIcon.style.color = '#989898'
        if (this.searchText) {
          const params = {
            module: 'app_pc',
            action: 'index',
            m: 'search',
            access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIyNjU5NjEsImV4cCI6MTYxMjMwOTE2MSwianRpIjoiMWUwYjcwMjMxZjJiNjJlYjg5ZGI4ZjFkNDllODYyZDEifQ.ggO9qA_Cm7sT9wqg_aHjIyyqFx--3btCrc_0Ssn3mpo',
            cid: null,
            keyword: this.searchText,
            class_id: null,
            brand_id: null,
            amount: null,
            sort_type: null,
            sort: null,
            page: 1,
            page_mch: 1,
            language: null
          }
          api.getSearchProducts(params).then(res => {
            console.log(res)
          })
          this.searchText = null
        }
      }
    },
    getSearchList () {
      const params = {
        module: 'app_pc',
        action: 'index',
        m: 'click_search',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIyNjU5NjEsImV4cCI6MTYxMjMwOTE2MSwianRpIjoiMWUwYjcwMjMxZjJiNjJlYjg5ZGI4ZjFkNDllODYyZDEifQ.ggO9qA_Cm7sT9wqg_aHjIyyqFx--3btCrc_0Ssn3mpo'
      }
      api.getSearchList(params).then(res => {
        // console.log(res.data.data)
        this.cartSearchList = res.data.data
      })
    },
    toCartPage () {
      this.$store.commit('toCartPage', 'ShoppingCart')
      // console.log(this.$store.state.cartList)
      if (this.visible) {
        this.visible = false
        this.$refs.cartIcon.style.color = '#989898'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .logoTitle {
    width: 100%;
    height: 60px;
    /*background-color: #fff9af;*/
    .logo-img {
      max-width: 1220px;
      min-width: 660px;
      margin: 0 auto;
      position: relative;
      text-align: center;
      .imgContain {
        margin-left: 80px;
        cursor: pointer;
      }
      .searchList {
        width: 300px;
        height: 120px;
        position: absolute;
        background-color: transparent;
        /*box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);*/
        z-index: 999;
        right: 50px;
        top: 17px;
        .searchHistory {
          margin-top: 12px;
          padding: 8px;
          color: #999999;
          background-color: #fff;
          width: 100%;
          box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
          .searchHistoryList {
            margin-top: 15px;
            width: 100%;
            text-align: left;
            li {
              margin-bottom: 15px;
              &:last-child {
                margin: 0;
              }
            }
          }
          .search-title {
            overflow: hidden;
            p {
              float: left;
            }
            span {
              float: right;
            }
          }
        }
        .inputBox {
          width: 100%;
          height: 36px;
          border-bottom: 1px solid #E5E5E5;
          input {
            font-size: 16px;
            color: black;
            width: 100%;
            background-color: transparent;
          }
        }
      }
      .carList {
        width: 360px;
        position: absolute;
        background-color: #fff;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
        z-index: 999;
        right: 0;
        .title-top {
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          font-size: 14px;
          color: #020202;
          border-bottom: 1px solid #EEEEEE;
          box-sizing: border-box;
          font-weight: bold;
          height: 39px;
        }
        .carts-box {
          max-height: 500px;
          overflow-y: auto;
          .car-contain {
            width: 100%;
            min-height: 95px;
            padding: 12px;
            overflow: hidden;
            .cart-img {
              width: 70px;
              height: 70px;
              margin: 0 14px;
              float: left;
              overflow: hidden;
              img {
                display: inline-block;
                width: 70px;
                height: 70px;
              }
            }
            .goods {
              width: 104px;
              height: 60px;
              display: inline-block;
              text-align: left;
              p {
                margin-bottom: 5px;
                &:nth-child(2) {
                  color: #999999;
                  margin-top: 7px;
                }
              }
            }
            .cart-money {
              width: 90px;
              height: 60px;
              float: right;
              text-align: right;
              p {
                width: 90px;
                /*background-color: #98ff8b;*/
                margin-bottom: 5px;
                &:nth-child(2) {
                  color: #333333;
                  line-height: 12px;
                  height: 12px;
                  font-size: 12px;
                  margin-top: 10px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .car-footer {
          position: relative;
          width: 100%;
          height: calc(177px - 39px - 84px);
          display: flex;
          margin-top: 20px;
          align-items: center;
          padding: 10px 12px;
          background-color: #f6f6f6;
          button {
            width: 80px;
            height: 30px;
            position: absolute;
            right: 12px;
            background-color: #d4282d;
            color: white;
            cursor: pointer;
          }
        }
      }
      .iconList {
        float: right;
        padding-top: 15px;
        .num-red {
          position: absolute;
          right: -10px;
          top: 11px;
          right: -8px;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 50%;
          background-color: red;
          text-align: center;
          color: #fff!important;
          font-size: 14px;
        }
        #searchIcon {
          position: absolute;
          right: 25px;
          z-index: 1000;
        }
        .iconfont {
          font-size: 30px!important;
          color: #989898;
          cursor: pointer;
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }

    }
  }
</style>
